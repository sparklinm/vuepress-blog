---
meta:
    - title: 详细分析 Tree Shake 原理
      time: 2021-06-23 15:50:44
      tag: js,babel
---

# 详细分析 Tree Shake 原理

## 前言

什么是 `tree shake`，借用 `webpack` 官网的一句话：

“你可以将应用程序想象成一棵树。绿色表示实际用到的 `source code`(源码) 和 `library`(库)，是树上活的树叶。灰色表示未引用代码，是秋天树上枯萎的树叶。为了除去死去的树叶，你必须摇动这棵树，使它们落下。”

简单来说，`tree shake` 就是将无用的代码删除掉。

在 `js` 中，无用的代码可以分为两种：

1. 单个文件内未使用的代码，例如定义一个变量 `let a = 1`，但从未使用 a 变量；
2. 一个文件内导出了一个模块 `export function a(){}`，这个模块从未被其他文件引入，或是引入后也未被使用。

<!-- more -->

## 死代码消除(DCE)

Dead Code 一般具有以下几个特征

-   代码不会被执行，不可到达

-   代码执行的结果不会被用到

-   代码只会影响死变量（只写不读）

看一个例子：

```js
function a() {
    // dead code
    let t = 1;

    // dead code
    if (false) {
        console.log(a);
    }

    let b = 1;
    b = 5;
    return b;

    // dead code
    let c = 10;
}
```

上面被标记的地方都是 `dead code`，即使删除也不会影响正常运行。

