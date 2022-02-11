1. [webpack 十连问你能接住几题](https://juejin.cn/post/7002839760792190989)
2. [「吐血整理」再来一打 Webpack 面试题](https://juejin.cn/post/6844904094281236487)

## webpack 的构建流程

1. 初始化参数：解析 webpack 配置参数，合并 shell 传入和 webpack.config.js 文件配置的参数,形成最后的配置结果；

2. 开始编译：上一步得到的参数初始化 compiler 对象，注册所有配置的插件，插件 监听 webpack 构建生命周期的事件节点，做出相应的反应，执行对象的 run 方法开始执行编译；

3. 确定入口：从配置的 entry 入口，开始解析文件构建 AST 语法树，找出依赖，递归下去；

4. 编译模块：递归中根据文件类型和 loader 配置，调用所有配置的 loader 对文件进行转换，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；

5. 完成模块编译并输出：递归完事后，得到每个文件结果，包含每个模块以及他们之间的依赖关系，根据 entry 或分包配置生成代码块 chunk;

6. 输出完成：输出所有的 chunk 到文件系统；

初始化参数 -> 监听构建生命周期（tapable），注册插件，在构建的各个阶段执行插件 -> 从入口文件分析依赖，构建依赖关系图 -> 根据 loader 编译文件 -> 根据分包配置输出 chunk

## module, chunk, bundle

1. bundle：是由 webpack 打包出来的⽂件
2. chunk：代码块，⼀个 chunk 由多个模块组合⽽成，⽤于代码的合并和分割
3. module：是开发中的单个模块，在 webpack 的世界，⼀切皆模块，⼀个模块对应⼀个⽂件，webpack 会从配置的 entry 中递归开始找出所有依赖的模块

## 用过的 loader

1. scss-loader：将 SCSS/SASS 代码转换成 CSS
2. vue-loader：加载 Vue.js 单文件组件
3. babel-loader：把 ES6 转换成 ES5
4. image-loader：加载并且压缩图片文件

## 用过的 plugin

1. terser-webpack-plugin: 支持压缩 ES6 (Webpack4)
2. [mini-css-extract-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin/) 可用与分离 css 为单独文件。
3. [css-minimizer-webpack-plugin](https://webpack.js.org/plugins/css-minimizer-webpack-plugin/) 可用于压缩 css。
4. webpack-bundle-analyzer: 可视化 Webpack 输出文件的体积 (业务组件、依赖第三方模块)
5. compression-webpack-plugin 生产环境可采用 gzip 压缩 JS 和 CSS

## 打包优化

1. 压缩代码
    1. webpack-paralle-uglify-plugin
    2. terser-webpack-plugin 开启 parallel 参数
    3. 多进程并行压缩
    4. 通过 mini-css-extract-plugin 提取 Chunk 中的 CSS 代码到单独文件，通过 optimize-css-assets-webpack-plugin 插件 开启 cssnano 压缩 CSS。
2. 提取页面公共资源：
    1. 使用 html-webpack-externals-plugin，将基础包通过 CDN 引入，不打入 bundle 中
    2. 使用 SplitChunksPlugin 进行(公共脚本、基础包、页面公共文件)分离(Webpack4 内置) ，替代了 CommonsChunkPlugin 插件
    3. 基础包分离：将一些基础库放到 cdn，比如 vue，webpack 配置 external 是的 vue 不打入 bundle
3. Tree shaking
    1. purgecss-webpack-plugin 和 mini-css-extract-plugin 配合使用(建议)
    2. 打包过程中检测工程中没有引用过的模块并进行标记，在资源压缩时将它们从最终的 bundle 中去掉(只能对 ES6 Modlue 生效) 开发中尽可能使用 ES6 Module 的模块，提高 tree shaking 效率
    3. 禁用 babel-loader 的模块依赖解析，否则 Webpack 接收到的就都是转换过的 CommonJS 形式的模块，无法进行 tree-shaking
    4. 使用 PurifyCSS(不在维护) 或者 uncss 去除无用 CSS 代码
4. Scope hoisting
    1. 构建后的代码会存在大量闭包，造成体积增大，运行代码时创建的函数作用域变多，内存开销变大。Scope hoisting 将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以防止变量名冲突
    2. 必须是 ES6 的语法，因为有很多第三方库仍采用 CommonJS 语法，为了充分发挥 Scope hoisting 的作用，需要配置 mainFields 对第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法
5. 图片压缩
    1. 使用基于 Node 库的 imagemin (很多定制选项、可以处理多种图片格式)
    2. 配置 image-webpack-loader
6. 动态 Polyfill
    1. 建议采用 polyfill-service 只给用户返回需要的 polyfill，社区维护。(部分国内奇葩浏览器 UA 可能无法识别，但可以降级返回所需全部 polyfill)
    2. @babel-preset-env 中通过 useBuiltIns: 'usage 参数来动态加载 polyfill。

### 简单总结

1. 压缩代码。terser，css 压缩，开启 gzip 压缩。开启后，打包会额外生成相应文件的 `.gz` 文件。
2. cdn 引入。externals，SplitChunksPlugin
3. 善用 treeshaking。es6，css 提取和去除无用 css；按需引入组件库，函数库；
4. 图片压缩。webP，picture 指定多个源，支持 webp 就显示 webP 不支持选择其他格式；检查浏览器是否支持 webP
5. 动态导入。
    1. import 动态导入语法，动态导入的模块将单独打包成一个 chunk，运行时动态通过 script 加载；
    2. webpack 5 externalsType 运行时导入，使用这个时无需主动在 html 中插入 script 引入 cdn 库。配合路由懒加载使用，当一个路由被加载时，期内的 external 被创建成一个 script 标签，即这个 external 库只在该路由下才被下载。
6. 浏览器缓存。配置输出文件名和 contenthash 有关，即只有文件变化才会改变输出 chunk 名，充分利用浏览器缓存

7. [webpack 做过哪些优化，开发效率方面、打包策略方面等等](https://github.com/lgwebdream/FE-Interview/issues/25)
8. [学习 Webpack5 之路（优化篇）](https://jelly.jd.com/article/61179aa26bea510187770aa3)

## 构建优化

-   使用`高版本`的 Webpack 和 Node.js

-   `多进程/多实例构建`：HappyPack(不维护了)、thread-loader

-   `压缩代码`

    -   多进程并行压缩

        -   webpack-paralle-uglify-plugin
        -   uglifyjs-webpack-plugin 开启 parallel 参数 (不支持 ES6)
        -   terser-webpack-plugin 开启 parallel 参数

    -   通过 mini-css-extract-plugin 提取 Chunk 中的 CSS 代码到单独文件，通过 css-loader 的 minimize 选项开启 cssnano 压缩 CSS。

-   `图片压缩`

    -   使用基于 Node 库的 imagemin (很多定制选项、可以处理多种图片格式)
    -   配置 image-webpack-loader

-   `缩小打包作用域`：

    -   exclude/include (确定 loader 规则范围)
    -   resolve.modules 指明第三方模块的绝对路径 (减少不必要的查找)
    -   resolve.mainFields 只采用 main 字段作为入口文件描述字段 (减少搜索步骤，需要考虑到所有运行时依赖的第三方模块的入口文件描述字段)
    -   resolve.extensions 尽可能减少后缀尝试的可能性
    -   noParse 对完全不需要解析的库进行忽略 (不去解析但仍会打包到 bundle 中，注意被忽略掉的文件里不应该包含 import、require、define 等模块化语句)
    -   IgnorePlugin (完全排除模块)
    -   合理使用 alias

-   `提取页面公共资源`：

    -   基础包分离：

        -   使用 html-webpack-externals-plugin，将基础包通过 CDN 引入，不打入 bundle 中

    -   使用 SplitChunksPlugin 进行(公共脚本、基础包、页面公共文件)分离(Webpack4 内置) ，替代了 CommonsChunkPlugin 插件

-   `DLL`：

    -   使用 DllPlugin 进行分包，使用 DllReferencePlugin(索引链接) 对 manifest.json 引用，让一些基本不会改动的代码先打包成静态资源，避免反复编译浪费时间。
    -   HashedModuleIdsPlugin 可以解决模块数字 id 问题

-   `充分利用缓存提升二次构建速度`：

    -   babel-loader 开启缓存
    -   terser-webpack-plugin 开启缓存
    -   使用 cache-loader 或者 hard-source-webpack-plugin

-   `Tree shaking`

    -   打包过程中检测工程中没有引用过的模块并进行标记，在资源压缩时将它们从最终的 bundle 中去掉(只能对 ES6 Modlue 生效) 开发中尽可能使用 ES6 Module 的模块，提高 tree shaking 效率
    -   禁用 babel-loader 的模块依赖解析，否则 Webpack 接收到的就都是转换过的 CommonJS 形式的模块，无法进行 tree-shaking
    -   使用 PurifyCSS(不在维护) 或者 uncss 去除无用 CSS 代码
        -   purgecss-webpack-plugin 和 mini-css-extract-plugin 配合使用(建议)

-   `Scope hoisting`

    -   构建后的代码会存在大量闭包，造成体积增大，运行代码时创建的函数作用域变多，内存开销变大。Scope hoisting 将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以防止变量名冲突
    -   必须是 ES6 的语法，因为有很多第三方库仍采用 CommonJS 语法，为了充分发挥 Scope hoisting 的作用，需要配置 mainFields 对第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法

-   `动态Polyfill`

    -   建议采用 polyfill-service 只给用户返回需要的 polyfill，社区维护。 (部分国内奇葩浏览器 UA 可能无法识别，但可以降级返回所需全部 polyfill)

### 简单总结

1. 压缩代码开启并行压缩。例如 terser-webpack-plugin 开启 parallel 参数
2. 缩小打包作用域。

    1. exclude/include (确定 loader 规则范围)
    2. noParse 对完全不需要解析的库进行忽略(不去解析但仍会打包到 bundle 中，注意被忽略掉的文件里不应该包含 import、require、define 等模块化语句)，
    3. IgnorePlugin (完全排除模块)

3. 缓存构建结果

    1. babel-loader，terser-webpack-plugin 开启缓存
    2. cache-loader，缓存性能开销较大的 loader 结果，webpack5 自带 cache 功能。

## 热更新

在开发环境下，webpack 打包会启动一个 node server，和浏览器前端通过 websocket 链接，当文件变化 webpack 打包完毕后，会将打包 hash 通过 websocket 传给浏览器前端。

之后前端会检查是否开启热更新，如果开启，会根据 **上一次的打包 hash** 请求本次更新的 chunk 列表（多个模块会被打包成一个 chunk），如果有，则会根据 chunk 列表通过 JSONP 的方式去获取增量更新的模块。这里使用 JSONP 是因为 JSONP 获取后可以直接执行，server 端返回的是调用 window 上热更新函数的代码，获取完毕后执行热更新。

对于开发人员来说，我们的代码被分成一个个文件模块，那 webpack 打包后如何描述这种模块关系，webapack 将这些模块存储到了一个对象中，所以对于热更新来说，就是将变化的模块重新执行。

1. webpack 监听文件变化（通过 webpack-dev-middleware 库）
2. webpack-dev-server/server 通过 websocket 将打包 hash 传给浏览器
3. webpack-dev-server/client 接收到打包 hash ，并判断是否开启热更新，未开启就直接 reload 页面，开启了则通知 HotModuleReplacementPlugin 模块进行热更新
4. HotModuleReplacementPlugin
    1. 根据上一次的打包 hash 获取本次需要更新的 chunk 列表
    2. 根据 chunk 列表通过 JSONP 的方式去获取增量更新的模块，server 端返回的是调用 window 上热更新函数的代码，所以用 JSONP 获取完后直接执行。
5. 热更新替换，webpack 执行相关模块的代码。

1) [轻松理解 webpack 热更新原理](https://juejin.cn/post/6844904008432222215)
1) [看完这篇，面试再也不怕被问 Webpack 热更新](https://juejin.cn/post/6844903953092591630)

## hash, chunkhash, contenthash

`hash` 是跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的 hash 值都会更改，并且全部文件都共用相同的 hash 值。(粒度整个项目)

`chunkhash` 是根据不同的入口进行依赖文件解析，构建对应的 chunk(模块)，生成对应的 hash 值。只有被修改的 chunk(模块)在重新构建之后才会生成新的 hash 值，不会影响其它的 chunk。(粒度 entry 的每个入口文件)

`contenthash` 是跟每个生成的文件有关，每个文件都有一个唯一的 hash 值。当要构建的文件内容发生改变时，就会生成新的 hash 值，且该文件的改变并不会影响和它同一个模块下的其它文件。(粒度每个文件的内容)
