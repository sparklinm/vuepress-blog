---
meta:
  - title: PC、移动端拖拽
    time: 2020-04-23 19:19:28
    tag: html
---

# PC、移动端拖拽

## H5 拖拽

### 设置元素可拖动

设置拖拽属性`draggable="true"`。

```html
<img draggable="true" />
```

<!-- more -->

### 拖拽事件

#### dragstart

拖拽开始，使用 `dataTransfer.setData()` 方法设置被拖数据的数据类型和值。

```javascript
function dragstart(e) {
  e.dataTransfer.setData("Text", e.target.id);
}
```

需要注意的是：在 `IE` 下 `setData` 会报错，在火狐浏览器下必须有 `setData` 才能拖动。

```javascript
let id = "";
function dragstart(e) {
  if (e.dataTransfer.setData) {
    e.dataTransfer.setData("text/plain", e.target.id);
  }
  if (e.dataTransfer.dropEffect) {
    // 拖动效果，兼容性不明
    e.dataTransfer.dropEffect = "move";
  }
  id = e.target.id;
}
```

关于 `dataTransfer` 的更多：[MDN dataTransfer](https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer)。

#### drag

拖拽过程中触发。

#### dragend

在释放鼠标后触发（无论是把元素放到了有效的放置目标，还是放置到了无效的放置目标上）。

### 放置事件

#### dragenter

元素被拖动到放置目标上触发

#### dragover

被拖动的元素在放置目标的范围内移动时，持续触发。

默认地，无法将数据/元素放置到其他元素中。如果需要设置允许放置，我们必须阻止对元素的默认处理方式。

这要通过调用 `dragover` 事件的 `event.preventDefault()` 方法。

```js
function dragover(ev) {
  ev.preventDefault();
}
```

#### dragleave

被拖到元素离开放置目标。

#### drop

被拖动元素放置到目标元素上。

```javascript
function drop(e) {
  e.preventDefault();
  var data = e.dataTransfer.getData("Text");
  e.target.appendChild(document.getElementById(data));
}
```

说明：

1. 调用 `preventDefault()` 来避免浏览器对数据的默认处理（drop 事件的默认行为是以链接形式打开）
2. 通过 `dataTransfer.getData("Text")` 方法获得被拖的数据。该方法将返回在 `setData()` 方法中设置为相同类型的任何数据。
3. 把被拖元素追加到放置元素（目标元素）中

完整的事件触发顺序：

`dragstart` -> `drag` -> `dragenter` -> `dragover` -> (`dragleave`)-> `drop` -> `dragend`

更详细的说明见：[MDN 拖放](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API)。

### 拖拽过程中鼠标位置

1. `e.pageX`: 距整个文档左上角距离，包括滚动条等
2. `e.clientX`: 距离可视窗口左上角距离
3. `e.screenX`：距屏幕左上角距离
4. `e.offsetX`: 鼠标相比较于触发事件的元素的位置,以元素盒子模型的内容区域(不包括 `border`)的左上角为参考
5. `e.layerX`: 如果触发元素设置了定位，将相对于元素左上角（包括 `border`)；如果没有，相对于页面左上角
6. `e.x`: 和 `layerX` 一样

其中 `layerX` 和 `x` 兼容性不太好，尽量不要使用，其他参考[Can I use](https://www.caniuse.com/)。

## 移动端拖拽

### 相关事件

H5 拖拽 api 在移动端是无效的。移动端的拖拽只能使用触摸事件。

**touchstart**
手指接触屏幕

**touchmove**
手指在屏幕上移动

**touchend**
手指离开屏幕

参考：[MDN touch events](https://developer.mozilla.org/zh-CN/docs/Web/API/Touch_events)

### 触摸点

- `target` 触发事件节点
- `touches` 当前位于屏幕上的所有手指触摸点的一个列表。
- `targetTouches` 当前元素对象上所有触摸点的列表。
- `changedTouches` 涉及当前事件的触摸点的列表。

三者的区别：

1. 用一个手指接触屏幕，触发事件，此时这三个属性有相同的值。

2. 用第二个手指接触屏幕，此时，`touches` 有两个元素，每个手指触摸点为一个值。

   - 当两个手指触摸相同元素时，`targetTouches` 和 `touches` 的值相同，
   - 否则 `targetTouches` 只有一个值。`changedTouches` 此时只有一个值，为第二个手指的触摸点，因为第二个手指是引发事件的原因

3. 用两个手指同时接触屏幕，此时 `changedTouches` 有两个值，每一个手指的触摸点都有一个值。

4. 手指滑动时，三个值都会发生变化。

5. 一个手指离开屏幕，`touches` 和 `targetTouches` 中对应的元素会同时移除，而 `changedTouches` 仍然会存在元素。

6. 手指都离开屏幕之后，`touches` 和 `targetTouches` 中将不会再有值，`changedTouches` 还会有一个值，此值为最后一个离开屏幕的手指的接触点。

> 总结来说：
>
> 1. `targetTouches` 是你监听元素上的触摸点。
> 2. `touches` 屏幕上的所有触摸点。
> 3. `changedTouches` 每次触摸改变的触摸点。

### 触摸点位置

触摸点属性：

- `clientX`、`clientY` 触摸点相对于可视窗口的 x、y 坐标。
- `pageX`、`pageY` 触摸点相对于 html 文档左上方，也就是包括滚动区域。
- `screenX`、`screenY` 触摸点相对于屏幕的坐标。

获取触摸点坐标：

touchstart、touchmove: `e.targetTouches[0].pageX`

touchend: `e.changedTouches[0].pageX`
