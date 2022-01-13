---
meta:
    - title: Eslint使用和问题
      time: 2020-07-02 10:54:04
      tag: eslint,工具使用
---

# Eslint 使用和问题

## 使用

### 一些配置项

1. `root`: 如果配置文件里没有 `"root": true` 这个属性， `ESLint` 就会继续向外寻找配置文件，直到找到有`"root": true` 的为止，所有这些配置文件的规则都会被层叠应用。若有重复的属性配置，则离文件更近的配置文件具有更高的优先级。
<!-- more -->
2. `env`: 预定义那些环境需要用到的全局变量。可用的参数是： `es6`, `es2020`, `broswer`, `node`, `jquery` 等。例如添加 `jquery` 参数， `eslint` 将支持全局变量 `$` 。
3. `plugins`: 插件，**扩展 `eslint` 规则**，与 `extends` 的主要区别在于 `extends` 等同于继承另一个 `.eslintrc.js` 文件，而 `plugins` 只是扩展规则。插件名称可以省略 `eslint-plugin-` 前缀。
   使用插件定义的规则，环境或配置时，必须遵循以下约定进行引用：

    - `eslint-plugin-foo` → `foo/a-rule`
    - `@foo/eslint-plugin-<a-config-name>` → `@foo/<a-config-name>`
    - `@foo/eslint-plugin-bar` → `@foo/bar/a-environment`

    ```json
    {
        // ...
        "plugins": [
            "jquery", // eslint-plugin-jquery
            "@foo/foo", // @foo/eslint-plugin-foo
            "@bar" // @bar/eslint-plugin
        ],
        "extends": ["plugin:@foo/foo/recommended", "plugin:@bar/recommended"],
        "rules": {
            "jquery/a-rule": "error",
            "@foo/foo/some-rule": "error",
            "@bar/another-rule": "error"
        },
        "env": {
            "jquery/jquery": true,
            "@foo/foo/env-foo": true,
            "@bar/env-bar": true
        }
        // ...
    }
    ```

4. `extends`: 继承另一个配置文件的所有属性。如果有冲突，优先级是后大于前。

    有 `3` 种使用方法：

    1. 共享配置 `npm` 包。包名以 `eslint-config-` 开头。例如：`eslint-config-airbnb-base` 。使用时可省略 `eslint-config-` ，例如：`airbnb-base`。
    2. 插件。名称格式为：`plugins:<包名>/<配置名称>`，例如：`plugin:react/recommended`

        ```json
        {
            "plugins": ["react"],
            "extends": ["eslint:recommended", "airbnb-base", "plugin:react/recommended"]
        }
        ```

        **配置名称** 定义在 `configs` 属性下：

        ```js
        // .eslintrc
        module.exports = {
            rules: {}, // 省略
            configs: {
                base: require("./configs/base"),
                essential: require("./configs/essential") //  "plugin:vue/essential" 的配置就在这里
                // 其余省略...
            }
        };
        ```

        3. 配置文件路径。

        ```json
        {
            "extends": ["./node_modules/coding-standard/eslintDefaults.js"]
        }
        ```

