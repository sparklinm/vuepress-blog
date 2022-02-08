## 闭包

引用其他作用域内的变量，就会形成闭包。

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

## 原型

对象上存在一个 `__proto__` 属性指向它的原型对象，而原型对象上也存在同样的属性指向更高层的原型对象，最终构成一条原型链，当在对象上找不到属性或者方法时，会沿着原型链去找寻对应的属性和方法。

数组的原型是数组，对象的原型是对象，函数的原型是函数

Object.prototype 位于最顶层

Function.prototype：

```js
Function.prototype.__proto__ === Object.prototype;
```

Function：

```js
Function.__proto__ === Function.prototype;
```

Object:

```js
Object.__proto__ === Function.prototype;
```

Array:

```js
Array.__proto__ === Function.prototype;

Array.prototype.__proto__ === Object.prototype;
```

```js
function A() {}
var a = new A();

A.__proto__ === Function.prototype;

a._proto_ === A.prototype;
A.prototype._proto_ === Object.prototype;
```

## 常用的 es6

## promise

1. Promise 基本特性

    1. Promise 有三种状态：pending(进行中)、fulfilled(已成功)、rejected(已失败)
    2. Promise 对象接受一个回调函数作为参数, 该回调函数接受两个参数，分别是成功时的回调 resolve 和失败时的回调 reject；另外 resolve 的参数除了正常值以外， 还可能是一个 Promise 对象的实例；reject 的参数通常是一个 Error 对象的实例。
    3. then 方法返回一个新的 Promise 实例，并接收两个参数 onResolved(fulfilled 状态的回调)；onRejected(rejected 状态的回调，该参数可选)
    4. catch 方法是 then 方法的语法糖
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

    - 如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部，此时报错信息不友好。

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

## 隐私转换

隐私转换发生在类型不同作宽松相等（==）时，当类型相同时，直接比较值的大小。

### 转换规则

原始值即基础类型：Undefined、 Null、 String、 Number、 Boolean、 Symbol。

**对象转换成原始值（ToPrimitive）**：调用 valueOf 和 toString 转换，直到得到一个原始值。除了 Date 先调用 toString() 方法，其他对象都是先调用 valueOf() 。

**转换为数字（ToNumber）**：

| 参数      | 结果                                                                                                           |
| --------- | -------------------------------------------------------------------------------------------------------------- |
| undefined | NaN                                                                                                            |
| null      | +0                                                                                                             |
| 布尔      | true 转换为 1，false 转换为+0                                                                                  |
| 字符串    | 可解析为数字转化为数字，例如："-3.156"转换为-3.156，"-3.156x"转换为-3.156，"asd"转换为 NaN，空字符串''转换为 0 |
| 对象      | 先进行 ToPrimitive(obj, Number)转换得到原始值，在进行 ToNumber 转换为数字                                      |

**转换为字符串（ToString）**：

| 参数      | 结果                                                                        |
| --------- | --------------------------------------------------------------------------- |
| undefined | 'undefined'                                                                 |
| null      | 'null'                                                                      |
| 布尔      | 转换为'true' 或 'false'                                                     |
| 数字      | 转换字符串，比如：1.765 转为'1.765'，1e21 转为"1e+21"                       |
| 对象      | 先进行 ToPrimitive(obj, String)转换得到原始值，在进行 ToString 转换为字符串 |

**隐私转换规则：**

1. null 和 undefined 自身相等，且 null == undefined，除此之外和其他任何值不宽松相等（==）。
2. NaN 不与任何值相等，包括自身。
3. 有 Number 和 Boolean，需要转换为 Number 类型比较，都是 String 直接比较。
4. 有 Object 先将 Object 调用 valueOf 和 toString 转换，直到得到一个原始值，再按照 3 比较。除了 Date 先调用 toString() 方法，其他对象都是先调用 valueOf() 。

### valueOf 和 toString

valueOf：Date 对象返回日期的毫秒数，String、Boolean、Number 返回原始值，其它对象返回对象本身。

toString：

1. Array：将数组元素用","连接成一个字符串,即：调用 join() 方法，数组中**空数组[]、null、undefined 转为空字符串**，数组中 object 按照上面 ToPrimitive 过程，层叠的数组会被依次拆分。
2. 普通对象：调用 Object.prototype.toString()，返回"[object Object]"。

