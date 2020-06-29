# 工具函数

## 数组

### 数组扁平化

`Array.flat()`（兼容性不好）。

## 对象

### 展开运算符获得有条件的对象属性

```javascript
let obj = {
  name: "John",
  surname: "Doe",
  ...(flag && { email: "john@doe.com" })
}
```

### 动态属性名

```JavaScript
const dynamic = 'email';
let user = {
    name: 'John',
    [dynamic]: 'john@doe.com'
}
```

## 函数

### 柯里化

```javascript
function curry(fn) {
  // fn的无默认值参数的个数
  if (fn.length === 0) {
    return fn
  }

  function _curried(depth, args) {
    return function(newArgument) {
      // 需要传入fn需要的参数个数，才会返回值
      if (depth - 1 === 0) {
        return fn(...args, newArgument)
      }
      return _curried(depth - 1, [...args, newArgument])
    }
  }

  return _curried(fn.length, [])
}

function add(a, b) {
  return a + b
}

var curriedAdd = curry(add)
var addFive = curriedAdd(5)

var result = [0, 1, 2, 3, 4, 5].map(addFive)
// [5, 6, 7, 8, 9, 10]
```

### 自定义事件分发

```js
class Event {
  // on 监听的事件
  onEvents = {}
  index = -1
  count = 0
  // once 表示注册的事件只执行一次便自动移除
  on(name, callback, once = false) {
    this.onEvents[name] = this.onEvents[name] || []
    this.onEvents[name].push({
      name: name,
      callback: callback,
      once: once
    })
  }

  // 移除事件
  off(name, callback) {
    if (!this.onEvents[name] || !this.onEvents[name].length) {
      return
    }
    this.onEvents[name] = this.onEvents[name].filter((event, index) => {
      let flag = true

      // 在emit的回调中，可能会off事件
      if (event.callback === callback) {
        flag = false
        if (index <= this.index && name === this.name) {
          this.count++
        }
      }

      return flag
    })
  }

  emit(name) {
    if (!this.onEvents[name] || !this.onEvents[name].length) {
      return
    }

    const params = [...arguments].slice(1)

    this.name = name

    for (let i = 0; i < this.onEvents[name].length; i++) {
      const event = this.onEvents[name][i]

      // 需要先判断是否为一次性事件，先移除
      // 以防在事件回调中继续触发当前事件时即使是一次性事件也会执行多次
      if (event.once) {
        this.onEvents[name].splice(i, 1)
        i--
      }
      // 记录此时的index
      this.index = i
      event.callback(...params)
      // 如果回调中off事件，需要记录off的小于等于这个index的个数
      i -= this.count
      this.count = 0
    }
    this.count = 0
    this.index = -1
  }
}

// 使用
let event = new Event()
event.on("myevent", callback)
// 一次性事件
event.on("myevent", callback, true)
event.off("myevent", callback)
```

### 时间相关

#### 时间格式化

```js
function dateFormatter(date, format) {
  // 时间格式化辅助函数 date:毫秒数 format:'yyyy-MM-dd hh:mm:ss'
  if (!date || date === "") {
    return ""
  }

  let cdate = date

  if (typeof cdate === "string") {
    const mts = cdate.match(/(\/Date\((\d+)\)\/)/)

    if (mts && mts.length >= 3) {
      cdate = parseInt(mts[2])
    }
  }

  cdate = new Date(cdate)
  if (!cdate || cdate.toUTCString() === "Invalid Date") {
    return ""
  }

  const map = {
    M: cdate.getMonth() + 1, // 月份
    d: cdate.getDate(), // 日
    h: cdate.getHours(), // 小时
    m: cdate.getMinutes(), // 分
    s: cdate.getSeconds(), // 秒
    q: Math.floor((cdate.getMonth() + 3) / 3), // 季度
    S: cdate.getMilliseconds() // 毫秒
  }

  const formatTime = format.replace(/([yMdhmsqS])+/g, function(all, t) {
    let v = map[t]

    if (v !== undefined) {
      if (all.length > 1) {
        v = "0" + v
        v = v.substr(v.length - 2)
      }
      return v
    }
    if (t === "y") {
      return (cdate.getFullYear() + "").substr(4 - all.length)
    }
    return all
  })

  return formatTime
}
```

#### 润年

```js
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}
```

#### 大小月

```js
function isBigMonth(month) {
  const bigMonths = [0, 2, 4, 6, 7, 9, 11]

  return bigMonths.includes(month)
}
```

#### 月份天数

```js
function getMonthDays(date) {
  const month = date.getMonth()
  const year = date.getFullYear()

  if (isBigMonth(month)) {
    return 31
  }
  if (month === 1) {
    if (isLeapYear(year)) {
      return 29
    }
    return 28
  }
  return 30
}
```

#### 时间相等

<a href="./test/index.html">ss</a>
[sss](./test/index.html)