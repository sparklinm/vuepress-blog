## 生命周期顺序

**加载渲染过程**

父 beforeCreate->父 created->父 beforeMount->子 beforeCreate->子 created->子 beforeMount->子 mounted->父 mounted

**子组件更新过程**

父 beforeUpdate->子 beforeUpdate->子 updated->父 updated

**销毁过程**

父 beforeDestroy->子 beforeDestroy->子 destroyed->父 destroyed

## 响应式原理

通过 Proxy 监听对象属性变化。

为每个属性创建一个订阅中心 dep，当属性变化时，执行对应的副作用 effect。

watch, computed, watcheffect 可创建一个副作用，当对应属性变化时，执行回调。

视图更新函数（创建虚拟 dom）也是一个 effect，所以有状态变化时，视图能更新。

### effect 何时被加入到 dep 中

存在一个全局变量 targetMap ，当深度遍历对象（因为存在子对象，所以要深度遍历），用 Proxy 生成代理时，每个对象及其属性的 dep 被放入其中，如果是深度对象，那子对象会以和父对象平级的方式放入到 targetMap 中。

在触发 effect 时，将 effect 赋值到全局变量 activeEffect ，然后触发回调访问对象属性，通过对象和 key 找到对应 dep，从而将 activeEffect 放入对应属性的 dep。

和 vue2 不同，vue2 并没有全局 targetMap，触发 watcher 时，将 watcher 放入 Dep.tartget，然后通过闭包的方式在对象访问时获取到 dep，将 watcher 放入到对应属性的 dep 中。

### computed 和 watch 区别

属性变化时，computed 回调不会执行，而是在对应 effect 上添加一个标记 dirty 表示变化。
当下次访问 computed 属性时，判断该标记，有变化则重新执行回调，否则返回缓存的值。

### effect 执行时机

有三种 effect ：

1. watch 和 watchEffect，watchEffect 创建时会立即执行，watch 不会
2. computed
3. 视图更新

vue 中存在三个队列：pre 视图更新前，视图更新时，视图更新后 post

watch 和 watchEffect 回调会被推入 pre 队列。执行 pre 队列直到为空。

视图更新（创建虚拟 dom）放入更新时的队列。

nextTick 会被推入 post 队列。

而 computed 呢，没有队列，完全取决于这个数据何时被访问，就执行。

## 虚拟 DOM 的优缺点

优点：

1. 保证性能下限： 框架的虚拟 DOM 需要适配任何上层 API 可能产生的操作，它的一些 DOM 操作的实现必须是普适的，所以它的性能并不是最优的；但是比起粗暴的 DOM 操作性能要好很多，因此框架的虚拟 DOM 至少可以保证在你不需要手动优化的情况下，依然可以提供还不错的性能，即保证性能的下限；
2. 无需手动操作 DOM： 我们不再需要手动去操作 DOM，只需要写好 View-Model 的代码逻辑，框架会根据虚拟 DOM 和 数据双向绑定，帮我们以可预期的方式更新视图，极大提高我们的开发效率；
3. 跨平台： 虚拟 DOM 本质上是 JavaScript 对象,而 DOM 与平台强相关，相比之下虚拟 DOM 可以进行更方便地跨平台操作，例如服务器渲染、weex 开发等等。

缺点：

1. 无法进行极致优化： 虽然虚拟 DOM + 合理的优化，足以应对绝大部分应用的性能需求，但在一些性能要求极高的应用中虚拟 DOM 无法进行针对性的极致优化。比如 VScode 采用直接手动操作 DOM 的方式进行极端的性能优化

为什么操作 DOM 会影响 WEB 应用的性能？

DOM 是一个独立于语言的、用于操作 XML 和 HTML 文档的程序接口(API)。在浏览器中主要用于与 HTML 文档打交道，并且使用 DOM API 用来访问文档中的数据。
DOM 是个与 ES 语言无关的 API，它在浏览器中的接口却是用 JavaScript 来实现的，DOM 就成了现在 JS 编码中的重要部分。

