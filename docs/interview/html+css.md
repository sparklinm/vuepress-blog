# html+css 面试

## CSS

### css 伪类与伪元素区别

伪类和伪元素分别⽤单冒号:和双冒号::来表示。

伪类表示抽象的类，它描述 dom 的特征，比如元素 :hover，元素的位置:first-child。

伪元素是创建了一个抽象节点，html 文档中本没有这个节点，这个节点表现为与普通节点一致，并且能够被访问到。

```js
var color = window.getComputedStyle(document.querySelector('.element'), ':before').getPropertyValue('color');
```

### 层叠上下文

层叠上下文：元素在 z 轴上的层级，即 z-index 。

**产生条件：**

1. HTML 中的根元素 `<html></html>` 本身就具有层叠上下文，称为“根层叠上下文”。
2. 普通元素设置 position 属性为非 static 值并设置 z-index 属性为具体数值，产生层叠上下文。
3. CSS3 中的新属性（transform）也可以产生层叠上下文。

**特性：**

1. 元素的层叠等级基于父元素的层叠等级（如果父元素存在层叠等级）

### BFC

**BFC 的生成：**

1. 根元素
2. float 的值不为 none
3. overflow 的值不为 visible
4. display 的值为 inline-block、table-cell、table-caption，display：table 也认为可以生成 BFC，其实这里的主要原因在于 Table 会默认生成一个匿名的 table-cell，正是这个匿名的 table-cell 生成了 BFC
5. position 的值为 absolute 或 fixed

**BFC 的约束规则：**

1. 内部的 Box 会在垂直方向上一个接一个的放置
2. 垂直方向上的距离由 margin 决定。（完整的说法是：**属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠（塌陷），与方向无关**。）
3. 每个元素的左外边距与包含块的左边界相接触（从左向右），即使浮动元素也是如此。（这说明 BFC 中子元素不会超出他的包含块，而 position 为 absolute 的元素可以超出他的包含块边界）
4. **BFC 的区域不会与 float 的元素区域重叠**
5. **计算 BFC 的高度时，浮动子元素也参与计算**
6. **BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面元素，反之亦然**

**应用：**

1. 清除浮动
2. 解决上下 margin 重叠
3. 实现两栏布局

### CSS3 新特性

-   支持媒体查询

    ```CSS
    @media not|only mediatype and (expressions) {
        CSS 代码...;
    }

    /* 例如 可视窗口大于480px时 同理 max-width*/
    @media screen and (min-width: 480px) {
        #leftsidebar {width: 200px; float: left;}
        #main {margin-left:216px;}
    }
    ```

    mediatype:all|printscreen|speech

-   文字阴影 text-shadow: 5px 5px 5px #ff0000;
-   盒阴影 box-shadow: 10px 10px 5px 3px #888888 outset
-   支持圆角 border-radius: 50%;

-   transition
-   animation
    animation: myfirst 5s linear 2s infinite|2|3(次数) reverse(反向播放)|alternate(动画在奇数次（1、3、5...）正向播放，在偶数次（2、4、6...）反向播放。)|alternate-reverse(动画在奇数次（1、3、5...）反向播放，在偶数次（2、4、6...）正向播放。);

-   transform

-   新背景属性:

-   background-image

-   background-size: length|percentage|cover|contain

    -   cover
        此时会保持图像的纵横比并将图像缩放成将完全覆盖背景定位区域的最小大小。(占满但可能显示不全)
    -   contain
        此时会保持图像的纵横比并将图像缩放成将适合背景定位区域的最大大小。（显示全但可能不占满）

-   background-origin: padding-box|border-box|content-box
    背景图片的放置, 该属性指定了背景从哪个区域(边框、补白或内容)开始绘制

-   background-clip: border-box|padding-box|content-box;
    背景图片的剪裁，该属性指定了背景在哪些区域(边框、补白或内容)可以显示

    ```css
    .div {
        background-origin: padding-box;
        background-clip: content-box;
    }
    ```

    这里表示背景图片从 padding 开始绘制，但只会显示 content 中的那部分。

-   background-position [left top]|[x% y%]|[xpos ypos]
    设置背景图像的起始位置。
    背景图像左上角点在容器中的坐标。依赖于 background-origin 的设置。
    百分比含义：`(容器的宽度 — 背景图片的宽度) * x百分比`，所以 `center center`（`%50 %50` 总能让图片中心居中于容器）

### css 优先级

-   元素和伪元素：1
-   类选择器、属性选择器或伪类：10
-   id 选择符：100
-   内联样式：1000
-   !important 声明的样式优先级最高，如果冲突再进行计算。
-   继承得到的样式的优先级最低。
-   如果优先级相同，则选择最后出现的样式。

### 盒模型

盒模型的组成，由里向外 content,padding,border,margin.

在 IE 盒子模型中，width 表示 **content+padding+border** 这三个部分的宽度

在标准的盒子模型中，width 指 **content** 部分的宽度

```
box-sizing: content-box 是W3C盒子模型
box-sizing: border-box 是IE盒子模型
```

### 垂直水平居中

1. text-align + padding
2. text-align + line-height （单行文字，且 font-size 和父节点 font-size 的一样）
   首先，line-height 并不能使元素垂直居中，当设置 line-height 后元素垂直居中的原理是行框的上下间距同时变大。因为是元素 baseline 和行框 baseline 对齐，所以在元素高度和行框差不多时，就是近似垂直居中，而一旦元素高度过高，变难以垂直居中。解决方法看下面：
