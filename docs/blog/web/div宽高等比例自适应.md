---
meta:
- title: div宽高等比例自适应
  time: 2019-6-22 9:13:38
  tag: html,布局
---

# div宽高等比例自适应

## 前言

需要实现这样一个效果，div的宽高成比例，例如：宽:高=1:1。

1. 当窗口宽度大于`500px`时，div宽度为`500px`
2. 当窗口宽度小于`500px`时，div宽度自适应屏幕

主要的方法有js控制、`padding-bottom`补充、vw、rem，`padding-bottom`设定为百分比时，真是一个神奇的属性。
<!-- more -->

## js控制法



使用js获取元素的宽度，再将高度设置为和元素的宽度相同。

``` html
<div class="container">
    宽：高=1：1
</div>
```
    
``` css
.container {
    max-width: 500px;
    background: yellow;
}
```
     
``` js
//调整元素宽：高=1：1
function adjust() {
    var container = document.querySelector(".container")
    container.style.height = container.clientWidth + "px"
}
//监听窗口变化事件
window.addEventListener("resize",adjust)
```


## padding补充法

### 原理

当元素的`padding`和`margin`被设置为百分比时，是相对于父元素的内容宽度`content-width`来计算的。

而父元素的宽度有两种情况：

> 1. 当父元素设置为`box-sizing: content-box`时  
`content-width`=`width`
> 2. 当父元素设置为`box-sizing: border-box`时       
`content-width`=`width`-`padding`-`border`

### 实现

当屏幕宽度缩小到`500px`以下时，`wrapper`宽度自适应，同时`container`宽高成`1：1`缩放。

``` html
<div class="wrapper">
    <div class="container">
        宽：高=1：1
    </div>
</div>
```
    
``` css
.wrapper {
    max-width: 500px;
    margin: 0 auto;
}
.container {
    width: 100%;
    background: yellow;
    height: 0;
    padding-bottom: 100%;
}
```

### 存在问题

当`container`内部有其他`item`，`item`的高度依赖于`container`时，因为`container`的高度为0，所以`item`的高度无法设置，这时候需要设置`item`为`absolute`。

``` html
<div class="wrapper">
    <div class="container">
        宽：高=1：1
        <div class="item"></div>
    </div>
    
</div>
```
     
``` css
.container {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    background: yellow;
    position: relative;
}

.item {
    width: 100%;
    height: 50%;
    background: red;
    position: absolute;
}
```

> 据W3C文档，当子元素使用`absolute`定位时，宽高设定百分比的参考量是其第一个非`static`祖先元素的`padding box`宽高，即width/height + padding



## 使用 vw + @media

`vw`：相对于可视窗口，可视窗口被分为100`vw`

1. 当可视窗口大于`500px`时，`height: 500px`

2. 当可视窗口小于`500px`时，`height: 100vw`

``` html
<div class="container">
    宽：高=1：1
</div>
```
    
``` css
.container {
    background: yellow;
    max-width: 500px;
    height: 500px;
}
@media (max-width: 500px) {
    .container {
        height: 100vw;
    }
}
```

## 动态设置 rem + @media

`rem`：相对于根（html）元素`font-size`值的倍数

``` html
<div class="container">
    宽：高=1：1
</div>
```
    
``` css
.container {
    background: yellow;
    max-width: 500px;
    height: 500px;
}
@media (max-width: 500px) {
    .container {
        height: 5rem;
    }
}
```
    
``` javascript
//设置html元素的font-size=可视窗口/5
function setRootFontSize() {
    var width = document.documentElement.clientWidth ||document.body.clientWidth
    document.documentElement.style.fontSize = width / 5 + "px"
}
window.addEventListener("resize", setRootFontSize)
```
## 总结

1. js控制法直接明了，并且很简单，但有时会不太想使用js。

2. 用padding补充的话，如果内部有元素高度设为百分比，需要对内部元素使用绝对定位，并且需要一个父元素。

3. 使用vw，是很好的方法，现在兼容性也不错。

4. 动态设定rem的话，如果只是单单用在这上面就显得有点麻烦了，rem现在也是移动端布局的主流方法，如果本身就使用的rem布局，这个方法也很好。

5. 如果想兼容IE8（包括）以下，那么vw和rem都不能使用，同时vw、vh、vmin、vmax在IE9以上也只是支持部分。

## 拓展：padding-bottom（或padding-top）的其他用处

如果有一张背景图，其在pc端显示为`1000 * 400px`，我们想让它在屏幕缩小时逐渐显示为`400 * 200px`，如果使用等比缩放的方式，显然不成立。

这时候就可以使用padding-bottom来补充差距。

参考：[移动端-图片及背景图的缩放     ](https://juejin.im/post/5ade866051882567370604a2)

## 参考文献
1. [CSS实现宽高等比例自适应矩形](https://juejin.im/post/5b0784566fb9a07abd0e14ae)
2. [移动端-图片及背景图的缩放](https://juejin.im/post/5ade866051882567370604a2)

