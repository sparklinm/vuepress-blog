---
meta:
  - title: 扩大微信小程序 input 框点击区域
    time: 2021-01-23 12:24:39
    tag: 微信小程序
---

# 扩大微信小程序 input 框点击区域

## 前言

微信小程序的 `label` 和 `input` 框并不能绑定，那么该如何增加 `input` 的点击区域来获得更好的用户体验呢？搜索和思考后，发现了以下几种方法。

<!-- more -->

## js

使用 `js`，对 `label` 添加点击事件，然后设置 `input` 框的 `focus` 属性为 `true`。

```html
<input focus="{{focus}}" />
```

用 `js` 的方法总显得不够优雅。

## padding

为 `input` 增加 `padding`，**但在 ios 下，点击 padding 区域并不能使 input 聚焦。**

## 伪元素

为 `input` 框添加 `::after` 伪元素，并让伪元素覆盖整个 `input` 框和 `label`。

```css
.input::after {
  content: '';
  position: absolute;
  width: 80px;
  height: 80px;
  top: 50%;
  left: 50%;
  margin-top: -40px;
  margin-left: -40px;
}
```

这样在点击伪元素的情况下也等同于点击 `input` 框，实现聚焦。**但在 ios 下，这种方法依然无效。**

## 增加输入框 height

在微信小程序中，`font-size` 决定光标的大小，增加 `input` 的 `height`，光标会总是垂直居中。

对 `input` 框使用负的 `margin-top`，可以使光标向上移动，除此之外，没有其他方法可以控制光标垂直方向的位置。

所以要想在增加 `input` 框高度后，展现为原有布局形式，有以下几个步骤：

1. 设置 `input` 框的 `height`
2. `input` 框上移覆盖 `label`
3. 设置父元素的高度来隐藏超出的 `input` 框

![input](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8Finput%E6%A1%86%E6%89%A9%E5%A4%A7%E7%82%B9%E5%87%BB%E5%8C%BA%E5%9F%9F.PNG)

定义一些变量：

```scss
// label 的高度
$label-height
// 输入框高度
$input-height
// 输入框字体大小
$input-font-size
// 光标区域距离 label 的距离
$input-cursor-area-pdt
// 光标区域距离底部的距离
$input-cursor-area-pdb

// 输入框光标区域高度 等于 输入框字体大小
$input-cursor-area = $input-font-size

// 输入框光标上下的区域高度相等
$input-top-area = $input-bottom-area = $input-height - $input-cursor-area
```

可以得到输入框向上偏移的量：

```scss
$top = $input-top-area - $input-cursor-area-pdt
```

设置输入框和 `label` 的父元素高度，让超出的输入框区域隐藏，而不影响周边的布局：

```scss
$height = $input-cursor-area-pdb + $input-cursor-area-pdt + $input-cursor-area + $label-height
```

综上来看，为了完成布局，我们需要去显示指定这几个变量的值：

```scss
// label 的高度
$label-height
// 输入框高度
$input-height
// 输入框字体大小
$input-font-size
// 光标区域距离 label 的距离
$input-cursor-area-pdt
// 光标区域距离底部的距离
$input-cursor-area-pdb
```

这种方法有很明显的缺点： **不能直接去修改 css，只能去改变上面的变量，来控制布局，灵活性更差。**

除此之外还有一个更致命的缺点：**按照这种设计，input 框可能会和周边元素重叠，而 input 在 focus 后是非同层渲染，即层级会是最高级，这样在 focus 情况下点击周边元素时，实际还是点击的 inut 框。**

设置 `input` 框的 `always-embed` 属性可以让输入框强制处于同层状态，但只在 ios 下有效：

```html
<input always-embed />
```

## 总结

由于 `ios` 和安卓的不一致性，上面的方法都不能解决问题。

所以，扩大 `input` 输入框的最佳实践应该是：

1. 为 `input` 设置一个更高的 `height`，而不是使用 `padding`。
2. 必要时可以为 `label` 添加点击事件，主动聚焦 `input` 框。

另外，`label` 标签是可以和 `button`, `checkbox`, `radio`, `switch` 正常组合的，在组合后，**我们应当为 label 添加一个 padding**，来扩大点击区域。
