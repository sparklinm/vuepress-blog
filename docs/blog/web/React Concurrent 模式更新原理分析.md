---
meta:
    - title: React Concurrent 模式更新原理分析
      time: 2021-08-29 14:45:88
      tag: react
---

# React Concurrent 模式更新原理分析

## 前言

`React18` 即将发布 `Concurrent` 模式， `Concurrent` 译为 “并发”。 `Concurrent` 模式是一组特性集合，可以让用户界面在频繁复杂的更新时，总是保持响应，旨在提升用户体验。

接下来将会简单分析这一模式在 **更新视图** 时的原理。

<!-- more -->

## Fiber

![](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/react%20%E7%9A%84%20concurrent%20%E6%A8%A1%E5%BC%8F%E6%9B%B4%E6%96%B0%E5%8E%9F%E7%90%86/current%E6%A0%91%E5%92%8CworkInProgress%E6%A0%91_%E8%8A%82%E7%82%B9%E7%B4%A2%E5%BC%95.png)

在 `react` 引入 `Fiber` 架构之前， `react` 会采用递归深度遍历的方式来对比虚拟 `DOM` 树，找出需要变动的节点，然后更新它们。

因为递归的原因，这一过程很难中断，一旦开始，浏览器就必须等到所有节点更新完毕才能对用户操作作出响应。

`fiber` 是一种数据结构，其中每一个节点都包含以下属性：

1. `child` ，指向第一个子节点。
2. `sibling` ，指向下一个兄弟节点。
3. `return` ，指向父节点。

遍历顺序是：**优先子节点 -> 其次兄弟节点 -> 最后父节点**

**当处理完一个节点，返回下一个需要处理的节点**。这样虽然是深度遍历，但并非采用递归的方式，而是使用循环：

```js
let nextFiber = fiberRoot;
// 随时可以中断循环来中断遍历
while (nextFiber) {
    // 处理 fiber，并返回下一个 fiber
    nextFiber = performUnitOfWork(nextFiber);
}
```

在 `react` 中，一个 `fiber` 节点会被处理 **两次**，第一次遍历到该节点时处理 `1` 次，第二次 `return` 该节点时处理 `1` 次，这两次所做的事情不一样。对于叶子节点来说，没有子节点 `return` ，所以会直接处理 `2` 次。就上面的图而言，遍历循序为：

```js
div1 beigin
p1 beigin
span1 beigin
span1 complete
span2 beigin
span2 complete
p1 complete
p2 beigin
span3 beigin
span3 complete
span4 beigin
span4 complete
p2 complete
div1 complete
```

`fiber` 节点和虚拟 `dom` 节点一一对应，一个虚拟 `dom` 节点会生成一个 `fiber` 节点。

## Lane 模型

`lane`（车道）模型用一个 `31` 位二进制数表示优先级区间，其中每一位表示一个优先级：

```js
SyncLane =
    /**/
    0b0000000000000000000000000000001;

InputDiscreteHydrationLane =
    /**/
    0b0000000000000000000000000000100;
```

越靠近右边，优先级越高。在这里 `SyncLane` 优先级高于 `InputDiscreteHydrationLane`。

有多个位值为 `1` 时被称为 `lanes`：

```js
InputDiscreteLanes =
    /**/
    0b0000000000000000000000000011000;
```

举个例子，这里有 `2` 个任务 `taskA` 和 `taksB`，它们分别对应的 `lane` 如下 ：

```js
laneA = 0b0000000000000000000000000000001;
laneB = 0b0000000000000000000000000000010;
```

那么这两个任务就有着不同优先级，其中 `taskA` 优先级大于 `taskB`。

因为 `lane` 是一个二进制数，所以位运算被广泛用于 `lane` 之间，这里来表示 `laneA` 和 `lanB` 的合集：

```js
lanesAB = laneA | laneB;

// 0b0000000000000000000000000000011
```

`lanesAB` 表示这个 `lanes` 上面存在两个不同优先级的任务。

<!-- todo -->
<!-- 车道被占据后，后面的任务自动下移至下一个车道？ -->

## 状态改变

当调用 `setState` 时会产生一个更新 `update` 对象。

![](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/react%20%E7%9A%84%20concurrent%20%E6%A8%A1%E5%BC%8F%E6%9B%B4%E6%96%B0%E5%8E%9F%E7%90%86/updateQueue%20%E9%93%BE%E8%A1%A8.png)

