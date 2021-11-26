---
meta:
    - title: GPU加速到底是什么？
      time: 2021-04-27 15:08:41
      tag: 浏览器,渲染
---

# GPU 加速到底是什么？

## 前言

**`transform: translate3d()` 可以开启 GPU 硬件加速，提升动画性能。**但这背后的原理是什么？这里做一个简单的总结和说下自己的一些理解。涉及到的内容：

1. 浏览器渲染过程: `Style -> Layout -> Paint -> Composite`
2. 渲染层和合成层
3. 重绘、回流、合成

<!-- more -->

## 渲染

一般来说浏览器渲染更新流程如下：

1. 构建 `DOM` 树：浏览器将 `HTML` 解析成树形结构的 `DOM` 树，一般来说，这个过程发生在页面初次加载，或页面 `JavaScript` 修改了节点结构的时候。

2. 构建渲染树：浏览器将 `CSS` 解析成树形结构的 `CSSOM` 树，再和 `DOM` 树合并成渲染树。

3. 布局（`Layout`）：浏览器根据渲染树所体现的节点、各个节点的 `CSS` 定义以及它们的从属关系，计算出每个节点在屏幕中的位置。Web 页面中元素的布局是相对的，在页面元素位置、大小发生变化，往往会导致其他节点联动，需要重新计算布局，这时候的布局过程一般被称为回流（Reflow）。

4. 绘制（`Paint`）：遍历渲染树，调用渲染器的 paint() 方法在屏幕上绘制出节点内容，本质上是一个像素填充的过程。这个过程也出现于回流或一些不影响布局的 `CSS` 修改引起的屏幕局部重画，这时候它被称为重绘（`Repaint`）。实际上，绘制过程是在多个层上完成的，这些层我们称为渲染层（`RenderLayer`）。

5. 渲染层合成（`Composite`）：多个绘制后的渲染层按照恰当的重叠顺序进行合并，而后生成位图，最终通过显卡展示到屏幕上。

### 回流

对于回流来说，需要经过 `Style（样式计算） -> Layout（布局） -> Paint（绘制） -> Composite（合成）` 这样一个完整的过程：

![](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/GPU加速到底是什么/浏览器渲染1.jpg)

### 重绘

对于重绘来说，则省去了 `Layout（布局）` 的过程：

![](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/GPU加速到底是什么/浏览器渲染2.jpg)

### 合成

对于第三种渲染的情况，我们称为**合成**，省去了 `Layout（布局）` 和 `Paint（绘制）`的过程。

![](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/GPU加速到底是什么/浏览器渲染3.jpg)

显然这种情况是最快速的更新视图的方式，同时也是 `GPU 硬件加速` 的原理。

## 合成

那么什么是合成呢？

浏览器渲染是分层级渲染的，每一个层级都是一个图层，而 `GPU` 会将这些图层合并，最终输出到屏幕上显示，这就是**合成**。

### 渲染层（RenderLayer）

处于相同坐标空间（z 轴空间）的节点，都将归并到同一个渲染层中。例如：`postion: absolute; z-index: 5` 和 `postion: absolute; z-index: 10` 处于两个渲染层。

不同的渲染层之间一般互不影响。产生新渲染层的条件如下：

-   根元素 document
-   有明确的定位属性（relative、fixed、sticky、absolute）
-   opacity < 1
-   有 CSS fliter 属性
-   有 CSS mask 属性
-   有 CSS mix-blend-mode 属性且值不为 normal
-   有 CSS transform 属性且值不为 none
-   backface-visibility 属性为 hidden
-   有 CSS reflection 属性
-   有 CSS column-count 属性且值不为 auto 或者有 CSS column-width 属性且值不为 auto
-   当前有对于 opacity、transform、fliter、backdrop-filter 应用动画
-   overflow 不为 visible

可以看到 `BFC` 就是产生了一个新的渲染层，所以 BFC 容器和外界隔离了。

### 合成层（CompositingLayer）

合成层是另一个层级了。

满足某些特殊条件的渲染层，会被浏览器自动提升为合成层：

-   根元素 document
-   3D transforms：translate3d、translateZ 等
-   video、canvas、iframe 等元素
-   通过 Element.animate() 实现的 opacity 动画转换
-   position: fixed
-   具有 will-change 属性
-   对 opacity、transform、fliter、backdropfilter 应用了 animation 或者 transition

**其他渲染层会共用最近的合成层**。

每一个合成层它拥有一个图形上下文（`GraphicsContext`），`GraphicsContext` 会负责输出该层的位图。存储在共享内存中的位图将作为纹理上传到 `GPU` ，最后由 `GPU` 将多个位图进行合成，然后绘制到屏幕上，此时，我们的页面也就展现到了屏幕上。

所以浏览器图层的划分是根据合成层，而只有合成层能够输出位图给 `GPU` 显示。**`Composite` 过程是指 `GPU` 将多个合成层位图合并输出到屏幕上。**

### translate 和 translate3d

`translate3d` 会生成一个新的合成层，`translate` 只会生成一个新的渲染层。

当 `translate` 变化时，浏览器渲染会经过以下步骤：`Style（样式计算）-> Paint（绘制） -> Composite（合成）`。没有了布局过程，但还是会进行绘制，而绘制是根据合成层的，所以 `translate` 所在合成层所有的渲染层都会被重新绘制。

当 `translate3d` 变化时，浏览器渲染会经过以下步骤：`Style（样式计算）-> Composite（合成）`。没有了布局过程，也不会进行绘制，而是直接交给 `GPU` 合成。

这里其实会令人疑惑，`GPU` 处理的是合成层输出的位图，而这里连绘制都没有，就直接交给 `GPU` 了？

其实是因为：`GPU` 在纹理合成时对于每一层纹理都可以指定不同的合成参数，从而实现对纹理进行 `transform`、`mask`、`opacity` 等等操作之后再合成。

所以这里可以直接交给 `GPU` 处理，`GPU` 会直接对上一次的位图直接 `translate` 变换，而 `GPU` 本身就是专门处理图像的，自然也会更快速。

当然合成层内部的变化，还是会遵循 `Style（样式计算）-> Paint（绘制） -> Composite（合成）`，只不过范围被限定在这个合成层。

所以我们得到提升为合成层的两点好处：

1. 合成层的 `transform`、`opacity` 等变化可以直接交给 `GPU` 合成。
2. 同时合成层内部的变化时，只会重新绘制当前合成层，从而与 `doucument` 合成层分离，绘制得更少。

## 其他

浏览器渲染详细过程：

![](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/GPU加速到底是什么/浏览器渲染流水线.jpg)

可以发现主线程只是生成了一个绘制列表（相当于一个绘制蓝图），真的生成位图是在其他线程进行的，并不会阻塞主线程。

生成位图时，浏览器有两种方式：基于 `CPU` 和基于 `GPU`。

## 参考文献

1. [浏览器渲染详细过程：重绘、重排和 composite 只是冰山一角](https://juejin.cn/post/6844903476506394638)
1. [浏览器层合成与页面渲染优化](https://juejin.cn/post/6844903966573068301)
1. [(1.6w 字)浏览器灵魂之问，请问你能接得住几个？](https://juejin.cn/post/6844904021308735502)
1. [现代浏览器内部工作原理（附详细流程图）](https://juejin.cn/post/6844903782128566286)
1. [重排(回流)和重绘，以及 GPU 加速那点事](https://juejin.cn/post/6868906622774935565)
