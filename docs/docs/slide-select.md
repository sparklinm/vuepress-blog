---
meta:
  - title: 滑动选择器
    time: 2020-07-07 10:52:21
    tag: js,文档
---

# 滑动选择器

## 使用方法

```html
<div id="slide-select">
  <div class="slide-select-list">
    <div class="item">香蕉</div>
    <div class="item">苹果</div>
    <div class="item">栗子</div>
    <div class="item">西红柿</div>
    <div class="item">汤圆</div>
    <div class="item">烧烤</div>
  </div>
</div>
```

```js
const select = new SlideSelect(document.querySelector('#slide-select'), {
  // 列表class
  slideList: '.slide-select-list',
  // 可见行数
  visiableRowCount: 4,
  // 初始位置索引
  startIndex: 1,
  // 保持索引位置不变
  keepIndex: true,
  // 选择节点的class
  selectedClass: 'slide-item-checked',
  // 选择框
  selectBox: {
    // 选择框所在位置
    position: 1,
    // 选择框的样式
    style: {
      backgroundColor: 'coral',
      border: 'none'
    }
  }
})
select.init()
```

需保证每个元素的高度一致。

## 配置参数

| 参数                 | 类型    | 说明                              | 可选值 | 默认值             |
| -------------------- | ------- | --------------------------------- | ------ | ------------------ |
| `slideList`          | String  | 列表容器的 class。                | -      | .slide-list        |
| `visiableRowCount`   | Number  | 显示的行数。                      | -      | 5                  |
| `startIndex`         | Number  | 初始被选择的元素。                | -      | 0                  |
| `keepIndex`          | Boolean | 多次初始化时保持所选位置不变。    | -      | true               |
| `selectedClass`      | String  | 为被选择元素添加的 class。        | -      | slide-item-checked |
| `selectBox`          | Object  | 选择框配置。                      | -      | -                  |
| `selectBox.position` | Number  | 选择框位置。                      | -      | 2                  |
| `selectBox.style`    | Object  | 选择框样式。同节点的 style 属性。 | -      | -                  |

## 实例方法

### init([options])

初始化实例。

- 参数
  - `{Object} [options]` 配置选项。
- 用法
  如果 `keepIndex` 为 `true`，再次 `init` 时未指定 `startIndex`，那列表的选择索引不会改变。

### pre([animation])

选择上一个。

- 参数
  - `{Boolean} animation` 是否动画。

### next([animation])

选择下一个。

- 参数
  - `{Boolean} animation` 是否动画。

### toItem(index [,animation])

选择指定元素。

- 参数
  - `{Number} index` 选择元的索引。
  - `{Boolean} animation` 是否动画。

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
select.on('finish', ({ node, index }) => {
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

### change

选择框元素改变事件。

```js
select.on('change', ({ index, node, lastIndex, lastNode }) => {
  console.log(index)
})
```

### selected

选择框元素改变事件。

```js
select.on('selected', ({ index, node, startIndex, startNode }) => {
  console.log(index)
})
```

### animationend

动画结束事件。

## 示例

```html demo
<div class="example-container">
  <div class="title">选择水果</div>
  <div id="slide-select">
    <div class="slide-select-list">
      <div class="item">香蕉</div>
      <div class="item">苹果</div>
      <div class="item">栗子</div>
      <div class="item">西红柿</div>
      <div class="item">汤圆</div>
      <div class="item">烧烤</div>
    </div>
  </div>
  <div class="operation">
    <button id="ex-opt1">下一个</button>
    <button id="ex-opt2">上一个</button>
    <button id="ex-opt3">随机选择</button>
  </div>
  <div class="selected-value"></div>
</div>
<style>
  .example-container {
    width: 300px;
    margin: 0 auto;
  }
  .example-container .title {
    border-bottom: 1px solid rgb(0, 68, 124);
    padding: 5px 0;
    margin-bottom: 5px;
  }
  .example-container #slide-select {
    text-align: center;
  }
  .example-container .item {
    padding: 5px 0;
  }
  .example-container .slide-item-checked {
    color: brown;
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
  document.querySelector('.operation').addEventListener('click', (e) => {
    const id = e.target.id
    if (id === 'ex-opt1') {
      select.next()
    } else if (id === 'ex-opt2') {
      select.pre()
    } else if (id === 'ex-opt3') {
      select.toItem(Math.random() * 6)
    }
  })
  const SlideSelect = util.SlideSelect
  const select = new SlideSelect(document.querySelector('#slide-select'), {
    slideList: '.slide-select-list',
    // 可见行数
    visiableRowCount: 4,
    // 初始位置索引
    startIndex: 1,
    // 保持索引位置不变
    keepIndex: true,
    // 选择框
    selectBox: {
      // 选择框所在位置
      position: 1,
      style: {
        backgroundColor: 'coral',
        border: 'none'
      }
    }
  })
  const data = ['香蕉', '苹果', '栗子', '西红柿', '汤圆', '烧烤']
  const div = document.querySelector('.selected-value')
  select.on('change', ({ index }) => {
    div.innerHTML = data[index]
  })
  select.on('finish', ({ index }) => {
    div.innerHTML = data[index]
  })
  select.on('finish', (params) => {
    console.log('finish:')
    console.log(params)
  })
  select.on('slidestart', (params) => {
    console.log('slidestart:')
    console.log(params)
  })
  select.on('slide', () => {
    console.log('slide')
  })
  select.on('slideend', () => {
    console.log('slideend')
  })
  select.on('change', (params) => {
    console.log('change:')
    console.log(params)
  })
  select.on('selected', (params) => {
    console.log('selected:')
    console.log(params)
  })
  select.on('animationend', () => {
    console.log('animationend:')
  })
  select.init()
</script>
```
