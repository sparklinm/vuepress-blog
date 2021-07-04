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

通过上面的分析，`cjs` 摇树只能去处理静态导出的部分。

### 具体属性的静态导出

对于具体到某个属性的静态导出，转换为 `es6` 模块语法，进行 `es6` 模块的 [tree shake](./详细分析%20Tree%20Shake%20原理)。

```js
// 具体到某个属性的静态导出
exports.a = 1;

// 声明提前
let a = 1;
exports.a = a;

// 转换 es6
let a = 1;
exports.a = a; // 保留原有 exports 语法
export { a };
```

`shake` 完毕后，当转换的 `es6 export` 没有 `import` 时，如果对应 `exports`（`module.exports`）导出在**本文件内没有被使用**，可以直接删除。

最后再删除全部转换的 `es6 export`。

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

如果不是在顶级作用域导处，可以认为该模块是有条件导出，这样的导出也可以转换为 `es6` 模块语法进行 `tree shake`（暂时先不处理）。

转换为：

```js
// 顶级作用域
let a = 1;
exports.a = a;

// 有条件的导出
if (condition) {
    // 块级作用域
    let c = 1;
    exports.c = c;
}

// 有条件的导出
function fn1() {
    // 函数作用域
    let x = 1;
    exports.x = x;
}

let _temp = 1;
export { a };
// 临时导出 c, x
export { _temp as c };
export { _temp as x };
```

需要知道的是，`commonjs` 模块转换的 `es6` 模块只是为了辅助 `tree shake`，所以转换的 `es6` 导出的是什么模块并不重要，只要导出的模块名正确就可以了。

### 嵌套在其他语句中的导出

```js
let x = (exports.x = 1);
```

暂时先不处理，即：只有 `exports.x = 1` 的父节点是根节点（`Program`）才做转换。

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

当出现对 `exports`（`module.exports`） 整体赋值时，`exports` 和 `module.exports` 不是同一引用, `exports` 上的所有导出都将没用。

```js
module.exports.x = 1;

// 最后导出 z
module.exports = {
    z: 1
};
```

当对 `module.exports` 整体赋值时，前面 `module.exports` 上的导出都将无效。

但无论是上面哪种情况，都不需要做额外的处理，依旧正常将 `exports`（`module.exports`）上的静态导出转换 `es6` 模块，再 `tree shake`。这样会可能多做一些无用的分析，但不会让程序出错。

### 动态导出

```js
// 动态导出
let key = 'a';
exports[key] = 1;

// 动态导出
Object.assign(exports, { x: 1 });
```

动态给 `exports`（`module.exports`）添加属性时，不作转换处理。`es6` 模块的 `tree shake` 本质是分析导入导出，然后删除未被导入的 `export` 语法，如果不转换为 `es6` 模块语法，也就意味着这个模块不会被 `shake` 掉，**默认全部保留**。

### 收集使用的 exports

```js
let a = 1;
exports.a = a;

// 访问了 a 属性
if (exports.a) {
    // do something
}
```

如果 `exports`（`module.exports`）上的某个属性被使用过，那就不能删除对应导出语句。例如上面的 `if (exports.a)`，就无论如何都不能去删除语句 `exports.a = a;`。

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

如果动态访问了 `exports`（`module.exports`）上的属性，由于无法知道具体访问了哪些属性，所以任何导出语句都不能删除。

只要出现访问 `exports` 上属性的语句，并且这些语句不在一个等式的左边，可以简单认为是对这个模块的使用。例如：`exports.a = 1;` 是对 `exports` 上属性的赋值，并不是使用。

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

如果是将 `exports`（`module.exports`）赋值给其他变量，由于很难去分析这些变量如何被使用，所以任何导出语句都不能删除。

### 静态导入

**无论何种形式的 `commonjs` 静态导入，都要转换 `es6` 导入。**

```js
// 顶级作用域导入
let { a } = require('./a');

// 嵌套在其他语句中的导入
let c = fn1(require('./c'));

function fn() {
    // 非顶级作用域的导入
    let { b } = require('./b');
}
```

保留原有 `reuqire` 语句并转换为 `es6 import` 语句：

```js
// 顶级作用域导入
let { a } = require('./a');

// 嵌套在其他语句中的导入
let c = fn1(require('./c'));

function fn() {
    // 非顶级作用域的导入
    let { b } = require('./b');
}

import { a } from './a';
import c from './c';
import { b } from './b';
```

`shake` 完毕后，删除全部转换的 `es6 import`。

### 整体导入

```js
// 整体导入
let c = require('./c');

import c from './c';
```

当整体导入时，这里转换成了 `es6` 的默认导入。**但其实这代表导入 `c` 文件的所有模块（包括默认导出）**，这里在 `tree shake` 时要做特殊处理。

一般来说，`exports.default = 1` 会被转换 `es6` 的默认导出 `export default 1`，但在这里，不应该去做转换。原因有两点：

1. `commonjs` 和 `es6` 模块混和使用的文件中，可能会因出现两个 `export default` 语句而出现 `babel` 解析出错：

    ```js
    export default 1;
    exports.default = 2;

    // 转换为
    export default 1;
    let _temp1 = 2;
    export default _temp1;
    ```

2. 上面已经将整体导入转换成了 `es6` 的默认导入。

### 动态导入

```js
let name = './a';

let a = require(name);
```

当出现动态导入时，直接抛出警告。因为动态导入无法知道导入了什么模块。

提供一个配置项：`dynamicRequireTargets`，存储所有会被动态导入的文件路径。这些文件不会被转换为 `es6` 模块语法，`tree shke` 就不会分析这些文件。

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

    像这样模块之间的相互引用是会出问题的。

## webpack 的问题

### `__esModule`

很多构建工具（`webpack`, `rollup`等等）会在 `exports` 上添加属性 `__esModule`，表示是否是 `es6` 转换而来的 `commonjs` 模块语法。

**忽略 `__esModule` 属性。**

### 全是整体导入

很多构建工具（`webpack`, `rollup`等等）打包的 `commonjs` 文件，引入模块的方式全是整体导入。

```js
let _renamer = _interopRequireDefault(require('./lib/renamer'));
let _index = _interopRequireDefault(require('../index'));
let _defaults = _interopRequireDefault(require('lodash/defaults'));
let _binding = _interopRequireDefault(require('./binding'));
let _globals = _interopRequireDefault(require('globals'));
```

因为是全是整体导入，所以这里的 `cjs` 摇树依然对这些文件无效。

通过作用域（`path.scope`）去分析这些引入对象（`binding`）的使用情况：

1. 动态访问属性 -> 使用了全部的导出模块。
2. 使用了对象本身 -> 使用了全部的导出模块。
3. 静态访问了具体某个属性 -> 代表该模块被使用。
