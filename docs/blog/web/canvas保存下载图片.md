---
meta:
  - title: canvas保存下载图片
    time: 2020-3-15 9:38:32
    tag: 图片下载,canvas
---

# canvas 保存下载图片

## 前言

在项目中遇到了截取屏幕区域，并转化为图片下载的问题，这里做一个小小的总结，主要包括以下几个内容：

1. `dom` 节点通过 `html2canvas` 转化为 `canvas`
2. `canvas` 转化图片
3. 图片通过 `a` 标签下载

<!-- more -->

## canvas 转化为图片

将 canvas 转化为图片只需要调用`toDataURL`方法：

```js
let canvas = document.getElementById("canvas");
// data url
const dataURI = canvas.toDataURL();
const oImg = new Image();
oImg.src = dataURI;
document.body.appendChild(oImg);
```

`toDataURL`会将图片转化为`base64`格式。

## canvas 与 retina 屏

`retina` 屏幕是指使用多个物理像素渲染 1 个 `css` 像素，`css` 像素是在不同平台下的固定大小尺寸属性。图片的大小是物理像素，所以在正常情况下，图片在 `retina` 屏幕下会显示得更小，而由于设置了 `css` 像素，图片在`retina` 和普通屏幕下会一样大，这就相当于在 `retina` 屏幕下放大了图片，所以图片会失真模糊。

同理，`canvas` 也是如此。

屏幕像素比可以通过`window.devicePixelRatio`获得。`canvas`在绘制的时候也有像素比`context.backingStorePixelRatio`，该属性的值决定了浏览器在渲染 `canvas` 之前会用几个像素来来存储画布信息。假设 `context.backingStorePixelRatio` 为 2，那 `canvas` 绘制时，会先在内存中生成一张 200x200 的图片，然后浏览器渲染的时候，会按 100x100 的图片来渲染。

所以我们需要获取 `window.devicePixelRatio` 和 `context.backingStorePixelRatio` 比值，来设置 `canvas` 的真正大小，以保证在 `retina` 屏幕下不模糊。

```js
function getPixelRatio () {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  // 兼容处理
  const backingStoreRatio = context.webkitBackingStorePixelRatio ||
                    context.mozBackingStorePixelRatio ||
                    context.msBackingStorePixelRatio ||
                    context.oBackingStorePixelRatio ||
                    context.backingStorePixelRatio || 1
  const devicePixelRatio = window.devicePixelRatio ||
  return devicePixelRatio / backingStoreRatio
}

let canvas = document.getElementById("canvas");
let scale = getPixelRatio();
// 正常屏幕大小
let width = 400;
let height = 400;
// retina屏幕大小
canvas.width = width * scale;
canvas.height = height * scale;
```

## html2canvas

`html2canvas`可以用于将 `html` 转化为 `canvas`，使用如下：

```js
html2canvas(document.body).then(function(canvas) {
  document.body.appendChild(canvas);
});
```

需要注意的是：

1. 使用 `<img>` 而不使用背景图，不然转化的 `canvas` 图片会模糊
2. `{ allowTaint: true, useCORS: true }`可解决跨域图片不显示问题
3. `{ backgroundColor: "transparent" }`可解决图片不透明问题

更多使用见文档：