[为什么操作 DOM 会影响网页性能？](https://www.cnblogs.com/padding1015/p/11405788.html)

正因为浏览器中通常把 DOM 和 ECMAScript 独立实现。使得二者相互独立，就像两座孤岛。所以每次链接、每次访问 DOM 都会消耗性能！！ 可以说操作 dom 是十分昂贵的！！

而虚拟 dom 就是用来模拟 dom 的一种数据结构，通过 diff 算法，找到两次虚拟 dom 之间的更改，然后统一修改 dom，可以最小化操作 dom。这也是为什么使用虚拟 dom 能提升性能。

但虚拟 dom 无法获得最优性能，首先是要创建虚拟 dom，然后去执行 diff 算法，最后去执行 dom 更改。例如你修改一个按钮的颜色，用虚拟 dom 和直接操作 dom 修改，怎么想都是直接操作效率更高。

所以，如果设计好的直接 dom 操作才是性能的最优解。

[别再说虚拟 DOM 快了，要被打脸的](https://www.jianshu.com/p/4bc2d4eb11af)

[vue 的双向绑定原理及实现](https://www.cnblogs.com/dillonmei/p/12570634.html)

[vue2.0 的 diff 算法详解](https://www.jianshu.com/p/92a7496af50c)

## diff 算法

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e3c68d1b0884d9ca0f8ffc5ee64a28e~tplv-k3u1fbpfcp-watermark.awebp)

只比较同级节点：

1. 无 tag，文本节点内容比较
2. tag 不一致，直接替换新节点
3. tag 一致：

    1. 对比属性，替换新属性
    2. 对比子元素

        1. 对新旧 children 都分别采用双指针标记头和尾，开始比较子节点 key 和 tag
        2. 头头比较，尾尾比较，头尾比较，尾头比较，如果满足任一一种情况相等，就代表两个子节点相同，按上述开始步骤递归 diff 两个子节点。diff 子节点完毕后（递归回溯到当前节点），对应头指针 index 加 1，尾指针减 1 ，继续下一个子节点比较
        3. 乱序，不满足上述情况。旧 children 根据 key 生成 map（为了达到 O(1) 查询复杂度），用 map 去寻找和新节点对应的旧节点

            1. 找到后将 "新节点对应的旧节点" 插入到 "旧头指针节点" （这个节点不会变）前，递归 diff 两个子节点
            2. 没找到，直接将新节点插入到 "旧头指针节点" 前
            3. 新 children 头指针移动

            ![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c790b59c7c6f4708912be3598c42811f~tplv-k3u1fbpfcp-watermark.awebp)

**简洁点总结：**

1. 根据 tag 和 key 比较节点是否相同，不相同直接替换，相同则更新属性。
2. 然后比较子节点 tag 和 key。由于子节点可能是一个数组，如果直接按索引顺序比较，那在处理易变换的列表时，将难以高效对比到只是位置变换的同一节点。所以子节点的对比作了一些优化，采用双指针：
    1. 首先头头比较、or 尾尾比较，or 头尾比较，or 尾头比较，如果是相同节点，则更新属性，孙子节点的比较；
    2. 如果没有找到相同节点，则根据 key 去找旧子节点，按新 children 位置关系移动旧子节点（移动方式：将 "新节点对应的旧节点" 插入到 "旧头指针节点" 前）。每次根据 key 找到了旧子节点，都需要更新属性，并进行孙子节点的比较。同时完毕后 新 children 头指针移动。
    3. 最后，当就 children 或者新 children 遍历完毕后，删除多余旧节点或者补充多余新节点。

[手写 Vue2.0 源码（六）-diff 算法原理](https://juejin.cn/post/6953433215218483236#heading-4)

## Vue 中 key 值的作用

key 的特殊 attribute 主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。

**更准确**：因为带 key 就不是就地复用了，而是根据 key 去找对应节点进行 diff。

**更快速**：利用 key 的唯一性生成 map 对象来获取对应节点，比遍历方式更快

用于列表渲染和多元素过渡。

https://cloud.tencent.com/developer/article/1618239
https://www.jianshu.com/p/0044532e4a93

## keep-alive 使用场景和原理

keep-alive 是 Vue 内置的一个组件，可以实现组件缓存，当组件切换时不会对当前组件进行卸载。

原理：换成 vNode

应用：动态组件，路由

使用算法：LRU，如果数据最近被访问过，那么将来被访问的几率也更高。每次访问，将数据加入或移动到队列末尾，这样队列头部就是最久未使用的数据，可直接删除。

## 自定义指令

指令本质上是装饰器，是 vue 对 HTML 元素的扩展，给 HTML 元素增加自定义功能。vue 编译 DOM 时，会找到指令对象，执行指令的相关方法。

一般有以下时机：元素挂载时，在包含组件的 VNode 及其子组件的 VNode 更新后调用，卸载绑定元素的父组件时等

可以访问到 dom，虚拟 dom，指令参数等

原理：

1. 在生成 ast 语法树时，解析指令生成指令代码
2. vNode diff 时执行指令对应钩子函数时

## 模板编译原理

1. 将模版字符串转换成 element ASTs(解析器)
2. 对 AST 进行静态节点标记，主要用来做虚拟 DOM 的渲染优化(优化器)
3. 使用 element ASTs 生成 render 函数代码字符串(代码生成器)

https://juejin.im/post/6844903576343412743#heading-0

## hash 和 history

hash 模式： **在浏览器中符号“#”，#以及#后面的字符称之为 hash**，用 window.location.hash 读取；

特点：**hash 虽然在 URL 中，但不被包括在 HTTP 请求中**；用来指导浏览器动作，对服务端安全无用，**hash 不会重加载页面**。

hash 模式下，仅 hash 符号之前的内容会被包含在请求中，如 http://www.xxx.com，因此对于后端来说，即使没有做到对路由的全覆盖，也不会返回 404 错误。

history 模式： history 采用 HTML5 的新特性；且提供了两个新方法：pushState（），replaceState（）可以对浏览器历史记录栈进行修改，以及 popState 事件的监听到状态变更。

history 模式下，前端的 URL 必须和实际向后端发起请求的 URL 一致，如 http://www.xxx.com/items/id。后端如果缺少对 /items/id 的路由处理，将返回 404 错误。Vue-Router 官网里如此描述：“不过这种模式要玩好，还需要后台配置支持……所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。”

## 其他

### hook

```js
mounted: function () {
  var picker = new Pikaday({
    field: this.$refs.input,
    format: 'YYYY-MM-DD'
  })

  // beforeDestroy 周期触发时，触发
  this.$once('hook:beforeDestroy', function () {
    picker.destroy()
  })
}
```

```js
//  Parent.vue
<Child @hook:mounted="doSomething" ></Child>

doSomething() {
   console.log('父组件监听到 mounted 钩子函数 ...');
}

//  Child.vue
mounted(){
   console.log('子组件触发 mounted 钩子函数 ...');
},

// 以上输出顺序为：
// 子组件触发 mounted 钩子函数 ...
// 父组件监听到 mounted 钩子函数 ...
```

## 参考

1. [最全的 Vue 面试题+详解答案](https://juejin.cn/post/6961222829979697165)
