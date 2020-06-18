---
meta:
  - title: babel7 简单使用总结
    time: 2019-12-14 9:38:32
    tag: babel,总结
---

# babel7 简单使用总结

<!-- more -->

## webpack 中使用

安装 `@babel/preset-env` 以及 `core-js`

在 `package.json` 文件所在目录新建 `babel.config.js`文件

```javascript
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: 3,
        targets: {
          // 目标浏览器版本，该浏览器缺失某新语法，babel才会引入这个新语法
          ie: 11
        }
      }
    ]
  ]
};
```

`targets`字段可用同级目录下`.browserslistrc`文件代替，例如：

```
> 1%
last 2 versions

```

`.browserslistrc`文件的语法为 `browserslist`：[browserslist 语法](https://github.com/browserslist/browserslist)

也可以使用`.babelrc`文件代替`babel.config.js`文件。使用`babel.config.js`，babel 会编译`node_modules` 目录下的模块。

需要在`corejs`字段中指明版本。

`useBuiltIns`有三个值：`false`、`entry`、`usage`。

`false` 只做了语法转换， `entry` 引入了所有的 es 扩展包（满足 targets 指定的浏览器版本），`usage` 会自动检测代码中用到的功能自动引入模块。

## vue-cli3

vue-cli3 使用的是 `@vue/babel-preset-app` 插件来完成 babel 配置的，具体见：

[vue-cli 浏览器兼容性](https://cli.vuejs.org/zh/guide/browser-compatibility.html#browserslist)

需要注意的是，在`@vue/app`插件中指定 corejs: 3 似乎不起作用（待定...）

```javascript
module.exports = {
  presets: [
    [
      //@vue/babel-preset-app插件缩写
      "@vue/app",
      {
        corejs: 3
      }
    ]
  ]
};
```

## 参考资料

1. [babel 官网](https://www.babeljs.cn/docs/configuration)
2. [github corejs](https://github.com/zloirock/core-js#babelpreset-env)
3. [快速上手 babel](https://blog.csdn.net/weixin_33737774/article/details/91365422)
4. [结合 Babel 7.4.0 谈一下 Babel-runtime 和 Babel-polyfill](https://juejin.im/post/5d0373a95188251e1b5ebb6c#heading-2)
5. [一口(很长的)气了解 babel](https://juejin.im/post/5c19c5e0e51d4502a232c1c6#heading-11)