> Symbol 对象无法隐式转换为原始值和字符串，即隐式转换时，Symbol 对象不会自动调用 valueOf 或者 toString。

### if 语句判断

```javascript
if (flag) {
    console.log(true);
} else {
    console.log(false);
}
```

`flag` 判读为假时：false、0（包括+0、-0、0.0）、null、undefined、""、NaN
`flag` 判读为真时：对象、数组、非空字符串、true、任何定义了的函数 （空对象、空数组也为真）

### 字符串比较大小

当字符串之间比较大小时，按第一个不相同的字符的 `ASCLL` 码值来比较的。

### 数组比较大小

根据上面的规则，比较大小只发生在 Number 和 String 之间，所以要先将数组 ToPrimitive 转换为原始类型，再都转换为 Number 或 String 。

```js
var a = [1, 2, 3],
    b = [1, 2, 3],
    c = [1, 2, 4];

// 类型相同，直接比较值
a == b;
a === b;
a > c;
a < c;

// false, false, false, true
```

数组间比较大小可以近视看做：**就是先比第一项谁大，相同再去比第二项**。

## 运算符优先级

[运算符优先级](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)

1. ()括号
2. .成员访问 ()函数调用 new
3. `...++ ...--`
4. ! ~ +.. -.. ++... --... typeof
5. `**`
6. `*` / %
7. `+` -
8. `>=` <= > <
9. == !==
10. & ^ | 位运算符
11. && || 逻辑运算符
12. a ? x : y 条件运算符
13. = op = 运算赋值

```js
let a = { n: 1 };
let b = a;
a.x = a = { n: 2 };
console.log(a.x);
console.log(b);

// undefined
// { n : 2}
```

对象存储在堆中，a、b 只是存储对象在堆中的地址。

先执行 a.x，在原对象中查找属性。

a 赋值为新对象，再将新对象赋值给原对象的 x 属性。

b 指向原对象。

```js
var val = 'smtg';
console.log('Value is ' + (val === 'smtg') ? 'Something' : 'Nothing');

// Something
```

`+` 比三元运算有更高的优先级。

### new 符号优先级

new (带参数列表) 优先级 和 `.`、函数调用优先级一致，遵循从左到右

new (无参数列表) 优先级次于上面的，遵循从右到左

```js
function Foo() {
    this.name = 1;
}

Foo.getName = function() {
    alert(3);
};
```

new Foo 和 new Foo()一致。
new Foo.name 根据优先级，会先执行 Foo.name，所以会报错。
new Foo.getName()，先执行 Foo.getName 得到一个函数，假设为 x，再执行 new x()。
new new Foo().getName()，同上，先执行 new Foo()，再执行.getName 获取到一个函数 x，再执行 new x()。

### typeof 和 `!`

```js
const name = 'TianTianUp';
console.log(!typeof name === 'string');
```

typeof 和 `!` 同优先级，从右到左，执行！typeof name 返回 false，再严格相等判断。

## 继承

**原型链继承：**

将父类的实例作为子类的原型

```js
Child.prototype = new Parent();
```

优点：

1. 继承了父类的模板，又继承了父类的原型对象

缺点：

1. 来自原型对象的所有属性被所有实例共享

**构造函数继承：**

在子类的构造函数内部以当前 this 调用父类构造函数，等于是复制父类的实例属性给子类。

```js
function Child() {
    // 调用 SuperType 构造函数
    // 在子类构造函数中，向父类构造函数传参
    Parent.call(this, 'Parent');
    // 为了保证子父类的构造函数不会重写子类的属性，需要在调用父类构造函数后，定义子类的属性
    this.subName = 'Child';
}
```

优点：

1. 可以多继承
2. 创建子类实例时，可以向父类传递参数

缺点：

1. 实例并不是父类的实例，**只是子类的实例**
2. 只能继承父类的实例属性和方法，**不能继承原型属性/方法**
3. 无法实现函数复用，每个子类都有父类实例函数的副本，影响性能

**组合继承：**

组合继承就是将原型链继承与构造函数继承组合在一起。

