---
meta:
  - title: jsdoc
    time: 2020-06-28 20:33:46
    tag: jsdoc,工具使用
---

# jsdoc

## 安装 jsdoc

## 配置文件

在根目录（或者其他地方）新建一个 `jsdoc-conf.js` 文件。

配置文件信息见文档：

[jsdoc 配置文件](https://jsdoc.zcopy.site/about-configuring-jsdoc.html)

使用配置文件生成文档：

```bash
// 当前目录
jsdoc util -r -c ./jsdoc-conf.js
```

<!-- more -->

`-r` 表示递归，`-c` 表示配置文件路径。

命令行参数见：

[jsdoc 命令行参数](https://jsdoc.zcopy.site/about-commandline.html)

## docstrap

使用 `docstrap` 主题模板。

安装 `docstrap` :

```bash
yarn add ink-docstrap --dev
```

github 地址: [Github docstrap](https://github.com/docstrap/docstrap)。

`docstrap` 附带了一个 `jsdoc` 的配置文件，并增加了一些新选项，可以结合 `docstrap` 附带的配置文件和自己的需求修改 `jsdoc-conf.js` 文件：

```js
module.exports = {
  plugins: ["plugins/markdown"],
  source: {
    include: [],
    exclude: [],
    includePattern: ".+\\.js(doc|x)?$",
    excludePattern: "(^|\\/|\\\\)_",
  },
  plugins: ["plugins/markdown"], // 使用markdown 插件
  markdown: {
    tags: ["file"], // 增加额外需要解析的标签
    excludeTags: ["author"], // 排除不用解析的标签
    parser: "gfm", // gfm
    hardwrap: true, // 允许多行
  },
  templates: {
    // 模板配置，包含了 DocStrap 的配置参数
    // "logoFile": "images/logo.png", // logo 文件路径
    cleverLinks: false,
    monospaceLinks: false,
    dateFormat: "ddd MMM Do YYYY", // 当需要打印日期时使用的格式
    outputSourceFiles: true, // 是否输出文件源码
    outputSourcePath: true, // 是否输出源码路径
    systemName: "Common Modules", // 系统名称
    footer: "", // 页脚内容
    copyright: "https://lzw.me.", // 页脚版权信息
    navType: "vertical", // vertical 或 inline
    // docstrap 模板主题。可取值: cosmo, cyborg, flatly, journal, lumen, paper,
    // readable, sandstone, simplex, slate, spacelab, superhero, united, yeti
    theme: "spacelab",
    linenums: true, // 是否显示行号
    collapseSymbols: false, // 是否折叠太长的内容
    inverseNav: true, // 导航是否使用 bootstrap 的 inverse header
    protocol: "html://", // 生成文档使用的阅读协议
    methodHeadingReturns: true, // method 方法标题上是否包含返回类型
  },
  // 命令行执行参数配置。在这里配置了后
  // 命令行只需要执行: jsdoc -c jsdoc-conf.json 即可
  opts: {
    // "template": "templates/default",      //使用 JSDoc 默认模板
    template: "./node_modules/ink-docstrap/template", // 使用 docstrap 模板
    destination: "./docs/", // 输出目录。等同于 -d ./out/
    recurse: true, // 是否递归查找。 -r
    debug: true, // 启用调试模式。--debug
    readme: "README.md", // 要写到文档首页的 readme 文档。-R README.md
  },
}
```

生成模板：

```bash
jsdoc util -c ./jsdoc-conf.js
```

## 部署 Github Page

`jsdoc` 生成的文件夹名需要是 `docs`。

`repository` 设置(Settings > Github Pages)，选择 master branch/docs folder， 然后保存。

## 参考文献

1. [jsdoc 配置文件](https://jsdoc.zcopy.site/about-configuring-jsdoc.html)
2. [jsdoc 命令行参数](https://jsdoc.zcopy.site/about-commandline.html)
3. [Github docstrap](https://github.com/docstrap/docstrap)