`update` 会携带 `lane` 和 `currentTime`：

1. `lane` 表示 `update` 的优先级，根据 `setState` 所处的语境不同， `update` 的 `lane` 也会不同，比如 `dom` 事件中调用 `setState` 产生的 `update` 有更高的优先级。
2. `eventTime` 表示更新产生的时间。

多个 `update` 之间会组成循环链表 `updateQueue` ，挂载到组件对应的 `fiber` 节点上。

![](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/react%20%E7%9A%84%20concurrent%20%E6%A8%A1%E5%BC%8F%E6%9B%B4%E6%96%B0%E5%8E%9F%E7%90%86/fiber%E8%8A%82%E7%82%B9_update_props.png)

同时， `fiber` 上的 `lanes` 属性会保存所有 `update.lane`。

`fiber.lanes` 的意义如下：

1. `fiber` 上是否存在更新
2. `fiber` 上有哪些优先级的更新

接下来，会沿着当前 `fiber` 节点向上遍历，直到组件树的根节点，这个根节点被称作 `fiberRoot` ，`fiberRoot` 是更新的起点， **`react` 中无论任何时候的更新，都是从 `fiberRoot` 开始**。

在向上遍历的过程中，会将子节点的 `fiber.lanes` 收集到父节点的 `fiber.childLanes` 属性上。

`fiber.childLanes` 的意义如下：

1. 子树上是否有更新
2. 子树上有哪些优先级的更新

最后，将 `update.lane` 放进 `fiberRoot.pendingLanes` 中。

`pendingLanes` 代表整棵树待更新对象的优先级集合， 更新时，从 `pendingLanes` 中找出优先级最高的 `renderLanes` （可能是多个 `lane` ），接着从 `fiberRoot` 开始深度遍历，当遇到到组件 `fiber` 节点时，从 `fiber.updateQueue` 中找出优先级大于等于 `renderLanes` 的更新，计算得到最新的状态。

## 调度

在 `react` 中调度分为两个部分，一是 `react` 的调度，二是 `Scheduler` 调度器的调度：

1. `react` 调度是决定哪些更新任务进入 `Scheduler`
2. `Scheduler` 调度决定这些任务何时去执行。

### react 调度

`react` 更新是从根节点 `fiberRoot` 开始， `fiberRoot` 上存有多个 `lanes` ，例如： `pendingLanes`, `expiredLanes`, `suspendedLanes`, `pingedLanes` 。

![](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/react%20%E7%9A%84%20concurrent%20%E6%A8%A1%E5%BC%8F%E6%9B%B4%E6%96%B0%E5%8E%9F%E7%90%86/fiberRoot_pendingLanes.png)

其中一般的更新只与 `pendingLanes` 和 `expiredLanes` 有关。

`pendingLanes` 在上面有说，是所有组件 `update.lane` 的集合，代表待更新的 `lanes` ；而 `expiredLanes` 表示已经过期的 `lanes` ， `expiredLanes` 有着最高优先级，**当有过期的更新任务时，会立即同步执行更新，不会被打断**。

在上面的状态更新产生 `update` 对象后，会立刻进入 `react` 调度。

![](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/react%20%E7%9A%84%20concurrent%20%E6%A8%A1%E5%BC%8F%E6%9B%B4%E6%96%B0%E5%8E%9F%E7%90%86/react%E8%B0%83%E5%BA%A6.png)

**第一步**，遍历 `pendingLanes`，计算 `pendingLanes` 中有哪些 `lanes` 已经过期：

1. 如果 `lane` 的过期时间 `expirationTime` 不存在，根据 `update.eventTime`(更新产生的时间) 去计算过期时间（类似于 `expirationTime = eventTime + 500`），并存储到 `fiberRoot.expirationTimes` 字段上。
2. 如果 `lane` 的过期时间 `expirationTime` 存在，当 `expirationTime` 小于等于 `eventTime ` 时，该 `lane` 过期，放入到 `expiredLanes` 中。

**第二步**，从 `expiredLanes`(优先获取) 和 `pendingLanes` 中获取优先级最高的 `renderLanes`，作为接下来更新的依据，并将 **更新入口函数** 推给 `Scheduler` 调度。

每次生成 `renderLanes` 时，会同时生成一个与之对应的优先级 `lanePriority`。

