---
meta:
  - title: marquee.js 文档
    time: 2020-07-02 16:25:14
    tag: js,文档
---

# marquee

## 使用方法

```js
let textNode = document.querySelector('.text')
let m = marquee(textNode)
```

## 配置项

| 参数               | 类型    | 说明                                                          | 可选值          | 默认值    |
| ------------------ | ------- | ------------------------------------------------------------- | --------------- | --------- |
| `duration`         | Number  | 动画时长（ms）。                                              | -               | 10000     |
| `gap`              | Number  | 两个文本之间的距离，单位：px。                                | -               | undefined |
| `start`            | Number  | 文本距离容器左边缘距离，单位：px。                            | -               | 0         |
| `scrollIn`         | String  | 在哪里滚动，`parent`表示在父容器里滚动，`self` 在自身里滚动。 | parent, self | parent  |
| `scrollOverflowed` | Boolean | 是否多行时才滚动                                              | -               | false     |

## 实例方法

### destory

销毁实例，移除监听事件、更改的 `dom` 和样式。

## 示例

::: demo html

<style>
  .container {
    border: 1px solid pink;
    padding: 10px;
  }
  .marquee-terms {
    display: inline-block;
    margin: 0 15px;
  }
</style>

<p class="container">
  <span class="marquee"
    >世上最甜美的欢乐都是忧伤的果实。人间最纯美的东西都是从苦难中来的。我们没有经历过艰怎么懂得去安慰别人。</span
  >
  不那么好过的日子里，要学会每天给自己找一个<span class="marquee-terms"
    >开心的理由</span
  >，哪怕只是阳光很暖，电量很满。
</p>

<script>
  util.marquee(document.querySelector('.marquee'))
  util.marquee(document.querySelector('.marquee-terms'), {
    scrollIn: 'self'
  })
</script>

:::
