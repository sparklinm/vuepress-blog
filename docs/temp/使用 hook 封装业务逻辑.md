# 使用 hook 封装业务逻辑

## 前言

## 开户场景

假设这样一个开户流程：

这个开户流程在两个场景（`A`, `B`）使用，并且在 `A`, `B` 场景下，根据开户结果对视图的处理也不同。

## hook

使用 `hook` 封装这个流程表现如下：

```js
async function useOpenAccount(data, options) {
    let [status, setStatus] = useState('init');
    let [result, setResult] = useState({});
    let refPoll = useRef();

    useEffect(() => {
        try {
            setStatus('start');
            // 开户
            let res = await openAccount(data, options);
            // 轮询开户结果
            let poll = autoPoll(queryOpenAccountResult, res);
            refPoll.current = poll;
            setStatus('loading');
            let pollResult = await poll.start();
            setStatus('success');
            setResult(pollResult);
        } catch (error) {
            setStatus('fail');
            setResult(error);
        }

        return () => {
            // 组件卸载时，清除轮询定时器
            refPoll.current.clear();
        };
    }, []);

    return { status, result };
}

// 场景A
function PageA() {
    let { status, result } = useOpenAccount(data, options);
    // 根据 status 状态来渲染不同视图
}

// 场景B
function PageB() {
    let { status, result } = useOpenAccount(data, options);
    // 根据 status 状态来渲染不同视图
}
```

在不同场景开户时，对视图的处理也不相同。

## util

如果用公共函数表示上述流程，那只能通过传入回调函数的方式来渲染不同视图：

```js
// startcb, loadingcb, successcb, failcb 回调函数
async function openAccount(data, options, { startcb, loadingcb, successcb, failcb }) {
    try {
        startcb();
        // 开户
        let res = await openAccount(data, options);
        // 轮询开户结果
        let poll = autoPoll(queryOpenAccountResult, res);
        loadingcb();
        let pollResult = await poll.start();
        successcb(pollResult);
        return poll;
    } catch (error) {
        failcb();
    }
}
```

这种方式很难用，并且每次使用，都需要主动在组件卸载时清除轮询定时器 `poll.clear()`。

## 高阶组件

