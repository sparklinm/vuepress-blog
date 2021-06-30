---
meta:
    - title: babel traverse 常用方法整理
      time: 2021-06-27 16:18:44
      tag: js,babel
---

# babel traverse 常用方法整理

## 前言

## 路径（path）

<!-- more -->

### 同级路径

```js
// 判断路径是否有同级节点
path.inList;

// 获取容器的key
path.listKey;

// 获取路径所在容器的索引
// 注意如果 path 没有同级 path，不会正常返回一个数字
path.key;

// 获得指定索引的同级path
path.getSibling(path.key + 1);

// 获得前面的兄弟path
path.getAllPrevSiblings();

// 获得后面的兄弟path
path.getAllNextSiblings();

// 获取路径的容器（包含所有同级path的数组）
path.container;
```

示例：

```js
var a = 1; // pathA, path.key = 0
var b = 2; // pathB, path.key = 1
var c = 3; // pathC, path.key = 2

let visitor = {
    VariableDeclaration(path) {
        // if the current path is pathA
        path.inList; // true
        path.listKey; // "body"
        path.key; // 0
        path.getSibling(0); // pathA
        path.getSibling(path.key + 1); // pathB
        path.container; // [pathA, pathB, pathC]
    }
};
```

### 插入到容器中

```ts
class NodePath<T = Node> {
    /**
     * Insert child nodes at the start of the current node.
     * @param listKey - The key at which the child nodes are stored (usually body).
     * @param nodes - the nodes to insert.
     */
    unshiftContainer<Nodes extends Node | readonly Node[]>(listKey: ArrayKeys<T>, nodes: Nodes): NodePaths<Nodes>;

    /**
     * Insert child nodes at the end of the current node.
     * @param listKey - The key at which the child nodes are stored (usually body).
     * @param nodes - the nodes to insert.
     */
    pushContainer<Nodes extends Node | readonly Node[]>(listKey: ArrayKeys<T>, nodes: Nodes): NodePaths<Nodes>;
}
```

```js
let visitor = {
    Program(path) {
        let beforeNode = t.expressionStatement(t.stringLiteral('before'));
        let beforeNodePath = path.get('body').unshiftContainer('body', nodeA);

        let afterNode = t.expressionStatement(t.stringLiteral('after'));
        let afterNodePath = path.get('body').pushContainer('body', nodeB);
    }
};
```

### path.skipKey

遍历时，跳过节点的某个属性。

```js
traverse(ast, {
    enter: path => {
        let { node } = path;

        if (node.type === 'MemberExpression') {
            // 跳过对node.property的遍历
            path.skipKey('property');
        }
    }
});
```

### path.traverse

从当前路径开始遍历。

```js
let callPath;
traverse(ast, {
    CallExpression: {
        enter: path => {
            callPath = path;
        }
    }
});

callPath.traverse({
    enter(path) {}
});
```

### path.get

获取子节点 `path`。

```js
let visitor = {
    ImportDeclaration: {
        enter: path => {
            let { node } = path;
            let specifierPaths = path.get('specifiers');
        }
    }
};
```

### 其他

其他更多操作可以查看[Babel 插件手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)

## 作用域（scope）

在 `JavaScript` 中，每当你创建了一个引用，不管是通过变量（`variable`）、函数（`function`）、类型（`class`）、参数（`params`）、模块导入（`import`）还是标签（`label`）等，它都属于当前作用域，同时这些引用被称为 `binding`。

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

作用域可以被表示为如下形式：

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

### 生成 UID

```ts
// 生成类似于 _xx, _xx2 等uid
path.scope.generateUid('xx');

// 生成一个名字唯一的 identifier 节点
path.scope.generateUidIdentifier('xx');
// Node { type: "Identifier", name: "_xx" }

// 生成一个名字唯一的 identifier 节点
// 同时插入一个 以该 identifier 节点创建的变量声明 variableDeclaration 节点，并注册绑定
// 返回该 identifier 节点的 clone 节点
path.scope.generateDeclaredUidIdentifier('xx');

// 根据指定父节点创建 identifier 节点
// 会遍历节点，根据所有 Literal 节点来组合生成一个 identifier
generateUidIdentifierBasedOnNode(parent: Node, defaultName?: string): t.Identifier;
```

