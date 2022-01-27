# JS

## 闭包

函数执行后返回结果是一个内部函数，并被外部变量所引用，如果内部函数持有被执行函数作用域的变量，即形成了闭包。

优点：

1. 可以从内部函数访问外部函数的作用域中的变量，且访问到的变量长期驻扎在内存中，可供之后使用
2. 避免变量污染全局

    模块封装，例如 jquert

3. 把变量存到独立的作用域，作为私有成员存在

缺点：

1. 对内存消耗有负面影响。因内部函数保存了对外部变量的引用，导致无法被垃圾回收，增大内存使用量，所以使用不当会导致内存泄漏
2. 对处理速度具有负面影响。闭包的层级决定了引用的外部变量在查找时经过的作用域链长度
3. 可能获取到意外的值(captured value)

应用：

1. 循环闭包
2. 封装模块，（变量私有化，避免污染全局）
3. 缓存

## 类数组

数组是一个特殊对象,与常规对象的区别：

1. 当由新元素添加到列表中时，自动更新 length 属性
2. 设置 length 属性，可以截断数组
3. 从 Array.protoype 中继承了方法
4. 属性为'Array'

类数组是一个拥有 length 属性，并且他属性为非负整数的普通对象，类数组不能直接调用数组方法。

类数组转换为数组：

-   使用 Array.from()
-   使用 Array.prototype.slice.call()
-   使用 Array.prototype.forEach() 进行属性遍历并组成新的数组
-   展开运算符

## promise

1. Promise 基本特性

    1. Promise 有三种状态：pending(进行中)、fulfilled(已成功)、rejected(已失败)
    2. Promise 对象接受一个回调函数作为参数, 该回调函数接受两个参数，分别是成功时的回调 resolve 和失败时的回调 reject；另外 resolve 的参数除了正常值以外， 还可能是一个 Promise 对象的实例；reject 的参数通常是一个 Error 对象的实例。
    3. then 方法返回一个新的 Promise 实例，并接收两个参数 onResolved(fulfilled 状态的回调)；onRejected(rejected 状态的回调，该参数可选)
    4. catch 方法返回一个新的 Promise 实例
    5. finally 方法不管 Promise 状态如何都会执行，该方法的回调函数不接受任何参数

2. Promise 优点

    - 统一异步 API
        - Promise 的一个重要优点是它将逐渐被用作浏览器的异步 API ，统一现在各种各样的 API ，以及不兼容的模式和手法。
    - Promise 与事件对比
        - 和事件相比较， Promise 更适合处理一次性的结果。在结果计算出来之前或之后注册回调函数都是可以的，都可以拿到正确的值。 Promise 的这个优点很自然。但是，不能使用 Promise 处理多次触发的事件。链式处理是 Promise 的又一优点，但是事件却不能这样链式处理。
    - Promise 与回调对比
        - 解决了回调地狱的问题，将异步操作以同步操作的流程表达出来。
    - Promise 带来的额外好处是包含了更好的错误处理方式（包含了异常处理），并且写起来很轻松（因为可以重用一些同步的工具，比如 Array.prototype.map() ）。

3. Promise 缺点

    - 无法取消 Promise，一旦新建它就会立即执行，无法中途取消。
    - 如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。
    - 当处于 Pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
    - Promise 真正执行回调的时候，定义 Promise 那部分实际上已经走完了，所以 Promise 的报错堆栈上下文不太友好。

```js
function promiseAll(promises) {
    return new Promise(function(resolve, reject) {
        if (!Array.isArray(promises)) {
            throw new TypeError(`argument must be a array`);
        }
        var resolvedCounter = 0;
        var promiseNum = promises.length;
        var resolvedResult = [];
        for (let i = 0; i < promiseNum; i++) {
            Promise.resolve(promises[i]).then(
                (value) => {
                    resolvedCounter++;
                    resolvedResult[i] = value;
                    if (resolvedCounter == promiseNum) {
                        return resolve(resolvedResult);
                    }
                },
                (error) => {
                    return reject(error);
                }
            );
        }
    });
}
```

