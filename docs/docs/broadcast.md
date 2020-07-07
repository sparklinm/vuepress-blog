---
meta:
  - title: 轮播图
    time: 2020-07-07 15:55:26
    tag: js,文档
---

# 轮播图

## 使用方法

```html
<div id="broadcast">
  <div class="broadcast-list">
    <div class="item" style="background: pink;">香蕉</div>
    <div class="item" style="background: salmon;">苹果</div>
    <div class="item" style="background: sandybrown;">栗子</div>
    <div class="item" style="background: goldenrod;">西红柿</div>
    <div class="item" style="background: rgb(0, 130, 190);">汤圆</div>
  </div>
</div>
```

```js
const broadcast = new Broadcast(document.querySelector('#broadcast'), {
  broadcastList: '.broadcast-list'
})
broadcast.init()
```

## 配置参数

| 参数            | 类型    | 说明                                                                         | 可选值 | 默认值          |
| --------------- | ------- | ---------------------------------------------------------------------------- | ------ | --------------- |
| `broadcastList` | String  | 轮播列表的 class。                                                           | -      | .broadcast-list |
| `startIndex`    | Number  | 初始元素。                                                                   | -      | 0               |
| `loop`          | Boolean | 是否循环轮播。                                                               | -      | true            |
| `width`         | Number  | 轮播元素的宽度，缺省会自动设置成容器宽度。                                   | -      | -               |
| `timingHeight`  | Boolean | 是否根据当前轮播窗口元素的高度自动设置容器高度。如果元素高度不一，可以开启。 | -      | false           |

## 实例方法

### init([options])

初始化实例。

- 参数
  - `{Object} [options]` 配置选项。

### pre([animation = true])

前一个元素。

- 参数
  - `{Boolean} [animation = true]` 是否动画，默认是。

### next([animation = true])

后一个元素。

- 参数
  - `{Boolean} [animation = true]` 是否动画，默认是。

### toItem(index[, animation = true, direction])

轮播到指定元素。

- 参数
  - `index`
  - `{Boolean} [animation = true]` 是否动画，默认是。
  - `direction` 滚动的方向，只在 `loop` 模式下有效。
- 用法

  ```js
  // 向右滚动
  broadcast.toItem(5, true, 1)

  // 向左滚动
  broadcast.toItem(2, true, -1)
  ```

### destroy()

销毁实例。

### on(name, callback[, once])

监听事件。

### off(name, callback)

移除事件。

## 事件

### finish

初始完成事件。

```js
broadcast.on('finish', ({ node, index }) => {
  console.log(index)
})
```

`node`: 开始的节点。
`index`: 开始节点的索引。

### slidstart

滑动开始事件。

回调参数同 `finish` 事件。

### slide

滑动事件。

### slideend

滑动结束事件。

### animationend

动画结束事件。

```js
broadcast.on('animationend', ({ node, index, lastIndex, lastNode }) => {
  console.log(index)
})
```

通常事件触发顺序：slidstart -> slide -> slideend -> animationend。

::: demo

  <div class="example-container">
      <div id="broadcast">
        <div class="broadcast-list">
          <div class="item" style="background: pink;">香蕉</div>
          <div class="item" style="background: salmon;">苹果</div>
          <div class="item" style="background: sandybrown;">栗子</div>
          <div class="item" style="background: goldenrod;">西红柿</div>
          <div class="item" style="background: rgb(0, 130, 190);">汤圆</div>
        </div>
      </div>
      <div class="operation">
        <button onclick="broadcast.next()">下一个</button>
        <button onclick="broadcast.pre()">上一个</button>
        <button onclick="broadcast.toItem(Math.random()*6)">随机</button>
        <button onclick="broadcast.toItem(Math.random()*6, true, 1)">
          随机（方向永远向右）
        </button>
      </div>
    </div>
  <style>
    .example-container {
      width: 400px;
      margin: 0 auto;
    }
    .example-container #broadcast {
      height: 250px;
    }
    .example-container .broadcast-list {
      height: 100%;
      font-size: 0;
    }
    .example-container .item {
      height: 100%;
      text-align: center;
      font-size: 16px;
    }
    .example-container .operation {
      margin-top: 20px;
    }
    .example-container .operation button {
      display: inline-block;
      line-height: 1;
      cursor: pointer;
      border: 1px solid #dcdfe6;
      text-align: center;
      box-sizing: border-box;
      outline: none;
      padding: 6px;
      font-size: 14px;
      border-radius: 4px;
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
      margin: 5px;
    }
  </style>
  <script>
    const Broadcast = util.Broadcast
    const broadcast = new Broadcast(document.querySelecto('#broadcast'), {
      broadcastList: '.broadcast-list'
      // loop: false
    })
    broadcast.on('finish', (params) => {
      console.log('finish:')
      console.log(params)
    })
    broadcast.on('slidestart', (params) => {
      console.log('slidestart:')
      console.log(params)
    })
    broadcast.on('slide', () => {
      console.log('slide')
    })
    broadcast.on('slideend', () => {
      console.log('slideend')
    })
    broadcast.on('animationend', (params) => {
      console.log('animationend:')
      console.log(params)
    })
    broadcast.init()
  </script>
:::