### 绑定（binding）

#### 检查获取绑定

```js
// 获取指定绑定
path.scope.getBinding('xx');
// 在本作用域内获取绑定
path.scope.getOwnBinding('xx');

// 检查变量是否被绑定
path.scope.hasBinding('n');
// 在本作用域内检查变量是否被绑定
path.scope.hasOwnBinding('n');
```

对于 `getBinding()` 方法，会沿着 `scope.parent` 向上遍历。

#### 移除绑定

```js
// 移除指定绑定
path.scope.removeBinding('xx');
// 在本作用域内移除绑定
path.scope.removeOwnBinding('xx');
```

当使用 `path.remove` 移除节点时，也会移除该节点对应的绑定。

#### 添加绑定

`push` 方法可以用来添加节点并注册绑定。

```ts
function push(opts: { id: t.LVal; init?: t.Expression; unique?: boolean; kind?: 'var' | 'let' | 'const' }): void;

// 示例
let id = path.scope.generateUidIdentifier('name');
let value = t.numericLiteral(5);
path.scope.push({ id, init: value, kind: 'let' });
```

#### 注册绑定（registerBinding）

当插入一个节点时，需要手动去注册绑定。

```ts
// 注册绑定
// kind: 'var' | 'let' | 'const' | 'hoisted'
// 当为函数时为 hoisted
function registerBinding(kind: string, path: NodePath, bindingPath?: NodePath): void;

// 示例
let id = path.scope.generateUidIdentifier('name');
let value = t.numericLiteral(5);
// 创建声明节点
let declaration = t.variableDeclaration('let', [t.variableDeclarator(id, value)]);
// 当前 path 前插入节点
let declarationPath = path.insertBefore(declaration);

path.scope.registerBinding('let', declarationPath);
```

#### 注册声明（registerDeclaration）

`registerDeclaration` 其实也是注册绑定，不过是直接对声明语句使用。

```ts
// 将声明注册为绑定
function registerDeclaration(path: NodePath): void;

// 示例
let id = path.scope.generateUidIdentifier('name');
let value = t.numericLiteral(5);
// 创建声明节点
let declaration = t.variableDeclaration('let', [t.variableDeclarator(id, value)]);
// 当前 path 前插入节点
let declarationPath = path.insertBefore(declaration);

path.scope.registerDeclaration(declarationPath);
```

一般而言 `registerDeclaration` 使用场合更广泛一些，对于一个声明语句，可以直接通过 `registerDeclaration` 来注册绑定，但不一定能通过 `registerBinding` 来注册绑定。

例如一个 `import` 声明语句：

```ts
interface ImportDeclaration <: ModuleDeclaration {
  type: "ImportDeclaration";
  importKind: null | "type" | "typeof" | "value";
  specifiers: [ ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier ];
  source: StringLiteral;
  assertions?: [ ImportAttribute ];
}
```

可以使用 `registerDeclaration` 来注册，但使用 `registerBinding` 时需要遍历 `specifiers` 传入 `specifer path`。

#### 重新收集绑定（crawl）

`path.scope.crawl()` 方法会遍历该 `scope` 对应的子树，并收集 `binding` 信息。

当使用 `registerDeclaration` 或者 `registerBinding` 注册绑定时，只是单纯的添加了一个 `binding`。而 `binding` 的一些信息，例如：`referencePaths` 并不会自动收集。此时可以用 `crawl` 方法，去触发整个 `bindings` 信息的更新。

#### 删除无用绑定

根据 `binding` 的 `referenced` 信息可以确定一个绑定是否被引用。但这并不完全准确：

```js
let a = 1;
a++;
```

对于 `binding a`，`a++` 也会被当做对 `a` 的引用，但实际上 `a` 这里没有被用到，可以被删除。

## 参考文献

1. [Babel 插件手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)
2. [Babel Ast 文档](https://github.com/babel/babel/blob/main/packages/babel-parser/ast/spec.md)
