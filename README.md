# vuepress-blog

[个人博客地址](https://blog.sparklinm.cn)

## 写法问题

### 文字中带有 `{{}}`

例如这句话会报错：`data="{{i : item}}"` 用 babel 解析为 ast 树会报错。

使用 `v-pre` 包裹：

```
::: v-pre

:::
```

### 带有 `<>`

例如：`<pacakge>` 会被当做 html 标签，出现标签未闭合错误。
