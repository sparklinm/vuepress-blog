---
meta:
    - title: 使用 TypeScript
      time: 2020-10-03 10:10:02
      tag: TypeScript,总结
---

# 使用 TypeScript

## webpack 使用 typescript

安装 [ts-loader](https://github.com/TypeStrong/ts-loader) 和 `typescript`

```bash
yarn add typescript ts-loader -D
```

<!-- more -->

`webpack.config.js` 配置：

```js
module.exports = {
    // 或者 './app.js' 也可
    entry: './app.ts',
    output: {
        filename: 'bundle.js'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.ts?$/, loader: 'ts-loader' }
        ]
    }
};
```

根目录添加 `tsconfig.json` 文件：

```json
{
    "compilerOptions": {
        "moduleResolution": "node",
        "target": "ESNext",
        "module": "es2015",
        "lib": ["es2015", "es2016", "es2017", "dom"],
        "esModuleInterop": true,
        "strictPropertyInitialization": false,
        "strict": true,
        "declaration": true,
        "allowSyntheticDefaultImports": true,
        "experimentalDecorators": true,
        "emitDecoratorMetadata": false,
        "typeRoots": ["node_modules/@types"]
    },
    "include": ["src", ".eslintrc.js"]
}
```

`tsconfig` 配置选项可查看：

1. [详解 TypeScript 项目中的 tsconfig.json 配置](https://www.jianshu.com/p/0383bbd61a6b)
2. [TypeScript 编译选项](https://www.tslang.cn/docs/handbook/compiler-options.html)

## Eslint 校验

[Eslint 校验 Typescript](../tool/Eslint.md#支持-typescript)

## Rollup 使用 Eslint

[Rollup 使用 Typescript](../tool/rollup打包发布到npm.md#打包-typescript)

## 语法

语法官方文档和博客教程已经很多了，具体可参考：

1. [一份不可多得的 TS 学习指南（1.8W 字）](https://juejin.im/post/6872111128135073806)
2. [TypeScript 中文网](https://www.tslang.cn/docs/handbook/basic-types.html)

TS 工具泛型：

1. [TS 一些工具泛型的使用及其实现](https://zhuanlan.zhihu.com/p/40311981)
2. [TS 一些工具泛型的使用及其实现(续一)](https://zhuanlan.zhihu.com/p/137745695)
3. [github utility-types](https://github.com/piotrwitek/utility-types)

官方网站在线编辑器，可供学习使用：

[TypeScript 在线编辑器](https://www.typescriptlang.org/play)

## 问题总结

### 默认 import commonjs 模块的问题

如果一个 `commonjs` 模块无类型声明（ `.d.ts` ），那么可以使用以下语法：

```js
import m from 'CJS';
```

此时 `m` 的类型为 `any` 。

但如果一个 `commonjs` 模块有类型声明，例如系统模块 `path` ，使用默认导入语法会报错：

```js
import path from 'path';
// 模块 ""path"" 只能在使用 "esModuleInterop" 标志时进行默认导入ts(1259)
// path.d.ts(167, 5): 此模块是使用 "export =" 声明的，只能在使用 "esModuleInterop" 标志时进行默认导入。
path.resolve(__dirname, './data');
```

正如这里提示的需要配置 `"esModuleInterop": true` ，才能在这种情况下使用默认导入。

在解释 `esModuleInterop` 原理之前，先来看另一个配置项：`"allowSyntheticDefaultImports": true` ，当使用这个配置时，也能在有类型声明的情况默认导入。但编译出来结果有问题：

```js
const path_1 = require('path');
const BASE_DIR = path_1.default.resolve(__dirname, '../.data');
```

可以看到编译成了 `path.default.resolve` ，无法正确访问 `resolve` 方法。

#### 原因

`ES6` 的默认导出语法转换为 `CJS` 时为：

```js
export default function m() {}
// 转换为 CJS
exports.default = function m() {};
```

即赋值给 `exports.default` 。

所以当将 `ES6` 的默认导入语法转换为 `CJS` ，会去获取 `exports.default` 上的值。

如果默认 `import` 模块本身 `ES6` 模块转换成的 `CJS` 模块，那这样没问题，就是需要获取 `exports.default` 的值。但如果默认 `import` 模块本身就是 `CJS` 模块，那这里需要获取的是模块本身，而非 `default` 属性。

可以看到，这里需要区分默认 `import` 模块是由 `ES6` 转换而来的 `CJS` 模块，还是本身就是 `CJS` 模块。

怎么区分呢？

在通过 `babel` 或是其他工具转换 `ES6` 模块语法时，会给 `exports` 对象上添加一个属性 `__esModule` 表示该模块本身是 `ES6` 模块。

```js
export default function m() {}
// 转换为 CJS
exports.default = function m() {};
exports.__esModule = true; // 这是ES6模块转换而来。
```

然后添加以下辅助函数：

```js
'use strict';
var __importStar =
    (this && this.__importStar) ||
    function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result['default'] = mod;
        return result;
    };
var __importDefault =
    (this && this.__importDefault) ||
    function(mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
exports.__esModule = true;

var foo = __importStar(require('foo'));
console.log(foo.default);
```

有 `__esModule` 时取 `exports` 对象本身，然后访问 `exports.default` 来表示默认模块。没有时，将 `exports` 赋值给 `exports.default` 。

#### 小结

`ts` 在处理默认 `import` `CJS` （有类型声明）模块时，需要配置 `"esModuleInterop": true` 选项。

这是因为默认 `import` `CJS` 模块需要分两种情况讨论：

1. `CJS` 模块是 `ES6` 模块转换而来，那默认 `import` 表示访问 `exports.default` 。
2. `CJS` 模块本身是 `CJS` 模块，那默认 `import` 表示访问 `exports` 对象。所以需要将 `exports` 赋值给 `exports.default` 。

#### 参考

[typescript 编译选项 esModuleInterop 的作用](https://blog.csdn.net/juzipidemimi/article/details/103438437)

## 语法总结

### object 类型问题

`Eslint` 中要求使用 `Record<string, unknown>` 代替 `object` 类型。

原因在于当对 `object` 使用 `in` 作类型判断时会出现问题：

```ts
let a: object = { foo: 'ss', x: 1 };

if ('foo' in a) {
    a.foo; // Property 'foo' does not exist on type 'object'
}
```

但 `unknown` 类型无法赋值给其他类型，需要使用类型断言：

```ts
const a: Record<string, unknown> = {
    foo: 'ss',
    x: 1
};

const b: string = <string>a.foo;
```

### 解构时添加类型

```ts
function test({ a }: { a: string }) {
    console.log(a);
}
```

### 类的静态部分

```ts
// 静态部分接口
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}
// 实例部分接口
interface ClockInterface {
    tick();
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): any {
    return new ctor(hour, minute);
}

class DigitalClock {
    constructor(h: number, m: number) {}
    tick() {
        console.log('tick toc');
    }
}

let digital = createClock(DigitalClock, 12, 17);
```

如果一个 `class` 的类型满足 `ClockConstructor` ，则这个类实例化后必须有 `tick` 方法。

[typescript 类类型-实例部分与静态部分详解](https://juejin.cn/post/6844903881860874254)。