```js
function Child() {
    // 调用 SuperType 构造函数
    // 在子类构造函数中，向父类构造函数传参
    Parent.call(this, 'Parent');
    // 为了保证子父类的构造函数不会重写子类的属性，需要在调用父类构造函数后，定义子类的属性
    this.subName = 'Child';
}

Child.prototype = new Parent(); // 重写原型对象，代之以一个新类型的实例
Child.prototype.constructor = Child; // 组合继承需要修复构造函数指向
```

优点：

1. 可以继承实例属性/方法，也可以继承原型属性/方法，
2. 不存在引用属性共享问题，
3. 可传参

缺点：

1. 调用了两次父类构造函数，生成了两份实例（子类实例将子类原型上的那份屏蔽了）

**寄生组合继承：**

借用 **构造函数** 继承 属性 ，通过 **寄生** 来继承方法

```js
function Child() {
    // 调用 SuperType 构造函数
    // 在子类构造函数中，向父类构造函数传参
    Parent.call(this, 'Parent');
    // 为了保证子父类的构造函数不会重写子类的属性，需要在调用父类构造函数后，定义子类的属性
    this.subName = 'Child';
}

// 原型式继承，只需要继承父类原型上的方法，无需实例化父类
Child.prototype = Object.create(Parent.prototype);

// 修复构造函数指向
Child.prototype.constructor = Child;
```

优点：

1. 只调用一次 `SuperType` 构造函数，只创建一份父类属性
2. 原型链保持不变
3. 能够正常使用 `instanceof` 与 `isPrototypeOf`

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

## 属性，原型有关方法

### 判断属性的可枚举性

`obj.propertyIsEnumerable(prop)` 方法返回一个布尔值，表示指定的属性是否可枚举。对于原型链上的属性都会返回 `false`，但原型链上的属性是会被 `for...in` 枚举的。

### 自身属性

`Object.getOwnPropertyNames(obj)`：返回对象所有的自身属性（包括不可枚举属性）。

`obj.hasOwnProperty(prop)`：判断对象是否有指定的自身属性。