`Scheduler` 是一个完全独立的任务调度器，与 `react` 并无耦合。`Scheduler` 内部有自己的优先级：

```js
export const NoPriority = 0; // 没有任何优先级
export const ImmediatePriority = 1; // 立即执行的优先级，级别最高
export const UserBlockingPriority = 2; // 用户阻塞级别的优先级
export const NormalPriority = 3; // 正常的优先级
export const LowPriority = 4; // 较低的优先级
export const IdlePriority = 5; // 优先级最低，表示任务可以闲置
```

当向 `Scheduler` 推送任务时，需要指定一个优先级，在这里需要将 `lanePriority` 转换为 `Scheduler` 的优先级 `schedulerPriorityLevel`。

在 `react` 中，向 `Scheduler` 推送的任务是一个固定函数 `performConcurrentWorkOnRoot` ，但每次的优先级不同。

`performConcurrentWorkOnRoot` 就是 `react` 的进行 `Reconciler` 阶段的入口函数，所以这里可以总结为：**向 `Scheduler` 推送一个指定优先级的协调函数， `Scheduler` 将在特定时间后执行这个协调函数**。

最后需要在 `fiberRoot` 节点上保存此次任务 `callbackNode` 和此次任务的优先级 `callbackPriority `：

```js
// 向 Scheduler 添加任务，并保存在 fiberRoot 上
fiberRoot.callbackNode = scheduleCallback(schedulerPriorityLevel, performConcurrentWorkOnRoot.bind(null, root));
// 在 fiberRoot 上保存此次任务的优先级
fiberRoot.callbackPriority = lanePriority;
```

![](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/react%20%E7%9A%84%20concurrent%20%E6%A8%A1%E5%BC%8F%E6%9B%B4%E6%96%B0%E5%8E%9F%E7%90%86/fiberRoot_callbackNode.png)

### Scheduler 调度