`UglifyJS` 和 [terser](https://github.com/terser/terser) 都可以做到 `DCE`。

上面代码被 `terser` 处理后如下：

```js
function a() {
    let n = 1;
    return (n = 5), 5;
}
```

## Tree Shake

`DCE` 主要是消除文件内部无用代码，而对于文件内部的模块是否被其他文件引用就无能为力了。

要确定一个模块是否被其他文件使用，需要追踪这个模块的导出、导入以及导入后是否被使用。对于 `ES6` 模块语法，我们能够很清楚的分析出模块是否被导出和导入，因为 `ES6` 模块语法都是在顶级作用域下的明确变量关系的静态导入导出。

在 `ES6` 模块语法之前，大多使用的 `cjs`(`commonJS`)模块语法：

```js
// a.js
exports.a = 1;

// b.js
let { a } = require('./a');
```

`cjs` 模块其实就是对 `exports` 对象的操作，在 `exports` 对象上添加函数变量，便是对这个函数变量的导出。要静态分析出一个对象上被添加了哪些属性，基本上是不可能实现的。同时也可以动态 `require`，很难去分析出 `require` 了哪些模块：

```js
// 动态导入
let src = './a';
let a = require(src);

// 动态导出
let key = 'a';
exports[key] = 1;

// 动态导出
let obj = exports;
obj.x = 1;

// 有条件的导出
if (condition) {
    exports.c = 1;
}
```

实现模块的 `tree shake` 大致分为以下 3 个步骤：

1. 当 `import` 了一个模块后，但未使用这个模块，去除该 `import` 语法。
2. 在 `1` 之后，收集各个文件的 `import` 和 `export` 语法。
3. 根据这些 `import` 和 `export` 去标记哪些 `export` 被导入过。
4. 去除 `3` 之后未被标记的模块（未被导入的模块）。

## 去除未被使用的 import 语法

假设入口文件是 `index.js`，其内容如下：

```js
// 原文件
import { ma } from './a';
import { mb } from './b';

console.log(ma);
```

因为 `mb` 未被使用，所以去除相应 `import` 语句后如下：

```js
// 去除后
import { a } from './a';
import './b';

console.log(a);
```

这里还是要引入 `b` 这个文件 `import './b'`，因为引入文件本身就可能会有副作用，例如 `b` 文件代码：

```js
// b 文件

// 给 window 添加了一个属性，属于副作用
window.x = 1;
export let b = 1;
```

一个文件是否有副作用只有开发者自己知道，所以我们可以通过配置一个 `sideEffects` 目录列表，来指明哪些文件有副作用。

```js
sideEffects: ['./b'];
```

对于上面的 `import './b'`，如果 `b` 文件目录没在 `sideEffects` 中，可以直接删除该语句。这样最后依赖分析自然不会分析到 `b` 文件，`b` 文件也不会出现在最终打包结果中。

知道了原理，接下来就是使用 `babel` 相关工具来修改 `js` 代码。

使用 [@babel/parser](https://babeljs.io/docs/en/babel-parser) 将 `js` 代码解析为 `ast` 树，[@babel/traverse](https://babeljs.io/docs/en/babel-traverse) 遍历修改 `ast` 树。

更多详细有关 [@babel/parser](https://babeljs.io/docs/en/babel-parser) 和 [@babel/traverse](https://babeljs.io/docs/en/babel-traverse) 的用法请阅读官方文档和另外两篇文章：

1. [babel-parser 解析 js](./babel-parser解析js)
2. [babel/traverse 常用方法整理](./babel-traverse常用方法整理)

```js
const traverse = require('@babel/traverse').default;
const { parse } = require('@babel/parser');
const t = require('@babel/types');

let ast = parse(
    `
    import { ma } from './a';
    import { mb } from './b';

    console.log(ma);
    `
);

traverse(ast, {
    enter: path => {}
});
```

如何分析引入了哪些模块，这些模块是否有使用到？在回答这个问题之前，先来了解 `JS` 的作用域（`scope`）。

```js
// top scope

function scopeOnce() {
    // scope 1

    var ref = 'This is a binding'; // a binding

    ref; // This is a reference to a binding

    function scopeTwo() {
        // scope 2

        ref; // This is a reference to a binding from a lower scope

        if (ref) {
            // scope 3
        }
    }
}
```

最外层是顶级作用域，函数内是函数作用域，`{}` 内是块级作用域。

在 `JavaScript` 中，每当你创建了一个引用，不管是通过变量（`variable`）、函数（`function`）、类型（`class`）、参数（`params`）、模块导入（`import`）还是标签（`label`）等，它都属于当前作用域，同时这些引用被称为 `binding`。

```js
scope = {
  path: path,
  block: path.node,
  parentBlock: path.parent,
  parent: parentScope,
  bindings: [...]
}

binding = {
  identifier: node,
  scope: scope,
  path: path,
  kind: 'var',

  referenced: true, // 是否被引用
  references: 3, // 被引用次数
  referencePaths: [path, path, path], // 引用 paths

  constant: false,

  // 如果是对 binding 的直接赋值语句，将会被放入到这里，而不是放 referencePaths
  constantViolations: [path]
}
```

更多有关作用域（`path.scope`）的信息查看：[Babel 插件手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)

正如上面所说 `import` 是一个 `binding`，所以只需要遍历顶级作用域的 `binding`，将 `referenced` 为 `false` 的 `import` 节点直接删除即可。

## 按文件收集 import 和 export

### 收集 import

先看 import 节点的定义：

```js
interface ImportDeclaration <: ModuleDeclaration {
  type: "ImportDeclaration";
  importKind: null | "type" | "typeof" | "value";
  specifiers: [ ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier ];
  source: StringLiteral;
  assertions?: [ ImportAttribute ];
}
```

区别不同 `import` 语句通过 `specifiers` 里节点的类型：

```js
// specifiers: [ImportDefaultSpecifier]
import a from './a';

// specifiers: [ImportSpecifier, ImportDefaultSpecifier]
import a, { name } from './a';

// specifiers: [ImportNamespaceSpecifier]
import * as all from './a';
```

收集 `import` 语法非常简单，只需要遍历 `specifiers`，建立 **文件目录**，**引入模块名** 以及 **节点 path** 之间的关系即可：

```js

let imports ={
  'a文件绝对路径': {
    defalut: ImportDefaultSpecifier path,
    name: ImportSpecifier path,
    *: ImportNamespaceSpecifier path,
  }
}
```

### 收集 export

`export` 语句较为复杂，分为以下三种类型 `ExportNamedDeclaration`，`ExportDefaultDeclaration`，`ExportAllDeclaration`。

`ExportNamedDeclaration` 节点定义如下：

```js
interface ExportNamedDeclaration <: ModuleDeclaration {
  type: "ExportNamedDeclaration";
  declaration: Declaration | null;
  specifiers: [ ExportSpecifier ];
  source: StringLiteral | null;
  assertions?: [ ImportAttribute ];
}
```

相关示例：

```js
export function fn1() {}
let x = 1,
    y = 3;
export { x as x1, y };
export { x as default };

export { a as aa, b, c } from './a';
export * as all from './a';
export { default } from './a';
export { a as default } from './a';
export * as default from './a';
```

除了直接导出一个声明：`export function fn1() {}`，其他 `ExportNamedDeclaration` 都会有 `specifiers`。

遍历 `specifiers`，根据导出名存储对应节点 `path`：

```js
let exports = {
  'a文件绝对路径': {
    aa: ExportSpecifier path,
    b: ExportSpecifier path,
    c: ExportSpecifier path,
    all: ExportSpecifier path,
    default: ExportSpecifier path
  },
  '本文件路径': {
    x1: ExportSpecifier path,
    y: ExportSpecifier path,
    default: ExportSpecifier path
  }
}
```

对于导出一个声明，需要做适当转换：

```js
export function fn1() {}

// 转换为

function fn1() {}
export { fn1 };
```

再收集对应 `ExportSpecifier`。

为什么这里要转换？

如果不转换，当 `fn1` 没有被 `import` 时，也不能去轻易去删除这个 `export` 语句。删除 `export` 语句会连同 `fn1` 函数一起删除，而 `fn1` 函数可能在文件内部被使用。

当转换后，如果 `fn1` 没有被导入，可以直接删除 `export { fn1 }` 语句，再借助 `path.scope`，同上面去除未被使用的 `import` 一样，去除未被使用的 `bingding fn1`。

> 当插入 `fn1` 节点时，并不会给 `scope` 上添加对应 `binding`，需要使用 `path.scope.crawl()` 去重新收集 `scope` 的 `binding` 信息。

**`bingding` 的创建也会存在副作用**，例如：

```js
let b = 1;
// 声明 a 时，改变了 b 的值
let a = (b = 2);

export { a };
```

如果 `a` 变量没被 `import`，去除 `export { a }` 后，不能直接去除 `a` 声明。对于函数和类的声明，是没有副作用的，可以简单直接去除：

```js
function fn1() {}

class class1 {}
```

`ExportDefaultDeclaration` 定义如下：

```js
interface OptFunctionDeclaration <: FunctionDeclaration {
  id: Identifier | null;
}

interface OptClassDeclaration <: ClassDeclaration {
  id: Identifier | null;
}

interface ExportDefaultDeclaration <: ModuleDeclaration {
  type: "ExportDefaultDeclaration";
  declaration: OptFunctionDeclaration | OptClassDeclaration | Expression;
}
```

示例：

```js
let p1 = 1;
export default p1;
export default 1;
export default p1 = 2;
export default function() {}
export default function m() {}
export default { p1, x: 1 };
```

除了导出一个具名函数和具名类（这些函数和类可能被其他地方使用，不能直接删除 `export` 节点），其他默认导出都可以简单的直接删除 `export default` 节点。

同样将声明提取出来：

```js
export default function m() {}

// 转换为
function m() {}
export default m;
```

存储为：

```js
exports = {
  '本文件路径': {
    default: ExportDefaultDeclaration path
  }
}
```

`ExportAllDeclaration` 定义如下：

```js
interface ExportAllDeclaration <: ModuleDeclaration {
  type: "ExportAllDeclaration";
  source: StringLiteral;
  assertions?: [ ImportAttribute ];
}
```

只有这一种写法：

```js
// 导出全部
export * from './a';
```

存储为：

```js
exports = {
  '其他文件路径': {
    *: ExportAllDeclaration path
  }
}
```

## 标记和去除 export

每一个 `export` 语句添加一个 `extReferences: []` 属性，存储该 `export` 被哪些文件 `import`。

### 分析 import 和 export

遍历文件树，从每个文件的收集的 `import` 开始，到对应依赖去寻找对应的 `export` 语句，如果对应依赖没有相应 `export`，沿着模块导出语句 `export [name] from [src]` 继续向下寻找。 当找到时，沿途经过的所有 `export` 语句的 `extReferences` 属性都添加本文件（`import` 所在文件）路径。

当所有文件分析完毕后，再次遍历文件树，维护一个数组存储 `noReferencedExports` 存储所有 `extReferences` 为空的 `export` 语句。

这里有以下一些注意点：

1. `import *` 和 `export *` 不包括 `default`
2. `export * from ''` 和 `export 本文件模块` 名字冲突时，`export` 本文件优先级更高
3. 多个 `export * from ''` 之间模块名冲突，后 `export * from ''` 优先
4. `export {} from ''`， 从其他文件导出，导出的变量无法在本文件使用

### 去除 export 和 相关 binding

遍历 `noReferencedExports`，去除 `export` 节点。

使用 `path.scope` 去除相关 `binding`，与 `export` 相关的 `binding` 一般只有 `4` 种：

```js
import { ma } from './a';

function fn1() {}

class class1 {}

let t = 2;
let v = (t = 3);

export { ma, fn1, class1, v };
```

对于函数声明 `binding` 和类声明 `binding`，不会有副作用，如果 `referenced` 为 `false`， 可以直接去除。

对于变量声明 `binding`，可能存在副作用，即使 `referenced` 为 `false`，也不能直接去除。

`binding` 之间可能会互相引用：

```js
function f1() {}

function f2() {
    f1();
}
```

`f1` 只在 `f2` 函数中被引用，如果 `f2` 函数被删除，`f1` 也应该被删除。有关 `binding` 的操作方法可以查看：

1. [Babel 插件手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)
2. [babel/traverse 常用方法整理](./babel-traverse常用方法整理)

对于 `import` 声明 `binding`，以上面的 `ma` 为例，如果 `ma` 没被 `import`：

1. 去除 `export {ma}`
2. `ma` 的 `referenced` 为 `false` 去除 `import` 语句
3. 再沿着 `a` 文件找到 `ma` 的 `export` 语句，沿途经过的所有 `export` 语句的 `extReferences` 数组都删除本文件（`import` 所在文件）路径
4. 如果 `extReferences` 为空，将新 `export` 语句放入 `noReferencedExports`
5. 不断遍历 `noReferencedExports`，直到 `noReferencedExports` 为空。

## 使用 terser

变量声明 `binding`，可能存在副作用，自己实现去除这样的 `binding` 并不是一件容易的事情。

实际上，我们不需要自己去删除 `binding`，只需要删除 `export` 语句就可以了。剩下的事情属于文件内部的 `DCE`，借助 [terser](https://github.com/terser/terser) 即可：

```js
const { minify } = require('terser');
// module: true，处理 es6 模块
await minify(code, { module: true }).code;
```

这也正是 `webpack` 的 [optimization.usedExports](https://webpack.docschina.org/configuration/optimization/#optimizationusedexports) 的原理。

## 效果

使用 `tree shake` 真的能有效减少打包体积吗？这取决于你项目中有多少未使用的 `es6` 模块。

对于大多数项目而言，代码可以简单归为两类：

1. 本地代码，
2. 第三方依赖

大多数构建工具都会提供 `es6` 的模块语法，例如 `webpack`，所以本地代码很容易使用 `es6` 模块语法，进而 `tree shake`。但本地代码是自己可控的，冗余的模块都会删除，所以 `tree shake` 对本地代码作用很小。

对于第三方依赖，有些构建工具构建的 `js` 库可以输出为 `es6` 模块，例如：`rollup`，但大多数第三方库是 `commjs` 模块语法，所以 `tree shake` 对于第三方库的作用依然不理想。

当然上诉结论得出的先决条件是：1. 本地代码没有过多冗余。2. 第三方依赖基本都是 `commonjs` 模块语法。

那有办法对 `commonjs` 进行 `tree shake`吗？

上面说过，很难，但依然有办法对 `commonjs` 进行**有条件**的 `tree shake。`

具体分析，请看另一篇文章：[cjs的简单tree-shake](./cjs%20的简单%20tree-shake)

## 参考文献

1. [Tree-Shaking 性能优化实践 - 原理篇](https://juejin.cn/post/6844903544756109319)
2. [Babel 插件手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)
3. [Webpack Tree Shaking](https://webpack.docschina.org/guides/tree-shaking/)
4. [terser](https://github.com/terser/terser)
