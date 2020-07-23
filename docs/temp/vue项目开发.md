---
meta:
  - title:
    time: 2019-8-26 14:27:50
    tag:
---

#

<!-- more -->

https://www.cnblogs.com/weiqinl/p/7732892.html

## 组件设计

1. [前端组件设计原则](https://juejin.im/post/5c49cff56fb9a049bd42a90f#heading-4)
1. [面试官(6): 写过『通用前端组件』吗?](https://juejin.im/post/5c02142fe51d4511be77aad7#heading-4)
1. [聊聊组件设计](https://juejin.im/post/5d566e82f265da03f77e653c#heading-39)
1. [Vue 组件库实践和设计](https://juejin.im/post/598965bd5188256da941872c#heading-0)
1. [react 基础-属性和状态](https://blog.csdn.net/qq_38362831/article/details/93390914)
1. [React 学习：状态(State) 和 属性(Props)](https://blog.csdn.net/b954960630/article/details/79822639)
1. [组件的划分](https://juejin.im/post/5a66fd9d6fb9a01c9332d337)
   https://juejin.im/post/5c4141106fb9a04a09565473

对于组件，3 个特性：

1. State
2. Props
3. Methods

Props：简单来说，即对应 vue 中的 props，从父组件传递来的数据。它所代表的含义是组件的一些配置，应该是不能被组件本身改变的。
State：即组件的状态，表现为组件的 UI 的数据模型，组件渲染所依赖的数据。它由组件内部维护，设置和更改。

这个变量是否是通过 Props 从父组件中获取？如果是，那么它不是一个状态。
这个变量是否在组件的整个生命周期中都保持不变？如果是，那么它不是一个状态。
这个变量是否可以通过其他状态（State）或者属性(Props)计算得到？如果是，那么它不是一个状态。
这个变量是否在组件的 render 方法中使用？如果不是，那么它不是一个状态。这种情况下，这个变量更适合定义为组件的一个普通属性，例如组件中用到的定时器，就应该直接定义为 this.timer，而不是 this.state.timer。

1. 属性能从父组件获取，状态不能
2. 属性可以由父组件修改，状态不能
3. 属性能在内部设置默认值，状态也可以
4. 属性不在组件内部修改，状态要改
5. 属性能设置子组件初始值，状态不可以
6. 属性可以修改子组件的值，状态不可以

没有 state 的组件叫无状态组件（stateless component），设置了 state 的叫做有状态组件（stateful component）。因为状态会带来管理的复杂性，我们尽量多地写无状态组件，尽量少地写有状态的组件。如果可以，多使用 props，少使用 state。

高可用的组件应该主要注重于数据的展示，其他无关紧要的东西，比如数据获取，数据整理或事件处理逻辑，理想情况下应该将通用的部分移入外部 js 或或者放在共同的祖先中
容器组件：
一个页面或一个模块组成的组件。

2. 容器组件内的子组件通常具有业务或数据依赖关系
3. 集中/统一的状态管理，向其他展示型/容器型组件提供数据（充当数据源）和行为逻辑处理（接收回调）
4. 如果使用了全局状态管理，那么容器内部的业务组件可以自行调用全局状态处理业务
5. 业务模块内子组件的通信等统筹处理，充当子级组件通信的状态中转站
6. 模版基本都是子级组件的集合，很少包含 DOM 标签
7. 辅助代码分离

业务组件：
顾名思义，就是处理业务逻辑的组件，例如：获取数据，处理数据等。

UI 组件：
UI 组件只负责显示，不处理业务逻辑。

1. 只通过 props 接受数据和回调函数，不充当数据源
2. 可能包含展示和容器组件 并且一般会有 Dom 标签和 css 样式
3. 通常用 props.children(react) 或者 slot(vue)来包含其他组件
4. 对第三方没有依赖（对于一个应用级的组件来说可以有）
5. 可以有状态，在其生命周期内可以操纵并改变其内部状态，职责单一，将不属于自己的行为通过回调传递出去，让父级去处理（搜索组件的搜索事件/表单的添加事件）

通用组件：
通用组件适用于整个项目，它是最基础的一类组件，例如：弹窗、下拉框等。复用性强，只通过 props、events 和 slots 等组件接口与外部通信。是比 UI 组件细粒度更小的组件。

这里页面组件和业务组件是一类，都是提供数据的来源、作数据处理等。UI 组件和通用组件是一类，都只专注于页面的显示，接受外部数据和方法。

如何划分组件

1. 根据页面的显示结构划分模块，每个模块应写为一个组件。这里应该是一个页面组件或业务组件，获取数据(从 vuex 或 api)、处理逻辑。
2. 再对不同模块抽象出相同部分（如果它们本身结构类似），结构不同的部分使用 slot 插槽传入，数据由父组件传入。这里应该是一个更为基础的组件，即 UI 组件，专注于显示，不处理业务。
3. 对于现在可预测通用性的部分，应该抽离为一个通用组件。例如：表格、列表、列表元素等，这完全取决于它将来是否会用于其他更多的组件。如果不是很确定，不需要强行抽离，以后需要再抽离。
4. 对于一个 UI 组件或通用组件，不应该在里面处理事件，而是应该监听事件，将事件的处理向上传递，让父组件（业务或容器组件）处理；显示怎样的数据应该由父组件控制，UI 组件或通用组件只是单纯的将数据显示，或者根据配置进行更改（样式或特定功能），并将需要的事件向上传递。

关于 props:
props 对于组件而言是配置作用，如果需要对 props 进行更改，需要在父组件中更改，不应在子组件中更改。

关于 UI 组件的事件：
如果需要组件内部触发某个事件（例如：点击、输入事件等），并对传入的 pros 作修改、或是访问组件外部的数据

1. 用 \$emit 分发事件（附加数据），父组件监听分发事件，作处理
2. 如果父组件使用了子组件的 slot，子组件使用具名插槽和作用域插槽将组件的数据传递给父组件，在父组件中使用 slot 的部分直接监听和处理原生事件

这两种方法有的区别在于：

1. 监听的元素在组件内部，监听事件无法改变，且无法改变监听的元素
2. 监听的元素在父组件，且监听的元素和事件可以自定义，因为使用了 slot，那一切都是可以更改的。

如果不需要对 props 作修改
那么可以在组件内部直接监听和处理（例如：点击发送数据到服务器，点击边框颜色变化）

总而言之：一切对组件外部数据的更改或使用，都不应该在组件中进行（例如：删除列表，添加表单，搜索组件的搜索事件）。高可用性的组件在于将尽可能多的控制权交给父组件，这意味着尽量少使用内部 state，多使用 props 和 slot 进行组件的控制，当然也不是绝对要少使用，结合具体需求。

假设表单组件，有一个按钮点击事件，改变表单边框颜色。那么对于这个功能， 可以在组件内部使用一个变量保存边框颜色，每次点击更改变量的取值。那么在这种情况下，按钮是固定的，颜色范围也需要预先定义。

如果将颜色范围和按钮都交给父组件控制（props 和 slot），那么就可以根据不同的需求来定制这个事件，例如：不用的边框颜色范围，不同的按钮样式、不同的事件触发。

通用性高的组件是趋向于无状态的组件，但并不是要求所有状态都由父组件控制，只需要根据功能将主要的部分（需要面对不同情况改变）交出控制权，同时为这些部分设定默认值，防止父组件不对这些部分控制时，组件有一个默认的显示。

## todo 项目

画圆弧：

1. 使用 circle 配合 stroke-width
2. 使用 path 的 A 画弧线（和画扇形类似）配合 stroke-width

> 需要注意的是弧线宽度加圆的半径等于 svg 总宽度

### less

**语法：**

[W3Cschool less](https://www.w3cschool.cn/less/)

### css BEM 规范

[前端 | BEM 规范你应该了解](https://www.jianshu.com/p/99ca15d0c7c7)

**配置全局的 css**

即不用在每个 vue 文件中都 import 公共 css，例如引入 mixin.less、variable.less 等等 （style-resources-loader 插件）

[style-resources-loader](https://blog.csdn.net/wu_xianqiang/article/details/89538844)
[vue-cli3 配置全局 less 、sass 变量](https://www.jianshu.com/p/aab8e9c06df1)
[vue-cli 自动化导入 CSS](https://cli.vuejs.org/zh/guide/css.html#%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8)

需要重新启动项目，并且最好不要全局导入具体的选择器，只导入混入、函数、变量等特殊语法。导入具体的选择器，会导致所有 vue 文件都引入这个选择器，会造成重复引入冗余。

### 插件

**vue 插件开发**

[vue 插件开发及填坑](https://juejin.im/post/5d6cd5c9f265da03f66ddb1f)
[vue 插件](https://cn.vuejs.org/v2/guide/plugins.html)

### 自动化注册

**全局组件自动化注册**

[Vue 全局组件自动化注册](https://cn.vuejs.org/v2/guide/components-registration.html#基础组件的自动化全局注册)

### webpack 引入外部 js

**引入外部 js（主要 webpack 引入）**

[Vue 引入外部 js](https://www.jb51.net/article/140370.htm)

```javascript
plugins: [
  new webpack.ProvidePlugin({
    Velocity: 'velocity-animate'
  })
]
```

### 自定义指令

**自定义指令**

[自定义指令](https://cn.vuejs.org/v2/guide/custom-directive.html)

对于 com-input 框来说，需要它在每次显示的时候自动聚焦，可以通过 el.focus()来实现

### vuex 模块化

[vuex 模块化](https://vuex.vuejs.org/zh/guide/modules.html)

### 多语言

[vue i18n](http://kazupon.github.io/vue-i18n/zh/)
[Vue 中使用 vue-i18 插件实现多语言切换功能](https://blog.csdn.net/u012302552/article/details/80989964)

### rem 布局

postcss-pxtorem

### vue-eChart 库

[github Vue-ECharts](https://github.com/ecomfe/vue-echarts/blob/master/README.zh_CN.md)

[官方文档](https://echarts.apache.org/zh/api.html#echarts.init)

### calendar 库

https://github.com/GeoffZhu/vue-event-calendar

### axios 使用

[axios 中文网](http://www.axios-js.com/zh-cn/docs/)

### 跨域

proxy 跨域：

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

`pathRewrite`: 路径重写，也就是说会修改最终请求的 API 路径。如果不设置：`/api/users` 会被代理为 `http://www.baidu.com/api/users`。但如上面设置后 `api` 代理后的 `/api` 会被设置为 `''`。

`secure: false`: 不检查安全问题。设置后，可以接受运行在 HTTPS 上，也可以使用无效证书的后端服务器。

跨域只会发生在浏览器端，也就是我们前端去请求一个不在同一个域下的接口就会发生跨域问题。

如果是服务端请求，则不会发生跨域。

`devServer.proxy` 运用的就是这样的原理。

通过上面的配置，将原本直接发给其他服务器的请求，先发给本地 `nodejs` 构建的服务器，再利用 [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) 这个 http 代理中间件，转发给其他服务器。

### 打包

1. 路径问题

参考：[Vue CLI publicPath](https://cli.vuejs.org/zh/config/#publicpath)

如果是直接点开打包后的 index.html 文件，即使设置的是 `publicPath: './'`，那么从绝对路径导入资源依然会找不到。需要将打包后的文件放入一个 web 服务器中。

Chrome 如何禁用同源策略，快捷方式 —— 目标后面添加：

```bash
--args --disable-web-security --user-data-dir
```

三丰云：
https://www.sanfengyun.com/freeServer/

https://www.zhihu.com/question/53891486

https://www.21yunbox.com/services/

### nginx 配置

ubuntu

https://blog.csdn.net/qq_23832313/article/details/83578836

https://www.cnblogs.com/gede/p/11011693.html

https://www.cnblogs.com/flyuz/p/9962491.html

https://www.cnblogs.com/chenleideblog/p/10499807.html

防火墙

https://www.cnblogs.com/kluan/p/5993767.html

### 部署

Github pages

腾讯 cdn 加速：

1. 国内加速需要备案。
2. 备案除了购买域名还需要购买腾讯云服务器（阿里云一样）。
3. 需要先为 github page 绑定自定义域名，例如 blog.xxx.cn
4. 再用加速域名，例如：www.xxx.cn 加速 blog.xxx.cn
5. cdn 加速具体腾讯云文档。

其他部署：Netlify 和 Vercel

它们都提供对 github 仓库一键式部署，并能够部署后端。

Netlify 国内网速较慢，Vercel 很快。

如果 Vercel 注册不成功，很可能是邮箱问题，需要更换邮箱。

部署到云服务器：

ftp 工具（例如：File Zilla）压缩后的代码，不压缩上传慢。

云服务器配置安全组开放相应接口。
