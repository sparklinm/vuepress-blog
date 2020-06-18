---
meta:
  - title: 监听dom的变化
    time: 2019-10-20 19:19:28
    tag: html
---

# 监听 dom 的变化

## 前言

在写一些通用的组件库时，总希望组件能宽高自适应，来使组件有更好的表现。但 dom 的大小是无法直接监听的，在搜索的过程中，发现一些方法可以做到监听页面变化，在这里做一个总结，内容包括：

1. `resize` 事件。
2. `MutationObserver` 观察属性变化。
3. 通过动画监听节点添加。
4. 通过过渡监听元素大小变化。（只适用于元素大小直接改变）
5. 通过滚动监听元素大小变化。（完美）

<!-- more -->

## resize 事件

视窗的大小监听可以使用`window.addEventListener('resize',callback)`。

## MutationObserver

MutationObserver 是 H5 的新 api，主要用于观察某个范围的 dom 树的变化。

```js
// 创建观察者对象
var observer = new MutationObserver(function(MutationRecord, target) {
  // 指定的DOM节点(目标节点)发生变化时被调用
  // MutationRecord为一个数组，记录的节点的一组变化
  MutationRecord.forEach(function(mutation) {
    console.log(mutation);
  });
});

// 获取需要观察元素的dom
var ele = document.querySelector("#el");
// 观察dom
observer.observe(ele, {
  // 观察目标节点的属性节点(增，删，改)
  attributes: true,
  // 观察目标节点的子节点(增, 删)
  childList: true,
  // 观察characterData节点(一种抽象接口,具体可以为文本节点,注释节点,以及处理指令节点)的变化
  characterData: true,
  // 观察目标节点所包含的整棵DOM树上的上述三种节点变化
  subtree: true,
  // 在attributes属性已经设为true的前提下,将发生变化的属性节点之前的属性值记录下来(MutationRecord对象的oldValue属性中)
  attributeOldValue: true,
  // 在characterData属性已经设为true的前提下,将发生变化的characterData节点之前的文本内容记录下来(MutationRecord对象的oldValue属性中)
  characterDataOldValue: true
});
```

> MutationObserver 主要用于观察节点属性、子节点、characterData 节点、整个树的变化，**如果要监测样式的变化，那么它只能监测到内联样式`style`属性的变化**，如果是 css 改变，无法监听。

## 动画

动画可以观察元素的插入，原理在于为节点的所有后代元素添加一个短暂的动画，那么当该节点内新加一个子节点时，就会触发动画开始事件。

```css
/* 所有后代节点添加动画 */
#container * {
  animation-duration: 0.001s;
  animation-name: nodeInserted;
}

@keyframes nodeInserted {
  from {
    opacity: 0.99;
  }
  to {
    opacity: 1;
  }
}
```

```js
document
  .getElementById("container")
  .addEventListener("animationstart", callback, false);
```

> 只适用观察有新节点添加。

## 过渡

过渡可以用来观察元素的大小变化，设置了`transition`元素，其相应样式改变时，会触发过渡事件。

```css
/* 所有后代节点添加动画 */
#container {
  height: 200px;
  width: 200px;
  transition: width 0.001s, height 0.001s;
}
```

```js
let container = document.getElementById("container");
container.addEventListener("transitionstart", callback, false);
container.style.width = "400px";
```

> 但如果元素的宽高时根据父元素而定，例如`width:100%`，那么父元素宽高改变时，并不会触发过渡。这种方法只适用于直接改变元素宽高。

## 滚动

在搜寻后，发现了一个通过滚动来监听元素大小改变的方法，近乎完美。

主要思路在于：

1. 在被`监测元素`里包裹一个跟元素位置大小相同的`隐藏块`。
2. `隐藏块`可以滚动，并有一个远远大于它的`隐藏子元素`。
3. `隐藏块`的初始滚动位置为**最底部**。
4. 当被`监测元素`宽高改变时，会触发`隐藏块`的滚动事件。

> 即使是 `overflow: hidden;` 的元素依然会触发滚动事件。

具体原理见原文：