`Object.getOwnPropertySymbols()`: 获取自身的 `Symnol` 属性名。[见上文](#getOwnPropertySymbols)。

### for...in 和 in

`for...in`: 遍历对象所有可枚举属性，包括原型链上的。

`in`: prop in obj，判断属性是否属于对象，原型链上的属性和不可枚举属性也返回 `true`。

### Object.getPrototypeOf / Object.setPrototypeOf

Object.getPrototypeOf 是获取指定对象的原型。

Object.getPrototypeOf(Object) 不是 Object.prototype。

Object.getPrototypeOf(Object) 等于 Object._proto_ 等于 Function.prototype。

Object.prototype 表示以 Object 为构造函数创建出来实例的原型。

```js
var obj = new Object();
(Object.prototype === Object.getPrototypeOf(obj)) === obj._proto_;
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

## Map Set WeakMap WeakSet

### 集合（Set）

ES6 新增的一种新的数据结构，类似于数组，但成员是唯一且无序的，没有重复的值。

Set 本身是一种构造函数，用来生成 Set 数据结构。

Set 对象允许你储存任何类型的唯一值，无论是原始值或者是对象引用。

Set 是使用键对来存储的。

性能分析：

因为使用键对，所以查找和删除时，不需要遍历。

数组的查找需要遍历，删除(splice(index, 1))需要移动 index 后面元素位置。

对于新添加元素，Set 需要检查重复，数组(push)不需要。

1. Set 查找和删除都比数组块。
2. Set 添加比数组慢。

```js
let set = new Set([1, 2, 3, 3]);
```

操作方法：

-   add(value)：新增，相当于 array 里的 push。
-   delete(value)：存在即删除集合中 value。
-   has(value)：判断集合中是否存在 value。
-   clear()：清空集合。

便利方法：遍历方法（遍历顺序为插入顺序）

-   keys()：返回一个包含集合中所有键的迭代器。
-   values()：返回一个包含集合中所有值得迭代器。
-   entries()：返回一个包含 Set 对象中所有元素得键值对迭代器。
-   forEach(callbackFn, thisArg)：用于对集合成员执行 callbackFn 操作，如果提供了 thisArg 参数，回调中的 this 会是这个参数，没有返回值。
-   for...of

WeakSet 对象允许你将弱引用对象储存在一个集合中。

WeakSet 与 Set 的区别：

-   WeakSet 只能储存对象引用，不能存放值，而 Set 对象都可以。
-   WeakSet 对象中储存的对象值都是被弱引用的，即垃圾回收机制不考虑 WeakSet 对该对象的应用，如果没有其他的变量或属性引用这个对象值，则这个对象将会被垃圾回收掉（不考虑该对象还存在于 WeakSet 中），所以，WeakSet 对象里有多少个成员元素，取决于垃圾回收机制有没有运行，运行前后成员个数可能不一致，遍历结束之后，有的成员可能取不到了（被垃圾回收了），WeakSet 对象是无法被遍历的（ES6 规定 WeakSet 不可遍历），也没有办法拿到它包含的所有元素。

方法：

-   add(value)：在 WeakSet 对象中添加一个元素 value。
-   has(value)：判断 WeakSet 对象中是否包含 value。
-   delete(value)：删除元素 value。

### 字典（Map）

是一组键值对的结构，具有极快的查找速度。

元素的顺序遵循插入的顺序。

key 为任何类型的唯一值。

性能分析：

Map 的实现使用了 hash table。

1. Map 添加、查询速度都是高于 Object。
2. Map 删除和 Object 差不多。

其添加查询

```js
const m = new Map([[(a: 1)], [(b: 2)]]);
const o = { p: 'haha' };
m.set(o, 'content');
```

操作方法：

-   set(key, value)：向字典中添加新元素。
-   get(key)：通过键查找特定的数值并返回。
-   has(key)：判断字典中是否存在键 key。
-   delete(key)：通过键 key 从字典中移除对应的数据。
-   clear()：将这个字典中的所有元素删除。

遍历方法：

-   Keys()：将字典中包含的所有键名以迭代器形式返回。
-   values()：将字典中包含的所有数值以迭代器形式返回。
-   entries()：返回所有成员的迭代器。
-   forEach()：遍历字典的所有成员。
-   for...of

~~Map api 共用了两个数组（一个存放 key,一个存放 value）。给 Map set 值时会同时将 key 和 value 添加到这两个数组的末尾。从而使得 key 和 value 的索引在两个数组中相对应。当从 Map 取值时，需要遍历所有的 key，然后使用索引从存储值的数组中检索出相应的 value。这个实现的缺点很大，首先是赋值和搜索的时间复杂度为 O(n)~~；其次是可能导致内存溢出，因为数组会一直保存每个键值引用，即便是引用早已离开作用域，垃圾回收器也无法回收这些内存。

WeakMap 对象是一组键值对的集合，其中的键是弱引用对象，而值可以是任意。

注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。

WeakMap 中，每个键对自己所引用对象的引用都是弱引用，在没有其他引用和该键引用同一对象，这个对象将会被垃圾回收（相应的 key 则变成无效的），所以，WeakMap 的 key 是不可枚举的。

方法：

-   has(key)：判断是否有 key 关联对象。
-   get(key)：返回 key 关联对象（没有则则返回 undefined）。
-   set(key, value)：设置一组 key 关联对象。
-   delete(key)：移除 key 的关联对象。

### WeakMap 怎么做到弱引用

WeakMap 本质上没有使用任何东西去存储 key 和 value。它只是在 key 上设置了一个属性，其值为 value。获取也是从 key 上读取这个 value。这也是为什么 key 必须为对象的原因。

## js 垃圾回收

V8 把堆内存分成了两部分进行处理——新生代内存和老生代内存。顾名思义，新生代就是临时分配的内存，存活时间短， 老生代是常驻内存，存活的时间长。V8 的堆内存，也就是两个内存之和。

新生代，Scavenge 算法：

1. 将新生代内存空间一分为二。
2. 其中 From 部分表示正在使用的内存，To 是目前闲置的内存。
3. 当进行垃圾回收时，V8 将 From 部分的对象检查一遍，如果是**存活对象那么复制到 To 内存**中(在 To 内存中按照顺序从头放置的)，如果是非存活对象直接回收即可。
4. 当所有的 From 中的存活对象按照顺序进入到 To 内存之后，From 和 To 两者的角色对调，From 现在被闲置，To 为正在使用，如此循环。

分为 2 块，不断复制的原因：解决**垃圾回收而导致的内存碎片化**问题。

老生代：

新生代会晋升到老生代：

1. 已经经历过一次 Scavenge 回收。
2. To（闲置）空间的内存占用超过 25%。

老生代采用标记清除法（老生代占用内存空间大，不能一分为二的方法）：

首先会遍历堆中的所有对象，对它们**做上标记**，然后对于代码环境中**使用的变量以及被强引用的变量取消标记**，剩下的就是要删除的变量了，在随后的清除阶段对其进行空间的回收。

https://juejin.im/post/6844904004007247880#heading-3

## 手写

### Promise

Promise

Promise.finally

Promise.resolve

Promise.reject

Promise.all

Promise.any

Promise.allSettled

Promise.race

### new

```js
function createObject(Con) {
    // 创建新对象obj
    // var obj = {};也可以
    var obj = Object.create(null);

    // 将obj.__proto__ -> 构造函数原型
    // (不推荐)obj.__proto__ = Con.prototype
    Object.setPrototypeOf(obj, Con.prototype);

    // 执行构造函数，并接受构造函数返回值
    const ret = Con.apply(obj, [].slice.call(arguments, 1));

    // 若构造函数返回值为对象，直接返回该对象
    // 否则返回obj
    return typeof ret === 'object' ? ret : obj;
}
```

### bind 实现

```js
function bind(fn, context) {
    if (typeof fn !== 'function') {
        throw new Error('argument(s) error');
    }

    const params = [].slice.call(arguments, 2);

    return function() {
        fn.call(context, ...params);
    };
}
```

### 深拷贝

### 数组转树

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

### 节流防抖

```js
function throttle(fn, timeout = 20, fisrtExe = true) {
    if (typeof fn !== 'function') {
        throw new Error('argument(s) error');
    }
    let timer = null;

    return function(...args) {
        if (fisrtExe) {
            fn.apply(this, args);
            fisrtExe = false;
        }
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args);
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

    return function(...args) {
        if (fisrtExe) {
            fn.apply(this, args);
            fisrtExe = false;
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
            clearTimeout(timer);
        }, timeout);
    };
}
```

### 柯里化

柯里化常见的应用有：参数复用、延迟计算。

```js
function curry(fn, ...args) {
    let that = this;

    return function(...innerArgs) {
        let finalArgs = args.concat(innerArgs);
        if (finalArgs.length < fn.length) {
            //fn.length 为函数的参数个数
            return curry.call(that, fn, ...finalArgs);
        } else {
            return fn.apply(that, finalArgs);
        }
    };
}
```

### 组合函数

组合函数类似于管道，多个函数的执行时，上一个函数的返回值会自动传入到第二个参数继续执行。

```js
function compose(...fns) {
    var start = 0;
    return function(...innerArgs) {
        let i = start;
        let result = fns[start].apply(this, innerArgs);
        while (++i < fns.length) result = fns[i].call(this, result);
        return result;
    };
}
```

函数可能有多个参数，例如 `f(a,b,c)` 和 `g(e,f)` ，要将`f(a,b,c)`的值作为一个参数传递给 `g`。

这时就需要柯里化和组合函数一起使用：

```js
function compose(...fns) {
    let cfns = fns.map((fn) => curry(fns[i]));

    let composeCurryFn = (...curryFns) => {
        return function(...args) {
            let i = 0;
            let result = null;
            while (i < curryFns.length) {
                let curryFn = curryFns[i];
                result = curryFn.apply(this, args);
                if (typeof resulit === 'function') {
                    return composeCurryFn.call(this, result, ...curryFns.slice(i + 1));
                }
                args = [result];
                i++;
            }
            return result;
        };
    };

    return composeCurryFn(...cfns);
}
```

### 随机定长字符

```js
function randomStr(length = 10) {
    const array = [];
    const asciiStart = 33;
    const asciiEnd = 126;

    for (let i = 0; i < length; i++) {
        array[i] = Math.floor(Math.random() * (asciiEnd - asciiStart + 1) + asciiStart);
    }

    return String.fromCharCode(...array);
}
```

## 其他注意点

### Array.reduce

-   arr.reduce(callback[, initialValue])
    -   reduce 接受两个参数, 一个回调, 一个初始值
    -   回调函数接受四个参数 previousValue, currentValue, currentIndex, array
    -   如果一个函数不传初始值，数组第一个组默认为初始值
    -   只有初始值不会执行回调
    -   需要注意的是 If the array is empty and no initialValue was provided, TypeError would be thrown.

### Array.filter

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

### Array.sort()

```js
[1, 2, 5, 10].sort();

