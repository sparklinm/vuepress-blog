---
meta:
  - title: vue中使用EChart
    time: 2020-04-02 9:38:32
    tag: vue,echart
---

# vue 中使用 EChart

## 前言

在 vue 中使用 `echarts`，遇到了许许多多的问题，这里总结了一下如何配置 `vue-echarts` 组件，以及一些使用 `echarts` 过程遇到的问题和解决方案。

<!-- more -->

## 引入 Echart

```javascript
import ECharts from "vue-echarts";
import "echarts";
// 手动引入模块
// import 'echarts/lib/chart/line'
// import 'echarts/lib/component/polar'
Vue.component("v-chart", ECharts);
```

```html
<v-chart
  theme="roma"
  :init-options="initOptions"
  :options="options"
  class="chart"
/>
```

参数配置和 api 一致

**props 见：**
[github vue-echarts](https://github.com/ecomfe/vue-echarts/blob/master/README.zh_CN.md)

**官方 api 文档：**
[echarts 文档](https://echarts.apache.org/zh/tutorial.html)

## 引入自定义主题

```JavaScript
import ECharts from 'vue-echarts'
import roma from './roma'
ECharts.registerTheme('roma', roma.theme)
```

在组件实例化的过程中通过 `theme` props 传入。

## 坐标轴和数据

`series[i].data` 中的数据和坐标轴刻度存在对应关系：

```JavaScript
series: [{
    data: [
        // 维度X   维度Y   其他维度 ...
        [  3.4,    4.5,   15,   43],
        [  4.2,    2.3,   20,   91],
        [  10.8,   9.5,   30,   18],
        [  7.2,    8.8,   18,   57]
    ]
}]
```

data 中的元素一般是数组，数组的第一项对应着坐标轴的 x 轴，第二项对应 y 轴（极坐标对应 radiusAxis 和 angleAxis）。

坐标轴的类型有四种，`xAxis.type` 取值：

1. `'value'` 数值轴，适用于连续数据。

2. `'category'` 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。

3. `'time'` 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。

4. `'log'` 对数轴。适用于对数数据。

当为 `value` 或者 `log` 时，坐标值需要为 `number` 或是 `string` 形式的 `number`。
当为 `time` 时，坐标值需要为：

1. 一个时间戳，如 `1484141700832`，表示 UTC 时间。
2. 字符串形式的时间描述：`2012-03-01`。

详细描述见：

[Echarts 文档：series 数据说明](https://echarts.apache.org/zh/option.html#series-line.data)。

```js
  xAxis: {
    type: "value"
  }

  yAxis: {
    type: "value"
  }

  series: [
    {
      data: [
        // xAxis yAxis
        [1.2234,   2,   15, 43],
        [2.2344,   3,   20, 91],
        [3.3456,   4,   30, 18]
      ]
    }
  ]

  series: [
    {
      data: [
        // 同为X、Y轴值
        1，
        2，
        3
      ]
    }
  ]
```

如果 `series[i].data` 为一维数组，且 X、Y 轴都不为 `category`，那 X、Y 轴都会对应同一值。

当为 `category`，意味着自定义刻度，需在 `xAxis.data` 中指明刻度。如果不指明，会从`series[i].data`自动获取对应维度的值作为范围类型刻度，如果对应维度值没有，该轴刻度将为空。

当只有一个轴为 `category` 的时候，`series[i].data` 可以简化用一个一维数组表示。此时，另一个轴的坐标值对应 `series[i].data`。

当某维度对应于类目轴（`axis.type` 为 `category`）的时候，其值须为类目的『序数』（从 0 开始）或者类目的『字符串值』。例如：

```javascript
  xAxis: {
      type: 'category',
      data: ['星期一', '星期二', '星期三', '星期四']
  },
  yAxis: {
      type: 'category',
      data: ['a', 'b', 'm', 'n', 'p', 'q']
  },
  series: [{
      data: [
          // xAxis    yAxis
          [  0,        0,    2  ], // 意思是此点位于 xAxis: '星期一', yAxis: 'a'。
          [  '星期四',  2,    1  ], // 意思是此点位于 xAxis: '星期四', yAxis: 'm'。
          [  2,       'p',   2  ], // 意思是此点位于 xAxis: '星期三', yAxis: 'p'。
          [  3,        3,    5  ]
      ]
  }]

```

## 获得图例高度（横向布局）

获得图例的高度，需要知道的信息如下：

1. 图例占了多少行
2. 每一行的高度

如果能知道**每一项图例的宽度**以及**图例组件的宽度**，自然就能计算出图例的行数。

**图例组件宽度**在不指定的情况下为容器宽度，需要得到的是**每一项图例宽度**。

可以使用 `eharts` 的 `computedOptions` 属性获取图表的配置，从图例的配置项可以知道以下信息：

1. itemGap: 图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
2. itemWidth：图例标记的图形宽度。
3. itemHeight：图例标记的图形高度。
4. lineHeight: 行高，数值，表示 px，不指定是默认是 1.2 倍
5. 另外图例图形和文字之间会有 5px 的距离

所以，行数：

```js
图例宽度 = itemWidth + 5 + textWidth（文字宽度）+ itemGap

总图例宽度 = 每一项图例宽度之和
行数 = Math.ceil(总图例宽度 / 图例组件宽度)
```

同时，每一行高度为：

```js
// 如果行高是默认1.2倍
每一行高度 = Math.max(文字高度, 图例标记图形高度) * lineHeight;
// 如果行高是指定的px
每一行高度 = Math.max(Math.max(文字高度, 图例标记图形高度), lineHeight);
```

对于文字宽度，有 2 种方法可以得到，都需要借助辅助节点。

1. 创建 html 节点，例如 span（需要 inline-block），将文字放入其中，再用 `window.getComputedStyle` 获取文字的宽度。
2. 创建 canvas 节点，使用 `measureText` 方法获取文字宽度

> 两者的区别在于 `measureText`可以测量 12px 以下的字体宽度

`measureText`使用方法如下：

```javascript
function getTextWidth(text, fontStyle) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  // 要先插入节点，再设置font
  document.body.appendChild(canvas);
  context.font = fontStyle;
  document.body.removeChild(canvas);
  return context.measureText(text).width;
}
```

这里有一个要注意的地方，**需要在设置 canvas 的 font 之前，将 canvas 插入 dom 中**。这样才能正确测量小于 12px 的字体宽度。

`canvas.font` 和 `css font` 的格式一致，如下：

```
font：font-style font-variant font-weight font-size/line-height font-family
```

其中 `font-size`和`font-family` 是必需的，对于 `canvas.font` 设置 `line-height` 是无效的。

`legend.textStyle` 记录了图例文本的样式，需要将它转换为 font

```JavaScript
function getChartFontStyle (textStyle) {
  function getValue (value) {
    return typeof value === 'undefined' ? '' : value + ' '
  }
  function getFamily (value) {
    return typeof value === 'undefined' ? 'sans-serif' : value
  }
  function getSize (fontSize, lineHeight) {
    if (typeof fontSize !== 'undefined' && typeof lineHeight !='undefined') {
      return `${fontSize}px/${lineHeight}px `
    }
    if (typeof fontSize !== 'undefined') {
      return getValue(fontSize + 'px')
    }
    if (typeof lineHeight !== 'undefined') {
      return getValue(lineHeight + 'px')
    }
    return ''
  }
  const font = `${getValue(textStyle.fontStyle)}${getVal(textStyle.fontWeight)}${getSize(textStyle.fontSize, textStyle.lineHeight)}${getFamily(textStyle.fontFamily)}`

  return font
}
```

最后再计算图例组件高度：

```javascript
function getLegendHeight(legend, chartWidth) {
  const {
    data,
    itemWidth: iconWidth,
    itemHeight: iconHeight,
    itemGap,
    height
  } = legend;

  if (height) {
    return height;
  }
  if (!data || !data.length) {
    return 0;
  }

  const leftWidth = legend.width || chartWidth;
  let totalWidth = 0;
  const textStyle = _.cloneDeep(legend.textStyle);

  // 对于echart，如果fontSize小于12并不会让一行的元素更多，而是会在元素之间增加距离
  textStyle.fontSize = textStyle.fontSize < 12 ? 12 : textStyle.fontSize;
  data.forEach(item => {
    const name = typeof item === "object" ? item.name : item;
    const text = legend.formatter(name);
    const textWidth = this.getTextWidth(
      text,
      this.getChartFontStyle(textStyle)
    );
    // 图例图形和文字之间的距离
    const iconGap = 5;

    totalWidth += iconWidth + textWidth + iconGap;
  });

  const rowCount = Math.ceil(totalWidth / leftWidth);
  const textHeight = legend.textStyle.fontSize || 12;
  const itemHeight = textHeight > iconHeight ? textHeight : iconHeight;
  // 文字有默认的1.2倍行距
  const lineHeight = legend.textStyle.lineHeight || 1.2;
  let rowHeight = itemHeight;

  if (lineHeight === 1.2) {
    rowHeight *= 1.2;
  } else if (lineHeight > itemHeight) {
    rowHeight = lineHeight;
  }
  const legendHeight = rowCount * (rowHeight + itemGap) - itemGap;

  return legendHeight;
}
```

有 2 个注意点：

1. 对于 echart，如果 fontSize 小于 12 并不会让一行的元素更多，而是会在元素之间增加距离
2. 文字有默认的 1.2 倍行距

对于注意点 1，既然有这个限制，那就可以直接将文字放入 `span` 中按照 `12px` 来获取宽度，这样计算的行数不会有偏差。

这里没有考虑到富文本的情况，如果是富文本，还需要对富文本进行解析，更为复杂了。。

## 图表高度自适应图例行数

先设置图表高度为一定值 `h`，表示没有图例时图表高度，当图例行数变化，图表高度=`h`+图例高度。

## 柱状图为每根柱条设置不同颜色

`series[i]-bar.itemStyle.color`可以接收一个函数，并传入相应图表配置作为参数，需要返回一个颜色值。

```javascript
color: params => {
  const color = [
    "#E01F54",
    "#f5e8c8",
    "#a4d8c2",
    "#ff6347",
    "#f3d999",
    "#d3758f",
    "#dcc392"
  ];
  return color[params.dataIndex];
};
```

## 封装带有默认样式的 chart 组件

在组件上绑定的`options`属性：

如果直接修改 `options` 绑定的数据而对象引用保持不变，`setOption` 方法调用时将带有参数 `notMerge: false`。否则，如果为 `options` 绑定一个新的对象，`setOption` 方法调用时则将带有参数 `notMerge: true`。

- `notMerge`
  可选，是否不跟之前设置的 `option` 进行合并，默认为 `false`，即合并。

合并会引发一个问题，当你修改的属性不是最深层属性时，视图更新可能不如预期。

例如：直接修改`options.series=[]`，这并不会起作用，因为会和上次的`series`合并。

这时应该为 `options` 绑定一个新的对象：

```javascript
const options = Object.assign({}, chart.options);
options.series = [];
chart.options = options;
```

因为`options`在不改变引用的情况下，会自动合并，这为我们更改图表的默认行为带来了方便。

例如，可以对柱状图进行二次封装，

```html
<!-- custom-bar 组件-->
<template>
  <div ref="chartContainer" class="bar-container">
    <v-chart
      id="bar"
      ref="chart"
      :init-options="chartInitOptions"
      :options="chartOptions"
      autoresize
      theme="roma"
    />
  </div>
</template>

<script>
  export default {
    props: {
      options: {
        type: Object,
        default: null
      },
      notMerge: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        chartOptions: {
          tooltip: {
            trigger: "item",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow", // 默认为直线，可选为：'line' | 'shadow',
              shadowStyle: {}
            },
            textStyle: {
              fontSize: 10
            }
          },
          legend: {
            left: "center",
            data: [],
            bottom: 0,
            padding: 0,
            itemGap: 0,
            itemWidth: 8,
            itemHeight: 8,
            selectedMode: false,
            textStyle: {
              fontSize: 9,
              color: "#fff"
            }
          },
          grid: {
            top: "10%",
            left: "0%",
            right: "4%",
            bottom: "12%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              splitLine: {
                show: false
              },
              axisLabel: {
                fontSize: 10
              }
            }
          ],
          yAxis: [
            {
              type: "value",
              splitLine: {
                show: false
              }
            }
          ],
          series: [
            {
              name: "",
              type: "bar",
              barCategoryGap: "3",
              label: {
                show: true,
                position: "top",
                fontSize: 8
              },
              emphasis: {},
              data: []
            }
          ],
          textStyle: {
            color: "#fff"
          },
          animationDuration: 2000
        }
      };
    },
    watch: {
      options(val) {
        if (!_.isEmpty(val)) {
          if (!this.notMerge) {
            this.chartOptions = val;
          }
          // 维持chartOptions的引用不变
          Object.assign(this.chartOptions, val);
        }
      }
    }
  };
</script>

<style lang="less">
  .bar-container {
    width: 7.56rem;
    height: 3rem;
  }
</style>
```

这样，我们只需要在调用 `custom-bar` 组件时，像正常 `options` 那样按层次书写属性，并通过`props`传入组件。

这是因为`custom-bar`组件在初始化时，已经将`chartOptions`中定义的默认行为传入`echarts`中，对于之后通过`props`中传入的属性，会和上次的合并。

如果不需要合并，同样可以通过`props`->`notMerge`控制。

需要注意的是`watch`监听对象属性的变化时，必须保证在监听前：

- 对象的属性也是响应式（data 中定义，或者 vm.\$set 函数定义）

对于`chartOptions`会被传入`echarts`组件中作为一个`watch`对象，因为`Object.assign`只是第一层的浅拷贝，**所以在传入的`options`的第一层`key`需要在`chartOptions`已经存在**。

例如：上面的 `chartOptions` 中没有 `title`，那么 `options` 中也不能出现 `title` 字段。

## vue-echarts 显隐问题

`vue-echarts` 是对 `echarts` 的封装，使其以组件的方式在 vue 中使用。

(github vue-echarts)[https://github.com/ecomfe/vue-echarts/blob/master/README.zh_CN.md]

在使用这个组件时，如果对其 `显/隐` 操作，可能会出现问题。

组件会根据 `options` 的引用对象是否改变而决定使用 `setOption` 的合并或者不合并策略。（`setOption(options, true)` 或者 `setOption(options, false)`）

> 当组件从隐藏到显示，会使用`setOption(options, true)`来重新渲染。

如果图表先是以 `defaultOptions` 显示：

```js
defaultOptions = {
  legend: {
    textStyle: {
      fontSize: 20,
      color: "#555"
    }
  }
};
```

然后改变 `defaultOptions`（维持引用不变），让图表重新渲染:

```js
defaultOptions.textStyle = {
  color: "#000"
};
```

这时候图表渲染的情况是 `defaultOptions` 和 `options` 的合并，即：

```js
defaultOptions = {
  legend: {
    textStyle: {
      fontSize: 20,
      color: "#000"
    }
  }
};
```

然后让图表隐藏，再让图表显示出来，那渲染的情况会和隐藏前不一样。此时会使用`setOption(options, true)`，只对最后一次设置的 `defaultOptions` 渲染：

```js
defaultOptions = {
  legend: {
    textStyle: {
      color: "#000"
    }
  }
};
```

所以，在渲染图表时，如果图表会 `显/隐` 转换，如果要保证图表一致，有以下三种方法：

- 总是直接设置 `options`（改变对象引用）。
- 总是设置 `options` 最深层属性。
- 如果未设置图表的最深层属性，也未改变对象引用，那么需要在隐藏时获取 `computedOptions` 的值，在显示时用 `computedOptions` 渲染。

对于上面的 `custom-bar` 组件，应该使用第三种方法。组件内提供一个方法用于**储存 `computedOptions`**，一个方法用于**用储存的 `computedOptions` 渲染**。

如果传入 `options` 没有再改变过，那么可以简单的使用 v-if 控制图表 `显隐`。

## 事件

echarts 中的事件分为两种：

1. 一种是鼠标事件，在鼠标点击某个图形上会触发
2. 还有一种是 调用 dispatchAction 后触发的事件。

事件监听通过 on() 方法。

### 鼠标事件

鼠标事件，例如'click'，'mousemove'等。

参数如下：

```js
(
    eventName: string,
    query: string|Object,
    handler: Function,
    context?: Object
)
```

query 表示过滤条件，能够只在指定的组件或者元素上进行响应。
context 表示 this 的指向。

```js
chart.on('click', function () {...});
chart.on('click', 'series', function () {...});
chart.on('click', 'series.line', function () {...});
chart.on('click', 'dataZoom', function () {...});
chart.on('click', 'xAxis.category', function () {...});

```

如果不指定 query，也不是 chart 的所有地方都能触发，只是在能够触发的地方触发，例如：折线图的每个点。

对于 vue-echarts，无法使用 query 过滤条件。

```html
<!-- 无法使用query过滤 -->
<v-chart @click="handle"></v-chart>
```

但可以在回调函数中，分辨点击的地方:

```js
function handle(params) {
  console.log(params.componentType);
}
```

具体请看官方教程：

[ECharts 中的事件和行为](https://echarts.apache.org/zh/tutorial.html#ECharts%20%E4%B8%AD%E7%9A%84%E4%BA%8B%E4%BB%B6%E5%92%8C%E8%A1%8C%E4%B8%BA)

### ZRender 事件

为图表绑定 click 等鼠标事件只会在特定的地方触发，但通过 ZR 事件即可以让相应鼠标事件在整个图表触发。

```js
chart.getZr().on("click", fn);
```

```html
<v-chart @zr:click="handle"></v-chart>
```

相关应用：

[完美解决 echarts 的柱状图和折线图的点击非图表图形元素不会触发事件](https://blog.csdn.net/smk108/article/details/78482154)

## dispatch 事件

dispatch 可以看做是 js 去控制图表的行为，例如选中图例、数据区域缩放 dataZoom、显示提示框等。

例如选中图例：

```js
chart.dispatchAction({
  type: "legendSelect",
  // 图例名称
  name: "name1"
});
```

使用后，名为 name1 的图例就会被选中。同时会触发对应事件 `legendselected`。

```js
chart.on("legendselected", function(params) {
  console.log(params);
});
```

对于手动点击图例，改变图例选中状态，只会触发 `legendselectchanged` 事件。

`dispatchAction` 可以触发的行为称为 [action](https://echarts.apache.org/zh/api.html#action)，相对应的事件定义在 [events](https://echarts.apache.org/zh/api.html#events)。

## dataZoom 问题

dataZoom 组件用于控制图表的缩放平移：

[Echarts 文档 dataZoom 组件](https://echarts.apache.org/zh/option.html#dataZoom)

使用 dataZoom 的平移功能，并把 X 轴初始位置改变：

```js
options = {
  dataZoom: [
    {
      type: "inside",
      xAxisIndex: [0],
      startValue: 17,
      endValue: 23,
      zoomLock: true
    }
  ],
  series: [
    {
      // 6月数据
      data: []
    }
  ]
};
```

这里从 6 月的第 18 天开始显示，如图：

![enter description here](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1592727613395.png)

然后改变 `data`，例如显示 5 月的数据：

```js
// 5月数据
options.series[0].data = [];
```

预期的显示：

![enter description here](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1592727613399.png)

实际的显示：

![enter description here](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1592727613399.png)

可以发现，显示明显有问题，原因有 2 点:

1. 这里没改变 `options` 的引用，所以会根据两次数据的差值做渲染。
2. `dataZoom.filterMode` 默认为 `filter`

关于 `filterMode` 的取值和说明见文档：

[Echarts 文档 dataZoom.filterMode](https://echarts.apache.org/zh/option.html#dataZoom-inside.filterMode)

这里要想正确渲染，有 2 种方法：

1. 需要把 `filterMode` 设置为 `empty`。（会根据两次 data 数值差值做动画）
2. 直接改变 `options` 的引用，`setOption(options, false)` 不合并渲染。（重新渲染的动画）
