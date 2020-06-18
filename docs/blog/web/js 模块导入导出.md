---
meta:
  - title: js 模块导入导出
    time: 2020-01-09 9:38:32
    tag: js,模块
---

# js 模块导入导出

## 前言

模块导出导入，现在有主要是两种方法：

1. es6: export 和 import
2. commonjs: module.exports（exports）和 require

一直在稀里糊涂的用，知道一些区别，但又有很多不明白的地方，经过查阅各种资料后作一个总结。

<!-- more -->

## ES6 模块与 CommonJS 模块的差异

除了语法差异外，它们的特性还有着巨大区别：

1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

**对于差异二**

CommonJS 加载的是一个对象（即 module.exports 属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

**对于差异一**

CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。（除非是对象，或通过函数获得模块中的这个值）

```JavaScript
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};


// main.js
var mod = require('./lib');

console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3
```

ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令 import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的 import 有点像 Unix 系统的“符号连接”，原始值变了，import 加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

通俗的讲，ES6 模块每次取值时是动态的去模块内部取值。所以能获取到改变后的值。

```javascript
// lib.js
export let counter = 3;
export function incCounter() {
  counter++;
}

// main.js
import { counter, incCounter } from "./lib";
console.log(counter); // 3
incCounter();
console.log(counter); // 4
```

同时 ES6 引入的模块变量不能重新赋值，是只读的，但 Object 可以改变内部的值，指向的地址不能改变。

## 模块加载

### 浏览器加载

CommonJS 实际是 nodejs 的模块管理方法，在浏览器里（html 文件）不能加载。但 ES6 可以在浏览器中加载。

浏览器加载 ES6 模块，也使用`<script>`标签，但是要加入 `type="module"`属性。

```html
<script type="module" src="./foo.js"></script>
```

浏览器对于带有`type="module"`的`<script>`，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了`<script>`标签的`defer`属性。如果有多个会按照在页面出现的顺序依次执行。

对于像这样外部的模块，有几点需要注意。

1. 代码是在模块作用域之中运行，而不是在全局作用域运行。模块内部的顶层变量，外部不可见。
2. 模块脚本自动采用严格模式，不管有没有声明 use strict。
3. 模块之中，可以使用 import 命令加载其他模块（.js 后缀不可省略，需要提供绝对 URL 或相对 URL），也可以使用 export 命令输出对外接口。
4. 模块之中，顶层的 this 关键字返回 undefined，而不是指向 window。也就是说，在模块顶层使用 this 关键字，是无意义的。
5. 同一个模块如果加载多次，将只执行一次。

ES6 模块也允许内嵌在网页中，语法行为与加载外部脚本完全一致。

```html
<script type="module">
  import utils from "./utils.js";

  // other code
</script>
```

**注意：**如果是在本地 html 文件中加载本地 js 文件中的 es6 模块，会出现跨域问题。这时，应当将它们放到一个 web 服务器中。

### Node 加载 ES6 模块

Node 要求 ES6 模块采用 `.mjs` 后缀文件名。也就是说，只要脚本文件里面使用 import 或者 export 命令，那么就必须采用 `.mjs` 后缀名。require 命令不能加载 `.mjs` 文件，会报错，只有 import 命令才可以加载 `.mjs` 文件。反过来，`.mjs` 文件里面也不能使用 require 命令，必须使用 import。

目前，这项功能还在试验阶段。安装 Node v8.5.0 或以上版本，要用--experimental-modules 参数才能打开该功能。

这里就比较复杂了，直接看 es6 手册：

