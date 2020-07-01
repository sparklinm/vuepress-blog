---
meta:
  - title: rollup打包发布到npm
    time: 2020-07-03 10:17:47
    tag: rollup
---

# rollup 打包发布到 npm

## 前言

安装，配置文件就不多说了，具体参考官网即可：

[Rollupjs 文档](https://www.rollupjs.com/guide/introduction/)

<!-- more -->

## 插件

需要几个常用插件：

1. rollup-plugin-node-resolve ---帮助 Rollup 查找外部模块，然后导入
2. rollup-plugin-commonjs ---将 CommonJS 模块转换为 ES2015 供 Rollup 处理
3. rollup-plugin-terser --- 压缩 js 代码，包括 es6 代码压缩
4. rollup-plugin-babel --- 让我们可以使用 es6 新特性来编写代码
5. rollup-plugin-eslint --- js 代码检测

配置文件：

```js
// rollup.config
import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import babel from "rollup-plugin-babel"
import { terser } from "rollup-plugin-terser"
import { eslint } from "rollup-plugin-eslint"

export default [
  {
    input: "src/main.js",
    output: {
      name: "timeout",
      file: "/lib/tool.js",
      format: "umd",
    },
    plugins: [
      resolve(), // 这样 Rollup 能找到 `ms`
      commonjs(), // 这样 Rollup 能转换 `ms` 为一个ES模块
      eslint({
        throwOnError: true,
        throwOnWarning: true,
        include: ["src/**"],
        exclude: ["node_modules/**"],
      }),
      babel({
        exclude: "node_modules/**", // 只编译我们的源代码
      }),
      terser(),
    ],
  },
]
```

新建 `.eslintrc.js`，在里面配置 `eslint` 即可。

其中需要注意 `babel` 插件的配置，见官网：

[Rollup 与其他工具集成](https://www.rollupjs.com/guide/tools/#npm-packages)

当然也可以自己配置 `babel`，安装 `@babel/preset-env` 和 `@babel/runtime-corejs3`

```bash
yarn add @babel/preset-env
yarn add @babel/runtime-corejs3
```

新建 `babel.config` 文件：

```js
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        useBuiltIns: "usage",
        corejs: 3,
        targets: {
          // 目标浏览器版本，该浏览器缺失某新语法，babel才会引入这个新语法
          ie: 11,
        },
      },
    ],
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        corejs: 3, // 可选 false | 2 | 3
      },
    ],
  ],
  // 不编译的文件夹
  ignore: ["node_modules/**"],
}
```

这里使用的 `@babel/runtime-corejs3`，适用于：

- 开发类库/工具（生成不污染全局空间和内置对象原型的代码）
- 借助 @babel/runtime 中帮助函数（helper function）移除冗余工具函数

详情见：[结合 Babel 7.4.0 谈一下 Babel-runtime 和 Babel-polyfill](https://juejin.im/post/5d0373a95188251e1b5ebb6c)

还需要设置 `modules: false` ，否则 `Babel` 会在 `Rollup` 有机会做处理之前，将我们的模块转成 `CommonJS` ，导致 `Rollup` 的一些处理失败。

对于 `Eslint`，同样可以不使用插件，自己配置。

## 开发环境和生产环境

```json
// package.json
  "scripts": {
    // 生产环境打包
    "build": "NODE_ENV=production rollup -c",
    // 开发环境打包
    "dev": "rollup -c -w",
    "test": "node test/test.js"
  },
```

`-w/--watch`：监听源文件是否有改动，如果有改动，重新打包。

开发环境不压缩代码

```js
//
const isDev = process.env.NODE_ENV !== "production"
export default {
  output: {
    file: (!isDev && "bundle.min.js") || "bundle.js",
    format: "umd",
    name: "util",
  },
  plugins: [!isDev && terser()],
}
```

## 排除不打包的第三方库

例如项目依赖于 `jquery`，正常来说 `rollup` 打包会将整个 `jquery` 一起打包。可以通过设置 `external` 来指明不打包的文件库。

```js
// rollup.config.js
import path from 'path';

export default {
  ...,
  external: [
    'jquery',
    path.resolve( './src/some-local-file-that-should-not-be-bundled.js' )
  ]
};

```

在 `umd/iife` 包的情况下，还需要给 `jquery` 设置成全局模块：

```js
export default {
  output: {
    file: (!isDev && "bundle.min.js") || "bundle.js",
    format: "iife",
    name: "util",
    globals: {
      jquery: "$",
    },
  },
}
```

`iife` 包是一个自动执行函数，适合作为 `<script>` 标签。

配置了 `globals` 后，`$` 会作为一个参数传入自动执行函数：

```js
;(function(exports, $) {
  // code
})({}, $)
```

为什么要这样做？原因如下：

- 外部类库可能已经被打包压缩，自己用 `rollup` 再打包一次，效果也许并不如之前。
- 不利于缓存，类库不经常更新，可以当做静态资源充分发挥缓存优势，而手动 build 的内容受工具配置影响。

但如果引入的是 lodash 中几个函数，这时候将这几个函数打包进去。

## 加载 cdn 的库

对于 jquery，我们可能还会用 cdn 引入，通过配置 `paths` 可以做到：

```js
// rollup.config.js
export default {
  output: {
    file: (!isDev && "bundle.min.js") || "bundle.js",
    format: "iife",
    name: "util",
    paths: {
      jquery: "https://cdn.bootcss.com/jquery/3.2.1/jquery.js",
    },
  },
}

// bundle.js
define(["https://cdn.bootcss.com/jquery/3.2.1/jquery.js"], function(jquery) {
  jquery.selectAll("p").style("color", "purple")
  // ...
})
```

## 发布到 npm

### 基本信息

官网注册，或者使用 `npm adduser` 命令依次填入用户名，邮箱，密码注册。

库信息说明，在 `package.json` 中：

```json
{
  "name": "名字",
  "version": "0.0.1",
  "description": "tool library",
  // 入口文件 import pkg from 'package-name'，导入的就是这个文件
  "main": "bundle.min.js",
  "author": "作者",
  // 协议
  "license": "",
  // 主页
  "homepage": "",
  // 关键字
  "keywords": ["tools", "javascript", "library"],
  // 仓库地址
  "repository": {
    "type": "git",
    "url": "https://github.com/sparklinm/js-library"
  },
  // npm publish 前自动build
  "prepublishOnly": "npm run build",
  // 包对NodeJs版本要求
  "engines": "6.0"
}
```

### 忽略的文件

`.npmignore` 文件中可以定义不用上传的文件。

如果有 `.gitignore` 文件，则发布时会忽略`.gitignore` 中定义的文件; 也即这些文件不需要在 `.npmignore` 重新定义。如果用 `.gitignore` 忽略了 `dist` 目录，但发包时又需要发布 `dist` 目录，此时可以在 `package.json` 定义 `files` 字段，这是一个白名单，里面的文件都会被发布出去。

```json
"files": [
  "dist"
]
```

需要注意的是，子文件夹 `.gitignore` 或 `.npmignore` 同样有效，而它们优先级高于 `files` 字段。

另外，有些文件无论如何设置，都不会发布出去：`node_modules`, `.git`(包括`.gitignore`)

### 发布

```bash
npm login
npm build
npm publish
```

### 发布中的问题

1. 登录时问题，`npm ERR! code E409`

   需要切换源为 npm 源，`npm config set registry https://registry.npmjs.org`
   注册后需要先验证邮箱，才能发布。

2. 打包时错误，`EACCES: permission denied, mkdir...`

   npm 会有生命周期，某个包会有生命周期来执行一些东西，安全起见会自动降级导致没有权限执行一些操作，通过--unsafe-perm 参数来解锁该限制。

   `npm build --unsafe-perm`

   一劳永逸的方法：

   - `npm config set unsafe-perm`（针对当前用户的）
   - `npm config -g set unsafe-perm`(全局的）

3. 邮箱未验证，`npm ERR! you must verify your email...`

   去邮箱验证即可。

4. 无法发布私有包，`npm ERR! You must sign up for private packages`

   默认情况下，包名为 `@<username>/<your-package>` 的包为私有包，私有包是需要付费的。以下命令可以指明为公有包：

   ```bash
   npm publish --access public
   ```

## 参考文献

1. [如何使用 rollup 打包前端组件/库](https://zhuanlan.zhihu.com/p/95119407)
2. [Rollupjs 文档](https://www.rollupjs.com/guide/introduction/)
3. [web 前端: rollup.js 打包 vue 组件并发布到 npm 网站](https://www.jianshu.com/p/530451cf95c9)
4. [发布 npm 包时遇到的一些坑](https://blog.csdn.net/zhangjing1019/article/details/102896421)
