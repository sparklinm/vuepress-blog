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
        // import 导入不换行
        ImportDeclaration: 'never',
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

最新vscode 不需要额外的用户配置，也可保存自动修复代码。

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
