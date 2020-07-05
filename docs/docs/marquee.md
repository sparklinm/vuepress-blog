---
meta:
  - title: marquee.js 文档
    time: 2020-07-02 16:25:14
    tag: marquee,js
---

# marquee

## 使用方法

```js
let textNode = document.querySelector('.text')
let m = marquee(textNode)
```

## 配置项

| 参数               | 类型    | 说明                             | 默认值    |
| ------------------ | ------- | -------------------------------- | --------- |
| `duration`         | Number  | 动画时长（ms）                   | 10000     |
| `gap`              | Number  | 两个文本之间的距离，单位：px     | undefined |
| `start`            | Number  | 文本距离容器左边缘距离，单位：px | 0         |
| `scrollOverflowed` | Boolean | 是否多行时才滚动                 | false     |

## 实例方法

### destory

销毁实例，移除监听事件、更改的 `dom` 和样式。

## 示例

::: demo html

<style>
  .marquee {
    margin: 0 auto;
    white-space: nowrap;
    overflow: hidden;
    box-sizing: border-box;
    background: pink;
  }

  .marquee span {
    display: inline-block;
    padding-left: 100%;
  }
</style>

<p class="marquee">
  <span>
    世上最甜美的欢乐都是忧伤的果实。人间最纯美的东西都是从苦难中来的。
    我们没有经历过的艰难怎么懂得去安慰别人。
  </span>
</p>

<script>
  util.marquee(document.querySelector(".marquee"))
</script>

<script>
  document.querySelector(".marquee").style.background="red"
</script>

:::