## 数组转树

```js
function array2Tree(array, parentFlag = 'parentId', flag = 'id') {
    if (!Array.isArray(array)) {
        throw new Error('argument is not Array');
    }
    const obj = {};

    array.forEach((item) => {
        const parent = obj[item[parentFlag]];
        const child = obj[item[flag]];

        obj[item[flag]] = item;
        if (child) {
            if (child[flag]) {
                throw new Error(`${flag} is not unique`);
            }
            obj[item[flag]].children = child.children;
        }

        if (parent) {
            parent.children = parent.children || [];
            parent.children.push(item);
        } else {
            obj[item[parentFlag]] = {
                children: []
            };
            obj[item[parentFlag]].children.push(item);
        }

        delete obj[item[flag]][parentFlag];
    });

    return obj;
}

console.log(
    array2Tree([
        {
            id: 2,
            val: '班级1',
            parentId: 1
        },
        {
            id: 3,
            val: '班级2',
            parentId: 1
        },
        {
            id: 1,
            val: '学校',
            parentId: null
        },
        {
            id: 5,
            val: '学生2',
            parentId: 3
        },
        {
            id: 4,
            val: '学生1',
            parentId: 2
        },
        {
            id: 6,
            val: '学生3',
            parentId: 3
        }
    ])
);
```

## ES6 暂时性死区

1. 函数作用域

    在函数中声明的变量只能在函数内部访问。

2. 块级作用域（ES6）

    `{}` 内部就是一个块级作用域，块级作用域的概念只和 let/const 所声明的变量有关。

变量的声明的过程为

1. 创建
2. 初始化(undefined)
3. 赋值
   用 let 声明的变量，它的创建提升了，但是它的初始化没有提升。
   而用 var 声明的变量，它的创建和初始进行了提升

let 不允许在相同作用域内，重复声明同一个变量：

```js
// 报错
function func() {
  let a = 10
  var a = 1

// 报错
function func() {
  let a = 10
  let a = 1
}
```

```js
let a = 2;
{
    console.log(a);
    var a = 1;
}
//Identifier 'a' has already been declared
```

对于 var 声明的变量，是不存在块级作用域的，因此我们用 let 和 var 在全局执行环境中声明了 a 变量两次，从而报错。

for 循环有一个特别之处，就是设置循环变量的那部分是一个**父作用域**，而循环体内部是一个**单独的子作用域**。

```js
var arr = [];
for (let i = 0; i < 10; i++) {
    arr[i] = function() {
        console.log(i);
    };
}
```

循环体内部（子作用域）在每一次循环执行的时候都会生成一个新的作用域。不同的子作用域内部接受传进来的不同的 i 值。这就是 let 解决循环闭包的原因。

暂时性死区就是由于，**let/const** 声明变量时没有变量提升所导致的。或者我们可以理解为，**在变量仅创建，还没有初始化之时就使用了变量**。

只要块级作用域内存在 let 命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

```js
var tmp = 123;

if (true) {
    tmp = 'abc'; // ReferenceError: Cannot access 'tmp' before initialization
    let tmp;
}
```

关于 ES6 函数默认值暂死区域：

```js
function bar(x = y, y = 2) {
  return [x, y]
}

bar()
// Uncaught ReferenceError: Cannot access 'y' before initialization

bar(undefined，3)
// Uncaught ReferenceError: Cannot access 'y' before initialization

bar(1，3)
// [1,3]
```

当调用 `bar` 时，如果未给 x 传参数(`undefined`)，那么 x 就会去取 y 的值。但此时 y 还未初始化，所以报错。约等于以下情况：

```js
let x = y; //在这个区域，就是变量 y 的暂死区域，所以会导致程序抛错
let y = 2;
```

