---
meta:
  - title: taro3全平台浅析
    time: 2021-02-28 17:10:12
    tag: taro3,小程序全平台
---

# taro3 全平台实现分析

![taro3全平台](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/taro3%E5%85%A8%E5%B9%B3%E5%8F%B0.png)

<!-- more -->

## 统一 API

基于微信小程序的 `API` 规范，对于其他小程序类似的 `API`，会在 `Taro` 中适配为小程序 `API` 的规范格式，并且都挂载在 `Taro` 命名空间下。

## 模拟 Dom, Bom

模拟了浏览器 `document`, `window` 对象，并模拟了相关 `dom` 操作方法，供第三方库调用，例如 `vue`, `react`。

维护一棵 `taro dom` 树，当调用这些方法时，对 `taro dom` 树进行修改。

## 更新小程序 data

将新 `taro dom` 树更新到小程序 `data`。

## 模板递归

对于增加和删除节点，是可以通过增加和删除对应 data 实现。但对于改变节点类型，无法单纯通过改变 `data` 改变。

`taro` 使用了小程序的 `template` 模板的方法，`template` 类似于动态组件，可以根据 `data` 来来动态引入不同的模板。

事先定义好一些列基础模板：

```html
<!--编译后  -->

<!-- home -->
<import src="../../base.wxml" />
<template is="taro_tmpl" data="{{root:root}}" />

<!--base.wxml  -->
<template name="taro_tmpl">
  <block wx:for="{{root.cn}}" wx:key="uid">
    <template is="tmpl_0_container" data="{{i:item,l:''}}" />
  </block>
</template>

<template name="tmpl_0_container">
  <template is="{{xs.a(0, i.nn, l)}}" data="{{i:i,cid:0,l:xs.f(l,i.nn)}}" />
</template>

<template name="tmpl_0_view">
  <view
    hover-class="{{xs.b(i.hoverClass,'none')}}"
    hover-stop-propagation="{{xs.b(i.hoverStopPropagation,false)}}"
    hover-start-time="{{xs.b(i.hoverStartTime,50)}}"
    hover-stay-time="{{xs.b(i.hoverStayTime,400)}}"
    animation="{{i.animation}}"
    bindanimationstart="eh"
    bindanimationiteration="eh"
    bindanimationend="eh"
    bindtransitionend="eh"
    bindtouchstart="eh"
    bindtouchmove="eh"
    bindtouchend="eh"
    bindtouchcancel="eh"
    bindlongpress="eh"
    style="{{i.st}}"
    class="{{i.cl}}"
    bindtap="eh"
    id="{{i.uid}}"
  >
    <block wx:for="{{i.cn}}" wx:key="uid" wx:for-index="index_rr_0_">
      <template is="{{xs.e(cid+1)}}" data="{{i:item,l:l}}" />
    </block>
  </view>
</template>

<!-- 更多模板 -->
```

页面中 data 描述模板信息：

```js
data = {
  root: {
    cn: [
      {
        nn: 'view',
        uid: '_n_47',
        cn: [{ v: '0.23011026009994318', nn: '#text' }]
      },
      {
        nn: 'view',
        uid: '_n_47',
        cn: [{ v: '0.23011026009994318', nn: '#text' }]
      },
      {
        nn: 'view',
        uid: '_n_47',
        cn: [{ v: '0.23011026009994318', nn: '#text' }]
      },
      {
        nn: 'view',
        uid: '_n_47',
        cn: [{ v: '0.23011026009994318', nn: '#text' }]
      },
      {
        nn: 'view',
        uid: '_n_47',
        cn: [{ v: '0.23011026009994318', nn: '#text' }]
      }
    ]
  }
}
```

## 性能

以 `vue` 为例子，一个完整的数据更新到视图渲染流程如下：

```bash
数据改变 -> vue 过程更新 taro dom -> taro dom 更新小程序 data -> 小程序 setData
```

比原生小程序多了 `vue 过程` 和 `taro dom 更新小程序 data 过程`。性能有一定损失。

但通过实际测试，并不只如此。**在 `taro` 项目中测试微信小程序的 `setData` 耗时，远比原生项目中 setData 的长。** `nextTick` 是 `vue` 的耗时。

![taro setData](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/taro3%E5%85%A8%E5%B9%B3%E5%8F%B0%E6%B5%85%E6%9E%90/taro_setData_%E8%80%97%E6%97%B6.PNG)

并且这个时长，会随着页面复杂度提升而越来越长。

在查找原因时，`taro` 的 `github` 的 `issues` 中看到有人这样描述：**taro 的 setData 每次都是数据全量的 setData，所以耗时很长**。这确实符合页面复杂越复杂（data 越复杂），耗时越长。

但 `taro` 的 `setData` 并不是全量的，每次会更新具体的属性：

![taro setData 数据](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/taro3%E5%85%A8%E5%B9%B3%E5%8F%B0%E6%B5%85%E6%9E%90/taro_setData_%E6%95%B0%E6%8D%AE.PNG)

具体可以查看 `taro` 的描述：[小程序数据 diff](http://taro-docs.jd.com/taro/docs/optimized-practice#%E5%B0%8F%E7%A8%8B%E5%BA%8F%E6%95%B0%E6%8D%AE-diff)。

同时在原生小程序中，更改同样大小的数据，也仅仅只需要几毫秒。所以不会是**数据量大**或者**每次 setData 全量数据**导致。

剩下的只可能是使用了模板的原因了，经过具体的测试，确实是这样：

> 当使用了 `template` 时，`setData` 将异常耗时，即使 `setData` 与 `template` 模板无关的数据。

这个耗时会随着引入的模板数量而递增。而 `taro` 在一个页面会引入大量的基础（按 `dom` 层级来，每一层有多少个元素就会引入多少个模板）。如果页面复杂，`setData` 耗时将很轻易超过几百毫秒。**因为是微信 `templeate` 的问题，所以这个耗时现阶段无法优化。**

```js
data = {
  root: {
    cn: [
      {
        nn: 'view',
        uid: '_n_47',
        cn: [{ v: '0.23011026009994318', nn: '#text' }]
      },
      {
        nn: 'view',
        uid: '_n_47',
        cn: [{ v: '0.23011026009994318', nn: '#text' }]
      },
      {
        nn: 'view',
        uid: '_n_47',
        cn: [{ v: '0.23011026009994318', nn: '#text' }]
      },
      {
        nn: 'view',
        uid: '_n_47',
        cn: [{ v: '0.23011026009994318', nn: '#text' }]
      },
      {
        nn: 'view',
        uid: '_n_47',
        cn: [{ v: '0.23011026009994318', nn: '#text' }]
      }
    ]
  }
}
```

用三种方法描述渲染这样的结构：

1. 直接 `wx:for`
2. `wx:for` + 组件
3. `template`

性能：`template << wx:for + 组件 < 直接wx:for`。并且 `template` 的耗时会随着 template 数量的增加而呈现近乎线性级别的增加。

## taro3 和其他小程序框架分析

[Taro Next 的前世今生](https://juejin.cn/post/6881915581168746510#heading-14) 讲得很清楚。
