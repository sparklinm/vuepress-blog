---
meta:
  - title: js 知识点
    time: 2019-8-20 8:2:41
    tag: js
---

# js 知识点

## 前言

实时记录在使用 `js` 过程中遇到的问题和学习到的新知识点。

<!-- more -->

## if 语句判断

### 判断真假

```javascript
if (flag) {
  console.log(true)
} else {
  console.log(false)
}
```

`flag` 判读为假时：false、0（包括+0、-0、0.0）、null、undefined、""、NaN
`flag` 判读为真时：对象、数组、非空字符串、true、任何定义了的函数 （空对象、空数组也为真）

### 判断空对象空数组

空数组：Array.length === 0

空对象：

1. Object.keys().length === 0
2. for...in
3. JSON.stringify() (注意抛出异常)

## 隐式转换

### 转换规则

1. null 和 undefined 自身相等，且 null == undefined，除此之外和其他任何值不宽松相等（==）。
2. NaN 不与任何值相等，包括自身。
3. x、y 为 Number 和 String 类型时，则转换为 Number 类型比较。
4. 有 Boolean 类型时，Boolean 转化为 Number 类型比较。
5. 一个 Object 类型，一个 String 或 Number 类型，将 Object 类型进行 ToPrimitive (原始转换)后，按上面流程进行原始值比较。

原始值即基础类型：Undefined、 Null、 String、 Number、 Boolean、 Symbol。

简单来说：

1. 有 Number 和 Boolean，需要转换为 Number 类型比较，都是字符串直接比较。
2. 有 Object 先将 Object 调用 valueOf 或者 toString 转换，再按照 1 比较。

![img/20200630102412_fa4c0eb43e7f7f6c53e1991a7fa9c914.png](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/20200630102412_fa4c0eb43e7f7f6c53e1991a7fa9c914.png)

### ToBoolean

除了 false、0（包括+0、-0、0.0）、null、undefined、""、NaN，其他都为真。

### ToNumber

| 参数      | 结果                                                                                    |
| --------- | --------------------------------------------------------------------------------------- |
| undefined | NaN                                                                                     |
| null      | +0                                                                                      |
| 布尔      | true 转换为 1，false 转换为+0                                                           |
| 字符串    | 可解析为数字转化为数字，例如："-3.156"转换为-3.156，"asd"转换为 NaN，空字符串''转换为 0 |
| 对象      | 先进行 ToPrimitive(obj, Number)转换得到原始值，在进行 ToNumber 转换为数字               |

### ToString

| 参数      | 结果                                                                        |
| --------- | --------------------------------------------------------------------------- |
| undefined | 'undefined'                                                                 |
| null      | 'null'                                                                      |
| 布尔      | 转换为'true' 或 'false'                                                     |
| 数字      | 转换字符串，比如：1.765 转为'1.765'，1e21 转为"1e+21"                       |
| 对象      | 先进行 ToPrimitive(obj, String)转换得到原始值，在进行 ToString 转换为字符串 |

### ToPrimitive

ToPrimitive(obj, Number)

1. 先调用 obj 的 valueOf()方法，如果 valueOf()方法的返回值是一个原始值，则返回这个原始值。
2. 否则，调用这个对象的 toString()方法，如果 toString()方法返回的是一个原始值，则返回这个原始值。
3. 否则，抛出 TypeError 异常。

ToPrimitive(obj, String)

1. 先调用 obj 的 toString()方法，如果 toString()方法的返回值是一个原始值，则返回这个原始值。
2. 否则，调用这个对象的 valueOf()方法，如果 valueOf()方法返回的是一个原始值，则返回这个原始值。
3. 否则，抛出 TypeError 异常。

> 除了 Date 先调用 toString()方法，其他对象都是先调用 valueOf()。

### valueOf 和 toString

valueOf：Date 对象返回日期的毫秒数，String、Boolean、Number 返回原始值，其它对象返回对象本身。

toString：