[es6 模块加载](http://es6.ruanyifeng.com/#docs/module-loader)

## webpack 模块

node 其实并不能完美支持 es6 的模块（有许多限制），但现在 webpack 又能使用 ES6 模块的语法，原因在于，webpack 有自己的模块管理系统，它兼容了所有的模块规范。

在这里所有的 ES6 模块语法都会被转换成 CommonJS 语法。

### 导出模块

```JavaScript
export default 123;

export const a = 123;

const b = 3;
const c = 4;
export { b, c };

// 转换为
exports.default = 123;
exports.a = 123;
exports.b = 3;
exports.c = 4;
exports.__esModule = true;
```

将所有输出都赋值给 exports，并带上一个标志 \_\_esModule 表明这是个由 es6 转换来的 commonjs 输出。

### 引入模块

#### 引入 default

```JavaScript
import a from './a.js';

// 转换为
var a = require('./a.js').default
```

在 es6 中 `import a from './a.js'` 的本意是想去引入一个 es6 模块中的 default 输出。

而`var a = require('./a.js')`引入的是整个`exports`对象，而上面导出是将`default`输出赋值给了`exports.default`，所以显式改变了 a 的值为 `default` 输出。

#### 引入 \*

```javascript
import * as a from "./a.js";

// 转换为
var a = require("./a.js");
```

#### 导入某个变量

```javascript
import { a } from "./a.js";

// 转换为
var a = require("./a.js").a;
```

`import * as a from './a.js'` 将 es6 模块的所有命名输出以及 defalut 输出打包成一个对象赋值给 a 变量。

对于 CommonJs 直接 require 导入整个对象就能满足要求。

### require 引入 es6 模块

由于 es6 模块最后也是转换为 CommonJS 模块，require 自然也能引入 es6 export 语法的模块。

#### babel5

```JavaScript
export default 123;
var foo = require('./a.js')

```

因为当只有一个 default 输出时，babel5 会将 default 直接复制给 exports，所以可以这样引入。

#### babel6（以后）

```JavaScript
export default 123;
var foo = require('./a.js').default
```

### UI 库的按需加载原理

```JavaScript
import { Button, Select } from 'element-ui'

//转换为
var a = require('element-ui');
var Button = a.Button;
var Select = a.Select;

```

这样会引入全部组件。

借助`babel-plugin-component`插件，可以

```JavaScript
import { Button, Select } from 'element-ui'

//转换为
import Button from 'element-ui/lib/button'
import Select from 'element-ui/lib/select'

```

所以，对于大多数 UI 库，都是这样的目录

```
|-lib
||--component1
||--component2
||--component3
|-index.common.js

```

**更详细的介绍**：
[import、require、export、module.exports 混合使用详解](https://juejin.im/post/5a2e5f0851882575d42f5609#heading-4)

## es6 模块语法

### export

```javascript

// 导出单个特性
export let name1, name2, …, nameN; // also var, const
export let name1 = …, name2 = …, …, nameN; // also var, const
export function FunctionName(){...}
export class ClassName {...}

// 导出列表
export { name1, name2, …, nameN };

// 重命名导出
export { variable1 as name1, variable2 as name2, …, nameN };

// 默认导出
export default expression;
export default function (…) { … } // also class, function*
export default function name1(…) { … } // also class, function*
export { name1 as default, … };

// Aggregating modules
export * from …;
export { name1, name2, …, nameN } from …;
export { import1 as name1, import2 as name2, …, nameN } from …;
export { default } from …;

```

`export xx from 'path'`，在当前模块导出其他模块，等于：

```javascript
import { xx } from "path";

export { xx };
```

`export`命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。下面直接导出一个变量是错误的。

```JavaScript
// 报错
export 1;

// 报错
var m = 1;
export m;

// 报错
function f() {}
export f;

//正确
export var m = 1;

//正确
var m = 1;
export {m};

//正确
var n = 1;
export {n as m};
```

### import

```javascript
import defaultExport from "module-name";
import * as name from "module-name";
import { export } from "module-name";
import { export as alias } from "module-name";
import { export1 , export2 } from "module-name";
import { foo , bar } from "module-name/path/to/specific/un-exported/file";
import { export1 , export2 as alias2 , [...] } from "module-name";
import defaultExport, { export [ , [...] ] } from "module-name";
import defaultExport, * as name from "module-name";
import "module-name";
// 动态导入
var promise = import("module-name");
```

直接 `import name from 'path'` 导入的是`export default`

默认导出和其他导出一起导入时，`default`导入必须首先声明：

```JavaScript
import myDefault, {foo, bar} from '/modules/my-module.js';

```

`import "module-name"`，不导入模块中的任何内容，会运行模块中的全局代码。

动态导入，返回一个 promise 对象：

```JavaScript
import('/modules/my-module.js')
  .then((module) => {
    // Do something with the module.
  });

```

## 参考资料

1. [es6 手册 模块](http://es6.ruanyifeng.com/#docs/module)

2. [import、require、export、module.exports 混合使用详解](https://juejin.im/post/5a2e5f0851882575d42f5609#heading-4)

3. [MDN import](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import#%E8%AF%AD%E6%B3%95)
