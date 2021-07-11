---
meta:
    - title: cjs 的简单 tree-shake
      time: 2021-07-01 16:13:09
      tag: babel,js
---

# cjs 的简单 tree-shake

## 前言

对于 `es6` 模块的 `tree shake`，在[详细分析 Tree Shake 原理](./详细分析%20Tree%20Shake%20原理)一文中已经说明了实现方法。

但对于第三方依赖大多数是 `commonjs` 模块语法，无法进行 `tree shake`。这里简单记录一下如何对 `commonjs` 进行简单 `tree shake`。

<!-- more -->

## cjs "摇树"的难点

`cjs` 模块其实就是对 `exports` 对象的操作，在 `exports` 对象上添加函数变量，便是对这个函数变量的导出。要静态分析出一个对象上被添加了哪些属性，基本上是不可能实现的。同时也可以动态 `require`，很难去分析出 `require` 了哪些模块：

```js
// 动态导入
let src = './a';
let a = require(src);

// 动态导出
let key = 'a';
exports[key] = 1;

// 间接导出
let obj = exports;
obj.x = 1;

// 有条件的导出
if (condition) {
    exports.c = 1;
}
```

因为 `es6` 模块的 `tree shake` 已经是一个现成的方案，如果能将 `commonjs` 转换为 `es6` 模块，自然能对 `commonjs` 进行 `tree shake`。

但应该如何将一个动态导出的模块语法转换成一个静态导出的模块语法呢？

## @rollup/plugin-commonjs

