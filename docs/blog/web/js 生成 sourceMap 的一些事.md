---
meta:
    - title: 为 js 生成 sourceMap 小结
      time: 2021-11-18 15:15:42
      tag: js,sourceMap
---

# 为 js 生成 sourceMap 小结

## 前言

现在的构建工具一般都会对源文件进行各种修改，最后生成最终文件。经过一系列修改，生成文件已经和最初开发者写的已经大不一致了，这对开发调试很不友好。

`sourceMap` 是解决这个问题的方法， `sourceMap` 表现在生成文件和源文件之间的映射，通过 `sourceMap` 可以将生成文件的每一行每一列一一对应到源文件中去。

## sourceMap

一份 `sourceMap` 的格式如下：

```json
{
    "version": 3, // Source Map版本
    "file": "out.js", // sourceMap 相关联的生成文件（可选）
    "sourceRoot": "", // 源文件所在的目录。如果与源文件在同一目录，该项为空。（可选）
    "sources": ["foo.js", "bar.js"], // 源文件名列表。
    "sourcesContent": ["foo.js 的内容", "bar.js 的内容"], // 源文件内容列表（可选，和源文件列表顺序一致）
    "names": ["src", "maps", "are", "fun"], // 源文件的所有变量名和属性名。
    "mappings": "A,AAAB;;ABCDE;" // 带有编码映射数据的字符串
}
```

其中最重要的属性是 `sources`, `sourcesContent` , `mappings`。

从 `mappings` 中可以得到生成文件和源文件行列的映射关系，以及对应的哪一个源文件。

`sourcesContent` 保存的是源文件内容列表，当控制台发生打印信息时，（点击打印信息）浏览器或者微信开发者工具都是基于此来生成对应的源文件。

对于 `mappings` 的原理，比较复杂，有兴趣的可以去[了解](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)。

## source-map 工具

