---
meta:
  - title: 拖拽排序
    time: 2020-07-06 16:42:56
    tag: js,文档
---

# 拖拽排序

## 使用方法

```js
const sorter = new Sorter(
  document.querySelector('#sort'),
  {
    dragNode: 'list-group-item'
  },
  data
)
```

## 配置项

| 参数          | 类型    | 说明                               | 可选值 | 默认值    |
| ------------- | ------- | ---------------------------------- | ------ | --------- |
| `animation`   | Boolean | 是否动画。                         | -      | true      |
| `duration`    | Number  | 动画时长（ms）。                   | -      | 200       |
| `delay`       | Number  | 动画延迟。                         | -      | 0         |
| `dragNode`    | String  | 可拖拽元素节点的 class。           | -      | sort-cell |
| `dragClass`   | String  | 被拖拽元素的 class。               | -      | ''        |
| `dragClass`   | String  | 被拖拽元素的 class。               | -      | ''        |
| `sort`        | Boolean | 列表是否可拖拽。                   | -      | true      |
| `group.clone` | Boolean | 元素是否复制的形式拖拽到另一列表。 | -      | true      |
| `group.put`   | Boolean | 列表是否能放置其他列表的元素。     | -      | true      |

## 数据

可传入一个数据数组 `data`，拖拽时会对其排序。

## 实例方法

### removeNode

根据索引删除指定的节点。

**返回值：** 对象，包括删除的元素和索引。

| 参数    | 类型   | 说明             | 可选值 | 默认值 |
| ------- | ------ | ---------------- | ------ | ------ |
| `index` | Number | 删除节点的索引。 | -      | -      |

### removeNodeAnimated

根据索引删除指定的节点，余下节点的位置改变将会以动画方式呈现。

**返回值：** 对象，包括删除的元素和索引。

| 参数    | 类型   | 说明             | 可选值 | 默认值 |
| ------- | ------ | ---------------- | ------ | ------ |
| `index` | Number | 删除节点的索引。 | -      | -      |

### addNode

在指定位置处添加节点。

**返回值：** 对象，包括添加的元素和索引。

| 参数    | 类型        | 说明               | 可选值 | 默认值 |
| ------- | ----------- | ------------------ | ------ | ------ |
| `index` | Number      | 添加节点的索引。   | -      | -      |
| `node`  | HTMLElement | 添加的节点 。      | -      | -      |
| `value` | Any         | 该节点对应的数据。 | -      | -      |

### addNodeAnimated

在指定位置处添加节点，以动画形式。

**返回值：** 对象，包括添加的元素和索引。

参数为一个对象，包括：

| 参数           | 类型        | 说明                                   | 可选值 | 默认值 |
| -------------- | ----------- | -------------------------------------- | ------ | ------ |
| `obj.index`    | Number      | 添加节点的索引。                       | -      | -      |
| `obj.node`     | HTMLElement | 添加的节点 。                          | -      | -      |
| `obj.position` | Object      | 添加的节点起始位置，相对于文档左上角。 | -      | -      |
| `obj.value`    | Any         | 该节点对应的数据。                     | -      | -      |

### start

链式添加删除节点。

示例：

```js
mysort
  .start()
  .addNode({ newNode: node, index: 5 })
  .removeNode(3)
  .end(true)
```

注意：所有的索引都是相对于开始的时候，例如在 位置 5 添加了一个节点，原先位于位置 8 的节点依然在位置 8。

`addNode` 和 `addNodeAnimated` 参数一致。

`end(true)` 表示结果会以动画呈现。

### sort

排序。

| 参数    | 类型   | 说明             | 可选值 | 默认值 |
| ------- | ------ | ---------------- | ------ | ------ |
| `start` | Number | 开始的节点索引。 | -      | -      |
| `end`   | Number | 结束的节点索引。 | -      | -      |

### destory

销毁实例。

## 事件

事件监听：

```js
mysort.on(name, callback, once)
```

| 参数       | 类型     | 说明                     | 可选值 | 默认值 |
| ---------- | -------- | ------------------------ | ------ | ------ |
| `name`     | String   | 事件名。                 | -      | -      |
| `callback` | Function | 回调函数。               | -      | -      |
| `once`     | Boolean  | 是否只监听一次后就 off。 | -      | false  |

### dragstart

拖拽开始事件。

**回调参数：** 是一个对象：

| 参数           | 类型        | 说明                       | 可选值 | 默认值 |
| -------------- | ----------- | -------------------------- | ------ | ------ |
| `obj.node`     | HTMLElement | 拖拽的节点。               | -      | -      |
| `obj.index`    | Number      | 拖拽节点的索引。           | -      | -      |
| `obj.position` | Object      | 位置信息。相对于文档左上角 | -      |        |

### dragmove

拖拽移动事件。

