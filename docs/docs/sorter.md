---
meta:
  - title: 拖拽排序
    time: 2020-07-06 16:42:56
    tag: js
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

### dragstart

### dragmove

### change

### animationstart

### animationend

### removed

### added
