---
meta:
  - title: Eslint使用和问题
    time: 2020-07-02 10:54:04
    tag: eslint,工具使用
---

# Eslint Eslint 使用和问题

## 使用

### 规则

```js
module.exports = {
  rules: {
    strict: 0,
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        MemberExpression: 1,
        ArrayExpression: 1,
        FunctionDeclaration: {
          parameters: 'first'
        },
        CallExpression: {
          arguments: 1
        },
        ImportDeclaration: 'first',
        ObjectExpression: 1
      }
    ],
    'no-sequences': 'error',
    'linebreak-style': 'off',
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'semi-style': ['error', 'last'],
    'semi-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],
    camelcase: 'off',
    'default-case': 'error',
    'no-new-func': 'error',
    'no-void': 'error',
    'array-bracket-spacing': ['error', 'never'],
    'no-tabs': 'error',
    'no-var': 'error',
    'one-var': ['error', 'never'],
    'prefer-const': [
      'error',
      {
        destructuring: 'all'
      }
    ],
    'no-trailing-spaces': 'error',
    'operator-assignment': ['error', 'always'],
    'dot-location': ['error', 'property'],
    'no-alert': 'error',
    'no-else-return': [
      'error',
      {
        allowElseIf: false
      }
    ],
    'no-case-declarations': 'off',
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error', 'trace']
      }
    ],
    'no-unused-vars': 'error',
    'no-multi-spaces': 'error',
    'valid-jsdoc': 'warn',
    eqeqeq: 'error',
    'guard-for-in': 'warn',
    'no-multi-str': 'error',
    'no-return-await': 'error',
    'no-return-assign': 'error',
    'no-throw-literal': 'error',
    'no-undef-init': 'error',
    'no-use-before-define': 'warn',
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true,
        mode: 'strict'
      }
    ],
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],
    'space-before-blocks': [
      'error',
      {
        functions: 'always',
        keywords: 'always',
        classes: 'always'
      }
    ],
    'spaced-comment': ['error', 'always'],
    'space-infix-ops': 'error',
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],
    'no-useless-constructor': 'warn',
    'comma-dangle': ['error', 'never'],
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],
    'space-before-function-paren': ['error', 'always'],
    'no-param-reassign': 'warn',
    'object-curly-spacing': ['error', 'always'],
    // 数组中存在对象时
    // 第一个对象和最后一个对象和数组的 "[]" 符号之间的换行
    'array-bracket-newline': [
      'error',
      {
        multiline: true
      }
    ],
    // 属性与属性之间换行
    'object-property-newline': [
      'error',
      {
        allowAllPropertiesOnSameLine: false
      }
    ],
    // 花括号换行配置
    'object-curly-newline': [
      'error',
      {
        // 对象字面量时换行
        ObjectExpression: {
          multiline: true,
          minProperties: 1
        },
        // 解构赋值属性内部或属性之间有换行符要求换行符
        ObjectPattern: {
          multiline: true
        },
        // import 换行
        ImportDeclaration: {
          multiline: true,
          minProperties: 4
        },
        // export 导出超过三个或导出对象内部有换行时换行
        ExportDeclaration: {
          multiline: true,
          minProperties: 3
        }
      }
    ],
    // 强制 "(" 号右边 和 ")" 号左边无空格
    'space-in-parens': ['error', 'never'],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        next: '*',
        prev: ['const', 'let', 'var']
      },
      {
        blankLine: 'any',
        next: ['const', 'let', 'var'],
        prev: ['const', 'let', 'var']
      },
      {
        blankLine: 'always',
        next: 'export',
        prev: '*'
      }
    ]
  }
}
```

### globals

```js
'globals': {
  'Velocity':true
}
```

### vue 添加 eslint

安装插件：

```bash
yarn add eslint-plugin-vue --dev
```

`vscode` 添加 `eslint` 和 `vetur` 插件。

最新 vscode 不需要额外的用户配置，也可保存自动修复代码。

### 检测隐藏文件

默认情况下，eslint 不会检测隐藏文件——以 `.` 开头的文件夹或文件。

在 `.eslintignore` 配置：

```text
!/src/**
```

以 `!` 开头的行是否定模式。这样会检测 `src/` 下的所有文件，包括隐藏文件。

## 支持 TypeScript

安装：

```bash
yarn add -D eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

1. `@typescript-eslint/parser`：让 `eslint` 能解析 `TypeScript` 。
2. `@typescript-eslint/eslint-plugin`：针对 `TypeScript` 的相关规则。

`.eslintrc` 配置：

```js
module.exports = {
  root: true,
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array-simple',
        readonly: 'array-simple'
      }
    ]
  }
}
```

具体可查看文档：

1. [typescript-eslint 安装开始](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/readme.md)
2. [@typescript-eslint/parser](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser)
3. [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin)
4. [使用 ESLint+Prettier 规范 React+Typescript 项目](https://zhuanlan.zhihu.com/p/62401626?from_voters_page=true)

使用 `tsconfig` 中的检查，例如：在 `tsconfig` 中开启严格模式，并希望 `eslint` 能提示相关错误信息：

```js
// `.eslintrc`
module.exports = {
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json'
  }
}
```

```json
{
  "compilerOptions": {
    "strict": true
  },
  // 包含 .eslintrc.js 文件
  "include": ["src", ".eslintrc.js"]
}
```

相关 `tsconfig` 配置：

1. [详解 TypeScript 项目中的 tsconfig.json 配置](https://www.jianshu.com/p/0383bbd61a6b)
2. [TypeScript 编译选项](https://www.tslang.cn/docs/handbook/compiler-options.html)

## 问题

`es6` `class` 中出现：`Parsing error: Unexpected token =`。

**解决：**

安装 [babel-eslint](https://github.com/babel/babel-eslint)。

`.eslintrc` 配置：

```js
module.exports = {
  parserOptions: {
    parser: 'babel-eslint'
  }
}
```

配置 `plugins` 出现：`createRequire is not a function`。

**解决：**

更新 vscode。

参考文献：

1. [babel-eslint github 地址](https://github.com/babel/babel-eslint)