// [1,10,2,5]
```

JavaScript 默认使用字典序(alphanumeric)来排序。即逐位比较。

10 和 2 ，第一位: 1 < 2，所以 10 < 2。

### String.replace

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

````js
parseInt('1', 0);
parseInt('2', 2); //2进制中不可能有2
parseInt('3', 4);


### Number.isFinite & isFinite

```js
Number.isFinite('0') === isFinite('0');

Number.isFinite(0) === isFinite('0');

// false,true
````

Number.isFinite()检测有穷性的值，唯一和全局 isFinite()函数相比，这个方法不会强制将一个非数值的参数转换成数值，这就意味着，只有数值类型的值，且是有穷的（finite），才返回 true。

````

### eval

```js
function test() {
    var a = 1;
    return function() {
        eval('');
    };
}
test();
````

变量 a 会被 GC 吗？

-   答案
    不会

-   解析
    因为 eval 会欺骗词法作用域，例如 function test(){eval("var a = 1"},创建了一个 a 变量，不确定 eval 是否对 a 进行了引用，所以为了保险，不对其进行优化。相对，try catch,with 也不会被回收，with 会创建新的作用域。

### Object.is

Object 在严格等于的基础上修复了一些特殊情况下的失误，具体来说就是+0 和-0，NaN 和 NaN。

与 === 运算也不相同。 === 运算符 (也包括 == 运算符) 将数字 -0 和 +0 视为相等 ，而将 Number.NaN 与 NaN 视为不相等.

### 展开运算符

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

### String("A") 和 new String('A')

new String('A') 返回对象实例，String("A") 返回字符串，等于字面量创建字符。

同理 Date(0) 和 new Date(0)

### 最大整数

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

### 函数名字

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

### 连续比较

```js
[1 < 2 < 3, 3 < 2 < 1];
//[true,true]
```

-   1 < 2 < 3 => true < 2
-   3 < 2 < 1 => false < 1

### 逗号操作符

-   使用逗号操作符可以在一条语句中执行多个操作，如下面的例子所示：
    var num1=1, num2=2, num3=3;
-   除此之外，逗号操作符还可以用于赋值。在用于赋值时，逗号操作符总会返回表达式中的最后一项，如下面的例子所示：
    var num = (5, 1, 4, 8, 0); // num 的值为 0
    由于 0 是表达式中的最后一项，因此 num 的值就是 0。

### arguments 反应实参变化

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

### 具名函数表达式

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

### 函数长度

```js
function fn(a, b = 1) {}

