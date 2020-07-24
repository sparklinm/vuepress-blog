---
meta:
  - title: babel7 简单使用总结
    time: 2019-12-14 9:38:32
    tag: babel,总结
---

# babel7 简单使用总结

## webpack 中使用

### @babel/preset-env

安装 `@babel/preset-env`。

在 `package.json` 文件所在目录新建 `babel.config.js`文件

```javascript
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
        targets: {
          // 目标浏览器版本，该浏览器缺失某新语法，babel才会引入这个新语法
          ie: 11
        }
      }
    ]
  ]
}
```

<!-- more -->

`targets`字段可用同级目录下`.browserslistrc`文件代替，例如：

```
> 1%
last 2 versions

```

`.browserslistrc`文件的语法为 `browserslist`：[browserslist 语法](https://github.com/browserslist/browserslist)

也可以使用`.babelrc`文件代替`babel.config.js`文件。使用`babel.config.js`，babel 会编译`node_modules` 目录下的模块。

`useBuiltIns`有三个值：`false`、`entry`、`usage`。

`false` 只做了语法转换， `entry` 引入了所有的 es 扩展包（满足 targets 指定的浏览器版本），`usage` 会自动检测代码中用到的功能自动引入模块。

如果 `useBuiltIns` 的值是 `entry` 或者 `usage`，那么需要在 `corejs` 字段中指明版本，并同时安装对应版本的 `core-js`。

```bash
yarn add core-js@3
```

这里引入的 `core-js` 中相应模块，其实是对全局进行了污染。

```js
var a = new Promise()
;[1, 2, 3].includes(1)

// babel 后
;('use strict')

// 对 promise, includes 进行了重写
require('core-js/modules/es7.array.includes.js')
require('core-js/modules/es6.string.includes.js')
require('core-js/modules/es6.promise.js')
require('core-js/modules/es6.object.to-string.js')

var a = new Promise()
;[1, 2, 3].includes(1)
```

> 所以在类库中，千万不要配置 `useBuiltIns: usage | entry`。只能在自己的项目中去使用。

### @babel/plugin-transform-runtime

类库中可以使用 `@babel/plugin-transform-runtime 插件`。

安装：

`dependencies`：

```bash
yarn add @babel/runtime-corejs3 --dev
```

`devDependencies`：

```bash
yarn add @babel/preset-env
yarn add @babel/core
yarn add @babel/plugin-transform-runtime
```

新建 `babel.config` 文件：

```js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          // 目标浏览器版本，该浏览器缺失某新语法，babel才会引入这个新语法
          ie: 11
        }
      }
    ]
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3, // 可选 false | 2 | 3
        proposals: true //corejs 3 可设置
      }
    ]
  ],
  // 不编译的文件夹
  ignore: ['node_modules/**']
}
```

`@babel/runtime-corejs3`，适用于：

- 开发类库/工具（生成不污染全局空间和内置对象原型的代码）
- 借助 @babel/runtime 中帮助函数（helper function）移除冗余工具函数

详情见：[结合 Babel 7.4.0 谈一下 Babel-runtime 和 Babel-polyfill](https://juejin.im/post/5d0373a95188251e1b5ebb6c)

`corejs` 可选值为 `false | 2 | 3`，区别在于：

- corejs: 2 only supports global variables (e.g. Promise) and static properties (e.g. Array.from)。
- corejs: 3 also supports instance properties (e.g. [].includes)。

同时根据版本需要安装不同的 `runtime-corejs`:
| `corejs` option | Install command |
| ------------- | ----------------------------------------- |
| `false` | `npm install --save @babel/runtime` |
| `2` | `npm install --save @babel/runtime-corejs2` |
| `3` | `npm install --save @babel/runtime-corejs3` |

`corejs` 选择的版本越高，也意味着打包体积的增加。

```js
var a = new Promise()
;[1, 2, 3].includes(1)

// babel 后
;('use strict')

// 不会污染全局
var _interopRequireDefault = require('@babel/runtime-corejs3/helpers/interopRequireDefault')
var _includes = _interopRequireDefault(
  require('@babel/runtime-corejs3/core-js-stable/instance/includes')
)
var _promise = _interopRequireDefault(
  require('@babel/runtime-corejs3/core-js-stable/promise')
)
var _context
var a = new _promise.default()

;(0, _includes.default)((_context = [1, 2, 3])).call(_context, 1)
```

参考：[babel plugin-transform-runtime](https://www.babeljs.cn/docs/babel-plugin-transform-runtime)。

## vue-cli3

vue-cli3 使用的是 `@vue/babel-preset-app` 插件来完成 babel 配置的，具体见：

[vue-cli 浏览器兼容性](https://cli.vuejs.org/zh/guide/browser-compatibility.html#browserslist)

需要注意的是，在`@vue/app`插件中指定 corejs: 3 似乎不起作用（待定...）

```javascript
module.exports = {
  presets: [
    [
      //@vue/babel-preset-app插件缩写
      '@vue/app',
      {
        corejs: 3
      }
    ]
  ]
}
```

## 参考资料

1. [babel 官网](https://www.babeljs.cn/docs/configuration)
2. [github corejs](https://github.com/zloirock/core-js#babelpreset-env)
3. [快速上手 babel](https://blog.csdn.net/weixin_33737774/article/details/91365422)
4. [结合 Babel 7.4.0 谈一下 Babel-runtime 和 Babel-polyfill](https://juejin.im/post/5d0373a95188251e1b5ebb6c#heading-2)
5. [一口(很长的)气了解 babel](https://juejin.im/post/5c19c5e0e51d4502a232c1c6#heading-11)
