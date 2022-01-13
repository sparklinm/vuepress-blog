---
meta:
    - title: 使用 istanbuljs 统计代码覆盖率
      time: 2022-01-09 20:35:04
      tag: istanbuljs,覆盖率
---

# 使用 istanbuljs 统计代码覆盖率

## 前言

大多数测试工具都是借助 [istanbuljs](https://github.com/istanbuljs/istanbuljs) 来完成覆盖率测试，覆盖率测试包括以下四个部分：

1. `statement` ：语句覆盖率，顾名思义，有多少语句被测到。
2. `branches` ：分支覆盖率，有多少逻辑分支被测到。
3. `function` ：函数覆盖率，有多少个函数被测到。
4. `lines` ：线路覆盖率，有多少个逻辑线路被测到。

这里简单总结一下 `istanbuljs` 覆盖率测试的原理、相关包的使用、 `sourceMap` 映射源码的原理。

<!-- more -->

## babel-plugin-istanbul

[babel-plugin-istanbul](https://github.com/istanbuljs/babel-plugin-istanbul) 插件用于在代码中插桩，以此来统计该行代码是否被运行过。

原理也很简单，就是在每一行代码前插入一行统计代码：

```js
cov_1ce7sm3wfo().s[49]++;
this.globalData.statusBarHeight = 40;
cov_1ce7sm3wfo().s[50]++;
this.globalData.titleBarHeight = 60;
```

覆盖率数据会存储在 “全局对象” 上的 `__coverage__` 属性中。在 `nodejs` 中，存储在 `global.__coverage__` 中，在浏览器中存储在 `window.__coverage__` 中。

其他环境可通过 `new Function('return this')().__coverage__` 获取。

## nyc

[nyc](https://github.com/istanbuljs/nyc) 用作代码覆盖率统计并能生成报告。

报告格式有 `html`,`text` 等等，详情见 [这里](https://istanbul.js.org/docs/advanced/alternative-reporters/) 。

安装 [nyc](https://github.com/istanbuljs/nyc) 和 [babel-plugin-istanbul](https://github.com/istanbuljs/babel-plugin-istanbul) ：

```bash
yarn add nyc babel-plugin-istanbul -D
```

项目中添加：

```js
// babel.config.js
module.exports = {
    plugins: ['istanbul']
};
```

```json
// package.json
{
    "scripts": {
        "test": "<启动项目命令>",
        "coverage": "nyc npm run test"
    }
}
```

`nyc` 命令的原理如下：

1. 开启一个 `nodejs` 子进程运行 `nyc` 后面的命令，例如这里运行： `npm run test`
2. 子进程关闭后，将 `__coverage__` 中的数据输出到可配置的 `temp-dir` （默认为 `./.nyc_output` ）目录下。
3. 读取 `./.nyc_output` 下的覆盖率数据并生成覆盖率报告。

`nyc` 命令是运行在 `nodejs` 中的，自然也只能根据 `global.__coverage__` 中的数据生成报告。

### 其他命令

1. `nyc instrument ./lib ./output` ，为 `./lib` 下的代码插桩并输出到 `./output` 目录下。
2. `nyc report --reporter=html` ，从 `./.nyc_output` 下读取数据并生成覆盖率报告。
3. `nyc check-coverage --lines 95 --functions 95 --branches 95 --statements 95` ，从 `./.nyc_output` 下读取数据，然后检查覆盖率是否满足条件。
4. `nyc merge .nyc_output coverage.json` ，将 `./.nyc_output` 下的覆盖率数据合并到 `coverage.json` 中。

## 借助 istanbuljs 相关包生成报告

istanbuljs 相关包都在这个 [仓库](https://github.com/istanbuljs/istanbuljs/tree/master/packages) 。

### istanbul-lib-instrument

`istanbul-lib-instrument` 库用于为代码插桩。

这里并没有官方文档，可以直接看源码知道如何使用，比较简单。

```js
let { createInstrumenter } = require('istanbul-lib-instrument');
createInstrumenter(options).instrumentSync(code, filename, inputSourceMap);
```

其内在实现是使用 `babel` 去为代码插桩。

### istanbul-lib-report, istanbul-reports 和 istanbul-lib-coverage

这三个库都有简单使用文档，结合起来用可以根据覆盖率数据生成覆盖率报告。

1. `istanbul-lib-coverage`: 根据覆盖率数据生成 `coverageMap`
2. `istanbul-lib-report`: 根据 `coverageMap` 和一些其他选项（例如：输出目录，[watermarks](https://github.com/istanbuljs/nyc#high-and-low-watermarks)）创建 `reportContext` 。
3. `istanbul-reports`: 创建报告的格式，并解析 `reportContext` 生成报告。

具体使用可以查看 [nyc](https://github.com/istanbuljs/nyc) 源码。

## 处理 sourceMap

上面有提到插桩依赖于 `babel` ，那在 `babel` 处理文件时，该文件可能已经发生改变，并不是我们写的源码。这时根据覆盖率数据生成的报告并不对应源码，而是对应 `babel` 处理时的文件。

`istanbul` 通过 `babel` 的 [inputSourceMap](https://www.babeljs.cn/docs/options#inputsourcemap) 选项来将覆盖数据映射到源文件。
[inputSourceMap](https://www.babeljs.cn/docs/options#inputsourcemap) 代表传入给 `babel` 的 `sourceMap` ，即：从源文件到 `babel` 处理文件的映射。默认情况下 `inputSourceMap` 会根据文件末尾的 `//# sourceMappingURL=...` 去取对应的 `sourceMap` 对象，同时也支持手动传入一个 `sourceMap` 对象。
`istanbul` 会将 `inputSourceMap` 保存到覆盖率数据中，在生成报告时将对应行列通过 `inputSourceMap` 映射到源文件。

有关 `sourceMap` 内容可以点击 [这里](./js%20生成%20sourceMap%20的一些事.md) 了解。

## 参考

1. [babel-plugin-istanbul](https://github.com/istanbuljs/babel-plugin-istanbul)
2. [nyc](https://github.com/istanbuljs/nyc)
3. [istanbuljs 相关包](https://github.com/istanbuljs/istanbuljs/tree/master/packages)
4. [js 生成 sourceMap 的一些事](./js%20生成%20sourceMap%20的一些事.md)
