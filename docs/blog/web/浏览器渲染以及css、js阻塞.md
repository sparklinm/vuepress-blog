---
meta:
    - title: 浏览器渲染以及 css、js 阻塞
      time: 2019-07-31 7:42:53
      tag: html
---

# 浏览器渲染以及 css、js 阻塞

## 浏览器渲染流程

浏览器获得一个 html 文档后，渲染的过程如下：

1. 解析 dom，生成 DOM Tree，解析 CSS 文件生成 CSSOM Tree
2. 生成 render 树，将 DOM Tree 和 CSSOM Tree 合并
3. 布局 render 树，计算各元素尺寸、位置等
4. 绘制 render 树，绘制页面的像素信息
5. 合成（composite），GPU 会将各层合成（composite），显示在屏幕上

<!-- more -->

在这个过程中，JavaScript 的作用是操作 dom 或者修改 css，辅助生成渲染。当 js 在执行时，dom 解析会停止，如果 css 在 js 之前，那么 js 会等待 css 解析完成才会执行。

用一张图表示如下：

![](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1564618028919.png)

![](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1564532054774.png)

## css 阻塞

css 阻塞规则：

1. css 加载不会阻塞 DOM 树的解析，但会阻塞 DOM 树的渲染
2. css 加载会阻塞后面 js 语句的执行。因为 js 会可能获取操作元素样式，故等待前面 css 加载完成后再加载。
3. css 和 dom 解析是两个并行的过程

## js 阻塞

### async 和 defer 脚本

async 和 defer 只能用于外链 js 脚本上，相比于普通脚本，这类脚本在加载过程中并不会阻塞 dom 的解析，但执行时依然会阻塞 dom 解析。

async 脚本表示异步脚本，会在加载完后执行（不需要按照它们出现的顺序），这类脚本不计入 DOMContentLoaded 事件（图中绿色表示 DOMContentLoaded 事件）。

![](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1564705449748.png)

defer 表示延迟脚本，当页面解析完毕后，defer 脚本会按照它们在 html 文档中出现的顺序在 DOMContentLoaded 事件之前执行。

![](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1564821603744.png)

### 普通 script

对于普通的 js 脚本，脚本在加载和执行时都会阻塞 dom 解析。

![](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1564822379588.png)

### 不同脚本的区别

在解析 dom 的过程中，浏览器一般会扫描后面的 dom，对`link`、`script`和`img`等标签的资源进行预先下载，这样的下载都是并行下载的，并且在下载过程中，dom 也会解析。

当解析时遇到`script`标签，就会停止对 dom 的解析，等待该 js 文件下载、执行完成，再解析 dom。

但当遇到 async 和 defer 脚本时，dom 解析依然不会停止，直到这些脚本下载完毕后再依据上面的规则对它们进行处理。

### 什么时候使用

1. 普通 js 脚步应该放在 body 下面，因为放在 body 上方会等到 js 下载和解析完毕后才会解析 dom，同时也无法操作 dom。
2. defer 脚步之间存在依赖，且需要操作 dom，例如：
    - 评论框；
    - 代码语法高亮；
    - polyfill.js。
3. async 不存在依赖，且不操作 dom。

### js 执行时的阻塞

js 执行对浏览器渲染的影响依据下面的规则：

**宏任务->微任务->浏览器渲染**

宏任务：一次只执行一个 （主代码块，`setTimeout`，`setInterval` 等）

微任务：会执行所有 （`Promise`，`process.nextTick` 等）

当执行完当前的宏任务，再执行完微任务队列中所有微任务后，浏览器才会渲染（或解析）

由此可知，`setTimeout`，`setInterval` 并不会阻塞 dom 渲染，因为它们是下一次宏任务，当主代码块执行完毕后会，即代表本次宏任务执行完毕

但 `Promise` 会阻塞 dom 渲染，因为它们是微任务，执行完毕后才会渲染页面

### `requestAnimationFrame` 和渲染

`requestAnimationFrame` 在 MDN 的解释：
该方法告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画，当你需要更新屏幕画面时就可以调用此方法。在浏览器下次重绘前执行回调函数。回调的次数通常是每秒 60 次，但大多数浏览器通常匹配 W3C 所建议的刷新频率。

可以发现`requestAnimationFrame`有 2 个特点：

1. 下一次重绘前调用
2. 每秒 60 次(与屏幕刷新率有关)

在事件循环中，它处在的地位时：
宏任务 -> 微任务 -> `requestAnimationFrame` -> 重绘 -> 宏任务

也就是说它保持在这样的顺序下，以 16.67ms 的延时执行。如果前面有阻塞，那重绘不会按时执行，`requestAnimationFrame` 自然也不会按时执行。

浏览器的重绘是根据一个时钟周期定时进行的 —— 浏览器刷新频率（一般是 16.67ms），并不是在每次宏任务最后一定重绘，而是必须当前宏任务结束才能重绘，也就是重绘时可能已经进行了多次宏任务。

### dom 事件

**关于交互产生的 dom 事件，例如：点击，滑动等，每次触发会在下一次宏任务执行。**