[巧妙监测元素尺寸变化](https://blog.crimx.com/2017/07/15/element-onresize/)

### 监听变大

`隐藏子元素`的大小足够大就行了。那么只要`隐藏块`大小变化，必定会引起 `scrollTop`或`scrollLeft`改变。

如图：

![enter description here](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1592748560765.png)

变大是左边界向左延伸，故 `scrollLeft` 改变。

```html
<div class="parent">
  <div class="holder-big">
    <div class="child-big"></div>
  </div>
</div>
```

```css
.holder-big {
  /* 铺满父元素且隐藏 */
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  visibility: hidden;
  z-index: -1;
}

.child-big {
  width: 10000px;
  height: 10000px;
}
```

```js
let holderBig = document.querySelector(".holder-big");
holderBig.scrollTop = 10000;
holderBig.scrollLeft = 10000;
holderBig.addEventListener("scroll", scroll);
```

### 监听变小

如果只是`隐藏子元素`设定固定大小，根据上图可见，`监测元素`变小时，右边界向左缩小， `scrollLeft` 未改变，所以不会触发滚动事件。

这时候就需要`隐藏子元素`也根据`监测元素`的大小而定，那么`监测元素`变小时，也能触发滚动事件。

也就是`监测元素`减少 1，那 `隐藏子元素`必修减少 1 以上才会使`scrollTop`或`scrollLeft`改变。

所以`隐藏子元素`的`width`应该大于`100%`。

```html
<div class="parent">
  <div class="holder-small">
    <div class="child-small"></div>
  </div>
</div>
```

```css
.holder-small {
  /* 铺满父元素且隐藏 */
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  visibility: hidden;
  z-index: -1;
}

.child-small {
  width: 300%;
  height: 300%;
}
```

```js
let holderBig = document.querySelector(".holder-small");
holderBig.scrollTop = 10000;
holderBig.scrollLeft = 10000;
holderBig.addEventListener("scroll", scroll);
```

### 类封装

以类的方式封装，方便调用。

```js
// 自定义事件
class Events {
  // on 监听的事件数组
  onEvents = [];
  on(name, callback, once = false) {
    this.onEvents.push({
      name: name,
      callback: callback,
      once: once
    });
  }

  off(name, callback) {
    this.onEvents = this.onEvents.filter(event => {
      return event.name !== name || event.callback !== callback;
    });
  }

  emit(name, arg1, arg2, arg3) {
    this.onEvents = this.onEvents.filter(event => {
      if (event.name === name) {
        event.callback(arg1, arg2, arg3);
      }
      return !event.once;
    });
  }
}
export default class extends Events {
  width = 20000;
  oldWidth = 0;
  newWidth = 0;
  oldHeight = 0;
  newHeight = 0;
  supportsPassive = false;
  constructor(el) {
    super();
    this.el = el;
    this._init();
  }
  _init() {
    this.oldWidth = parseFloat(window.getComputedStyle(this.el).width);
    this.oldHeight = parseFloat(window.getComputedStyle(this.el).height);
    this.setSupportsPassive();
    this.createNode();
  }

  createNode() {
    // 监听变大的DOM
    const holderBig = document.createElement("div");
    holderBig.style =
      "position: absolute;top:0;left: 0;bottom: 0;right: 0;overflow: hidden;visibility: hidden;z-index:-1";
    holderBig.innerHTML = `<div style="width:${this.width}px;height:${this.width}px"></div>`;

    // 监听变小的DOM
    const holderSmall = document.createElement("div");
    holderSmall.style =
      "position: absolute;top:0;left: 0;bottom: 0;right: 0;overflow: hidden;visibility: hidden;z-index:-1";
    holderSmall.innerHTML = '<div style="width:300%;height:300%"></div>';

    this.holderBig = holderBig;
    this.holderSmall = holderSmall;
    this.el.appendChild(holderBig);
    this.el.appendChild(holderSmall);

    holderSmall.scrollTop = this.width;
    holderSmall.scrollLeft = this.width;
    holderBig.scrollTop = this.width;
    holderBig.scrollLeft = this.width;

    holderBig.addEventListener(
      "scroll",
      this.scroll,
      this.supportsPassive
        ? {
            passive: true
          }
        : false,
      false
    );
    holderSmall.addEventListener(
      "scroll",
      this.scroll,
      this.supportsPassive
        ? {
            passive: true
          }
        : false,
      false
    );
  }

  scroll = () => {
    this.newWidth = parseFloat(window.getComputedStyle(this.el).width);
    this.newHeight = parseFloat(window.getComputedStyle(this.el).height);
    // 只有两次width不同时才分发事件，不然会多次分发
    if (this.oldWidth !== this.newWidth || this.oldHeight !== this.newHeight) {
      this.emit("domResize");
      this.oldWidth = this.newWidth;
      this.oldHeight = this.newHeight;
    }
    // 每次触发滚动事件后，重新将滚动条设至尽头
    this.holderSmall.scrollTop = this.holderBig.scrollTop = this.width;
    this.holderSmall.scrollLeft = this.holderBig.scrollLeft = this.width;
  };

  setSupportsPassive() {
    try {
      const opts = Object.defineProperty({}, "passive", {
        get: () => {
          this.supportsPassive = true;
          return true;
        }
      });
      window.addEventListener("testPassive", null, opts);
      window.removeEventListener("testPassive", null, opts);
    } catch (e) {
      console.error(e);
    }
  }

  destroy() {
    this.holderBig.removeEventListener("scroll", this.scroll);
    this.holderSmall.removeEventListener("scroll", this.scroll);
    this.el.removeChild(this.holderBig);
    this.el.removeChild(this.holderSmall);
  }
}
```

这里使用了`passive`属性，有助于提高滚动事件的性能。

一般来说，滚动会执行两件事，一是回调函数，而是滚动的默认行为。

而回调函数中是可以使用`preventDefault()`阻住默认行为的，所以默认行为会等待回调执行完毕才会触发（最后触发才知道是是否阻住了默认行为），这可能引起滚动的不流畅。

使用了`passive`就表示不会执行`preventDefault()`，滚动的默认行为会直接触发，而不会等待。

## 参考文献

1. [巧妙监测元素尺寸变化](https://blog.crimx.com/2017/07/15/element-onresize/)
2. [passive 的作用和原理](https://segmentfault.com/a/1190000017247263)
