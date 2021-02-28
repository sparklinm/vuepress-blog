---
meta:
  - title: babel-parser解析js
    time: 2021-02-18 15:24:39
    tag: babel,parser
---

# @babel/parser 解析 js

## 前言

1. [@babel/parser](https://babeljs.io/docs/en/babel-parser)：将 js 代码解析为 ast 树

2. [@babel/traverse](https://babeljs.io/docs/en/babel-traverse)：遍历修改 ast 树

3. [@babel/generator](https://babeljs.io/docs/en/babel-generator)：将 ast 树生成 js 代码。

<!-- more -->

## @babel/parser

[@babel/parser](https://babeljs.io/docs/en/babel-parser)用于将 js 代码解析为 ast 树。

```js
const { parse } = require('@babel/parser');
const ast = parse('let b = a + 2');
console.log(ast);
```

打印出来的结果：

```json
{
  "type": "File",
  "start": 0,
  "end": 13,
  "loc": {
    "start": {
      "line": 1,
      "column": 0
    },
    "end": {
      "line": 1,
      "column": 13
    }
  },
  "errors": [],
  "program": {
    "type": "Program",
    "start": 0,
    "end": 13,
    "loc": {
      "start": {
        "line": 1,
        "column": 0
      },
      "end": {
        "line": 1,
        "column": 13
      }
    },
    "sourceType": "module",
    "interpreter": null,
    "body": [
      {
        "type": "VariableDeclaration",
        "start": 0,
        "end": 13,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 13
          }
        },
        "declarations": [
          {
            "type": "VariableDeclarator",
            "start": 4,
            "end": 13,
            "loc": {
              "start": {
                "line": 1,
                "column": 4
              },
              "end": {
                "line": 1,
                "column": 13
              }
            },
            "id": {
              "type": "Identifier",
              "start": 4,
              "end": 5,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 4
                },
                "end": {
                  "line": 1,
                  "column": 5
                },
                "identifierName": "b"
              },
              "name": "b"
            },
            "init": {
              "type": "BinaryExpression",
              "start": 8,
              "end": 13,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 8
                },
                "end": {
                  "line": 1,
                  "column": 13
                }
              },
              "left": {
                "type": "Identifier",
                "start": 8,
                "end": 9,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 8
                  },
                  "end": {
                    "line": 1,
                    "column": 9
                  },
                  "identifierName": "a"
                },
                "name": "a"
              },
              "operator": "+",
              "right": {
                "type": "NumericLiteral",
                "start": 12,
                "end": 13,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 12
                  },
                  "end": {
                    "line": 1,
                    "column": 13
                  }
                },
                "extra": {
                  "rawValue": 2,
                  "raw": "2"
                },
                "value": 2
              }
            }
          }
        ],
        "kind": "let"
      }
    ],
    "directives": []
  },
  "comments": []
}
```

> 可以通过[AST Explorer](https://astexplorer.net)在线查看解析结果。

在 body 下，每一层级都有一个 type 表示当前语法的类型。

不同类型的节点结构可查看 [ast 文档](https://github.com/babel/babel/blob/main/packages/babel-parser/ast/spec.md)

## @babel/traverse

[@babel/traverse](https://babeljs.io/docs/en/babel-traverse)用于遍历修改 ast 树。

```js
traverse(ast, {
  // 进入节点
  enter(path) {
    // 节点 type 是 Identifier，且含有属性 name: 'n'
    if (path.isIdentifier({ name: 'n' })) {
      path.node.name = 'x';
    }
  }

  // 退出节点
  exit(path){

  }
});
```

[@babel/types](https://babeljs.io/docs/en/babel-types#identifier)可以用于**创建对应类型的节点**，**判断节点类型**。

```js
import * as t from '@babel/types';

traverse(ast, {
  enter(path) {
    // path.isIdentifier 与这里的方法一致
    if (t.isIdentifier(path.node, { name: 'n' })) {
      path.node.name = 'x';
    }
  }
});
```

path 上的判断节点类型的方法与[@babel/types](https://babeljs.io/docs/en/babel-types#identifier)上的一致。

path 上除了类型断言，还有对当前节点进行操作的方法，例如：

```js
path.replaceWith(newNode); //替换为新的节点
path.remove(); // 删除当前节点
path.skip(); //跳过子节点
```

当使用 path.replaceWith 替换为新节点时，需要使用[@babel/types](https://babeljs.io/docs/en/babel-types#identifier)创建节点。

例如创建一个对象属性，并用于替换：

```js
import * as t from '@babel/types';

// child.name
let member = t.memberExpression(t.identifier('child'), t.identifier('name'));

traverse(ast, {
  enter(path) {
    if (t.isIdentifier(path.node, { name: 'n' })) {
      path.replaceWith(member);
    }
  }
});
```

遍历时除了使用 enter 和 exit，还可以对特定节点进行操作：

```js
traverse(ast, {
  // 对语法树中特定的节点进行操作 参考@babel/types （特定节点类型）
  // Identifier 特定节点
  Identifier(path) {
    let { node } = path;
    if (node && node.name === 'n') {
      path.replaceWith(member);
    }
  }
});
```

具体有哪些类型可以查看[@babel/types](https://babeljs.io/docs/en/babel-types#identifier)。
