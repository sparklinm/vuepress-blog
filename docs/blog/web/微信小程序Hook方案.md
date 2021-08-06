---
meta:
    - title: 微信小程序Hook方案
      time: 2021-07-27 14:22:41
      tag: 微信小程序,hook
---

# 微信小程序 Hook 方案

## 前言

微信小程序到现在为止并不支持 `hook` 或是组合 `API` ，虽然可以借助一些框架用 `react` 或 `vue` 实现函数式编程，但并不是每一个小程序开发都会选择这些框架。

基于小程序现有的特性，不做任何编译时的注入，其实可以实现一套模仿 `react hook` 的方案。

<!-- more -->

## React Hook

先简单了解下 `react hook` 的工作原理，这是一个组件 `A`：

```jsx
// 组件A
import React, { useEffect, useState, useRef, useMemo } from 'react';
function A() {
    const [number, setNumber] = useState(0);
    const DivDemo = useMemo(() => <div> hello , i am useMemo </div>, []);
    const curRef = useRef(null);
    useEffect(() => {
        console.log(curRef.current);
    }, []);
    return (
        <div ref={curRef}>
            hello,world {number}
            {DivDemo}
            <button onClick={() => setNumber(number + 1)}>number++</button>
        </div>
    );
}
```

当第一次调用 `hook` 时会产生如下 `hook` 对象：

1. `memoizedState`： `useState` 中 保存 `state` 信息，`useEffect` 中 保存着 `effect` 对象， `useMemo` 中 保存的是缓存的值和 `deps`，`useRef` 中保存的是 `ref` 对象。
2. `baseQueue` : `usestate` 和 `useReducer` 中 保存最新的更新队列。
3. `baseState` ： `usestate` 和 `useReducer` 中，一次更新中 ，产生的最新 `state` 值。
4. `queue` ： 保存待更新队列 `pendingQueue` ，更新函数 `dispatch` 等信息。
5. `next`: 指向下一个 `hooks` 对象。

当再一次调用 `hook` 时，需要去找到对应的 `hook` 对象。`react` 根据函数的执行顺序去将这些 `hook` 对象用链表串联起来。这也是为什么 `hook` 不能条件语句中声明。

### useState

```js
const [number, setNumber] = useState(0);
```

`useState`：返回一个 `state`，以及更新 `state` 的函数，这里称这个函数为 `setState`。

组件初始化时， `A` 函数执行并渲染，当状态改变（`setNumber`）时， `A` 函数会再次执行并渲染。

`setState` 并不会直接改变 `memoizedState` 值，而是将 **更新信息** 放入到 `queue` 中。

例如：`setNumber(10)`，会得到如下 **更新信息**：

```js
update = {
    action: 10,
    eagerState: null,
    // 指向下一个 update
    next: null
    // 省略其他字段
};
```

多个 `update` 对象之间组成一个循环链表。

接下来 `react` 借助 `reducer` 来更新 `state`。

对于 `useState` 来说，会有一个基础 `reducer`：

```js
function basicStateReducer(state, action) {
    return typeof action === 'function' ? action(state) : action;
}
```

根据 `update` 信息来获取新的 `state` 值，如果相等就不渲染：

```js
// currentState，上一次 state 的值，等于 memoizedState
const eagerState = basicStateReducer(currentState, update.action);
// 存储新状态，在后续渲染时就直接取这个值，而不用再次调用 basicStateReducer 来获取
update.eagerState = eagerState;

// 相等
if (Object.is(eagerState, currentState)) {
    return;
}

// 渲染...
```

每一次 `setState` 都会立即渲染，但在 `dom` 事件和其他 `hooks` 中，多个 `setState` 只会渲染一次。

`react` 的渲染总是从组件树的根节点开始，采用深度遍历的方式，也就是说即使只改变 `A` 组件状态，`react` 也会从根节点遍历查找需要更新的节点，并放入链表，最后遍历链表更新所有节点。

在渲染过程中，深度遍历到组件 `A` 时，执行函数 `A`，当再次调用 `useState` 时，**遍历 `update` 链表来更新 `memoizedState` 和 `baseState`**。

为什么要遍历 `update` 链表来更新，因为当连续多次 `setState` 时，一旦发生状态变化，后续的 `setState` 就不会再去调用 `basicStateReducer` 来对比新旧状态。

```js
// 第1次
setNumber((pre) => pre + 1);
// 第2次
setNumber((pre) => pre + 1);
// 第3次
setNumber((pre) => pre + 1);
```

