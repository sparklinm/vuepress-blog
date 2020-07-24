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
}
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

## 一些总结

### object 类型问题

`Eslint` 中要求使用 `Record<string, unknown>` 代替 `object` 类型。

原因在于当对 `object` 使用 `in` 作类型判断时会出现问题：

```ts
let a: object = { foo: 'ss', x: 1 }

if ('foo' in a) {
  a.foo // Property 'foo' does not exist on type 'object'
}
```

但 `unknown` 类型无法赋值给其他类型，需要使用类型断言：

```ts
const a: Record<string, unknown> = {
  foo: 'ss',
  x: 1
}

const b: string = <string>a.foo
```

### 解构时添加类型

```ts
function test({ a }: { a: string }) {
  console.log(a)
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
    constructor(h: number, m: number) { }
    tick(){
        console.log("tick toc");
    }
    
}

let digital = createClock(DigitalClock, 12, 17);
```

如果一个 `class` 的类型满足 `ClockConstructor` ，则这个类实例化后必须有 `tick` 方法。

[typescript类类型-实例部分与静态部分详解](https://juejin.cn/post/6844903881860874254)。