1. Array：将数组元素用","连接成一个字符串，数组中空数组[]、null、undefined 转为空字符串，数组中 object 按照 ToPrimitive 方式转换，层叠的数组会被依次拆分。
2. 普通对象：调用 Object.prototype.toString()，返回"[object Object]"。

> Symbol 对象无法隐式转换为原始值和字符串，即隐式转换时，Symbol 对象不会自动调用 valueOf 或者 toString。

### 其他隐式转换

#### 加号

1. 如果有 String 类型，那么其他类型都会转换为 String 类型。

2. 没有 String 类型，那么都会转换为 Number 类型。

3. 有 Object 类型的，先将 Object 使用 valueOf 或 toString 转换为原始值(规则见上面 ToPrimitive)，再依据 1、2 步骤。

#### 减、乘、除、取余、大于、小于

都是转换为 Number。

#### 非元素（!）、if（condition）、与（&&）、或（||）

都是转换为 Boolean，即 ToBoolean。

`a || b`表示：`a`转换成 Boolean 为真，返回 `a`，否则返回 `b`。

`a && b`表示：`a`转换成 Boolean 为真，返回 `b`，否则返回 `a`。

`a && b || c`表示：先执行`a && b`，返回值再和`c`运算。

1. `a` 为真，且 `b` 为真，返回 `b`；
2. `a` 为真，但 `b` 为假，返回 `c`；
3. `a` 为假，返回 `c`。
4. 即只有`a`、`b`同真时返回`b`，否则返回`c`。

### 参考文献

1. [你所忽略的 js 隐式转换](https://juejin.im/post/5a7172d9f265da3e3245cbca#heading-7)
2. [从一道面试题说起—js 隐式转换踩坑合集](https://juejin.im/post/5a7172d9f265da3e3245cbca#heading-7)
3. [JS 隐式转换](https://www.jianshu.com/p/a429e4940c33)
4. [Js 中那些 隐式转换](https://www.cnblogs.com/ihboy/p/6700059.html)

## parseInt、isNaN 和 Number 注意点

### parseInt

语法：parseInt(string [ , radix])

参数：

- string

  1. string 的开头和结尾的空格会被忽略
  2. string 的第一个字符不能被转换为数字，返回 NaN。
  3. 第一个字符能转换为数字，检查第二字符，直到发现不能转换成有效数字的字符，把这个字符之前的字符串转换为数字
  4. string 以 "0x" 开头，其余部分解析为十六进制的整数，但返回十进制数。

  > string 以"0"为开始时旧的浏览器默认使用八进制基数。ECMAScript 5，默认的是十进制的基数。

- radix：表示基数，可选，指定 string 的的进制
  1. 介于 2 ~ 36
  2. 如果指定的进制和前面 string 不符，返回 NaN，例如：parseInt("30",2)

### Number

对应上面的 ToNumber 规则。

### Number 和 parseInt 区别

1. Number 对于字符串转数字会比 parseInt 更为严格，Number 是字符串中有无法转换为数字的字符，直接返回 NaN。
2. parseInt 只能转换字符串，对于其他类型，都需要按照相应规则先转换为字符串。

### isNaN

isNaN() 函数，对于非 Number 的参数，会首先将其转换为 Number。

1. 数字形式的字符串。例如 "123"、"-3.14"，虽然是字符串型，但被 isNaN() 判为数， 返回 false。（"12,345,678"，"1.2.3" 这些返回 true）
2. 空值。null、空字符串""、空数组[]，都可被 Number()合法的转为 0，于是被 isNaN 认为是数，返回 false。（undefined、空对象{}、空函数等无法转数字，返回 true）
3. 布尔值。Number(true)=1,Number(false)=0，所以 isNaN 对布尔值也返回 false。
4. 长度为 1 的数组。结果取决于其中元素，即：isNaN([a])=isNaN(a)，可递归。例如 isNaN([["1.5"]])=false。
5. 数字特殊形式。例如"0xabc"、"2.5e+7"，这样的十六进制和科学计数法，即使是字符串 也能转数字，所以也返回 false。