`sourceMap` 生成一般借助于 [source-map](https://github.com/mozilla/source-map) 库。

下面简单介绍一些 [source-map](https://github.com/mozilla/source-map) 提供的 `API` 。

### SourceMapGenerator

用于生成 `sourceMap` :

```js
var generator = new sourceMap.SourceMapGenerator({
    file: 'my-generated-javascript-file.js',
    sourceRoot: 'http://example.com/app/js/'
});
```

#### setSourceContent

添加 `source` 和 `sourceContent`，就是向 `sources` 和 `sourcesContent` 中添加源文件名和源文件内容。

```js
generator.setSourceContent('foo.js', fs.readFileSync('path/to/foo.js'));
```

#### addMapping

添加单个 `mapping` 。接收的参数如下：

-   `generated`: An object with the generated line and column positions.
-   `original`: An object with the original line and column positions.
-   `source`: The original source file (relative to the sourceRoot).
-   `name`: An optional original token name for this mapping.

```js
generator.addMapping({
    source: 'foo.js',
    // 源文件行列
    original: { line: 128, column: 0 },
    // 生成文件行列
    generated: { line: 3, column: 456 }
});
```

### SourceMapConsumer

用于解析 `sourceMap` :

```js
// 接收一个 sourceMap 对象
const consumer = await new sourceMap.SourceMapConsumer(rawSourceMapJsonData);

// 当不使用时，需要销毁
consumer.destroy();
```

#### originalPositionFor

给定生成文件的行列，返回对应源文件的行列。 `column` 可缺省。

```js
consumer.originalPositionFor({
    line: 2,
    column: 10
});
// { source: 'foo.js',
//   line: 2,
//   column: 2,
//   name: null }

consumer.originalPositionFor({
    line: 9999999,
    column: 9999999
});
// { source: null,
//   line: null,
//   column: null,
//   name: null }
```

#### generatedPositionFor

和 `consumer.originalPositionFor` 方法相反。但 `column` 必须提供。

#### allGeneratedPositionsFor

给定源文件的行列，返回所有对应生成文件的行列。

```js
consumer.allGeneratedPositionsFor({ line: 2, source: 'foo.js' });
// [
//   { line: 54, column: 0, lastColumn: 8 },
//   { line: 54, column: 17, lastColumn: 19 },
//   { line: 54, column: 9, lastColumn: 16 }
// ]
consumer.allGeneratedPositionsFor({ line: 2, column: 10, source: 'foo.js' });
//   { line: 54, column: 17, lastColumn: 19 },
```

#### computeColumnSpans

为每一个生成的 `mapping` 计算最后一列。

```js
consumer.allGeneratedPositionsFor({ line: 2, source: 'foo.js' });
// [
//   { line: 54, column: 0},
//   { line: 54, column: 17},
//   { line: 54, column: 9}
// ]
consumer.computeColumnSpans();
consumer.allGeneratedPositionsFor({ line: 2, source: 'foo.js' });
// [
//   { line: 54, column: 0, lastColumn: 8 },
//   { line: 54, column: 17, lastColumn: 19 },
//   { line: 54, column: 9, lastColumn: 16 }
// ]
```

> 但实际测试，即使不调用 `computeColumnSpans` 方法， `allGeneratedPositionsFor` 也会返回 `lastColumn` 属性。

#### sourceContentFor

返回 `source` 对应的 `sourceContent` 。

```js
consumer.sources;
// [ "foo.js" ]
consumer.sourceContentFor('foo.js');
// foo.js 内容
```

#### eachMapping

遍历 `mappings` ，获取转换前后的信息。

```js
consumer.eachMapping(function(m) {
    console.log(m);
});
// {
//   source: 'foo.js',
//   generatedLine: 1,
//   generatedColumn: 0,
//   originalLine: 1,
//   originalColumn: 0,
//   name: null
// }
// { source: 'foo.js',
//   generatedLine: 2,
//   generatedColumn: 0,
//   originalLine: 2,
//   originalColumn: 0,
//   name: null
// }
```

其他 `API` 阅读 [source-map 文档](https://github.com/mozilla/source-map) 。

## 一个例子：vue-loader 生成 sourceMap

对于一个 `.vue` 文件：

```vue
<template>
    <div class="hello">
        {{ msg }}
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    }
};
</script>

<style scoped>
div {
    margin: 40px 0 0;
}
</style>
```

`vue-loader` 会将其中 `script` 部分的 `js` 提取出来：

```js
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    }
};
```

提取后的 `js` 和原先的 `vue` 文件就会生成一个 `sourceMap` 。

这些 `js` 代码并没有改变，只是行的位置变了。所以只需要生成一个基于行数变化的 `sourceMap` 。

```js
// 换行正则
const splitRE = /\r?\n/g;
// 空行正则
const emptyRE = /^(?:\/\/)?\s*$/;

function generateSourceMap(
    filename,
    // 源文件内容
    source,
    // 生成文件内容
    generated,
    sourceRoot,
    pad
) {
    const map = new SourceMapGenerator({
        file: filename.replace(/\\/g, '/'),
        sourceRoot: sourceRoot.replace(/\\/g, '/')
    });
    let offset = 0;
    if (!pad) {
        // 找到行数的偏移量
        offset =
            source
                .split(generated)
                .shift()
                .split(splitRE).length - 1;
    }
    map.setSourceContent(filename, source);
    generated.split(splitRE).forEach((line, index) => {
        if (!emptyRE.test(line)) {
            // 为每一个非空行生成 sourceMap
            map.addMapping({
                source: filename,
                original: {
                    line: index + 1 + offset,
                    column: 0
                },
                generated: {
                    line: index + 1,
                    column: 0
                }
            });
        }
    });
    return JSON.parse(map.toString());
}
```

## convert-source-map 工具

使用 `webpack` 生成 `sourceMap` 时， `webpack` 提供了多种模式，例如：

1. 生成 `sourceMap` 文件（例如：`foo.js.map`），并在生成文件的最后添加 `//# sourceMappingURL=foo.js.map` 。
2. 不生成 `sourceMap` 文件，将字符串化后的 `sourceMap` 信息使用 `dataURL` 存储，这些 `sourceMap` 信息会被 `Base64` 编码。

如果想快速从这些格式中获取 `sourceMap` 对象，或者将 `sourceMap` 对象转换为这些格式，可以借助 [convert-source-map](https://www.npmjs.com/package/convert-source-map) 工具。

```js
var convert = require('convert-source-map');

var json = convert
    .fromComment(
        '//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQvZm9vLm1pbi5qcyIsInNvdXJjZXMiOlsic3JjL2Zvby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIvIn0='
    )
    .toJSON();

// 输出 {"version":3,"file":"build/foo.min.js","sources":["src/foo.js"],"names":[],"mappings":"AAAA","sourceRoot":"/"}
```

## sourceMap 合并

源文件到最终生成文件之间，一般不会只是经过一次修改，例如：`多个 loader 修改 -> babel 转码 -> terser 压缩` 等等。

每一步都会生成基于上一步生成文件的 `sourceMap` 。但最终生成的 `sourceMap` 只有一个，所以需要将这些 `sourceMap` 合并，合并原理也不难。

假设有 `oldMap` 和 `newMap` ，那么能从 `newMap` 中获取到当前生成文件与上一步生成文件之间的行列对应关系，再通过 `oldMap` 得到与源文件的行列对应关系。

```js
let oldMapConsumer = await new SourceMapConsumer(oldMap);
let newMapConsumer = await new SourceMapConsumer(newMap);
let mergedMapGenerator = new SourceMapGenerator();

newMapConsumer.eachMapping(function(m) {
    if (m.originalLine == null) return;
    let origPosInOldMap = oldMapConsumer.originalPositionFor({
        line: m.originalLine,
        column: m.originalColumn
    });
    if (origPosInOldMap.source == null) return;
    mergedMapGenerator.addMapping({
        original: {
            line: origPosInOldMap.line,
            column: origPosInOldMap.column
        },
        generated: {
            line: m.generatedLine,
            column: m.generatedColumn
        },
        source: origPosInOldMap.source,
        name: origPosInOldMap.name
    });
});
```

[source-map](https://github.com/mozilla/source-map) 库提供合并 `sourceMap` 的方法 :

```js
const oldMapConsumer = await new SourceMapConsumer(oldMap);
const newMapConsumer = await new SourceMapConsumer(newMap);

let generate = SourceMapGenerator.fromSourceMap(newMapConsumer);
generate.applySourceMap(oldMapConsumer);
```

`applySourceMap(sourceMapConsumer[, sourceFile[, sourceMapPath]])` 方法的参数如下：

-   `sourceMapConsumer`: 旧的 `sourceMap` 所构建的 `sourceMapConsumer` 。
-   `sourceFile`: 可选的。 `oldMap` 所对应的生成文件名。缺省时会取 `oldMap.file` , `oldMap.file` 没有时会抛错。（注意，这个属性会被严格校验，只有上面示例代码中的 `m.source === sourceFile` ，才会合并）
-   `sourceMapPath`: 可选的。 `oldMap` 所在目录. 一般只在新旧 sourceMap 不在同一目录时需要。

> 大多数工具，例如 `terser`, `babel` 都支持传入 `sourceMap` ，而免去手动合并 `sourceMap` 的过程。

## babel sourceMap

如果是对 `js` 进行修改，大多时候会使用 `babel` ：

```js
import { parse } from '@babel/parser';
import generate from '@babel/generator';

const code = 'class Example {}';
const ast = parse(code);

const output = generate(
    ast,
    {
        sourceMaps: true,
        sourceFileName: 'utils.js'
    },
    code
);
```

使用 `generator` 将 `ast` 转换为 `code` 时，指定 `sourceMaps: true` 可以生成 `sourceMap` ，这里 `sourceMap` 对应的源文件是 `parse` 解析时的 `code` 。

在多个 `loader` 之间如果能共享 `ast` ，那将避免 `sourceMap` 合并以及过程中额外 `generate` 的耗时。

### babel transform

在 [babel.transform](https://www.babeljs.cn/docs/babel-core) 转码时，可以提供一个 [inputSourceMap](https://www.babeljs.cn/docs/options#inputsourcemap) 选项，当输出 `sourceMap` 时会将 `inputSourceMap` 和 `babel` 转码产生的 `sourceMap` 合并。

```js
import { transform } from '@babel/core';
transform(code, { inputSourceMap: rawSourceMapJsonData, sourceMaps: true }, function(err, result) {
    result; // => { code, map, ast }
});
```

`inputSourceMap` , 只会在 `transform` 输出 `sourceMap` 时有效。

如果想复用 `transform` 产生的 `ast` ，然后对这个 `ast` 做一些修改，最后由 `@babel/generator` 输出 `code` 和 `sourceMap` ，那还是需要手动合并两次 `inputSourceMap` 和 `@babel/generator` 生成的 `sourceMap` 。

## 参考文章

1. [JavaScript Source Map 详解](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)
2. [Source Map 不同模式对比](https://www.jianshu.com/p/721b0d26e1ea)
3. [source-map](https://github.com/mozilla/source-map)
4. [convert-source-map](https://www.npmjs.com/package/convert-source-map)
5. [merge-source-map](https://github.com/keik/merge-source-map)
6. [babel.transform](https://www.babeljs.cn/docs/babel-core)
7. [vue-loader](https://github.com/vuejs/vue-loader)
8. [Webpack Loader Interface](https://webpack.docschina.org/api/loaders/)