3. text-align + 伪元素: height: 100% + vertical-align
4. text-align + line-height + vertical-align （非单行文字或是其他非文字行内元素）
5. absolute + margin （已知高度）
6. absolute + transform
7. flex
8. absolute + margin auto

    ```css
    .parent {
        position: relative;
        width: 300px;
        height: 300px;
    }
    .child {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 100px;
        height: 100px;
    }
    ```

### em

1. 子元素字体大小的 em 是相对于父元素字体大小
2. 元素的 width/height/padding/margin 用 em 的话是相对于该元素的 font-size

### css 画三角形、扇形

```css
.triangle {
    width: 0;
    height: 0;
    border-width: 100px;
    border-style: solid;
    border-color: transparent transparent #0099cc transparent;
}

.sector {
    width: 0;
    height: 0;
    border-width: 100px;
    border-style: solid;
    border-color: transparent transparent #0099cc transparent;
    border-radius: 50%;
}
```

### 清除浮动

1. ::after + clear:both

    ```css
    .container::after {
        display: block;
        clear: both;
        content: '';
        overflow: hidden;
    }
    ```

2. BFC

### 三栏布局

1. 左右浮动，中间 BFC
2. 左右浮动，中间 margin 与左右栏分离
3. 中间在前宽度 100% ，3 个 div 浮动，父元素使用 padding/margin 给左右两边留出空间，左右子元素使用负 margin-left 移动至上一行，再通过决定定位移动到父元素留出的空间中 （圣杯布局）
4. 思路同上，为左右两边留出的空间方式不同，中间元素新增一个父容器。父容器宽度 100% 且浮动，中间元素通过 margin 留出左右空间。
5. flex

### inline-block 中间间隙

行框的排列会受到中间空白（回车空格）等的影响，因为空格也属于字符，这些空白也会被应用样式，占据空间，所以会有间隔。

父元素 font-size: 0。

### 换肤方案

1. css 变量

    ```html
    <style>
        :root {
            --theme-color: red; /* css 变量赋值位置 */
        }
        .title {
            color: var(--theme-color); /* 用css变量标记颜色 */
        }
    </style>

    <script>
        function changeColor(color = 'blue') {
            document.documentElement.style.setProperty('--theme-color', color);
        }
    </script>
    ```

2. 多套样式
    - 通过切换 body 节点类名来应用其他主题。
    - 或者动态创建新的 style 标签引入其他主题。
3. 利用 css 预处理器变量来生成多套样式，切换如 2 。

https://www.jianshu.com/p/35e0581629d2

### 移动端适配

**Flexible 方案：**

1. 动态设置 1rem 等于设备物理像素宽度的 1/10
2. 再使用 viewport 缩放 1/dpr

**网易 rem**

1. 根据设计稿宽度设定 1rem = xxx 物理像素（初始值）
2. 根据屏幕宽度和设计稿宽度的比例动态设置 1rem = 初始值的 1/n

**其他：**

媒体查询预先设置好一组不同屏幕下的 rem

## HTML

### DOM 事件

三个事件级别，注意没有 DOM1，因为 DOM1 标准制定的时候没有涉及 DOM 事件。DOM3 比 DOM2 只是增加了一些事件类型。

-   DOM0：element.onclick = function(){}
-   DOM2：element.addEventListener('click', function(){}, false)
-   DOM3：element.addEventListener('keyup', function(){}, false)

捕获的流程为：window -> document -> html -> body -> ... -> 目标元素。
冒泡的流程为：目标元素 -> ... -> body -> html -> document -> window。

1. event. preventDefault()
   取消事件的默认动作。

2. event.stopPropagation()
   阻止事件冒泡。

3. event.stopImmediatePropagation()
   阻止剩下的事件处理程序被执行。如果一个元素上绑定了三个事件，在其中一个事件上调用了这个方法，那其他 的两个事件将不会被执行。

### HTML5

声明：

```html
<!DOCTYPE html>
```

新标签：

1. 语义化
2. 多媒体
3. 新 input 类型，email，url 等等
4. 绘图，canvas，svg

### display:none、visibility:hidden 和 opacity:0

1. 空间占据

    - display:none 隐藏后不占据额外空间，它会产生回流和重绘
    - visibility:hidden 和 opacity:0 元素虽然隐藏了，但它们仍然占据着空间，它们俩只会引起页面重绘。

2. 子元素继承

    - display:none 不会被子元素继承，但是父元素都不在了，子元素自然也就不会显示了，皮之不存，毛之安附~~
    - visibility:hidden 会被子元素继承，可以通过设置子元素 visibility:visible 使子元素显示出来
    - opacity: 0 也会被子元素继承，但是不能通过设置子元素 opacity: 0 使其重新显示

3. **事件绑定**

    - display:none 的元素都已经不再页面存在了，因此肯定也无法触发它上面绑定的事件；
    - **visibility:hidden 元素上绑定的事件也无法触发**；
    - opacity: 0 元素上面绑定的事件是可以触发的。

4. 过渡动画

    - transition 对于 display 肯定是无效的，大家应该都知道；
    - transition 对于 visibility 有效，但只会延迟指定动画时间后，瞬间显示出来。
    - transition 对于 opacity 是有效，大家也是知道的。
