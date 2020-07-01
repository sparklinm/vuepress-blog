---
meta:
  - title: Eslint使用和问题
    time: 2020-07-02 10:54:04
    tag: eslint,工具使用
---

# Eslint 使用和问题

`es6` `class` 中出现：`Parsing error: Unexpected token =`。

**解决：**

安装 [babel-eslint](https://github.com/babel/babel-eslint)。

`.eslintrc` 配置：

```js
module.exports = {
  parser: "babel-eslint",
}
```

配置 `plugins` 出现：`createRequire is not a function`。

**解决：**

更新 vscode。

参考文献：

1. [babel-eslint github 地址](https://github.com/babel/babel-eslint)
