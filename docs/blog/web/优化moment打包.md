---
meta:
  - title: 优化moment打包
    time: 2020-3-4 16:56:30
    tag: moment
---

# 优化 moment 打包

## 前言

这几天接到任务：将 `moment` 替换为 `dayjs` 来减少打包体积。

![enter description here](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1583317035063.png)

可以发现`moment`确实是比`dayjs`大很多。即使压缩后也有 `69.6k`，而`dayjs`只有几 `kb` 大小。

<!-- more -->

## You-Dont-Need-Momentjs 插件

`eslint` 插件：[You-Dont-Need-Momentjs](https://github.com/you-dont-need/You-Dont-Need-Momentjs#add)，可以找出项目中使用 `moment` 地方，并给出错误提醒和更改建议。

在阅读文档时，发现它指出了 `moment` 的问题：

- It is highly based on OOP APIs, which makes it fail to work with tree-shaking, thus - leading to a huge bundle size and performance issues.
- It is mutable and it causes bugs:
  - clone
  - How do I work around mutability in moment.js?
- Complex OOP API (which doubles mutability problem). Here is an example: https://github.com/moment/moment/blob/develop/src/test/moment/add_subtract.js#L244-L286 Moment.js allows to use a.subtract('ms', 50), a.subtract(50, 'ms') and even a.subtract('s', '50').

moment 是高面向对象的，这导它她不能 `tree-shaking`。

看到这里问题又来了，什么是 `tree-shaking`。

百度了一下，从这篇文章中理解了这个概念：

[Tree-Shaking 性能优化实践 - 原理篇](https://juejin.im/post/5a4dc842518825698e7279a9)

总结来说：

1. `Tree-shaking` 的本质是消除无用的 js 代码，例如：我们使用了 moment 其中一个函数，理想状态下只有这一个函数被打包到我们的项目中。
2. `tree-shaking` 的消除原理是依赖于 `ES6` 的模块特性。`ES6` 模块依赖关系是确定的，和运行时的状态无关，可以进行可靠的静态分析，这就是 `tree-shaking` 的基础。
3. `tree-shaking` 对函数效果较好，但难以消除类中的无用函数。

这也解释了为什么 `moment` 无法 `tree-shaking`。当然 `dayjs` 也无法 `tree-shaking` ,但其本身就非常小。

## webpack-bundle-analyzer 插件

`webpack-bundle-analyzer` 插件可以将打包文件的各模块占据多少以图表方式显示出来，这有助于我们分析。

对于 `vue-cli 3.0` 以上的项目，可以：

```
# 先添加插件
vue add webpack-bundle-analyzer
# 打包
npm run build --report
```

在 dist 目录下生成 `report.html`。

而在老版本的 `vue-cli` 已经配置好了，只需要直接`npm run build --report`即可。

![enter description here](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1583317035001.png)

在 `webpack` 中添加插件：

安装：

```
# NPM
npm install --save-dev webpack-bundle-analyzer
# Yarn
yarn add -D webpack-bundle-analyzer
```

使用：

```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = {
  plugins: [new BundleAnalyzerPlugin()]
}
```

详见：[webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)

## 优化 moment 打包

`moment` 为什么会这么大，除了本身很大之外，还与其 `locale` 文件有关。`moment` 是支持国际化的，打包时会将它的所有国际化文件全部打包。

![](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1583317035002.png)

有两种方法可以优化这些 `locale` 文件：

### webpack 插件：IgnorePlugin

```JavaScript
const webpack = require('webpack');
module.exports = {
  //...
  plugins: [
    // 忽略 moment.js的所有本地文件
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
};

```

此时打包时会忽略所有的 `locale` 文件：

![moment_无local](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1583317034995.png)

当需要使用某个 `locale` 文件时，可以手动 引入：

```JavaScript
import 'moment/locale/ja'
// require('moment/locale/ja');
```

### webpack 插件：ContextReplacementPlugin

```JavaScript
const webpack = require('webpack');
module.exports = {
  //...
  plugins: [
    // 只加载 `moment/locale/ja.js` 和 `moment/locale/it.js`
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ja|it/),
  ],
};
```

这种方法是告诉 `webpack` 我们会使用到哪个 `locale` 文件，然后只打包指定的 `locale` 文件。

可以看到即使去除所有的 `locale` 文件，也依然比 `dayjs` 大很多，所以如果可以的话使用 `dayjs` 更好。

## 参考文献

1. [eslint 插件 You-Dont-Need-Momentjs：找出代码中使用 Momentjs 地方 ](https://github.com/you-dont-need/You-Dont-Need-Momentjs#add)
2. [Tree-Shaking 性能优化实践 - 原理篇](https://juejin.im/post/5a4dc842518825698e7279a9)
3. [webpack-bundle-analyzer 插件：可视化显示打包后各文件大小占比](https://github.com/webpack-contrib/webpack-bundle-analyzer)