`rollup` 是一个基于 `es6` 模块的构建工具， 其插件 [@rollup/plugin-commonjs](https://github.com/rollup/plugins/tree/master/packages/commonjs) 可以实现 `commonjs` 转换为 `es6`。

那么当使用 `@rollup/plugin-commonjs` 插件时， `rollup` 可以实现对 `commonjs` 的 `tree shake` 吗？

使用 `rollup` 打包 `main.js` 试一下：

```js
// main.js
import { x } from './common-module';
console.log(x);

// common-module.js
exports.x = 1;
exports.y = 1;

// 输入文件 main.js
var x = 1;
console.log(x);
```

可以看到 `rollup` 确实能对 `commonjs` 进行 `tree shake`。

再试试动态导出：

```js
// main.js
import { x } from './common-module';
console.log(x);

// common-module.js
exports.x = 1;
exports.y = 1;
const name = 'name';
// 动态导出
exports[name] = 1;

// 输入文件 main.js
function createCommonjsModule(fn, module) {
    return (module = { exports: {} }), fn(module, module.exports), module.exports;
}
var commonModule = createCommonjsModule(function (module, exports) {
    // 没有tree shake
    exports.x = 1;
    exports.y = 1;
    var name = 'name';
    exports[name] = 1;
});
var commonModule_1 = commonModule.x;
commonModule.y;
console.log(commonModule_1);
```

当存在动态导出时，`rollup` 也不能对 `commonjs` 进行 `tree shake`。

`commonjs` 静态导出转换为 `es6`：

```js
// commonjs
exports.x = 1;
exports.y = 1;

// 转换为 es6
let x = 1;
let y = 1;
export { x, y };
```

当只导入 `x` 时，就可以删除语句 `let y = 1;`。

而 `commonjs` 的动态导出是无法正常转换为 `es6` 的模块语法的，因为无法静态分析出具体导出了什么模块，要想转换，只有借助一个对象。例如：

```js
// commonjs 导出
exports.x = 1;
exports.y = 1;
const name = 'name';
// 动态导出
exports[name] = 1;
```

```js
// 转换为 es6 导出
exports = exports || {};
exports.x = 1;
exports.y = 1;
const name = 'name';
exports[name] = 1;

let x = exports.x;
let y = exports.y;

export { x, y };
export default exports;
```

导入时只能导入 `default`：

```js
// 导入
import { x, name } from '';
console.log(x, name);

// 转换为
import d from '';
console.log(d.x, d.name);
```

或者当导入动态导出的模块（`name`）时，直接抛出错误找不到模块。（`rollup` 的做法）

在这种情况下，即使只引入一个 `x`，也已经对 `exports` 变量进行了使用，那 `exports` 变量就不能删除。当然也不能去静态分析 `exports.y` 是否已经使用，因为对象属性的访问本身就会产生副作用（例如访问器属性），对象属性的获取也可以是动态访问（例如 `exports[name]`）。

## cjs "摇树"

通过上面的分析，`cjs` 摇树只能去处理静态导出的部分。所以单从 `tree shake` 的角度来看，并不需要将 `commonjs` 模块语法转换为 `es6` 模块语法，只需要知道引入了哪些模块和导出了哪些模块。

### 具体属性的静态导出

```js
// 具体到某个属性的静态导出
exports.a = 1;
exports.default = 2;

// 声明提前
let a = 1;
exports.a = a;
let _default = 2;
exports.default = _default;
```

存储导出模块名字和语句：

```js
{
    'a' : node path
}
```

### 顶级作用域

```js
// 顶级作用域
exports.a = 1;

// 有条件的导出
if (condition) {
    // 块级作用域
    exports.c = 1;
}

// 有条件的导出
function fn1() {
    // 函数作用域
    exports.x = 1;
}
```

如果不是在顶级作用域导处，可以认为该模块是有条件导出，当是有条件导出时，同样存储这些模块。

```js
{
    'a' : node path,
    'c' : node path,
    'x' : node path,
}
```

### 嵌套在其他语句中的导出

```js
let x = (exports.x = 1);
```

这样的情况太过复杂，暂时先不处理，即：**只有 `exports.x = 1` 的父节点是根节点（`Program`）才做存储**。

### 直接赋值整个 exports

在 `commonjs` 中，模块导入其实是导入 `module.exports` 上的属性，而 `exports` 是对 `module.exports` 的引用。

```js
// 导出了 x
module.exports.x = 1;
// 导出了 y
exports.y = 2;

// 对 exports 整体赋值
// exports 和 module.exports 不是同一引用
// exports 上的所有导出将没用
// 最后本文件只导出了 x
exports = {
    z: 3
};
```

当对 `exports`（`module.exports`） 整体赋值时，`exports` 和 `module.exports` 不是同一引用, `exports` 上的所有导出都将没用。

```js
module.exports.x = 1;

// 最后导出 z
module.exports = {
    z: 1
};
```

当对 `module.exports` 整体赋值时，前面 `module.exports` 上的导出都将无效。

但无论是上面哪种情况，都不需要做额外的处理，依旧正常存储 `exports`（`module.exports`）上具体属性的静态导出。这样会可能多做一些无用的分析，但不会让程序出错。

### 动态导出

```js
// 动态导出
let key = 'a';
exports[key] = 1;

// 动态导出
Object.assign(exports, { x: 1 });
```

动态给 `exports`（`module.exports`）添加属性时，无法知道具体导出的模块，不做存储，这些动态导出模块也不会被分析引入情况和被 `shake` 掉，**默认全部保留**。

### 收集使用的 exports

#### 使用具体属性

```js
let a = 1;
exports.a = a;

// 访问了 a 属性
if (exports.a) {
    // do something
}
```

如果 `exports`（`module.exports`）上的某个属性被使用过，那就不能删除对应导出语句。例如上面的 `if (exports.a)`，就无论如何都不能去删除语句 `exports.a = a;`。

只要出现访问 `exports` 上属性的语句，并且这些语句不在一个等式的左边，可以简单认为是对这个模块的使用。但如果是访问子属性，那就是对该属性的使用：

```js
// 连等情况

//exports.x 在等式左边，不算对 x 的使用
let a = (exports.x = 1);

//exports.x.y 在等式左边，但访问了 x 的子属性，算对 x 的使用
let a = (exports.x.y = 1);
```

> 访问对象属性本身就可能会有副作用（例如访问器属性），这里是假设访问 `exports` 上的属性没有副作用。但不能再去假设访问子对象的属性没有副作用。

#### 动态访问属性

如果动态访问了 `exports`（`module.exports`）上的属性，由于无法知道具体访问了哪些属性，所以**任何导出语句都不能删除**。

```js
let a = 1;
exports.a = a;

let name = 'a';
// 动态访问exports上的属性
if (exports[name]) {
}

// 动态访问
if (module.exports[name]) {
}

let e = 'export';
// 动态访问了 module 上的属性
// 无法知道是否访问了 exports 属性
// 进而无法知道访问了 exports 上的哪些属性
if (module[e][name]) {
}
```

#### 使用整体

如果使用了`exports`（`module.exports`）整体，**任何导出语句都不能删除**。

例如：将 `exports`（`module.exports`）赋值给其他变量，或是其他变量赋值给`exports`（`module.exports`），很难去分析这些变量如何被使用。

```js
// 赋值给其他变量
let obj = exports;
// 赋值给其他变量
let obj2 = obj;
// 其他变量赋值给exports
exports = obj;

// 访问
obj.x;
obj2.y;
```

例如：使用了 `Object.assign()`：

```js
let a = {};
Object.assign(a, exports);
```

这里将 `exports` 上属性赋予到 `a` 对象上，同样很难去分析 `a` 是如何被使用的。

当出现 `exports`（`module.exports`）节点时，当满足以下条件，可以粗略的判断不是对该节点的使用：

1. 该节点在等式左边
2. 等式的右边不是一个 Identifier 节点
3. 等式直接处于一个作用域语句中，例如：

    ```js
    function m() {
        // 直接在作用域语句下，不是对 exports 整体的使用
        exports = {};
    }

    if (condition) {
        // 直接在作用域语句下，不是对 exports 整体的使用
        exports = {};

        // 不直接处于作用域语句下，是对 exports 整体的使用
        let a = (exports = {});
    }
    ```

当然这个判断并不准确：

```js
// 这也会判断成对 exports 整体的使用，但其实不是
if ((exports = {})) {
}
```

通过这样的判断后，只有单纯的 `exports` 赋值语句（赋值语句不嵌套在其他语句中，且不是将其他变量赋值给 `exports`）不会被当做对 `exports` 的使用。

### 静态导入

**无论何种形式的 `commonjs` 静态导入，都要存储导入模块名。**

#### 解构赋值

```js
let { a } = require('./a');

// 嵌套在其他语句中的 require
let { b } = fn1(require('./c'));
```

存储为：

```js
{
    './a': ['a'],
    './b': ['b'],
}
```

#### 具体属性

```js
let dd = require('./d').d;
```

存储为：

```js
{
    './d': ['d'],
}
```

### 整体导入

```js
// 整体导入
let c = require('./c');
```

当整体导入时，**其实是代表导入 `c` 文件的所有模块（包括默认导出）**：

```js
{
    './c': ['default', '*'],
}
```

`default` 对应 `exports.default` 模块，`*` 对应除了 `default` 外的其他所有模块。

### 动态导入

```js
// 动态导入
let name = './a';
let a = require(name);

// 动态导入
let m = 'm';
let t = require('./a')[m];
```

当出现动态导入时，直接抛出警告。因为动态导入无法知道导入了什么模块。

提供一个配置项：`dynamicRequireTargets`，存储所有会被动态导入的文件路径。不去分析这些文件导出了什么模块，`tree shke` 也就不会 `shake` 掉该文件的模块。

### 问题

1. 属性访问时副作用
   上面的 `cjs` 摇树能可能会删除 `exports` 上的某个属性，所以要**保证访问 `exports` 上属性时不会有副作用**，如果该属性是访问器属性，那访问这个属性时就可能产生副作用。
2. 模块之间相互引用

    ```js
    exports.a = function () {
        this.b();
    };

    exports.b = function () {};
    ```

    像这样模块之间的相互引用，如果 `b` 没被导入使用，那么 `exports.b` 会被删除，而 `a` 依赖于 `b`，`a` 的运行会出问题。

## 构建工具的问题

### `__esModule`

很多构建工具（`webpack`, `rollup`等等）会在 `exports` 上添加属性 `__esModule`，表示是否是 `es6` 转换而来的 `commonjs` 模块语法。

```js
exports._esModule = true;
```

**忽略 `__esModule` 属性。**

当使用 `defineProperty` 添加 `__esModule` 属性时，特殊处理，不算对 `exports` 整体的使用。

```js
Object.defineProperty(exports, '__esModule', {
    value: true
});
```

### 整体导入

很多构建工具（`webpack`, `rollup`等等）打包的 `commonjs` 文件，引入模块的方式都是整体导入。

```js
var _toolcli = require('./toolcli');
var _getConfigs = require('./getConfigs');
var _wxaConfigs = require('./const/wxaConfigs');
```

因为是都是整体导入，所以这里的 `cjs` 摇树依然对这些文件无效。

通过作用域（`path.scope`）去分析这些引入对象（`binding`）的使用情况：

1. 动态访问属性 -> 使用了全部的导出模块。
2. 使用了对象本身 -> 使用了全部的导出模块。
3. 静态访问了具体某个属性 -> 代表该模块被使用。

但 `webpack` 在获取默认的模块时，会作一个兼容处理：

```js
import a from './a';
console.log(a);

// webpack 打包生成
var _a = _interopRequireDefault(require('./a'));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

console.log(_a.default);
```

如果 `'./a'` 是从 `es6` 文件打包生成的 `commonjs` 文件：

```js
// a.js
var a = 1;
export default a;

// webpack 打包后
Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.default = void 0;
var a = 1;
var _default = a;
exports.default = _default;
```

那么 `_a.default` 等于 `exports.default` 等于 `a`。所以访问了 `_a` 上哪些属性，就是哪些导出的模块被使用。

但如果 `'./a'` 本身就是 `commonjs` 文件：

```js
var a = 1;
exports.a = a;
```

那么 `_a.default` 等于 `exports`，`_a.default.a` 才是访问 `a` 模块。所以访问了 `_a.default` 上的哪些属性，才是对应哪些导出的模块被使用。
