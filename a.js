const path = require('path')


console.log(path.dirname('./目录1/目录2/目录3'))

console.log(path.parse('./目录1/目录2/文件.txt/'))
console.log(path.join('./src', 'a.js'))
console.log(path.relative('./a', './a/title.js').replace(/\\/g, '/'))