`react` 有[高阶组件](https://react.docschina.org/docs/higher-order-components.html)，小程序没有这类概念。

高阶组件是通过组合包装组件（父组件）和被包装组件（子组件）来生成一个新组件的方式。

在这里，**处理开户流程** 是包装组件，**根据开户结果显示视图** 是被包装组件。

小程序没有高阶组件的概念，不过可以发现高阶组件类似于组件 `slot`：

```html
<open-account>
    <open-account-result> </open-account-result>
</open-account>
```

在组件 `open-account` 中处理开户流程，并将开户结果给 `open-account-result` 组件显示视图。但 `slot` 是由组件外部传入，`open-account` 并不能向 `open-account-result` 传递任何数据。

除了 `slot`，小程序还有一个 [抽象节点](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/generics.html) 概念，可以实现组件对外部传入子组件的控制。

```js
// open-account 组件
Component({
    data: { status: 'init', result: {} },
    attached: async function () {
        try {
            this.setData({ status: 'start' });
            // 开户
            let res = await openAccount(data, options);
            // 轮询开户结果
            let poll = autoPoll(queryOpenAccountResult, res);
            this.poll = poll;
            this.setData({ status: 'loading' });
            let pollResult = await poll.start();
            this.setData({ status: 'success', result: pollResult });
        } catch (error) {
            this.setData({ status: 'error', result: error });
        }
    },
    detached: function () {
        this.poll.clear();
    }
});

<view class='page-body'>
    <result status="{{status}}" result="{{result}}">
</view>;

{
  "componentGenerics": {
    "result": true
  }
}
```

使用如下：

```html
<!-- 场景A -->
<open-account generic:result="open-account-result-a"> </open-account>
<!-- 场景B -->
<open-account generic:result="open-account-result-b"> </open-account>
```

这里需要定义一些额外的组件：`open-account` ，`open-account-result-a`, `open-account-result-b`。

## Render Props

高阶组件的特点：父组件能够向传入的子组件传递数据。

而 `Render Props` 与高阶组件相反：传入子组件能访问父组件的数据。

**小程序不支持 `Render Props`** ，这里可以看一下 `react` 的 [Render Props](https://react.docschina.org/docs/render-props.html) 例子：

```jsx
class openAccountResultA extends React.Component {
    render() {
        const status = this.props.mouse;
        const result = this.props.result;
        return (
            <div>
                {/* 开户失败 */}
                <ErrorMessage show={status === 'error'} error={result} />
                {/* 轮询结果 */}
                <Loader show={status === 'loading'}>
                    {/* 开户成功 */}
                    <Success></Success>
                </Loader>
            </div>
        );
    }
}

class OpenAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = { status: 'init', result: {} };
        this.open();
    }

    async open(event) {
        try {
            this.setState({ status: 'start' });
            // 开户
            let res = await openAccount(data, options);
            // 轮询开户结果
            let poll = autoPoll(queryOpenAccountResult, res);
            this.setState({ status: 'loading' });
            let pollResult = await poll.start();
            this.setState({ status: 'success', result: pollResult });
        } catch (error) {
            this.setState({ status: 'error', result: error });
        }
    }

    render() {
        return <div>{this.props.render(this.state)}</div>;
    }
}

class PageA extends React.Component {
    render() {
        return (
            <div>
                <h1>移动鼠标!</h1>
                {/*
                    通过回调函数的形式，render 函数执行时能访问到父组件的数据
                */}
                <OpenAccount render={(state) => <openAccountResultA status={state.status} result={state.result} />} />
            </div>
        );
    }
}
```

## mixin

小程序 `behaviors` 类似于 `mixin` ，`wxa` 也直接支持 `mixin` ：

```js
let behavior = Behavior({
    data: { status: 'init', result: {} },
    attached: async function () {
        try {
            this.setData({ status: 'start' });
            // 开户
            let res = await openAccount(data, options);
            // 轮询开户结果
            let poll = autoPoll(queryOpenAccountResult, res);
            this.poll = poll;
            this.setData({ status: 'loading' });
            let pollResult = await poll.start();
            this.setData({ status: 'success', result: pollResult });
        } catch (error) {
            this.setData({ status: 'error', result: error });
        }
    },
    detached: function () {
        this.poll.clear();
    }
});

// 使用时可以通过 observers 观察 status 变化来渲染视图
Component({
    observers: {
        status: function (status) {
            // 根据 status 状态来渲染不同视图
        }
    }
});
```

## 总结

通过上面的实现，可以发现 `hook` 和 `mixin` 是最简单复用方式，`util` 公共函数的方式需要传入回调，频繁使用只会让代码难以理解，高阶组件的方式需要创建额外的组件，如果嵌套层次过深也难以维护。

但 `mixin` 并不是一个好的复用方法，它存在以下问题，过多使用 `mixin` 只会让项目更加复杂：

1.  隐式依赖。如果 `mixin` 依赖于特定组件中的方法（或是其他 `mixin` ），那这个 `mixin` 将难以复用。依赖关系不明确，很难知道一个 `mixin` 依赖哪些组件或者哪些 `mixin` 。
2.  命名冲突。`mixin` 之间会出现命名冲突，当你新增一个函数或者变量时要小心的检查组件或者其他 `mixin` 之中是否有同样的命名。
3.  副作用。`mixin` 作用于实例上，可能会修改实例上的变量（包括实例本身和其他 `mixin` 在实例上添加的变量），当发生问题，难以追踪原因。`mixin` 没有显式的数据流入流出，多个 `mixin` 和实例之间共享数据，并能够随意互相修改。

### hook 和 util 的区别

`hook` 其实也可以看作一个公共函数，但当 `hook` 能拥有状态和生命周期。在上面的例子，开户状态不同时会有不同的视图处理（有状态），同时在组件卸载时（有生命周期）要去清除定时器，这用 `util` 是无法实现的。

### 抽象程度

`hook` 为什么被很多人喜爱，这源于它的抽象程度，在这个例子中，使用 `hook` 完全将业务逻辑和视图（其他业务逻辑）解耦，被封装的业务逻辑可以用于任何场景。

如果这里的开户流程在两个场景视图表现一致，那也可以基于 `useOpenAccount` 来封装一个拥有相同视图表现的 `hook` ，同时，在以后如果有需求也可以基于 `useOpenAccount` 来做更多的拓展。

## 参考文献

1. [react 高阶组件](https://react.docschina.org/docs/higher-order-components.html)
2. [小程序 抽象节点](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/generics.html)
3. [react Render Props](https://react.docschina.org/docs/render-props.html)
4. [2019 年了，整理了 N 个实用案例帮你快速迁移到 React Hooks](https://juejin.cn/post/6844903918577664007)
5. [Mixins Considered Harmful](https://react.docschina.org/blog/2016/07/13/mixins-considered-harmful.html)