fn.length;
// 1
```

函数长度为无默认值参数个数。

## 非典型算法题

### 洗牌算法

随机一张牌，与最后一张牌交换。再随机 0 ～倒数第二张牌 之间的一张牌与倒数第二张牌交换。

### 老鼠试药（二进制）

有 16 瓶水，其中只有一瓶水有毒，小白鼠喝一滴之后一小时会死，请问最少用多少只小白鼠，在 1 小时的时间一定可以找出有毒的水？

2^4=16 故需要 4 只。

假设用 n 只老鼠，每只老鼠有死与不死两种情况，故所有老鼠的死亡存活情况总共 2^n 种。
如果只有 A 老鼠死代表第 1 瓶有毒，只有 B 老鼠死代表第 2 瓶有毒，只有 AB 老鼠死代表第三瓶有毒，依次类推。可以用所有情况分别唯一代表某瓶水有毒。故 2^n=16，所以只需要 4 只老鼠，它们的死亡组成情况即可代表某瓶水有毒的所有情况。

A 0 0 0
B 0 0 0 ......
C 0 1 1
D 1 0 1

每一行代表老鼠喝了哪些水。如果 D 死亡代表第一瓶水有毒，C 死亡代表第二瓶水，CD 死亡代表第三瓶水，以此类推。

### 随机不重复

洗牌，抽牌

### 100 层扔鸡蛋

一百层楼，有两个玻璃瓶，在其中的一层楼层及以下的楼层中往下扔玻璃瓶不会碎，找到这个楼层