[html2canvas 文档](http://html2canvas.hertzen.com/getting-started)

## 下载图片

下载图片一般是通过 `a` 标签来实现。设置 `a` 标签的 `download` 和 `href` 属性。

```js
let canvas = document.getElementById("canvas");
// data url
const dataURI = canvas.toDataURL();
const a = document.createElement("a");

// 图片名字
a.download = "picture1.png";
// 需要为data url或是同源的资源路径
a.href = dataURI;
a.click();
a.remove();
```

`href` 资源需要是同源。

`Data URLs`，即前缀为 `data:` 协议的 URL。允许内容创建者向文档中嵌入小文件。

`Data URLs` 由四个部分组成：前缀(data:)、指示数据类型的 MIME 类型、如果非文本则为可选的 base64 标记、数据本身：

```
data:[<mediatype>][;base64],<data>
```

Data URLs 的详细介绍：

[MDN Data URLs](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/data_URIs)

`data`数据是被 `base64` 编码的。

但在使用 `a` 标签下载时，由于 `href` 属性有长度限制，如果`Data URLs`长度超过则无法下载。这时候需要将 `dataURL` 转换为 `Blob` 对象。

## Blob 对象

一个 Blob 对象表示一个不可变的, 原始数据的类似文件对象。Blob 表示的数据不一定是一个 JavaScript 原生格式。 File 接口基于 Blob，继承 blob 功能并将其扩展为支持用户系统上的文件。

目前用法：处理大文件分割上传（利用 Blob 中 slice 方法），处理图片 canvas 跨域，以及隐藏视频源路径等等

关于 blob 对象用法和介绍：

1. [MDN blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)
2. [JavaScript 中 Blob 对象](https://juejin.im/entry/5937c98eac502e0068cf31ae)

## data URL 和 Blob 转换

`data URL` 转 `Blob`。需要提取数据（data）部分，并解码，再转化为 `Blob` 对象。

```js
function dataURLToBlob(dataURL) {
  // atob：解码base64，并提取data部分
  const data = atob(dataURL.split(",")[1]);
  const len = data.length;
  const arr = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    arr[i] = data.charCodeAt(i);
  }
  return new Blob([arr]);
}
```

`Blob` 转 `data URL`。需要借助 `FileReader` 的 `readAsDataURL`。

```js
function readBlobAsDataURL(blob) {
  return new Promise((resolve, reject) => {
    var a = new FileReader();
    a.onload = function(e) {
      resolve(e.target.result);
    };
    a.readAsDataURL(blob);
  });
}
readBlobAsDataURL(blob).then(dataURL => {
  console.log(dataURL);
});
```

## URL.createObjectURL()

光是转化为 `Blob` 对象并不能实现下载，还需借助 `URL.createObjectURL()` 方法将 `Blob` 对象构造为一个可用的 `url`。

`URL.createObjectURL()` 静态方法会创建一个 DOMString，其中包含一个表示参数中给出的对象的 URL。这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的 URL 对象表示指定的 File 对象或 Blob 对象。

```js
objectURL = URL.createObjectURL(blob);
// 返回值：blob://URL。
```

`URL.revokeObjectURL()` 用来释放创建的 URL 对象。当你结束使用某个 URL 对象时，应该通过调用这个方法来让浏览器知道不再需要保持这个文件的引用了。

```js
URL.revokeObjectURL(objectURL);
```

下载图片函数：

```js
function downloadImage(imgName, blob) {
  const a = document.createElement("a");
  const url = URL.createObjectURL(blob);

  a.download = imgName;
  a.href = url;
  a.click();
  a.remove();
  // 释放创建的url对象
  URL.revokeObjectURL(url);
}
```

## IE 10

在 `IE` 下，`a` 标签的 `download`并不支持。在 IE10 以上的版本中，提供了 `msSaveBlob`、`msSaveOrOpenBlob` 来保存 `blob` 对象。

```js
if (window.navigator.msSaveBlob) {
  try {
    window.navigator.msSaveBlob(blob, "test.png");
  } catch (e) {
    console.log(e);
  }
}
```

- `msSaveBlob`: 保存，
- `msSaveOrOpenBlob`: 保存并打开

## 总结

`canvas`下载图片的过程：

1. 生成 `data URL`。`canvas.toDataURL()`
2. 转化为 `Blob` 对象
3. 如果存在，使用 `window.navigator.msSaveBlob(blob, "test.png")`保存，否则：
4. 创建 `url` 指向 `Blob` 对象。`URL.createObjectURL()`
5. 创建 `a` 标签
   - `a.download = imgName`
   - `a.href = url`
   - `a.click()`
   - `a.remove()`
6. 释放创建的 `url` 对象。`URL.revokeObjectURL()`

## 问题

`a` 标签的 `download` 属性兼容性并不是很好。`IE` 浏览器不支持（可用`window.navigator.msSaveBlob`），在移动端，`ios` 都不支持，某些浏览器也不支持。

在安卓机下，可以通过 `a.href = data Url` 来下载，但使用 `blob` 对象创建的 `url`，却无法识别。

综合来看，移动端在前端实现下载功能并不可靠：

1. `pc` 端， `a` 标签 `download` 下载。
2. 移动端，图片长按保存下载。

## 参考资料：

1. [Data URLs](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/data_URIs)
2. [MDN blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)
3. [JavaScript 中 Blob 对象](https://juejin.im/entry/5937c98eac502e0068cf31ae)
4. [html2canvas 文档](http://html2canvas.hertzen.com/getting-started)
