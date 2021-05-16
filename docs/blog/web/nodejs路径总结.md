---
meta:
    - title: nodejs路径总结
      time: 2021-05-16 16:15:32
      tag: nodejs
---

# nodejs 路径总结

## 前言

```js
// a.js
fs.readFile('../public/common.js', function(err, data) {
    if (err) return console.log(err)
    console.log(data)
})
```

一个常见的问题，用 `node.js` 读取文件，用上面的 `'../public/common.js'` 路径写法很可能会遇到找不到文件的问题。

<!-- more -->

## 几种路径

目录结构如下：

```
app
    -public
        -common.js
    -src
        -a.js
        -b.js
```

`a.js` 中代码：

```js
var path = require('path')

console.log(__dirname)
console.log(__filename)
console.log(process.cwd())
console.log(path.resolve('./'))
```

在`app` 目录下执行 `node src/a.js` 输出如下：

```
__dirname            /xx/xx//app/src

__filename           /xx/xx//app/src/a.js

process.cwd()        /xx/xx//app

path.resolve('./')   /xx/xx//app
```

在`src` 目录下执行 `node a.js` 输出如下：

```
__dirname            /xx/xx//app/src

__filename           /xx/xx//app/src/a.js

process.cwd()        /xx/xx//app/src

path.resolve('./')   /xx/xx//app/src
```

可以知道：

-   `__dirname`: `js`文件所在文件夹的绝对路径
-   `__filename`: `js`文件的绝对路径
-   `process.cwd()`: 运行 `node` 命令时所在的文件夹的绝对路径
-   `path.resolve('./')`: 运行 `node` 命令时所在的文件夹的绝对路径

回到上面的读取文件时的路径问题，`'../public/common.js'` 其实是相对于运行 `node` 命令时的路径，而不是相对于 `a.js` 文件的路径。

如果在 `a.js` 所在的目录执行 `a.js`，当然能够读取到 `common.js` 文件，但当在其他目录下执行 `a.js` 就会找不到 `common.js`。

```js
// a.js
fs.readFile('../public/common.js', function(err, data) {
    if (err) return console.log(err)
    console.log(data)
})
```

这里应该使用 `path.resolve` 将相对路径转换为绝对路径：

```js
// a.js
fs.readFile(path.resolve(__dirname, '../public/common.js');, function(err, data) {
    if (err) return console.log(err)
    console.log(data)
})
```

> 事实上，在 `nodejs` 中，除了 `require`， 其他所有使用路径的地方，都应该写成绝对路径。

## path

### path.normalize

当找到多个连续的路径段分隔字符时（例如 linux 上的 `/`、Windows 上的 `\`），则它们将被替换为单个平台特定的路径段分隔符（linux 上的 `/`、Windows 上的 `\`）。

例如下 `windows` 上：

```js
path.normalize('/a/b')
// \a\b
```

### path.join

`path.join()` 方法会将所有给定的 `path` 片段连接到一起（使用平台特定的分隔符作为定界符），然后规范化生成的路径。

长度为零的 `path` 片段会被忽略。 如果连接后的路径字符串为长度为零的字符串，则返回 `'.'`，表示当前工作目录。

```js
const path = require('path')
console.log(path.join('src', 'a.js'))

// src/a.js
```

## path.parse

`path.parse()` 方法会返回一个对象，其属性表示 `path` 的有效元素。 尾部的目录分隔符会被忽略。

```js
const path = require('path')

console.log(path.parse('/目录1/目录2/文件.txt/'))
// 返回:
// { root: '/',
//   dir: '/目录1/目录2',
//   base: '文件.txt',
//   ext: '.txt',
//   name: '文件' }
```

### path.basename

`path.basename()` 方法会返回 `path` 的最后一部分，尾部的目录分隔符会被忽略。

```js
const path = require('path')

console.log(path.basename('/目录1/目录2/文件.txt'))
// 文件.txt

console.log(path.basename('/目录1/目录2/文件.txt', '.txt'))
// 文件
```

### path.dirname

`path.dirname()` 方法会返回 `path` 的目录名。尾部的目录分隔符会被忽略。

```js
const path = require('path')

console.log(path.basename('/目录1/目录2/文件.txt'))
// 目录1/目录2

console.log(path.dirname('/目录1/目录2/目录3'))
// 目录1/目录2
```

### path.extname

文件的扩展名。

```js
const path = require('path')
path.extname('index.html')
// .html
path.extname('index.coffee.md')
// .md
path.extname('index.')
// .
path.extname('index')
// ''
path.extname('.index')
// ''
```

### path.resolve

给定的路径序列会从右到左进行处理，后面的每个 `path` 会被追加到前面，直到构造出绝对路径。

```js
const path = require('path')
console.log(path.resolve('/foo/bar', '/bar/faa', '..', 'a/../c'))
// /bar/c
```

相当于一堆 `cd` 操作，我们一步一步看

```
cd /foo/bar/    //这是第一步, 现在的位置是/foo/bar/
cd /bar/faa     //这是第二步，这里和第一步有区别，他是从/进入的，也就时候根目录，现在的位置是/bar/faa
cd ..           //第三步，从faa退出来，现在的位置是 /bar
cd a/../c       //第四步，进入a，然后在推出，在进入c，最后位置是/bar/c

```

### path.relative

返回的是 `from` 到 `to` 的相对路径。

```js
const path = require('path')
console.log(path.relative('src/bar/baz', 'src/aaa/bbb'))
// ../../aaa/bbb
```

当需要得到文件到文件的相对路径时，需要从 `from` 所在目录开始：

```js
console.log(path.relative(path.dirname('src/a.js'), 'src/b.js'))
```

### path.sep

提供平台特定的路径片段分隔符。

-   `Windows` 上是 `\`。
-   `POSIX` 上是 `/`。

## require 路径和其他路径

`require` 中能直接使用相对路径，而其他地方最好不要直接使用相对路径：

```js
require('./a.js')

fs.readFile(path.resolve(__dirname, './a.js');, function(err, data) {
})
```

`require` 引入相对路径时，必须以 `'./'` 开头。而其他 node api 使用相对路径可以不需要以`'./'`开头。

```js
fs.readFile('./text.txt') = fs.readFile('text.txt')
```

`path.join` 处理路径时，会丢失路径开头的 `'./'`：

```js
console.log(path.join('./src', 'a.js'))
// src/a.js
```

## 参考文献

1. [nodejs 几种文件路径及 path 模块](https://juejin.cn/post/6844903506290147342)
2. [nodejs api](http://nodejs.cn/api/path.html)
