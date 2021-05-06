---
meta:
    - title: new RegExp和字面量声明的正则表达式
      time: 2021-05-06 17:08:41
      tag: js,正则表达式
---

# new RegExp 和字面量声明的正则表达式

## 前言

声明正则的方式有两种：`new` 声明 `new RegExp('[a-z]')` 和字面量声明 `/[a-z]/`。如果正则表达式是动态生成的，那需要使用 `new RegExp` 的方式。对于 `new RegExp` 声明和字面量声明，它们之间其实有一些区别，不能无脑转换。

<!-- more -->

## 符号`/`

如果是字面量声明正则，当表达式中含有 `/` 需要对 `/` 进行转义。

```js
let reg1 = /\/s/;
let reg2 = new RegExp('/s');

// reg1 和 reg2 效果相同
```

## 符号`\`

先看一下以下几个正则匹配的结果：

```js
/^\\user/.test('\\user'); // true
new RegExp('^\\user').test('\\user'); // false
new RegExp('^\\\\user').test('\\user'); // true
```

对于 `'\\user'` 在 `js` 中其实就是表示字符串 `\user`，因为 `\` 是转义符。

如果要用 `new` 的方式表示字面量声明的正则 `/^\\user/`，那就必须将 `\\` 转换为 `\\\\`。

写成一个方法如下：

```js
function getRegExp(str, flag) {
    return new RegExp(str.replace(/\\/g, '\\\\', flag));
}
```

## windows 路径

`windows` 路径一般是：`a\b\c`，但在 `js` 中，因为 `\` 是转义符，所以用字符串表示为 `a\\b\\c`。用 `new` 声明的正则表达式对 `a\\b\\c` 进行匹配：

```js
function getRegExp(str, flag) {
    return new RegExp(str.replace(/\\/g, '\\\\', flag));
}

getRegExp('`a\\b\\c`').test('a\\b\\c'); //true
```