1. 第 `1` 次 `setNumber` ，调用 `basicStateReducer` 获取最新的值，发生变化，标记组件进入 **渲染状态**，此时不一定会立刻渲染（在 `dom` 事件和其他 `hooks` 中不会立即渲染）
2. 后续的 `setNumber`，因为第一次已经标记组件进入 **渲染状态**，便不会再调用 `basicStateReducer` 对比状态变化，只是单纯存储 `update` 信息
3. 当渲染时，再次调用 `useState`，会遍历 `update` 链表，调用 `basicStateReducer` 来更新状态。

对于 `useReducer` ，其实就是自定义了一个 `reducer` 函数：

```jsx
function customReducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        default:
            throw new Error();
    }
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, { count: 0 });
    return (
        <>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
        </>
    );
}
```

使用 `customReducer` 来获取新的 `state` 值。

### useEffect, useMemo, useRef

`useEffect` 传入的回调函数会在视图更新后执行，执行顺序是：**子节点 `effect` -> 父节点 `effect`**。

`useEffect` 会异步执行（视图更新后），而 `useMemo` 是同步执行的，只要依赖 `deps` 变化就会立刻执行传入的回调函数。

`useRef` 只是返回一个对象，可以在 `.current` 属性上保存值，每次执行 `useRef` 时单纯返回这个对象。

