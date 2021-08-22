`react` 更新流程如下：

1. `setState` 状态改变。
2. `Scheduler` 阶段。
3. `Reconciler` 协调阶段 ，从 **整棵组件树** 根节点 `fiberRoot` 开始，基于循环的 "递归" 更新。`fiberRoot` 是每次更新的起点。
4. 处理一个 `fiber` 节点时，分为两个步骤：
    - `beginWork`，这里以组件为例：
        - 更新状态
        - 执行 `render` 前的生命周期
        - 执行 `render`，获得虚拟 `dom`
        - `diff` 虚拟 `dom` ，生成 **子节点 `fiber`**。同时，根据 `diff` 结果为 `fiber` 打上标记 `effectTag`（表示新增，删除，更新等）。
    - `completeUnitOfWork`，当 `beginWork` 没有生成 **子节点 `fiber`** 时，则表示 **当前 `fiber` 子树** 遍历完成，这时会进入 `completeUnitOfWork`。
        - 如果是新增的节点，则会直接创建真实 `dom` 节点，并挂载到 `fiber` 节点上。因为是 **新生成的 `dom` 节点**，所以还需要将 **子节点 fiber** 对应的 **子 dom 节点** 插入到这个**新生成的 `dom` 节点** 下。最后会构建一棵离屏幕的 `dom` 树。
        - 不是新增节点，只是计算新的属性 `props` ，并为 `fiber` 打上更新 `effectTag` ，在之后的 `Commit` 阶段进行具体的 `dom` 更新。
        - 收集 `effectList` ，将有变更的 `fiber` 节点（有`effectTag` 标记）的 `fiber` 插入到 `effectList` 链表中。
        - 最后如果有兄弟节点 `fiber` 就返回 **兄弟节点 fiber**，否者返回 **父节点 `fiber`** 。
5. 一个 `fiber` 节点会被遍历到 `2` 次，第一次执行 `beginWork`，第二次代表 **当前 `fiber` 子树** 遍历完成时的 `completeUnitOfWork`。
6. 最后返回到根节点时，表示整棵树遍历完成。此时可以进入下一阶段 `Commit` 提交阶段。
7. `Commit` 提交阶段就是对 `Reconciler` 阶段生成的 `effectList` 进行遍历，将所有更新渲染到 `dom` 树上。

## 参考文献

1. [走进 React Fiber 的世界](https://juejin.cn/post/6943896410987659277)
2. [2021-03-03 React 原理解析之 fiber](https://juejin.cn/post/6944908227213525006)
3. [从 React 源码分析渲染更新流程](https://juejin.cn/post/6844904200824946696)
4. [React17 新特性解读：启发式更新算法](https://www.shangmayuan.com/a/34b12714a9d44df4bc338e85.html)
5. [彻底搞懂 React 源码调度原理（Concurrent 模式）](https://juejin.cn/post/6844904153257508878)


6. [Initial Lanes implementation](https://github.com/facebook/react/pull/18796)