[理解 es6 中的暂时性死区](https://blog.csdn.net/ganlubaba666/article/details/89792643)

## arguments 反应实参变化

```js
constfn1 = function(a = 7, b = 8, c = 9) {
    a = 10;
    console.log(arguments);
};
constfn2 = function(a, b, c) {
    a = 10;
    console.log(arguments);
};
fn1(1, 2, 3); //输出结果：[1,2,3]
fn2(1, 2, 3); //输出结果：[10,2,3]
```

**只有在非严格模式，不包含解构参数，rest 参数(...a))，以及默认值，arguments 对象中的值才会跟踪参数的值**。

## 具名函数表达式

NFE（Named function expression）是具名函数表达式，例如：`var a = function foo () {…}`，与之对应的是匿名函数表达式(Anonymous Function Expression)，例如：`var foo = function () {…}`。

具名函数有 2 个注意点：

1. 作为函数名的标识符只能从函数体内部访问，在函数外部访问不到 (IE9+)
2. 绑定为函数名的标识符不能再绑定为其它值，即该标识符绑定是不可更改的（immutable）

```js
var b = function a() {
    console.log(a); //[Function A]
    a = 1;
    console.log(a); //[Function A]
};
console.log(a); //Uncaught ReferenceError: a is not defined
```

在 IIFE 中使用具名函数也是如此：

```js
(function A() {
    console.log(A); //[Function A]
    A = 1;
    console.log(window.A); //undefined
    console.log(A); //[Function A]

    B = 1; //没有用var，会被定义成全局变量
    console.log(B); //1
})();
```

在严格模式下，对具名函数重新重新赋值会报错：

```js
var a = 1;
(function a() {
    'use strict';
    a = 2;
    console.log(a);
})();

// VM1059:4 Uncaught TypeError: Assignment to constant variable.
```

## Object.getPrototypeOf

Object.getPrototypeOf 是获取指定对象的原型。

Object.getPrototypeOf(Object) 不是 Object.prototype。

Object.getPrototypeOf(Object) 等于 Object._proto_ 等于 Function.prototype。

Object.prototype 表示以 Object 为构造函数创建出来实例的原型。

```js
var obj = new Object();
(Object.prototype === Object.getPrototypeOf(obj)) === obj._proto_;
```

## Object.is

Object 在严格等于的基础上修复了一些特殊情况下的失误，具体来说就是+0 和-0，NaN 和 NaN。

与 === 运算也不相同。 === 运算符 (也包括 == 运算符) 将数字 -0 和 +0 视为相等 ，而将 Number.NaN 与 NaN 视为不相等.

## Array.reduce

-   arr.reduce(callback[, initialValue])
    -   reduce 接受两个参数, 一个回调, 一个初始值
    -   回调函数接受四个参数 previousValue, currentValue, currentIndex, array
    -   如果一个函数不传初始值，数组第一个组默认为初始值
    -   只有初始值不会执行回调
    -   需要注意的是 If the array is empty and no initialValue was provided, TypeError would be thrown.

## Array.filter

Array.filter 的回调函数对于那些已经被删除或者从未被赋值的索引不会被调用。

```js
var arr = [0, 1];
arr[5] = 5;
delete arr[0];

newArr = arr.filter(function(x) {
    return x === undefined;
});
console.log(newArr.length);
// 2
```

arr 是一个稀疏数组，遍历时会跳过这些 `缝隙` 。