这里只是简单描述了 `react hook` 的原理，真实情况比这里复杂很多，可以查看源码和[「react 进阶」一文吃透 react-hooks 原理](https://juejin.cn/post/6944863057000529933)了解更多。

## 小程序 Hook

在这里，首先要明确小程序 `hook` 要做到什么程度：只做运行时处理，不做任何编译上的注入。

小程序组件和页面构建都可以用 `Component` 构造器，那 `hook` 就应该建立在 `Component` 构造器上。

定义一个 **渲染函数**：

```js
// 渲染函数
// properties 参数会传递过来
function render({ num }) {
    let [count, setCount] = useState(0);

    useEffect(() => {
        console.log('counter changed');

        return () => {
            console.log('counter clean up');
        };
    }, [count]);

    return {
        data: {
            count,
            num
        },
        methods: {
            bindtap: ({
                currentTarget: {
                    dataset: { value }
                }
            }) => {
                setCount(count + +value);
            }
        }
    };
}

// 实例化组件
defineComponent(render, {
    options: {
        addGlobalClass: true
    },
    properties: {
        num: Number
    }
});
```

`defineComponent` 接管了组件的实例化，内部调用了 `Component` 。

这个渲染函数第一次该在什么地方执行？

在函数式组件中，父组件传递给子组件的 `properties` 会被子组件的 **渲染函数** 当作参数接收：

```js
// 父组件 properties 参数会传递过来
function renderChild({ num }) {}
```

为了让 **渲染函数** 第一次调用时能就收到父组件的传递过来的 `properties`，所以只能在组件的生命周期函数第一次调用。

**渲染函数** 和 `hooks` 链表直接存储在实例上。

每一次 `setState` 状态改变，直接调用存储在实例上的 **渲染函数**，获取到最新 `data` 和原 `data` 进行比较，增量更新。

子组件通过 `observers` 观察父组件传递过来的 `properties` 变化，执行自己的 **渲染函数**。

这是大概的思路。

### 第一次执行渲染函数

要想子组件 **渲染函数** 调用时能就收到父自己传递过来的 `properties` ，那父子组件 **渲染函数** 调用的先后顺序一定是：**父渲染函数 -> 子渲染函数**

组件的生命周期执行顺序如下：

```
子组件 created-> 父组件 created-> 父组件 attached-> 子组件 attached-> 父组件（用 Component 构建的页面）onLoad-> 父组件的 onShow
```

所以只能在 `attached` 中第一次执行 **渲染函数**。

那能否先收集父子组件的渲染函数，再由我们按 **父->子** 的顺序去主动调用这些渲染渲染，而不依赖于 `attached` 生命周期？

答案是不能的，如果是 `hook` 组件和原生组件嵌套，当原生组件在 `attached` 中 `setData` 时，那 `hook` 子组件在执行渲染函数时获取不到更新后的 `properties`。

### observers 的问题

`observers` 的第一次触发时间是在 `attached` 之前，当观察的是 `properties` 时，那第一次传递过来的值是父组件 `data` 中直接定义的数据，没有定义，则会传递空值过来。

所以需要跳过这里由 `observers` 触发的渲染，即第一次 **渲染函数** 一定是在 `attached` 函数中执行。

### 如何更新

同 `react` 一样，构建一棵组件树，每次从根节点深度遍历更新。

在 `created` 中收集实例，在 `attached` 中根据收集的实例，使用 `selectOwnerComponent` 得到实例之间的父子关系来构建一棵组件树。其中如果 `selectOwnerComponent` 得到的节点不是 `hook` 节点，就用空节点填充。

当 `setState` 时，为组件实例添加一个 **标记** 来表示组件需要渲染，实现一个调度器去决定何时去渲染。

在渲染过程中，会调用 **渲染函数**，得到 `data` ，再调用 `setData` , `setData` 可能会触发子组件的 `observers`，当观察到 `properties` 变化时，子组件组件实例也会添加 **标记** 表示子组件需要渲染。

能否不构建组件树和不每次从根节点深度遍历跟新？

其实 `setState` 时，能确切的知道哪些节点需要更新。但如果直接更新这些节点会出现一个问题： 当 `setState` 改变其他组件状态时，那组件的渲染顺序将不可靠。这时渲染顺序完全依赖于 `setState` 的顺序：

```js
// 组件B
setName('名字1');
// 当前组件
setDate('日期2');
```

这时候会先去更新组件 `B` 和其子树，再更新当前组件和其子树。

### effect 执行时机

`react` 中 `effect` 执行时机是 `dom` 渲染后，但小程序是双线程，只能从 `setData` 的回调中知道视图更新完毕，`setData` 的回调是异步并且延迟时间不确定，如果在回调中执行 `effect`，那可能会等待很长时间。

所以在小程序中，`effect` 的执行时间可以在一轮更新所有 `setData` 执行完之后。

同时需要提供一个 `API`，去监听视图更新完毕：

```js
onRendered(() => {
    console.log('视图更新完毕');
});
```

### 生命周期 hook

针对小程序的一些生命周期，还需提供额外的 `hook` ，例如：

```js
// onLoad 生命周期触发时执行回调
useLoad((options) => {});
// onShow 生命周期触发时执行回调
useShow((options) => {});
```

每次执行这类 `hook` 时，将回调函数存储起来，当对应生命周期触发时，执行这些回调函数。

存储结构如下：

```js
// 页面选项
const pageOptions = {
    // 存储 useLoad 传入的回调函数
    onLoad: [],
    // 存储 usePullDownRefresh 传入的回调函数
    onPullDownRefresh: [],
    onReachBottom: [],
    onShareAppMessage: [],
    onShareTimeline: [],
    onAddToFavorites: [],
    onPageScroll: [],
    onTabItemTap: []
};

// 组件页面都有的选项
const bothOptions = {
    show: [],
    hide: [],
    resize: []
};

// 组件选项
const componentOptions = {
    moved: []
};
```

对于 **页面选项** ，可以在第一次 **渲染函数** 执行时，收集对应回调函数，当有对应回调函数时，动态在实例上添加对应选项：

```js
function render({ num }) {
    usePullDownRefresh(() => {
        console.log('滚动');
    });
    return {
        data: {},
        methods: {}
    };
}

// 下面是 defineComponent 所做的事情

const pageOptions = {
    // 存储 useLoad 传入的回调函数
    onLoad: [],
    // 存储 usePullDownRefresh 传入的回调函数
    onPullDownRefresh: [],
    onReachBottom: [],
    onShareAppMessage: [],
    onShareTimeline: [],
    onAddToFavorites: [],
    onPageScroll: [],
    onTabItemTap: []
};

function usePullDownRefresh(fn) {
    // 存储 fn
    pageOptions.onPullDownRefresh.push(fn);
}

Component({
    attached() {
        // 执行render
        let { data, methods } = render();
        // 如果 usePullDownRefresh 添加了回调函数
        if (pageOptions.onPullDownRefresh.length) {
            const originFn = this.onPullDownRefresh;
            // 实例上动态添加 onPullDownRefresh 函数
            this.onPullDownRefresh = function (params) {
                originFn && originFn.call(this, params);
                pageOptions.onPullDownRefresh.forEach((cb) => {
                    cb();
                });
            };
        }
    }
});
```

> 对于 `onPullDownRefresh` 或 `onShareAppMessage` 等选项，即使为空函数也会影响页面的功能。所以只有在确定调用了
> `usePullDownRefresh` 或 `useShareAppMessage` 后，才能在实例上添加对应函数。

对于 **组件和页面都有的选项** 和 **组件选项** ，只能在组件实例化之前添加，但这些选项即使为空函数也不会影响组件功能：

```js
// config 是 Component 构造器的参数
// 注册前添加 show 选项，直接添加
config.pageLifetimes.show = (params) => {
    const originFn = config.pageLifetimes.show || config.onShow;
    originFn && originFn.call(this, params);
    bothOptions.show.forEach((cb) => {
        cb();
    });
};

Component(config);
```

> **组件和页面都有的选项** 应该放在 `pageLifetimes` 字段下，**组件选项** 应该放在 `lifetimes` 下。

对于 `relations` 要单独处理：

```js
useRelations({
    './custom-li': {
        type: 'child',
        linked: function (target) {},
        linkChanged: function (target) {},
        unlinked: function (target) {}
    }
});

// 每次执行 useRelations 时，将 relations 信息存储
let relationCbs = {
    './custom-li': {
        type: 'child',
        // 存储关联节点的 linked 函数
        linked: [],
        linkChanged: [],
        unlinked: []
    }
};
```

向 `defineComponent` 手动传入 `relations` 信息：

```js
// defineComponent 传入 relations
defineComponent(render, {
    relations: [['./custom-li', 'child']]
});
```

`defineComponent` 注册组件时，添加对应 `relations` 选项：

```js
// 根据 ['./custom-li', 'child'] 将 relationCbs 中对应关联节点存储的回调函数取出来
let linkedCbs = getRelationCbs(relationCbs, ['./custom-li', 'child']);

Component({
    relations: {
        './custom-li': {
            type: 'child',
            linked: function (target) {
                /``/ 触发 linkedCbs 中的函数
                linkedCbs.forEach((cb) => cb());
            },
            linkChanged: function (target) {},
            unlinked: function (target) {}
        }
    }
});
```

### 优化

小程序会存在多个页面实例，对于显示的页面，其更新应该更有优先级。

同一个 `tick` 中的状态改变只会渲染一次。

用页面的 `groupSetData` 包裹整个深度遍历更新流程，这样即使更新时多次 `setData` ，也只会渲染一次。

### setData 数据

**渲染函数** 每次返回组件的 `data`，与旧 `data` 进行浅对比（只对比第一层属性），当发生改变时，`setData` 改变的属性。

这意味着如果 `state` 是一个数组或者对象，每次这个 `state` 改变时，是 `setData` 整个数组或对象。

```js
defineComponent(({ num }) => {
    let [array, setArray] = useState(new Array(10).fill(Math.random()));

    useEffect(() => {
        let newArray = [...array];
        newArray[5] = 'xxx';
        setArray(newArray);
        // 最后 setData 整个数组: setData({array: newArray})
    }, []);

    return {
        data: {
            array
        }
    };
});
```

**为什么不先深度遍历对象找出差异，然后做增量更新？**

在正常数据量下，深度 `diff` 对象找出差异再 `setData` 相比于直接 `setData` 整个对象没有任何性能上的优势，如果 `diff` 到变更的数据很多，反而性能还会下降。

只有一种情况下深度 `diff` 再增量 `setData` 有明显性能优势，那就是数据量非常大（几千 `kb`）且 `diif` 出来的数据变化比较少。这种情景如果有需要以后再做优化。

### 跳过子组件更新

当父组件传递给子组件的 `props` 发生变化，子组件就会重新执行 **渲染函数**。但这里的 `props` 实现是使用了原生小程序的 `properties`，当父组件传递过来的数据变化时，其实会直接使子组件对应 `data` 中的数据变化。如果 **渲染函数** 并不依赖于 `props` 做一些操作，这时 **渲染函数** 可以不必执行。

```js
defineComponent(
    ({ num }) => {
        let [array, setArray] = useState(new Array(10).fill(Math.random()));

        useEffect(() => {
            let newArray = [...array];
            newArray[5] = 'xxx';
            setArray(newArray);
            // 最后 setData 整个数组: setData({array: newArray})
        }, []);

        return {
            data: {
                array
            }
        };
    },
    {
        properties: {
            num: {
                type: Number,
                value: 0,
                // num 发生变化，渲染函数不会重新执行
                effect: false
            }
        }
    }
);
```

可以向 `property` 传递一个 `effect: false` 属性，表示该 `property` 的变化不会引起 **渲染函数** 的执行。

### fiber

`react` 组件树是由 `fiber` 节点构成，在 `react` 中更新分为两步：

1. 基于 `fiber` 节点的深度遍历，收集所有需要变更的节点
2. 渲染这些变更

第 `1` 步可以中断，而第 `2` 步不能中断。也就是一旦开始渲染视图，那就不能中断。

而小程序 `hook` 的更新视图是依赖于 `setData` 来触发子组件的 `observers` ，所以可以理解为一边渲染视图（父组件），一边得到子组件的是否变更，和 `react` 先收集和渲染不同，所以 `fiber` 应该不能在小程序中使用。

## 参考文献

1. [「react 进阶」一文吃透 react-hooks 原理](https://juejin.cn/post/6944863057000529933)
1. [Fiber 设计思想](https://juejin.cn/post/6943896410987659277)
1. [这可能是最通俗的 React Fiber(时间分片) 打开方式](https://juejin.cn/post/6844903975112671239)