函数节流：是指在一定时间内只执行一次函数。

以`touchmove`事件举例，节流的时间间隔设置为 20ms，那么在 20ms 内只会进行一次`touchmove`事件的回调函数。

那在高频触发的情况下，节流函数会出现一个问题：

**中间、末尾的回调丢失。**

如果`touchmove`实现的是拖动事件，那回调丢失会导致拖动的距离并不等于你手指划过的距离。

1. 如果拖动元素是根据开始时的位置（touchstart）改变
    - 只有末尾回调丢失会影响，这时可以在 end 事件中修正。当节流间隔过长时，拖动过程中元素会不流畅的闪烁移动。
2. 如果拖动元素是根据上一次的位置来改变
    - 那中间和末尾回调丢失都会影响拖动的距离。中间回调的丢失体现为拖动不灵敏。
    - 可以保存丢失的中间回调划过的距离，在下一次执行拖动时一起绘制。此时的情况同 1。

在这种情况下，要小心使用节流函数。

如果用`requestAnimationFrame`来实现节流函数，那么事件的执行顺序为：

`touchmove`（`requestAnimationFrame` 中执行） -> 重绘 -> `touchmove`（`requestAnimationFrame` 中执行）

这样可以保证每一次重绘前执行函数。

### 总结

js 的加载是否阻塞 dom 解析要依据 script 的属性

-   defer 和 async 脚步加载不会阻塞 dom 解析，即遇到 script 标签时不会去阻塞 dom 解析
-   defer 脚步下载完不会执行，需要等到 dom 解析完毕后，`DOMContentLoaded` 事件调用前执行  
    （ps[高程]：延迟脚本并不一定会按照顺序执行，也不一定会在 `DOMContentLoaded` 事件触发前执行，因此最好只包含一个延迟脚本）
-   async 脚步下载完毕后会在合适的时机执行，可能在 `DOMContentLoaded` 事件之前或之后执行，但一定在 onload 事件前执行
-   普通加载和执行会阻塞 dom 解析，且下载完毕后会立即执行

重绘是根据一个时钟周期定时进行的 —— 浏览器刷新频率（一般是 16.67ms），并不是在每次宏任务最后一定重绘，而是必须当前宏任务结束才能重绘，也就是重绘时可能已经进行了多次宏任务：

宏任务 -> 微任务 -> (`requestAnimationFrame` -> 重绘) -> 宏任务

在解析 dom 过程中，执行 js 会阻塞 dom 解析：

1. 除了主代码块的其他宏任务不会阻塞，例如一个 10s 的 `setTimeout` 函数并不会让浏览器在 10s 后才继续 dom 解析。
2. 当前微任务队列中的所有任务需要执行完毕后才会继续解析 dom。

## `DOMContentLoaded` 事件

`DOMContentLoaded`：当初始的 HTML 文档被完全加载和解析完成之后，`DOMContentLoaded` 事件被触发，而无需等待样式表、图像和子框架的完成加载。

对于没有 async 属性的 js 来说，`DOMContentLoaded` 事件触发可以用一句话概括，dom 解析完毕并且所有非异步（宏观）js 代码执行完毕后。

具体情况如下：

1. 当只有 css 时，不需要等待 css 加载完毕
2. 当只有 js 时，

    - 如果为 defer，那么会在 `DOMContentLoaded` 前触发
    - 如果为 async，那么可能在 `DOMContentLoaded` 前或 `DOMContentLoaded` 后触发（即使 async 在 dom 解析过程中下载完毕，也可能在 `DOMContentLoaded` 后触发）
    - 如果是普通 js，无论是外链或者内联 js，都需要等待 js 执行完毕后才触发 `DOMContentLoaded` 事件
    - 无论是何种 js，只要是宏任务异步代码，那么 `DOMContentLoaded` 都不需要等待它们的执行
    - 但如果是微任务异步代码，除了 async 的 js，其他都需要等待它们的执行才触发 `DOMContentLoaded`
    - 也就是说 async 的 js 和 `DOMContentLoaded` 事件完全没有关系

3. 当 css 和 js 都存在时，由于 css 在 js 前会阻塞 js 的执行，所以当 css 后面有 js 时，`DOMContentLoaded` 事件需要等待 css 下载和解析完毕

## 参考文献

1. [css 加载会造成阻塞吗](https://segmentfault.com/a/1190000018130499#articleHeader4)
2. [从浏览器多进程到 JS 单线程，JS 运行机制最全面的一次梳理](https://www.cnblogs.com/cangqinglang/p/8963557.html)
3. [浅谈 script 标签中的 async 和 defer](https://www.cnblogs.com/jiasm/p/7683930.html)
4. [原来 CSS 与 JS 是这样阻塞 DOM 解析和渲染的](https://blog.csdn.net/weixin_38055381/article/details/85242386)
5. [DOMContentLoaded 与 load 的区别、触发时机](https://www.jianshu.com/p/c3384c315d40)
6. [再谈 load 与 DOMContentLoaded](https://yq.aliyun.com/articles/609917)
