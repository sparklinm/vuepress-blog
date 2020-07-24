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

### 常用插件

需要几个常用插件：

1. rollup-plugin-node-resolve ---帮助 Rollup 查找外部模块，然后导入
2. rollup-plugin-commonjs ---将 CommonJS 模块转换为 ES2015 供 Rollup 处理
3. rollup-plugin-terser --- 压缩 js 代码，包括 es6 代码压缩
4. rollup-plugin-babel --- 让我们可以使用 es6 新特性来编写代码
5. rollup-plugin-eslint --- js 代码检测

配置文件：

```js
// rollup.config
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import { eslint } from 'rollup-plugin-eslint'

export default [
  {
    input: 'src/main.js',
    output: {
      name: 'timeout',
      file: '/lib/tool.js',
      format: 'umd'
    },
    plugins: [
      resolve(), // 这样 Rollup 能找到 `ms`
      commonjs(), // 这样 Rollup 能转换 `ms` 为一个ES模块
      eslint({
        throwOnError: true,
        throwOnWarning: true,
        include: ['src/**'],
        exclude: ['node_modules/**']
      }),
      babel({
        exclude: 'node_modules/**' // 只编译我们的源代码
      }),
      terser()
    ]
  }
]
```

### Babel

其中需要注意 `babel` 插件的配置，见官网：

[Rollup 与其他工具集成](https://www.rollupjs.com/guide/tools/#npm-packages)

当然也可以自己配置 `babel`，安装 `@babel/preset-env` 和 `@babel/runtime-corejs3`

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
        modules: false,
        useBuiltIns: 'usage',
        corejs: 3,
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

这里使用的 `@babel/runtime-corejs3`，适用于：

- 开发类库/工具（生成不污染全局空间和内置对象原型的代码）
- 借助 @babel/runtime 中帮助函数（helper function）移除冗余工具函数

详情见：[结合 Babel 7.4.0 谈一下 Babel-runtime 和 Babel-polyfill](https://juejin.im/post/5d0373a95188251e1b5ebb6c)

`corejs` 可选值为 `false | 2 | 3`，区别在于：

- corejs: 2 only supports global variables (e.g. Promise) and static properties (e.g. Array.from)。
- corejs: 3 also supports instance properties (e.g. [].includes)。

`corejs` 选择的版本越高，也意味着打包体积的增加。

参考：[babel plugin-transform-runtime](https://www.babeljs.cn/docs/babel-plugin-transform-runtime)。

同时需要设置 `modules: false` ，否则 `Babel` 会在 `Rollup` 有机会做处理之前，将我们的模块转成 `CommonJS` ，导致 `Rollup` 的一些处理失败。

在 `rollup.config.js` 文件中，也需要做一些配置来使 `@babel/plugin-transform-runtime` 插件生效：

```js
export default {
    babel({
      exclude: 'node_modules/**', // 只编译我们的源代码
      // plugin-transform-runtime 生效
      runtimeHelpers: true
    })
  ]
}
```

### Eslint

新建 `.eslintrc.js`，在里面配置 `eslint` 即可。

对于 `Eslint`，同样可以不使用 `rollup-plugin-eslint` 插件，自己配置。

### 打包 css

#### 类库中引入

当组件或库中引入 `css` 时，需要使用 [rollup-plugin-postcss](https://github.com/egoist/rollup-plugin-postcss) 来打包 `css`。

```bash
yarn add rollup-plugin-postcss autoprefixer cssnano -D
```

```js
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

plugins: [
  postcss({
    plugins: [autoprefixer, cssnano],
    extract: 'dist/css/bundle.css' // 输出路径
  })
]
```

> [autoprefixer](https://github.com/postcss/autoprefixer#readme)，为 css 添加前缀。
> [cssnano](https://github.com/cssnano/cssnano)，压缩 css。

#### 使用 postcss-cli

有时候你会提供给用户可选择的 css，是否引入取决于用户自己。也就是你库中不去引入这些 css，当然也不能像上面那样使用 `rollup-plugin-postcss` 去打包这些 css。

这时候可以自己去处理这些 css，例如压缩、加前缀、解析 less 预处理起等。

使用 [postcss-cli](https://github.com/postcss/postcss-cli)。

```bash
yarn add postcss-cli -D

npx postcss ./src/*.css --use autoprefixer -d build/
```

添加到 package.json 中：

```json
{
  "scripts": {
    "postcss": "npx postcss ./src/*.css --use autoprefixer -d dist/css/"
  }
}
```

更多 `postcss` 特性见 github：[PostCSS](https://github.com/postcss/postcss)。

### 打包 TypeScript

安装 `typescript` 和[typescript rollup-plugin-typescript2](https://github.com/ezolenko/rollup-plugin-typescript2)：

```bash
yarn add typescript rollup-plugin-typescript2 -D
```

`rollup.config.js`:

```js
import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/index.ts',

  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          module: 'ESNext'
        }
      }
    })
  ]
}
```

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
const isDev = process.env.NODE_ENV !== 'production'
export default {
  output: {
    file: (!isDev && 'bundle.min.js') || 'bundle.js',
    format: 'umd',
    name: 'util'
  },
  plugins: [!isDev && terser()]
}
```

## 多出口打包

如果是发布到 `npm`，需要在`package.json` 中定义需要的包：

```json
{
  "main": "d/bundle.min.cjs.js",
  "module": "d/bundle.min.esm.js",
  "browser": "d/bundle.min.umd.js",
  "scripts": {
    "build": "cross-env NODE_ENV=production rollup -c",
    "dev": "rollup -c -w",
    "test": "node test/test.js"
  },
  "dependencies": {},
  "devDependencies": {}
}
```

```js
// 引入
import pkg from './package.json'
const isDev = process.env.NODE_ENV !== 'production'
export default {
  input: 'main.js',
  output: [
    {
      file: (!isDev && pkg.main) || 'd/bundle.cjs.js',
      format: 'cjs'
    },
    {
      file: (!isDev && pkg.module) || 'd/bundle.esm.js',
      format: 'esm'
    },
    {
      file: (!isDev && pkg.browser) || 'd/bundle.umd.js',
      format: 'umd',
      name: 'util'
    }
  ],
  ]
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
    file: (!isDev && 'bundle.min.js') || 'bundle.js',
    format: 'iife',
    name: 'util',
    globals: {
      jquery: '$'
    }
  }
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
    file: (!isDev && 'bundle.min.js') || 'bundle.js',
    format: 'iife',
    name: 'util',
    paths: {
      jquery: 'https://cdn.bootcss.com/jquery/3.2.1/jquery.js'
    }
  }
}

// bundle.js
define(['https://cdn.bootcss.com/jquery/3.2.1/jquery.js'], function(jquery) {
  jquery.selectAll('p').style('color', 'purple')
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
  "main": "d/bundle.min.cjs.js",
  // es模块打包
  "module": "d/bundle.min.esm.js",
  // 浏览器模块打包
  "browser": "d/bundle.min.umd.js",
  // TypeScript 的入口文件，用于代码提示
  "typings": "dist/types/index.d.ts",
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

### 更新

1. 执行 `npm version patch` 更新版本号（`patch`：小版本号，`minor`：次版本号，`major`：主版本号）
2. 执行 `npm publish` 进行更新

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