5. `parser`: 默认 `ESlint` 使用 [Espree](https://github.com/eslint/espree) 作为解析器。除此之外还可以使用以下解析器：
    1. [@babel/eslint-parser](https://www.npmjs.com/package/@babel/eslint-parser) ，支持一些实验性语法，例如：`decorators`, `logical-assignment-operators` 等。具体可查看：[Bable Plugins List](https://www.babeljs.cn/docs/plugins-list)。当项目中使用了这些语法时，需要指定解析器为 `@babel/eslint-parser` 。
    2. [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) ，当使用 `TS` 时需要指定。
6. `parserOptions`：解析器选项。
    - `ecmaVersion`: 默认值是 5，可以设置为 3、5、6、7、8、9、10，用来指定使用哪一个 ECMAScript 版本的语法。也可以设置基于年份的 JS 标准，比如 2015(ECMA 6)。`env` 只是支持该环境下的全局变量，而 `ecmaVersion` 是支持该版本的语法特性。
    - `sourceType`: 如果你的代码是 `ECMAScript` 模块写的，该字段配置为 `module` ，否则为 `script` (默认值)。
    - `ecmaFeatures`: 该对象指示你想使用的额外的语言特性。
        - `globalReturn` - 允许 `return` 在全球范围内发表声明
        - `impliedStrict` - 启用全局严格模式（如果 `ecmaVersion` 大于等于 `5` ）
        - `jsx` - 启用 `JSX`
7. `processor`: 处理器可以从另一类型的文件中提取 `JavaScript` 代码，然后让 `ESLint` 对该 `JavaScript` 代码进行编码。

    使用方法：`<插件名称>/<处理器名称>`。例如下面的 `a-plugin` 提供的 `a-processor` 处理器：

    ```json
    {
        "plugins": ["a-plugin"],
        "processor": "a-plugin/a-processor"
    }
    ```

8. `settings`: 该字段定义的数据可以在所有的插件中共享。这样每条规则执行的时候都可以访问这里面定义的数据。
9. `overrides`: 单独为一组文件更改 `eslint` 配置。

    ```json
    {
        "rules": {},
        "plugins": ["a-plugin"],
        "overrides": [
            {
                // 以 test.js, spec.js 结尾的文件修改规则
                "files": ["*-test.js", "*.spec.js"],
                "rules": {
                    "no-unused-expressions": "off"
                }
            },
            {
                // 更改 parser 和  parserOptions 配置
                "files": "packages/istanbul-reports/lib/html-spa/src/**",
                "parser": "babel-eslint",
                "parserOptions": {
                    "ecmaVersion": 2019,
                    "ecmaFeatures": {
                        "jsx": true
                    }
                }
            },
            {
                // 指定处理器
                "files": ["*.md"],
                "processor": "a-plugin/markdown"
            }
        ]
    }
    ```

#### 参考文章

1. [最全的 Eslint 配置模板，从此统一团队的编程习惯](https://juejin.cn/post/6844903859488292871)
2. [.eslintrc 文件配置详解](https://zhuanlan.zhihu.com/p/98617401)
3. [Configuring ESLint](https://eslint.org/docs/user-guide/configuring/)

### 规则

```js
module.exports = {
    rules: {
        "strict": 0,
        "indent": [
            "error",
            2,
            {
                SwitchCase: 1,
                MemberExpression: 1,
                ArrayExpression: 1,
                FunctionDeclaration: {
                    parameters: "first"
                },
                CallExpression: {
                    arguments: 1
                },
                ImportDeclaration: "first",
                ObjectExpression: 1
            }
        ],
        "no-sequences": "error",
        "linebreak-style": "off",
        "quotes": ["error", "single"],
        "semi": ["error", "never"],
        "semi-style": ["error", "last"],
        "semi-spacing": [
            "error",
            {
                before: false,
                after: true
            }
        ],
        "camelcase": "off",
        "default-case": "error",
        "no-new-func": "error",
        "no-void": "error",
        "array-bracket-spacing": ["error", "never"],
        "no-tabs": "error",
        "no-var": "error",
        "one-var": ["error", "never"],
        "prefer-const": [
            "error",
            {
                destructuring: "all"
            }
        ],
        "no-trailing-spaces": "error",
        "operator-assignment": ["error", "always"],
        "dot-location": ["error", "property"],
        "no-alert": "error",
        "no-else-return": [
            "error",
            {
                allowElseIf: false
            }
        ],
        "no-case-declarations": "off",
        "no-console": [
            "warn",
            {
                allow: ["warn", "error", "trace"]
            }
        ],
        "no-unused-vars": "error",
        "no-multi-spaces": "error",
        "valid-jsdoc": "warn",
        "eqeqeq": "error",
        "guard-for-in": "warn",
        "no-multi-str": "error",
        "no-return-await": "error",
        "no-return-assign": "error",
        "no-throw-literal": "error",
        "no-undef-init": "error",
        "no-use-before-define": "warn",
        "key-spacing": [
            "error",
            {
                beforeColon: false,
                afterColon: true,
                mode: "strict"
            }
        ],
        "keyword-spacing": [
            "error",
            {
                before: true,
                after: true
            }
        ],
        "space-before-blocks": [
            "error",
            {
                functions: "always",
                keywords: "always",
                classes: "always"
            }
        ],
        "spaced-comment": ["error", "always"],
        "space-infix-ops": "error",
        "arrow-spacing": [
            "error",
            {
                before: true,
                after: true
            }
        ],
        "no-useless-constructor": "warn",
        "comma-dangle": ["error", "never"],
        "comma-spacing": [
            "error",
            {
                before: false,
                after: true
            }
        ],
        "space-before-function-paren": ["error", "always"],
        "no-param-reassign": "warn",
        "object-curly-spacing": ["error", "always"],
        // 数组中存在对象时
        // 第一个对象和最后一个对象和数组的 "[]" 符号之间的换行
        "array-bracket-newline": [
            "error",
            {
                multiline: true
            }
        ],
        // 属性与属性之间换行
        "object-property-newline": [
            "error",
            {
                allowAllPropertiesOnSameLine: false
            }
        ],
        // 花括号换行配置
        "object-curly-newline": [
            "error",
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
        "space-in-parens": ["error", "never"],
        "padding-line-between-statements": [
            "error",
            {
                blankLine: "always",
                next: "*",
                prev: ["const", "let", "var"]
            },
            {
                blankLine: "any",
                next: ["const", "let", "var"],
                prev: ["const", "let", "var"]
            },
            {
                blankLine: "always",
                next: "export",
                prev: "*"
            }
        ]
    }
};
```

### globals

```js
'globals': {
  'Velocity':true
}
```

### 保存自动修复

安装 `vscode` `ESLint` 插件。

```json
//setting.json文件
{
    "eslint.codeAction.showDocumentation": {
        "enable": true
    },
    // 保存时运行 eslint 修复
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "eslint.validate": ["javascript", "javascriptreact", "html", "vue"]
}
```

### 集成 prettier

`eslint` 既负责了代码质量检测，又负责了一部分的格式美化工作，而 `prettier` 则专注于格式美化，所以如果同时使用两者，那在格式美化上可能会有冲突。

如果让 `eslint` 只专注于代码质量检测，用 [prettier](https://github.com/prettier/prettier) 做格式美化，那可以使用 `eslint-config-prettier + eslint-plugin-prettier` 。

-   `eslint-config-prettier` 的作用是关闭 `eslint` 中与 `prettier` 相互冲突的规则。
-   `eslint-plugin-prettier` 的作用是赋予 `eslint` 用 `prettier` 格式化代码的能力。

```bash
yarn add eslint-config-prettier eslint-plugin-prettier prettier -D
```

```json
// .eslintrc
{
    "extends": ["eslint:recommended", "standard", "plugin:prettier/recommended"]
}
```

```js
//.prettierrc.js
// prettierrc 规则
module.exports = {
    printWidth: 120,
    tabWidth: 4,
    useTabs: false,
    singleQuote: true,
    semi: true,
    trailingComma: "es5",
    bracketSpacing: true,
    jsxBracketSameLine: false,
    arrowParens: "avoid",
    endOfLine: "auto"
};
```

每次修改 `.prettierrc.js` 都需要重启 `vscode` 。

需要注意的是如果当前 `.eslintrc` 文件中有相关代码美化的 `rules` 配置，那依然会和 `prettier` 冲突，所以当前 `.eslintrc` 文件中也不要定义与代码美化有关的规则，代码美化全部交给 `prettier` 。

#### vscode 插件

`prettier` 并非一个项目的必须使用的包，也可以只是安装 `vscode` 的 `prettier` 插件，用 `vscode` `prettier` 插件格式化，然后再用 `eslint` 修复不符合 `eslint` 规范的地方。

`vscode` `prettier` 插件会优先使用本工作区间内的 `.prettierrc.js` 中的配置。

##### 保存自动格式化

```json
//setting.json文件
{
    // 保存时自动格式化
    "editor.formatOnSave": true,
    // 设置默认格式化器为 `prettier`
    "editor.defaultFormatter": "esbenp.prettier-vscode"
    // // 也可以针对文件类型设置
    // "[javascript]": {
    //     "editor.defaultFormatter": "esbenp.prettier-vscode"
    // },
    // "[html]": {
    //     "editor.defaultFormatter": "esbenp.prettier-vscode"
    // }
}
```

这里有一个注意点：当我们开启保存时自动使用 `prettier` 格式化，并且开启了 [保存自动运行 eslint 修复](./Eslint.md#保存自动修复)，会先运行 `eslint` 修复，然后再用 `prettier` 格式化。

当两者自动修复都开启时，如果未使用 `eslint-config-prettier + eslint-plugin-prettier` 将 `prettier` 集成到 `eslint` 中，那会产生格式化冲突。

所以，我推荐以下 `2` 种组合方式：

1. `prettier` 集成到 `eslint` 中， `eslint` 做代码质量检查， `prettier` 做代码美化。这时开启或者关闭保存时自动使用 `eslint` 和 `prettier` 修复都可以。
2. `prettier` 不集成到 `eslint` 中，先用 `prettier` 美化，再用 `eslint` 修复。这时不能同时开启两者的自动保存修复。

### vue 添加 eslint

安装插件：

```bash
yarn add eslint-plugin-vue --dev
```

`vscode` 添加 `eslint` 和 `vetur` 插件。

最新 `vscode` 不需要额外的用户配置，也可保存自动修复代码。

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
        parser: "@typescript-eslint/parser"
    },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    plugins: ["@typescript-eslint"],
    rules: {
        "@typescript-eslint/array-type": [
            "error",
            {
                default: "array-simple",
                readonly: "array-simple"
            }
        ]
    }
};
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
        parser: "@typescript-eslint/parser",
        project: "./tsconfig.json"
    }
};
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

#### `es6` `class` 中出现：`Parsing error: Unexpected token =`。

**解决：**

安装 [babel-eslint](https://github.com/babel/babel-eslint)。

`.eslintrc` 配置：

```js
module.exports = {
    parserOptions: {
        parser: "babel-eslint"
    }
};
```

---

这里建议使用 [@babel/eslint-parser](https://www.npmjs.com/package/@babel/eslint-parser) ， `babel-eslint` 已经不会维护。

`@babel/eslint-parser` 可以解决更多问题，例如支持类的私有属性 `classPrivateMethods` 。

#### 配置 `plugins` 出现：`createRequire is not a function`。

**解决：**

更新 vscode。

#### Parsing error: Cannot read file '.../tsconfig.json'。

```js
// `.eslintrc.js`
module.exports = {
    parserOptions: {
        parser: "@typescript-eslint/parser",
        project: "./tsconfig.json"
    }
};
```

默认情况下 `project` 是相对于当前工作区间目录。也就是说如果 `tsconfig.json` 并不在工作区间根目录，像上面的配置会找不到 `tsconfig.json` 。

目录形式如下：

```
my-project
├── server
│   ├── .eslintrc.js
│   ├── src
│   ├── tsconfig.json
└── yarn.lock
```

**解决：**

1. 配置 `tsconfigRootDir: __dirname` 。

    ```js
    // `.eslintrc.js`
    module.exports = {
        // ...
        parserOptions: {
            project: "tsconfig.json",
            tsconfigRootDir: __dirname
        }
        // ...
    };
    ```

2. 配置 `project: 'server/tsconfig.json'` 。

## 参考文献

1. [babel-eslint github 地址](https://github.com/babel/babel-eslint)
