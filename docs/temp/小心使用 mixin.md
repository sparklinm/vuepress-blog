---
meta:
    - title: 小心使用 mixin
      time: 2021-07-27 14:22:41
      tag: mixin
---

# 小心使用 mixin

## 前言

## mixin 的问题

多个组件之间复用逻辑常常会使用 `mixin` ，与公共函数相比，`mixin` 允许直接使用组件的生命周期和方法。

当一个项目大量使用 `mixin` 时，会发现这些 `mixin` 之间会混乱不堪、难以维护。`mixin` 存在以下问题：

1.  隐式依赖。如果 `mixin` 依赖于特定组件中的方法（或是其他 `mixin` ），那这个 `mixin` 将难以复用。依赖关系不明确，很难知道一个 `mixin` 依赖哪些组件或者哪些 `mixin` 。
2.  命名冲突。`mixin` 之间会出现命名冲突，当你新增一个函数或者变量时要小心的检查组件或者其他 `mixin` 之中是否有同样的命名。
3.  副作用。`mixin` 作用于实例上，可能会修改实例上的变量（包括实例本身和其他 `mixin` 在实例上添加的变量），当发生问题，难以追踪原因。`mixin` 没有显式的数据流入流出，多个 `mixin` 和实例之间共享数据，并能够随意互相修改。

其实可以发现 `mixin` 的问题都指向了一个点：`mixin` 没有自己的作用域，没有显式的数据流入流出。

来看一些 `mixin` 的替代方案。

## 高阶组件

在 `react` 中，高阶组件是指接收一个组件作为参数，返回一个新的包装组件：

```jsx
// 传入一个组件
function withSubscription(WrappedComponent) {
    return React.createClass({
        getInitialState: function () {
            return {
                comments: DataSource.getComments()
            };
        },

        render: function () {
            // ... and renders the wrapped component with the fresh data!
            return <WrappedComponent comments={this.state.comments} />;
        }
    });
}
```

在 `vue` 和小程序中，高阶组件类似于嵌套组件。

假设我们要在多个组件之间复用一段逻辑，那可以将这段逻辑抽成一个公共组件，需要复用这段逻辑的组件作为