**回调参数：** 同 `dragstart`。

### dragend

拖拽结束事件。

**回调参数：** 同 `dragstart`。

### change

排序位置变化时触发。

**回调参数：** ：

```js
params = {
  //拖拽节点索引
  dragIndex,
  // 拖拽节点
  dragNode,
  // 发生插入的目标节点索引
  hintIndex,
  // 发生插入的目标节点
  hintNode,
  // 位置信息
  position
}
```

### sorted

排序结束时触发。

**回调参数：** ：

```js
params = {
  // 开始的索引
  startIndex,
  // 拖拽节点
  startNode,
  // 发生插入的目标节点索引
  hintIndex,
  // 发生插入的目标节点
  hintNode,
  // 位置信息
  position
}
```

### sortedOnLists

多列表时，元素从列表到另一个列表时触发。

### animationstart

动画开始事件。

### animationend

动画结束事件。

## 示例

```html demo
<div class="example-container">
  <div id="sort1" class="list-group1">
    <div class="list-group-item1">1</div>
    <div class="list-group-item1">2</div>
    <div class="list-group-item1">3</div>
    <div class="list-group-item1">4</div>
    <div class="list-group-item1">5</div>
    <div class="list-group-item1">6</div>
    <div class="list-group-item1">7</div>
    <div class="list-group-item1">8</div>
    <div class="list-group-item1">9</div>
    <div class="list-group-item1">10</div>
  </div>
  <div id="sort2" class="list-group2">
    <div class="list-group-item2">1</div>
    <div class="list-group-item2">2</div>
    <div class="list-group-item2">3</div>
    <div class="list-group-item2">4</div>
    <div class="list-group-item2">5</div>
    <div class="list-group-item2">6</div>
    <div class="list-group-item2">7</div>
    <div class="list-group-item2">8</div>
    <div class="list-group-item2">9</div>
    <div class="list-group-item2">10</div>
  </div>
  <div class="operation">
    <button id="ex-opt1">排序</button>
  </div>
  <div>列表1：</div>
  <div class="data-1"></div>
  <div>列表2：</div>
  <div class="data-2"></div>
</div>
<style>
  #sort1,
  #sort2 {
    display: inline-block;
    width: 400px;
    vertical-align: top;
  }
  .list-group-item1,
  .list-group-item2 {
    cursor: move;
    padding: 20px;
    border: 1px solid #000;
    display: inline-block;
    width: 50px;
    height: 50px;
    margin: 5px;
    font-size: 16px;
  }
  .list-group-item2 {
    background: pink;
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
      sort()
    }
  })
  const sort = function() {
    const length = document.querySelector('#sort1').children.length
    const start = Math.floor(Math.random() * length)
    const end = Math.floor(Math.random() * length)
    sorter2.sort(start, end)
  }
  const Sorter = util.Sorter
  const div1 = document.querySelector('.data-1')
  const data1 = []
  for (let index = 1; index < 11; index++) {
    data1[index - 1] = index + '*'
  }
  div1.innerHTML = data1.join(', ')
  const sorter1 = new Sorter(
    document.querySelector('#sort1'),
    {
      dragNode: 'list-group-item1',
      group: {
        clone: true,
        put: true
      },
      sort: true
    },
    data1
  )
  sorter1.on('sorted', () => {
    div1.innerHTML = data1.join(', ')
  })
  sorter1.on('sortedOnLists', () => {
    div1.innerHTML = data1.join(', ')
  })
  sorter1.init()
  const div2 = document.querySelector('.data-2')
  const data2 = []
  for (let index = 1; index < 11; index++) {
    data2[index - 1] = index
  }
  div2.innerHTML = data2.join(', ')
  const sorter2 = new Sorter(
    document.querySelector('#sort2'),
    {
      dragNode: 'list-group-item2',
      group: {
        clone: true,
        put: true
      },
      sort: true
    },
    data2
  )
  sorter2.on('dragstart', (params) => {
    console.log('dragstart:')
    console.log(params)
  })
  sorter2.on('dragmove', (params) => {
    console.log('dragmove')
    console.log(params)
  })
  sorter2.on('dragend', (params) => {
    console.log('dragend')
    console.log(params)
  })
  sorter2.on('change', (params) => {
    console.log('change:')
    console.log(params)
  })
  sorter2.on('animationstart', () => {
    console.log('animationstart')
  })
  sorter2.on('sorted', (params) => {
    console.log('sorted')
    console.log(params)
    div2.innerHTML = data2.join(', ')
  })
  sorter2.on('sortedOnLists', () => {
    div2.innerHTML = data2.join(', ')
  })
  sorter2.on('animationend', () => {
    console.log('animationend')
  })
  sorter2.init()
  Sorter.group(sorter1, sorter2)
</script>
```
