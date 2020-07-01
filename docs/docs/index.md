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

