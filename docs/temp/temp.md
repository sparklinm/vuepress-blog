动态换肤
https://www.jianshu.com/p/35e0581629d2

Chrome 如何禁用同源策略，快捷方式 —— 目标后面添加：

```bash
--args --disable-web-security --user-data-dir
```

[目录生成](https://www.cnblogs.com/caoshufang/p/12502695.html)

readme 参考：

https://github.com/JasonBai007/vue-seed

https://github.com/bailicangdu/vue2-elm/blob/master/README.md

面试
https://juejin.im/post/6847902225423925255
https://juejin.im/post/6844904146168987661

https://zhuanlan.zhihu.com/p/84212558
https://blog.csdn.net/webyouxuan/article/details/107551676

https://juejin.im/post/6844904146168987661#heading-35

https://juejin.im/post/6844904176837722120#heading-2
https://juejin.im/post/6844904064262619144

https://blog.csdn.net/Fabulous1111/article/details/81155971

动态规划

css 技巧
https://github.com/chokcoco/iCSS
https://lhammer.cn/You-need-to-know-css/#/zh-cn/elastic

当在模板中直接调用方法，而不使用 computed 时，你会发现，你改变一个无关紧要的状态，方法都会重新执行。

```vue
<template>
  <div>
    {{ getText() }}
    <span>{{ a }}</span>
  </div>
</template>

<!-->改变 a 的值 getText() 方法会重新执行<-->
```

https://www.jianshu.com/p/9de496b5c529
https://www.cnblogs.com/liuhao-web/p/11589848.html
https://www.cnblogs.com/AlbertP/p/10754880.html

https://github.com/abc-club/js-paradise/blob/master/INTERVIEW.md
https://juejin.im/post/6844903879973273607#heading-13

```js
// https://juejin.im/post/6844903926496493581#heading-23
// https://javascript.ruanyifeng.com/bom/performance.html
// 计算加载时间
function getPerformanceTiming() {
  var performance = window.performance

  if (!performance) {
    // 当前浏览器不支持
    console.log('你的浏览器不支持 performance 接口')
    return
  }

  var t = performance.timing
  var times = {}

  //【重要】重定向的时间
  //【原因】拒绝重定向！比如，http://example.com/ 就不该写成 http://example.com
  times.redirect = t.redirectEnd - t.redirectStart

  //【重要】DNS 查询时间
  //【原因】DNS 预加载做了么？页面内是不是使用了太多不同的域名导致域名查询的时间太长？
  // 可使用 HTML5 Prefetch 预查询 DNS ，见：[HTML5 prefetch](http://segmentfault.com/a/1190000000633364)
  times.lookupDomain = t.domainLookupEnd - t.domainLookupStart

  //HTTP连接耗时
  times.HTTPConnectTime = t.connectEnd - t.connectStart

  //【重要】读取页面第一个字节的时间
  //【原因】这可以理解为用户拿到你的资源占用的时间，加异地机房了么，加CDN 处理了么？加带宽了么？加 CPU 运算速度了么？
  // TTFB 即 Time To First Byte 的意思
  // 维基百科：https://en.wikipedia.org/wiki/Time_To_First_Byte
  times.firstByte = t.responseStart - t.fetchStart

  //【重要】内容加载完成的时间
  //【原因】页面内容经过 gzip 压缩了么，静态资源 css/js 等压缩了么？
  times.HTTPTime = t.responseEnd - t.requestStart

  //白屏时间
  times.firstPaintTime = t.domLoading - t.fetchStart

  //可交互时间
  times.ttiTime = t.domInteractive - t.fetchStart

  //【重要】解析 DOM 树结构的时间
  //【原因】反省下你的 DOM 树嵌套是不是太多了！
  times.domReady = t.domComplete - t.responseEnd

  //【重要】页面加载完成的时间
  //【原因】这几乎代表了用户等待页面可用的时间
  times.loadPage = t.loadEventStart - t.fetchStart

  //【重要】执行 onload 回调函数的时间
  //【原因】是否太多不必要的操作都放到 onload 回调函数里执行了，考虑过延迟加载、按需加载的策略么？
  times.loadEvent = t.loadEventEnd - t.loadEventStart

  // DNS 缓存时间
  // times.appcache = t.domainLookupStart - t.fetchStart

  // 卸载页面的时间
  // times.unloadEvent = t.unloadEventEnd - t.unloadEventStart
  return times
}
getPerformanceTiming()
```


leetcodet 题目推荐：

https://leetcode-cn.com/circle/article/qDaN1Y/