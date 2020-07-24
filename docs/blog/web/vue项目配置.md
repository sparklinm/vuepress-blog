---
meta:
  - title: vue 项目配置
    time: 2020-07-27 10:15:37
    tag: vue
---

# vue 项目配置

## 前言

关于项目的一些配置，包括项目结构，插件，跨域，打包，部署等，根据平时积累持续更新。

<!-- more -->

## css 相关

### stylus

推荐使用 stylus，stylus 语法灵活，以缩进方式代替大括号，在复杂 css 模块中显得更为简洁，有更高的可维护性。中文文档见：

[stylus 中文文档](https://www.zhangxinxu.com/jq/stylus/)

### BEM 规范

对于通用组件库，css 编写方式采用 BEM 规范，避免过深的嵌套 css，这样在外部修改组件样式时更为简单。

对于一般的组件，也不应该采用过深的嵌套，一般 2 层，不超过 3 层。

### 快捷在组件中引入 css 函数变量

在每个 vue 文件中自动化导入颜色、变量、mixin 等。

vue-cli 中可使用 [vue-cli-plugin-style-resources-loader](https://www.npmjs.com/package/vue-cli-plugin-style-resources-loader)。

```bash
vue add style-resources-loader -D
```

```js
// vue.config.js
const path = require('path')
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'stylus',
      patterns: [path.resolve(__dirname, './src/styles/mixin.styl')]
    }
  }
}
```

或者使用插件 [style-resources-loader](https://github.com/yenshih/style-resources-loader)。

```js
const path = require('path')

module.exports = {
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach((type) =>
      addStyleResource(config.module.rule('stylus').oneOf(type))
    )
  }
}

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/styles/mixin.styl'),
        path.resolve(__dirname, './src/styles/color.styl')
      ]
    })
}
```

需要重新启动项目，最好只导入混入、函数、变量等特殊语法。如果导入选择器，会导致所有 vue 文件都引入这个选择器，造成重复引入冗余。

### postcss-pxtorem

[github postcss-pxtorem](https://github.com/cuth/postcss-pxtorem/)

rem 布局下书写 px，打包时将 px 转换为 rem。

```bash
yarn add postcss-pxtorem -D
```

根目录创建 `postcss.config.js` 文件。

```js
module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ['Android >= 4.0', 'iOS >= 7']
    },
    'postcss-pxtorem': {
      // 设计稿根font-size大小,50px=1rem 换算
      rootValue: 50,
      propList: ['padding*', 'margin*', 'width', 'height', 'transform*']
    }
  }
}
```

## vue

### 插件开发

这里插件特指在 Vue 上添加实例方法。主要用于为一些全局组件增加全局方法的调用方式。例如一个消息提示组件。

建立 `src/plugins` 目录：

```vue
<!-- src/plugins/message/Message.vue-->
<template>
  <transition name="plu-tips">
    <div v-if="show" class="plu-tips-wrap" :style="style">
      <div class="plu-tips">
        <div class="box-background" />
        <div class="text">提示：{{ message }}</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      show: false,
      style: {}
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="less"></style>
```

```js
// src/plugins/message/index.js

import Message from './Message.vue'

function creatMessagePlugin(Vue, options) {
  Vue.prototype.$message = function(message, options = {}) {
    const Component = Vue.extend(Message)
    const instance = new Component()

    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el)
    instance.message = message
    const obj = Object.assign(
      {
        style: {}
      },
      options
    )

    Object.assign(instance, obj)
    instance.show = true
    setTimeout(() => {
      instance.show = false
      instance.$el.remove()
    }, 3000)
  }
}

export default creatMessagePlugin

// src/plugins/index.js
// 统一添加

import creatMessagePlugin from './message'

let plugins = {
  install(Vue, options) {
    creatMessagePlugin(Vue, options)
  }
}

Vue.use(plugins)
```

### 全局混入

建立 `src/mixins` 目录：

```js
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })
```

### 全局指令

建立 `src/directives` 目录：

```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el) {
    // 聚焦元素
    el.focus()
  }
})
```

### 全局过滤器

建立 `src/filters` 目录：

```js
Vue.filter('capitalize', function(value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
```

### 全局过渡

建立 `src/transitions` 目录：

```js
Vue.component('fade-transition', {
  functional: true,
  render: function(createElement, context) {
    var data = {
      props: {
        name: 'fade-transition',
        mode: 'out-in'
      },
      on: {
        beforeEnter: function(el) {
          // ...
        },
        afterEnter: function(el) {
          // ...
        }
      }
    }
    return createElement('transition', data, context.children)
  }
})
```

或者使用 `.vue` 文件：

```vue
<!-- fade-transition.vue -->
<template>
  <transition> </transition>
</template>
```

```js
// index.js

import FadeTransition from './fade-transition.vue'
Vue.component('fade-transition', FadeTransition)
```

### 自动化注册

对于全局组件，如果使用了 `webpack`，可以采用匹配目录文件的方式自动化注册。

```js
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  // 其组件目录的相对路径
  './components/base',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach((fileName) => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  // 组件如果是 xx-aa 的命名方式会转换成 XxAa 注册
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
```

### vuex 模块化

目录结构：

```dir
store
├─index.js
├─modules
|    ├─settings.js
|    └user.js
```

```js
// user.js
export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {}
}

// index.js

import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import settings from './modules/settings'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    settings
  }
})
```

具体查看文档：[vuex 模块化](https://vuex.vuejs.org/zh/guide/modules.html)。

### 第三方库

第三方库经常会做一些配置，如果全部放入 main.js 中，会造成 main.js 臃肿。

建立 `src/lib` 目录，将第三方库在里面配置引入。

## webpack 引入外部 js

```js
module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      Velocity: 'velocity-animate',
      // 引入某个函数
      _cloneDeep: ['lodash', 'cloneDeep'],
      _isEmpty: ['lodash', 'isEmpty'],
      // 但lodash应该这样单个引入才能treeshake
      _isEmpty: 'lodash/isEmpty'
    })
  ]
}
```

在 `.vue` 或者其他 js 文件中，直接使用引入的方法即可，不需要用 `import` 导入。

用这种方法引入自己的 js 文件时，需要使用 `commonJS` 模块。

## 添加打包分析

```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = {
  chainWebpack: (config) => {
    // 打包分析
    if (process.env.NODE_ENV === 'production') {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static'
        }
      ])
    }
  }
}
```

## 更多相关配置

[vue-cli4 全面配置(持续更新)](https://github.com/staven630/vue-cli4-config)

## 多语言

vue 可以使用 [vue i18n](http://kazupon.github.io/vue-i18n/zh/)。

建立 `src/lang` 目录：

```dir
lang
├─zh-CN.js
├─en-US.js
```

```js
// main.js
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh-CN', // 语言标识
  messages: {
    'zh-CN': require('./lang/zh-CN'),
    'en-US': require('./lang/en-US')
  }
})

new Vue({
  i18n,
  render: (h) => h(App)
}).$mount('#app')
```

## axios

[axios 中文网](http://www.axios-js.com/zh-cn/docs/)。

## 跨域

### proxy 跨域

```js
// vue.config.js

module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': {
        // 不能直接写ip地址，需要http开头
        target: 'http://www.baidu.com/',
        // 如果跨域需要设置为true
        changeOrigin: true,
        // 设置支持https协议的代理
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/api2': {
        // .....
      }
    }
  }
}
```

这里会将 `/api/users` 代理为 `http://www.baidu.com/user`。

`pathRewrite`: 路径重写，也就是说会修改最终请求的 API 路径。如果不设置，`/api/users` 会被代理为 `http://www.baidu.com/api/users`。但如上面设置后 `api` 代理后的 `/api` 会被设置为 `''`。

`secure: false`: 不检查安全问题。设置后，可以接受运行在 HTTPS 上，也可以使用无效证书的后端服务器。

跨域只会发生在浏览器端，也就是我们前端去请求一个不在同一个域下的接口就会发生跨域问题。

如果是服务端请求，则不会发生跨域。

`devServer.proxy` 运用的就是这样的原理。

通过上面的配置，将原本直接发给其他服务器的请求，先发给本地 `nodejs` 构建的服务器，再利用 [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) 这个 http 代理中间件，转发给其他服务器。

### 开发生产环境接口

```js
import axios from 'axios'
const isPro = process.env.NODE_ENV === 'production'

axios.defaults.baseURL = isPro ? 'http://your.domain.com' : '/api'
```

## 打包

### 路径问题

通常情况下设置:

```js
// vue.config.js
module.exports = {
  publicPath: './'
}
```

这样打出来的可以部署在任何路径下。

如果是直接点开打包后的 `index.html` 文件，即使设置的是 `publicPath: './'`，那么从绝对路径导入资源依然会找不到。需要将打包后的文件放入一个 web 服务器中。

开发环境生产环境部署到不同路径下：

```js
// vue.config.js
module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/'
}
```

其他请看文档：[Vue CLI publicPath](https://cli.vuejs.org/zh/config/#publicpath)。

### 打包体积优化

1. 删除 source map 文件
2. [compression-webpack-plugin](https://github.com/webpack-contrib/compression-webpack-plugin)

   开启 gzip 压缩。开启后，打包会额外生成相应文件的 `.gz` 文件。

3. [TerserPlugin](https://github.com/webpack-contrib/terser-webpack-plugin)
   压缩 js 文件。

```js
// vue.config.js
const CompressionPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  productionSourceMap: false,
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin').use(
        new CompressionPlugin({
          // 匹配文件名
          test: /\.js$|\.html$|.\css/,
          // 对超过10k的数据压缩
          threshold: 1000,
          // 不删除源文件
          deleteOriginalAssets: false
        })
      )

      // 可使用 optimization.minimizer 进行配置
      config.plugin('terser').use(
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_debugger: true
            },
            warnings: false
          },
          sourceMap: false,
          // 使用多进程并行运行来提高构建速度。默认并发运行数：os.cpus().length - 1。
          parallel: true
        })
      )
    }
  }
}
```

`webpack` 会默认使用 `TerserPlugin` 压缩，即`config.optimization.minimize=true`，但也可以更改 `TerserPlugin` 的默认配置：

[optimization.minimizer](https://webpack.js.org/configuration/optimization/#optimizationminimizer)

### 图片压缩

使用[image-webpack-loader](https://www.npmjs.com/package/image-webpack-loader)插件。

```js
config.module
  .rule('images')
  .use('image-webpack-loader')
  .loader('image-webpack-loader')
  .options({})
  .end()
```

用 cnpm 安装。

会损失图片精度。一般看不出来。

### 使用 webP

判断浏览器是否支持 webP。

```js
const canUseWebp = () =>
  document
    .createElement('canvas')
    .toDataURL('image/webp', 0.5)
    .indexOf('data:image/webp') === 0
```

https://www.cnblogs.com/ypppt/p/13093313.html

### splitChunks

将第三方包分离打包，而不是全部打包在一个 `vendor` 文件中。

```js
// 分包对于单页面作用不大
config.optimization.splitChunks({
  chunks: 'all',
  maxInitialRequests: Infinity,
  minSize: 200000, // 依赖包超过300000bit将被单独打包
  automaticNameDelimiter: '-',
  cacheGroups: {
    vendor: {
      test: /[\\/]node_modules[\\/]/,
      name(module) {
        const packageName = module.context.match(
          /[\\/]node_modules[\\/](.*?)([\\/]|$)/
        )[1]

        return `chunk.${packageName.replace('@', '')}`
      },
      priority: 10
    }
  }
})
```

拆包对于单页面来说优化并不大。

即使拆包后，那所有打包文件一般还是部署在一个服务器。app.js（你的代码） 依赖 vender.js，依然会在所有包下载完毕后渲染 dom。这样服务器带宽依然会成为页面渲染的瓶颈。

将第三方包用于 cdn 是更好的方法。

### CSS 优化

#### 提取 Chunk 中的 CSS 代码到单独文件

[mini-css-extract-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin/) 可用与分离 css 为单独文件。

```bash
yarn add mini-css-extract-plugin -D
```

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          process.env.NODE_ENV === 'development'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader
        ]
      }
    ]
  }
}
```

> MiniCssExtractPlugin 推荐只用于生产环境，因为该插件在开发环境下会导致 HMR 功能缺失，所以日常开发中，还是用 style-loader。

vue-cli 已经自动开启，[css.extract](https://cli.vuejs.org/zh/config/#css-extract)。

#### 压缩 css

[css-minimizer-webpack-plugin](https://webpack.js.org/plugins/css-minimizer-webpack-plugin/) 可用于压缩 css。

```js
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  optimization: {
    minimize: true,
    // 只在生产环境有效
    minimizer: [new CssMinimizerPlugin(), '...']
  }
}
```

vue-cli 中好像已经有 css 压缩了。

#### 去除无用 css

[purifycss-webpack](https://github.com/webpack-contrib/purifycss-webpack)。

```bash
yarn add purifycss-webpack purify-css -D

```

```js
const PurifyCSSPlugin = require('purifycss-webpack')
const glob = require('glob')
module.exports = {
  plugins: [
    new ExtractTextPlugin('[name].[contenthash].css'),
    // Make sure this is after ExtractTextPlugin!
    new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      paths: glob.sync(path.join(__dirname, 'public/*.html'))
    })
  ]
}
```

### tree-shaking

tree-shaking 功能会在**生产环境（打包时）**自动启用。

tree-shaking 只支持 es6 模块语法，而 `babel-loader` 会把 es6 模块转换为 common.js，导致 tree-shaking 失效。

关闭 `bael-loader` 模块转换，设置 `modules: false`

```js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage'
      }
    ]
  ]
}
```

最新版本（8.x）的 `babel-loader` 中，已经自动帮我们关闭了对 es6 模块的转换。

所以要想正常使用 tree-shaking 功能：

1. 生产环境。
2. 关闭`babel-loader` 模块转换。

更多或者开发环境想开启，查看：[【告别普通打包】webpack 打包结果优化特性：Tree Sharking 和 sideEffects](https://blog.csdn.net/weixin_43334673/article/details/107811487#14__babelloader__179)。

### 其他优化

[webpack 做过哪些优化，开发效率方面、打包策略方面等等](https://github.com/lgwebdream/FE-Interview/issues/25)

## pwa

PWA 是 Progressive Web App 的英文缩写， 翻译过来就是渐进式增强 WEB 应用，目的就是在移动端利用提供的标准化框架，在网页应用中实现和原生应用相近的用户体验的渐进式网页应用。

简单的说 PWA 可以让你的网页安装到桌面、实现全屏（隐藏浏览器导航、搜索栏等）、消息推送、离线缓存等原生 App 的功能。

PWA 的简单教程可以查看：

[王乐平 PWA 专栏](https://blog.csdn.net/lecepin/category_9268383.html)。

总结几个注意点：

1. 谷歌浏览器 PC 端高版本浏览器支持 PWA，需要输入 `chrome://flags/`，搜索 pwa，启用相关设置。
2. manifest.json 中的 icons 设置的图标实际大小必须宽高 `1:1`。
   图片实际大小可以与 sizes 不一致，但大小比例必须是 `1:1`。

   ```json
   {
     "icons": [
       {
         "src": "./logo.png",
         "sizes": "144x144 192x192 512x512",
         "type": "image/png"
       }
     ]
   }
   ```

vue 可以通过 [vue/cli-plugin-pwa](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa) 插件配置 pwa。

```bash
vue add cli-plugin-pwa -D
```

```js
// vue.config.js
module.exports = {
  pwa: {
    name: 'My App',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    iconPaths: {
      favicon32: 'logo.png',
      favicon16: 'logo.png',
      appleTouchIcon: 'logo.png',
      maskIcon: 'logo.png',
      msTileImage: 'logo.png'
    },
    manifestOptions: {
      icons: [
        {
          src: './product.png',
          type: 'image/png',
          sizes: '144x144 192x192 512x512'
        }
      ]
    }
  }
}
```

开启 pwa 后， `favicon.ico` 只有在 `iconPaths` 中配置才会生效，`favicon.ico` 图标放入到 `public` 文件下。

## 部署

### Github pages

部署到 Github pages。

缺点：访问速度太慢，百度搜索不到。

可以使用腾讯 cdn 加速：

1. 国内加速需要备案。
2. 备案除了购买域名还需要购买腾讯云服务器（阿里云一样）。
3. 需要先为 github page 绑定自定义域名，例如 blog.xxx.cn。
4. 再用加速域名，例如：www.xxx.cn 加速 blog.xxx.cn。
5. cdn 加速具体看相应平台文档。

### Vercel

其他部署：Netlify 和 Vercel。

这里推荐 [Vercel](https://vercel.com/)，因为国内访问速度非常快，虽然百度也无法搜索到部署的项目。

如果 Vercel 注册不成功，很可能是邮箱问题（QQ 邮箱），需要发送邮件让他们处理，或是更换邮箱。

部署到 Vercel 下是默认 https 而且不能更改，如果你的网站有后台，且后台是 http 协议，访问后台接口将会发生 `Mixed Content` 错误。

具体查看另一篇博客 [Express 配置 https](./Express配置https.md)。

### 云服务器

购买云服务器，假如是 centos，安装 node 和 npm：

[entos7 安装 node 并升级](https://segmentfault.com/a/1190000015430583)

ftp 工具（例如：File Zilla）压缩后的代码，不压缩上传很慢。

云服务器配置安全组开放相应端口。
。

[Linux 系统 SSH 客户端断开后保持进程继续运行配置方法](https://help.aliyun.com/knowledge_detail/42523.html)

#### 安装 screen 工具

Linux 系统默认没有 screen 工具，需要先进行安装。

CentOS 系列系统安装命令如下所示。

```bash
yum install screen

```

Ubuntu 系列系统安装命令如下所示。

```bash
sudo apt-get install screen

```

#### 使用简介

执行如下命令，创建 screen 窗口。

```bash
screen -S [$Name]
```

> 注：[$Name]用来标注 screen 窗口用途。

执行如下命令，列出 screen 窗口。

```bash
screen -ls
```

当需要运行脚本、执行程序时，在命令前添加 screen 即可。

然后使用 Ctrl 和 a 键，再按下 d 键，就可以退出 SSH 登录，但不会影响 screen 程序的运行。

若需要继续工作时，登录实例，然后执行如下命令，恢复会话即可。

```bash
screen -r -d
```