[稀疏数组与密集数组](https://www.cnblogs.com/ziyunfei/archive/2012/09/16/2687165.html)

## Array.sort()

```js
[1, 2, 5, 10].sort();

// [1,10,2,5]
```

JavaScript 默认使用字典序(alphanumeric)来排序。即逐位比较。

10 和 2 ，第一位: 1 < 2，所以 10 < 2。

## eval

```js
function test() {
    var a = 1;
    return function() {
        eval('');
    };
}
test();
```

变量 a 会被 GC 吗？

-   答案
    不会

-   解析
    因为 eval 会欺骗词法作用域，例如 function test(){eval("var a = 1"},创建了一个 a 变量，不确定 eval 是否对 a 进行了引用，所以为了保险，不对其进行优化。相对，try catch,with 也不会被回收，with 会创建新的作用域。

## 展开运算符

```js
let ydObject = { ...null, ...undefined };
console.log(ydObject);

// {}

let ydArray = [...null, ...undefined];
console.log(ydArray);

// object null is not iterable
```

在对象中使用展开运算符，如果后面不是对象，会自动转换为对象：

```js
let ydObject = { ...null, ...undefined };
let ydObject = { ...Object(null), ...Object(undefined) };
```

## 浮点运算

`0.1 + 0.2 = 0.30000000000000004`。为什么？

JavaScript 中所有数字包括整数和小数都只有一种类型 — Number。它的实现遵循 IEEE 754 标准，使用 64 位固定长度来表示，也就是标准的 double 双精度浮点数（相关的还有 float 32 位单精度）。

64 位比特又可分为三个部分：

符号位 S：第 1 位是正负数符号位（sign），0 代表正数，1 代表负数
指数位 E：中间的 11 位存储指数（exponent），用来表示次方数
尾数位 M：最后的 52 位是尾数（mantissa），表示精度，超出的部分自动进一舍零

图片：

0.1 转成二进制表示为 `0.0001100110011001100(1100)`，`1.100110011001100(1100)x2^-4`，所以 `E=-4+1023=1019`；M 舍去首位的 1，得到 `1001100110011001100110011001100110011001100110011010`（52 位， 超出的部分自动进 1 舍 0）

0.2 的转换也是如此。

因为转换为 2 进制精度损失，0.1 和 0.2 相加自然不会等于 0.3。

[探寻 JavaScript 精度问题以及解决方案](https://juejin.im/post/6844903687010123790#heading-0)

[JavaScript 浮点数陷阱及解法](https://github.com/camsong/blog/issues/9)

## String("A") 和 new String('A')

new String('A') 返回对象实例，String("A") 返回字符串，等于字面量创建字符。

同理 Date(0) 和 new Date(0)

## 数组的原型是数组，对象的原型是对象，函数的原型是函数

## 常用的 es6

## 树的深度优先遍历

```js
// 深度优先遍历
function treeDFS(node, cb) {
    const children = node.children;

    if (!children.length) {
        return;
    }
    for (let i = 0; i < children.length; i++) {
        cb(children[i]);
        treeDFS(children[i], cb);
    }
    return;
}

const obj = {};

function cb(node) {
    const tagName = node.tagName;

    if (/^[SH]+/.test(tagName)) {
        obj[tagName] = obj[tagName] || 0;
        obj[tagName]++;
    }
}

treeDFS(document.body, cb);

console.log(obj);
```

## 最大整数

```js
var END = Math.pow(2, 53);
var START = END - 100;
var count = 0;
for (var i = START; i <= END; i++) {
    count++;
}
console.log(count);
```

在 JS 里, Math.pow(2, 53) == 9007199254740992 是可以表示的最大值. 最大值加一还是最大值. 所以循环不会停.

## 引用类型比较大小

```js
var a = [1, 2, 3],
    b = [1, 2, 3],
    c = [1, 2, 4];
a == b;
a === b;
a > c;
a < c;

// false, false, false, true
```

数组间比较大小可以近视看做：就是先比第一项谁大，相同再去比第二项。

## String.replace

```js
'1 2 3'.replace(/\d/g, parseInt);
```

答案："1 NaN 3"
解析：replace() 回调函数的四个参数:

1. 匹配项
2. 与模式中的子表达式匹配的字符串
3. 出现的位置
4. stringObject 本身 。

如果没有与子表达式匹配的项，第二参数为出现的位置.所以第一个参数是匹配项，第二个参数是位置

```js
parseInt('1', 0);
parseInt('2', 2); //2进制中不可能有2
parseInt('3', 4);
```

## 函数名字

```js
function f() {}
var parent = Object.getPrototypeOf(f);
f.name; // ?
parent.name; // ?
typeof eval(f.name); // ?
typeof eval(parent.name); //  ?

// "f", "", "function", "undefined"
```

-   f 的函数名就是 f
-   parent 是 f 原型对象的名字为"" ,
-   先计算 eval(f.name) 为 f,f 的数据类型是 function
-   eval(parent.name) 为 undefined, "undefined"

## 连续比较

```js
[1 < 2 < 3, 3 < 2 < 1];
//[true,true]
```

-   1 < 2 < 3 => true < 2
-   3 < 2 < 1 => false < 1

## 逗号操作符

-   使用逗号操作符可以在一条语句中执行多个操作，如下面的例子所示：
    var num1=1, num2=2, num3=3;
-   除此之外，逗号操作符还可以用于赋值。在用于赋值时，逗号操作符总会返回表达式中的最后一项，如下面的例子所示：
    var num = (5, 1, 4, 8, 0); // num 的值为 0
    由于 0 是表达式中的最后一项，因此 num 的值就是 0。

## Number.isFinite & isFinite

```js
Number.isFinite('0') === isFinite('0');

Number.isFinite(0) === isFinite('0');

// false,true
```

Number.isFinite()检测有穷性的值，唯一和全局 isFinite()函数相比，这个方法不会强制将一个非数值的参数转换成数值，这就意味着，只有数值类型的值，且是有穷的（finite），才返回 true。

## 包装对象

引用类型和包装对象的区别在于生存期
引用类型所创建的对象会一直存在于堆内存中，而基本包装对象只存在于一瞬间
当访问非构造函数创建的 String, Number, Boolean 的属性时，会临时创建它们的包装对象（构造函数创建）。

自动转换生成的包装对象是只读的，无法修改。所以，字符串无法添加新属性。

```js
var str = 'hello';
str.number = 10;

//假设我们想给字符串添加一个属性number ，后台会有如下步骤
/*
  var str = new String('hello'); // 1 找到对应的包装对象类型，然后通过包装对象创建出一个和基本类型值相同的对象
  str.number = 10; // 2 通过这个对象调用包装对象下的方法 但结果并没有被任何东西保存
  str =null; // 3 这个对象又被销毁
*/
alert(str.number);

//undefined  当执行到这一句的时候，因为基本类型本来没有属性，后台又会重新重复上面的步骤
/*
 var str = new String('hello'); // 1 找到基本包装对象，然后又新开辟一个内存，创建一个值为hello对象
 str.number = undefined   // 2 因为包装对象下面没有number这个属性，所以又会重新添加，因为没有值，所以值是未定 ;然后弹出结果
 str =null; // 3 这个对象又被销毁
*/
```

## 字符串不可变

在 js 中，字符串一旦被创建，其值不可变。

```js
const x = 'abc';
x[0] = 'hhh';

console.log(x);
// abc

// 相当于重新创建了一个字符串
// 原字符串未变，但失去引用，被 gc
x = 'ddd';
```

所以，所有有关字符串的方法都不会改变原字符串。

## 继承

## 节流防抖

```js
function throttle(fn, timeout = 20, fisrtExe = true) {
    if (typeof fn !== 'function') {
        throw new Error('argument(s) error');
    }
    let timer = null;

    return function() {
        if (fisrtExe) {
            fn(arguments);
            fisrtExe = false;
        }
        if (!timer) {
            timer = setTimeout(() => {
                fn(arguments);
                clearTimeout(timer);
            }, timeout);
        }
    };
}

function debounce(fn, timeout = 20, fisrtExe = true) {
    if (typeof fn !== 'function') {
        throw new Error('argument(s) error');
    }
    let timer = null;

    return function() {
        if (fisrtExe) {
            fn(arguments);
            fisrtExe = false;
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(arguments);
            clearTimeout(timer);
        }, timeout);
    };
}
```

## 手写代码
