# 工具函数

## 数组

### 数组扁平化

`Array.flat()`（兼容性不好）。

## 对象

### 展开运算符获得有条件的对象属性

```javascript
let obj = {
  name: 'John',
  surname: 'Doe',
  ...(flag && { email: 'john@doe.com' })
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

## 正则

匹配 `ab` 开头，`cd` 结尾，且中间不能出现 `cd`：

`/ab[\w\W]*?cd/`

`*?`, `.?`, `+?`表示非贪婪匹配。正常的匹配是匹配尽可能多，然后再回溯，判断是否满足接下来的条件。

例如正则表达式为 `/ab[\w\W]*cd/`，对于字符串 `xxab123456sscd999`，`[\w\W]` 表达式会直接匹配到最后，然后再回溯，判断是否满足 `cd` 条件。而如果正则为 `/ab[\w\W]*?cd/`，`[\w\W]` 每匹配成功，就会立即匹配接下来的 `cd` 条件。