这里简单描述一下 `Scheduler` 的 **时间片** 和 **中断任务** 原理，更具体的分析可以查看 [一篇文章搞懂 React 的任务调度机制](https://github.com/neroneroffy/react-source-code-debug/blob/master/docs/%E8%B0%83%E5%BA%A6%E6%9C%BA%E5%88%B6/Scheduler.md)。

`react` 以 `5s` 为区间，将更新分成一个一个时间片，在更新每一个 `fiber` 前，检测当前时间片是否有剩余时间，如果没有，就会停止更新，将线程交给主线程。

在上面的 `react` 调度后，`Reconciler` 阶段的入口函数 `performConcurrentWorkOnRoot` 已经进入了 `Scheduler` ，而 **`Reconciler` 阶段就是从整棵 `fiber` 树的根节点开始深度遍历更新 `fiber` 节点**。

首先，时间片自然是 `Scheduler` 分的， `Scheduler` 会去执行任务，当时间片用光时，会在 **下一个宏任务时从新发起任务执行**，这里 `Scheduler` 借助 [MessageChannel](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel) 实现这一个功能：

```js
const channel = new MessageChannel();
channel.port1.onmessage = runTask;

function runTask() {
    /**
    ... 
    执行任务
    ... 
    */

    // 时间片用光
    channel.port2.postMessage(null);
}
```

`MessageChannel` 是一个发布订阅的模式， `port1` 注册了 `runTask` 函数，当时间片用光时，调用 `port2.postMessage(null)` 会通知 `port1` 在**下一个宏任务** 重新执行 `runTask`。

对于 `react` 来说，这里执行的任务就是是 `performConcurrentWorkOnRoot`。

可能你已经发现在 `runTask` 中执行 `performConcurrentWorkOnRoot` 函数时竟然能够去检查时间片并中断 `performConcurrentWorkOnRoot` 的执行，那必然 `performConcurrentWorkOnRoot` 是一个遵循某种约定的函数。

`performConcurrentWorkOnRoot` 内部会在每个 `fiber` 更新前去检查是否有剩余时间，检查的方法 `shouldYield` 由 `Scheduler` 提供。

1. 当没有剩余时间时，停止遍历更新并返回一个继续更新的函数 `continuationWork`，这样 `Scheduler` 下次能继续运行剩余部分的更新。在 `react` 中 `continuationWork` 还是 `performConcurrentWorkOnRoot` 函数，也就是**当中断后恢复更新，依旧是从根节点开始遍历更新，只不过已经更新过的节点会被跳过**。
2. 如果在当前时间片内完成，就会返回 `null` ，代表任务已经完成。

```js
// 下面只是模拟 react 的实现

function performConcurrentWorkOnRoot(root) {
    let nextFiber = root;

    while (nextFiber && shouldYield()) {
        // 更新 fiber，并返回下一个 fiber
        nextFiber = performUnitOfWork(nextFiber);
    }

    // 中断后，返回继续任务的函数
    if (nextFiber) {
        return performConcurrentWorkOnRoot.bind(root);
    }

    return null;
}

// Scheduler 调度的任务
let work = performConcurrentWorkOnRoot;
function runTask() {
    // 执行任务
    let callback = work;
    while (callback && shouldYield()) {
        let continuationWork = performConcurrentWorkOnRoot();

        if (typeof continuationWork === 'function') {
            callback = continuationWork;
        }
    }

    // 时间片用光，却还有任务
    if (callback) {
        work = callback;
        channel.port2.postMessage(null);
    }
}
```

所以，如果想用 `Scheduler` 通过时间片的方式去执行一个长任务函数，那这个长任务函数本身就是片段化的，即：**执行完一个片段后，返回执行下一个片段的函数**。

> 上面描述的是 `Scheduler` 中断一个任务时的原理，实际 `Scheduler` 内部有一个任务队列，存储各个优先级的任务，对任务队列的调度就不细说了。

### 高优先级任务插队

上面的方法中断一个更新任务后，执行的也是上次中断的任务。而 `react` 的 `concurrent` 模式的核心不仅在于中断更新任务，还需要让更高级的更新任务插队。

插队原理很简单，中断当前更新任务后，从 **`react` 调度** 从头走一遍，找出更高优先级的 `renderLanes` ，把更高优先级的 `performConcurrentWorkOnRoot` 任务推入 `Scheduler` ，并取消上次的更新任务。

因此 **`react` 调度** 时，还需要做一件事，比较两次更新任务的优先级，决定是否发起新的更新任务。

![](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/react%20%E7%9A%84%20concurrent%20%E6%A8%A1%E5%BC%8F%E6%9B%B4%E6%96%B0%E5%8E%9F%E7%90%86/react%E8%B0%83%E5%BA%A6_%E5%AF%B9%E6%AF%94%E4%BC%98%E5%85%88%E7%BA%A7.png)

`fiberRoot` 节点上保存着上次任务 `callbackNode` 和上次任务的优先级 `callbackPriority `，当得到新的 `lanePriority` 时，比较 `lanePriority` 和 `callbackPriority`。

`performConcurrentWorkOnRoot` 需要做以下修改：

```js
function performConcurrentWorkOnRoot(root) {
    let nextFiber = root;
    let originalCallbackNode = root.callbackNode;

    while (nextFiber && shouldYield()) {
        // 更新 fiber，并返回下一个 fiber
        nextFiber = performUnitOfWork(nextFiber);
    }

    /**
    ...
    react 调度流程
    ...
    */

    // react 调度后 callbackNode 可能是新任务
    // 只有不是新任务时，才返回继续更新的函数
    if (root.callbackNode === originalCallbackNode) {
        return performConcurrentWorkOnRoot.bind(null, root);
    }

    return null;
}
```

## 协调(Reconciler)

`Reconciler` 阶段就是从整棵 `fiber` 树的根节点开始深度遍历更新 `fiber` 节点，不过由于 `fiber` 结构，深度遍历并不是递归的方式，所以可以直接中断遍历。

在遍历过程中，一个 `fiber` 节点会被处理 `2` 次 —— 向下遍历时 `1` 次，向上回溯时 `1` 次，这两次分别会做不同的工作，向下遍历时对应 `beignWork` ，向上回溯时对应 `completeUnitOfWork`。

具体遍历方式是当处理完一个 `fiber` 节点后，会返回下一个 `fiber` 节点：

```js
let nextFiber = fiberRoot;
while (nextFiber && shouldYield()) {
    // 处理 fiber，并返回下一个 fiber
    nextFiber = performUnitOfWork(nextFiber);
}
```

### beginWork

以组件为例，状态改变时，在 `fiber` 节点上添加的 `updateQueue` 链表，会在此时用于更新。根据 `renderLanes` ，从 `fiber.updateQueue` 中找出优先级大于等于 `renderLanes` 的更新对象，计算得到最新的状态。

```js
class TestPage extends React.Component {
    constructor(props) {
        super(props);
        this.buttonRef = React.createRef();
    }
    // 初始状态
    state = {
        count: 0,
        click: false
    };
    // 组件渲染后
    componentDidMount() {
        this.setState({
            count: 1
        });
        // 按钮的点击事件
        const button = this.buttonRef.current;
        button.click();
        this.setState({
            count: 5
        });
    }
    handleButtonClick = () => {
        this.setState({
            click: true
        });
    };

    render() {
        return (
            <button ref={this.buttonRef} onClick={this.handleButtonClick}>
                按钮
            </button>
        );
    }
}
```

在 `componentDidMount` 执行完毕后， `updateQueue` 结构如下：

![](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/react%20%E7%9A%84%20concurrent%20%E6%A8%A1%E5%BC%8F%E6%9B%B4%E6%96%B0%E5%8E%9F%E7%90%86/updateQueue_difference_lane.png)

这里会从根节点遍历更新两轮，第一轮以 `renderLanes = 8` 来更新，此时只会用 `update: B1` 来更新状态，得到状态：

```js
state = {
    count: 0,
    click: true
};
```

重新收集 `fiber.lanes` 为被跳过的 `update`(`A2`, `C2`) 的 `lane`。 `completeUnitOfWork` 阶段 **向上回溯** 时会将这些 `lanes` 添加到父节点的 `childLanes` ， 最终收集到 `root.pendingLanes` 。

得到最新状态后，接着是执行 `render` 前的生命周期和 `render` 函数，得到虚拟 `dom` 。

然后， `diff` 虚拟 `dom` ， 具体是 `diff` 当前 `fiber` 的子节点。

![](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/react%20%E7%9A%84%20concurrent%20%E6%A8%A1%E5%BC%8F%E6%9B%B4%E6%96%B0%E5%8E%9F%E7%90%86/%E8%99%9A%E6%8B%9Fdom%E6%A0%91%E5%92%8Cfiber%E6%A0%91.png)

假设现在遍历到 `fiber(div)` 节点，那现在 `diff` 它的子节点：`虚拟 dom(p, p)` 和 `fiber(p, p)` 对比。并根据虚拟 `dom` 生成新的 **子节点 `fiber`** 返回。

同时，根据 `diff` 结果为 `fiber` 打上标记 `effectTag`（表示新增，删除，更新等）。

具体 `diff` 算法原理，可以查看 [深入理解 Diff 算法](https://github.com/neroneroffy/react-source-code-debug/blob/master/docs/render%E9%98%B6%E6%AE%B5/beginWork%E9%98%B6%E6%AE%B5/Diff%E7%AE%97%E6%B3%95.md)。

> `fiber` 就是虚拟 `dom` 的另一种形式。

## completeUnitOfWork

**当 `beginWork` 没有生成 **子节点 `fiber`** 时，则表示 **当前 `fiber` 子树** 遍历完成，这时会进入 `completeUnitOfWork`**。

`completeUnitOfWork` 会做以下工作：

如果是新增的节点，则会直接创建真实 `dom` 节点，并挂载到 `fiber` 节点上。因为是 **新生成的 `dom` 节点**，所以还需要将 **子节点 fiber** 对应的 **子 dom 节点** 插入到这个**新生成的 `dom` 节点** 下。最后会构建一棵 **离屏的 `dom` 树**。

如果不是新增节点，只是计算新的属性 `props` 并保存，并为 `fiber` 打上更新 `effectTag` ，在之后的 `Commit` 阶段进行具体的 `dom` 更新。

在 `beginWork` 阶段完成后， `fiber.lanes` 更新为被跳过的 `update.lane` 集合，这时需要将**子 `fiber` 上的 `lanes`** 添加到 **当前 `fiber` 的 `childLanes`** 。最终收集到 `root.pendingLanes` 。当前更新提交视图后，发起新的更新调度来处理被跳过的 `update` 。

收集 `effectList` ，将有变更的 `fiber` 节点（有`effectTag` 标记）的 `fiber` 插入到 `effectList` 链表中。

最后如果有兄弟节点 `fiber` 就返回 **兄弟节点 fiber**，否者返回 **父节点 `fiber`** 。

当返回到根节点时，表示整棵树遍历完成，此时可以进入下一阶段 `Commit` 提交阶段。 `Commit` 提交阶段就是对 `Reconciler` 阶段生成的 `effectList`(变更 `fiber` 集合) 进行遍历，将所有更新渲染到屏幕上的 `dom` 树上。

## 最终状态统一

在上面有说：**根据 `renderLanes` ，从 `fiber.updateQueue` 中找出优先级大于等于 `renderLanes` 的更新对象，计算得到最新的状态。**

仔细想一想这似乎有问题， `react` 改变了状态更新的顺序，如果这一次状态更新依赖于前一次状态更新后的值，如果改变顺序，那不是全乱套了。

举个例子：

```js
class TestPage extends React.Component {
    constructor(props) {
        super(props);
        this.buttonRef = React.createRef();
    }
    // 初始状态
    state = {
        count: 0
    };
    // 组件渲染后
    componentDidMount() {
        this.setState({
            count: 1
        });
        this.setState({
            count: 5
        });
        // 按钮的点击事件
        const button = this.buttonRef.current;
        button.click();
    }
    handleButtonClick = () => {
        this.setState((pre) => {
            return {
                // 前一次 count + 2
                count: pre.count + 2
            };
        });
    };
}
```

在上面的例子中，从开发者的角度来看， `count` 状态变化是： `1 -> 5 -> 7`，对于 `react` 来说，因为按钮点击优先级更高，状态变化是：`2 -> 3 -> 5`。

可以发现最终状态并不一致，而且这是 `react` 底层的调度，我们难以去预料最终状态是什么，所以 `react` 实现了一套机制去让最终状态统一。

假设对一个状态按顺序进行了以下操作：

```js
// 数字代表优先级
A1 -> B1 -> C2 -> D2 - E1
```

其中 `A1`, `B1`, `E1` 有着更高的优先级，正常最终状态是： `ABCDE` 。

**第一次更新**，按顺序执行 `A1`, `B1`。到了 `C2` 发现优先级不够，跳过，此时记录现在的状态 `baseState: AB`，并依据第一个跳过的更新得到 `baseQueue: C2 -> D2 -> E1`，最后执行完毕后得到最终状态 `memoizedState: CD` 。

**第二次更新**，基于上一次的 `baseState: AB` 和 `baseQueue: C2 -> D2 -> E1` 去计算，得到 `ABCDE` 。

**总结可知**，当第一次更新被跳过时，在跳过之前 **计算完成的状态** 将作为 **下次计算的基础状态**，**被跳过的更新直到到链表末尾** 将作为 **下次的更新链表**。

## 中断时的问题

在 `react` 中，只有一次完整的更新结束后才会被提交渲染，当中断更新后，需要恢复已经更新的节点，不然这部分更新将会被提交。

`react` 采用 “双缓冲” 的机制，内部存在两棵 `fiber` 树：`current` 树和 `workInProgress` 树。

![](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/react%20%E7%9A%84%20concurrent%20%E6%A8%A1%E5%BC%8F%E6%9B%B4%E6%96%B0%E5%8E%9F%E7%90%86/current%E6%A0%91%E5%92%8CworkInProgress%E6%A0%91.png)

`workInProgress` 的 `alternate` 将指向 `current`，`current` 的 `alternate` 反过来指向 `workInProgress`。

**一次完整的更新完成后**，会用 `workInProgress` 树替换 `current` 树。

`Reconciler` 之前的所有更改都将在 `current` 树上进行，但当真正更新时（`Reconciler` 阶段）, 此时会创建 `workInProgress` 树：

1. 如果节点不需要更新， `workInProgress` 树会复用 `current` 树上的节点
2. 如果节点需要更新，`workInProgress` 会创建新的 `fiber` 节点

更新时的所有更改都是在 `workInProgress` 树上进行，如果中断，这时候应该分情况处理：

1. 有更高优先级的任务，直接舍弃当前 `workInProgress` 树，重新发起更新调度，创建新的 `workInProgress` 树。
2. 还是当前更新任务，继续使用当前 `workInProgress` 树更新。

<!-- todo -->
<!-- 从上面的逻辑来看，似乎并不会发生 [撕裂](https://github.com/reactwg/react-18/discussions/69) 现象，具体待研究 -->

## 为何使用 `lane` 模型

在使用 `lane` 模型前， `react` 使用 `expirationTime` (过期时间) 表示任务的优先级，离当前时间越近的 `expirationTime` 优先级越高，这里表现为 `expirationTime` 值越大优先级越高。

每次更新前，指定一个 `currentExecTaskTime` ，满足 `expirationTime >= currentExecTaskTime` 任务将会被执行。

`expirationTime` 的产生是根据当前时间的，并不确定 `expirationTime` 的具体值，所以最多只能指定一个区间去更新，例如这里的 `expirationTime >= currentExecTaskTime`。

而 `react` 希望能随意控制哪些优先级的 `update` 将被用于本次更新，由此 `lane` 模型诞生， `lane` 模型是事先定义好的离散的数据结构，可以轻易指定任意 `lane` 作为本次更新的依据。

更多可以查看：

1. [Initial Lanes implementation](https://github.com/facebook/react/pull/18796)
2. [React 为什么使用 Lane 技术方案](https://juejin.cn/post/6951206227418284063)。

<!-- todo -->
<!-- 现在react具体用到lane模型（其优势）的地方 -->
<!-- ## CPU-bound 和 I/O-bound -->

## 为什么要用时间切片

在讨论为什么 `react` 要用时间切片前，先思考一下为什么 `vue` 不去支持时间切片？

这个问题可以在 `vue3` 的这个 [issue](https://github.com/vuejs/rfcs/issues/89) 下找到答案，以下内容取自这个 [issue](https://github.com/vuejs/rfcs/issues/89) 中尤大的回答。

时间切片是用于解决同步的高 `CPU` （这里是 `JS` 执行）时间造成的视图刷新丢帧问题。

根据 `HCI` 研究表明，除了动画，对于正常的用户交互，只要更新时间不超过 `100` 毫秒，大多数人就不会感觉到差异。

所以对于非动画而言，只有超过 `100ms` 的 `CPU` 任务执行时，时间切片才会有实际作用。

这在大多数应用场景中基本不可能发生单次 `JS` 执行超过 `100ms` ，但对于 `react` 而言，这种情况发生的可能性会比 `vue` 更高，原因在于：

1. `React` 的虚拟 `DOM` 操作（ `reconciliation` ）天生就比较慢，因为它使用了大量的 `Fiber` 架构；而 Vue 的虚拟 DOM 操作更快（没有时间切片-> 没有 fiber-> 更少的开销）
2. `React` 使用 `JSX` `render` 函数来渲染，这很难在编译时作静态分析；而 `Vue` 使用模板，能做编译时的静态分析，并进行大量的 `AOT` 优化，减少了虚拟 `DOM` 操作的基本开销。Benchmark 显示，对于一个典型的 `DOM` 代码块来说，动态与静态内容的比例大约是 `1:4` ， `Vue3` 的原生执行速度甚至比 `Svelte` 更快，在 `CPU` 上花费的时间不到 `React` 的 `1/10` 。
3. 在开发者不做优化的情况下，React 的更新总是会更新整棵组件子树；而 `Vue` 的响应式特性，能够让更新具体到某个组件，并不需要总是渲染整棵子树。

在知乎上也有相关讨论：[React 的 Concurrent Mode 是否有过度设计的成分？](https://www.zhihu.com/question/434791954) 。

## 参考文献

1. [走进 React Fiber 的世界](https://juejin.cn/post/6943896410987659277)
2. [2021-03-03 React 原理解析之 fiber](https://juejin.cn/post/6944908227213525006)
3. [React17 新特性解读：启发式更新算法](https://www.shangmayuan.com/a/34b12714a9d44df4bc338e85.html)
4. [从 React 源码分析渲染更新流程](https://juejin.cn/post/6844904200824946696)
5. [彻底搞懂 React 源码调度原理（Concurrent 模式）](https://juejin.cn/post/6844904153257508878)
6. [React 源码解析系列文章目录](https://github.com/neroneroffy/react-source-code-debug)（讲得非常清楚，有兴趣的强烈推荐阅读）
7. [React 为什么使用 Lane 技术方案](https://juejin.cn/post/6951206227418284063)
8. [Initial Lanes implementation](https://github.com/facebook/react/pull/18796)
9. [React 的 Concurrent Mode 是否有过度设计的成分？](https://www.zhihu.com/question/434791954)
10. [Why remove time slicing from vue3?](https://github.com/vuejs/rfcs/issues/89)
