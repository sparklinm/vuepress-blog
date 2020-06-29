(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{406:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"移动端适配学习与总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#移动端适配学习与总结"}},[t._v("#")]),t._v(" 移动端适配学习与总结")]),t._v(" "),a("h2",{attrs:{id:"一些基本概念"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#一些基本概念"}},[t._v("#")]),t._v(" 一些基本概念")]),t._v(" "),a("h3",{attrs:{id:"设备像素"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#设备像素"}},[t._v("#")]),t._v(" 设备像素")]),t._v(" "),a("p",[t._v("又称物理像素，是显示设备中一个最微小的物理部件。屏幕显示就是由一个个物理像素组成。常说的分辨率"),a("code",[t._v("1080*1920")]),t._v("就是指物理像素。")]),t._v(" "),a("h3",{attrs:{id:"设备独立像素"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#设备独立像素"}},[t._v("#")]),t._v(" 设备独立像素")]),t._v(" "),a("p",[t._v("与设备无关的逻辑像素，代表可以通过程序控制使用的虚拟像素，CSS 像素就是一种设备独立像素。")]),t._v(" "),a("h3",{attrs:{id:"设备像素比"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#设备像素比"}},[t._v("#")]),t._v(" 设备像素比")]),t._v(" "),a("p",[t._v("简称 dpr，描述了设备像素和设备独立像素的对应关系。")]),t._v(" "),a("blockquote",[a("p",[t._v("dpr ＝ 设备像素 / 设备独立像素")])]),t._v(" "),a("p",[t._v("JavaScript 中可以通过"),a("code",[t._v("window.devicePixelRatio")]),t._v("获得当前设备的 dpr，CSS 中可以通过"),a("code",[t._v("-webkit-device-pixel-ratio")]),t._v("，"),a("code",[t._v("-webkit-min-device-pixel-ratio")]),t._v("和 "),a("code",[t._v("-webkit-max-device-pixel-ratio")]),t._v("进行媒体查询（webkit 内核的浏览器和 webview）。")]),t._v(" "),a("h3",{attrs:{id:"pt-dp"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#pt-dp"}},[t._v("#")]),t._v(" pt/dp")]),t._v(" "),a("p",[t._v("pt 和 dp 分别代表一个点，是一个相对单位，在不同屏幕下，1pt/dp 所代表的大小相同。其中 pt 是 Apple 的单位，dp 是 Android 的单位。")]),t._v(" "),a("h3",{attrs:{id:"ppi"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ppi"}},[t._v("#")]),t._v(" PPI")]),t._v(" "),a("p",[t._v("表示每英寸所包含的物理像素点数目，数值越高，说明屏幕能以更高密度显示图像。")]),t._v(" "),a("h3",{attrs:{id:"retina-屏幕"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#retina-屏幕"}},[t._v("#")]),t._v(" Retina 屏幕")]),t._v(" "),a("p",[t._v("在 pc 端，通常 1css 像素代表 1 物理像素，但在手机端出现了 Retina 屏幕（例如：iphone6），它通过将多个物理像素压缩在一块屏幕上，来实现更高清的显示效果（相同尺寸分辨率更高，PPI 更高）。")]),t._v(" "),a("p",[t._v("在 Retina 屏幕下，一个 css 像素可能对应多个物理像素，取决于 dpr。")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1562377900743.png",alt:""}})]),t._v(" "),a("h2",{attrs:{id:"网易的适配方案"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#网易的适配方案"}},[t._v("#")]),t._v(" 网易的适配方案")]),t._v(" "),a("p",[t._v("目前网易的移动端设计稿是基于 iPhone6，iphone6 的宽高"),a("code",[t._v("375pt * 667pt")]),t._v("（CSS 像素），分辨率为"),a("code",[t._v("750 * 1334")]),t._v("（物理像素），设计稿为"),a("code",[t._v("750px * 1334px")]),t._v("，设置：")]),t._v(" "),a("blockquote",[a("ol",[a("li",[t._v("1rem=100px")]),t._v(" "),a("li",[t._v("设计稿 rem 宽度=7.5rem")])])]),t._v(" "),a("p",[t._v("这样元素的宽高用 rem 表示为：")]),t._v(" "),a("blockquote",[a("p",[t._v("设计稿上尺寸/100px（例如：200px/100px=2rem）")])]),t._v(" "),a("p",[t._v("然后根据屏幕宽度的不同来设置 font-size：")]),t._v(" "),a("blockquote",[a("p",[t._v("屏幕宽度/设计稿 rem 宽度=页面动态 font-size 值（例如：375/7.5=50）")])]),t._v(" "),a("p",[t._v("用 JavaScript 设置 font-size：")]),t._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[t._v("document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("documentElement"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("style"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("fontSize "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("documentElement"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("clientWidth "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("7.5")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" ‘px‘"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("p",[t._v("具体操作的时候可以根据自己的设计稿尺寸，例如宽度为 640 的设计稿宽度就为 6.4rem。")]),t._v(" "),a("h2",{attrs:{id:"淘宝的适配方案（flexible）"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#淘宝的适配方案（flexible）"}},[t._v("#")]),t._v(" 淘宝的适配方案（Flexible）")]),t._v(" "),a("h3",{attrs:{id:"原理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#原理"}},[t._v("#")]),t._v(" 原理")]),t._v(" "),a("p",[t._v("具体参考："),a("a",{attrs:{href:"https://github.com/amfe/article/issues/17",target:"_blank",rel:"noopener noreferrer"}},[t._v("大漠：使用 Flexible 实现手淘 H5 页面的终端适配"),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("还是拿 iphone6 宽高为"),a("code",[t._v("375pt * 667pt")]),t._v("（CSS 像素），分辨率为"),a("code",[t._v("750 * 1334")]),t._v("（物理像素）来举例，设计稿为"),a("code",[t._v("750px * 1334px")])]),t._v(" "),a("ol",[a("li",[a("p",[t._v("设定 1rem=设计稿宽度的 1/10")])]),t._v(" "),a("li",[a("p",[t._v("px 转 rem 换算")])]),t._v(" "),a("li",[a("p",[t._v("根据 dpr，使用 viewport 缩放页面，缩放比例"),a("code",[t._v("scale = 1 / dpr")]),t._v("，如下：")])])]),t._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//scale = 1 / dpr;")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" metaEl "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" doc"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("createElement")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"meta"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nmetaEl"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setAttribute")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"name"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"viewport"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nmetaEl"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setAttribute")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"content"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"initial-scale="')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v("\n    scale "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('", maximum-scale="')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v("\n    scale "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('", minimum-scale="')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v("\n    scale "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('", user-scalable=no"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br")])]),a("ol",{attrs:{start:"4"}},[a("li",[t._v("文本使用 px，在 dpr 高的设备下，作相应的放大，其中"),a("code",[t._v('data-dpr="2"')]),t._v("是表示当前设备 dpr 的一个自定义属性。")])]),t._v(" "),a("div",{staticClass:"language-css line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[t._v("div")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("width")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 1rem"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("height")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 0.4rem"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("font-size")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 12px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" // 默认写上dpr为1的fontSize\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token selector"}},[t._v('[data-dpr="2"] div')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("font-size")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 24px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token selector"}},[t._v('[data-dpr="3"] div')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("font-size")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 36px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br")])]),a("h3",{attrs:{id:"疑惑"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#疑惑"}},[t._v("#")]),t._v(" 疑惑")]),t._v(" "),a("p",[t._v("看到这里，我当时是有很多疑惑的地方。")]),t._v(" "),a("ol",[a("li",[t._v("为什么文本在高 dpr 下要放大？")])]),t._v(" "),a("p",[t._v("这个就比较好理解了，因为前面设置了 viewport 缩小屏幕，而文本又是使用的固定尺寸（表示在任何设备下，文本字体大小一样），所以需要放大。")]),t._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[t._v("既然这个方案是先大尺寸设计页面，再缩小到屏幕的实际尺寸，那为什么不一开始就基于实际尺寸呢。换句话说，为什么要基于 Retina 屏幕的物理分辨率来定设计稿？")])]),t._v(" "),a("p",[t._v("如果使用屏幕的实际尺寸"),a("code",[t._v("375pt * 667pt")]),t._v("作设计稿，对于页面一样可以在不同屏幕下适配，而且还不用缩放屏幕，也不用根据 dpr 放大 font-size。")]),t._v(" "),a("p",[t._v("在这种情况下，有一个的缺点就是"),a("code",[t._v("1px细线问题")]),t._v("，这里的"),a("code",[t._v("1px细线")]),t._v("是指物理像素 1px。")]),t._v(" "),a("p",[t._v("对于"),a("code",[t._v("750px * 1334px")]),t._v("的设计稿，"),a("code",[t._v("1px细线")]),t._v("自然就通过页面缩小 0.5 倍实现了。")]),t._v(" "),a("p",[t._v("而对于"),a("code",[t._v("375pt * 667pt")]),t._v("的设计稿，"),a("code",[t._v("1px细线")]),t._v("要写作 css 的"),a("code",[t._v("0.5px")]),t._v("，而有的浏览器并不支持在 css 下"),a("code",[t._v("0.5px")]),t._v("的写法。")]),t._v(" "),a("p",[a("strong",[t._v("解决方法：")])]),t._v(" "),a("p",[a("a",{attrs:{href:"https://www.jianshu.com/p/7e63f5a32636",target:"_blank",rel:"noopener noreferrer"}},[t._v("7 种方法解决移动端 Retina 屏幕 1px 边框问题"),a("OutboundLink")],1)]),t._v(" "),a("h2",{attrs:{id:"一般通用-rem-方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#一般通用-rem-方法"}},[t._v("#")]),t._v(" 一般通用 rem 方法")]),t._v(" "),a("h3",{attrs:{id:"方案一"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#方案一"}},[t._v("#")]),t._v(" 方案一")]),t._v(" "),a("p",[t._v("设定 html 元素的 font-size 为 625%（100 ÷ 16 × 100% = 625%），即 100px，再根据屏幕宽度动态设置 font-size 的值，如下：")]),t._v(" "),a("div",{staticClass:"language-css line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[t._v("html")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("font-size")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 625%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token atrule"}},[a("span",{pre:!0,attrs:{class:"token rule"}},[t._v("@media")]),t._v(" screen and "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("min-width")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 360px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" and "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("max-width")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 374px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" and "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("orientation")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" portrait"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token selector"}},[t._v("html")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("font-size")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 703%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token atrule"}},[a("span",{pre:!0,attrs:{class:"token rule"}},[t._v("@media")]),t._v(" screen and "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("min-width")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 375px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" and "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("max-width")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 383px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" and "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("orientation")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" portrait"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token selector"}},[t._v("html")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("font-size")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 732.4%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token atrule"}},[a("span",{pre:!0,attrs:{class:"token rule"}},[t._v("@media")]),t._v(" screen and "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("min-width")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 384px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" and "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("max-width")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 399px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" and "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("orientation")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" portrait"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token selector"}},[t._v("html")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("font-size")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 750%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token atrule"}},[a("span",{pre:!0,attrs:{class:"token rule"}},[t._v("@media")]),t._v(" screen and "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("min-width")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 400px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" and "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("max-width")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 413px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" and "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("orientation")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" portrait"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token selector"}},[t._v("html")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("font-size")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 781.25%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token atrule"}},[a("span",{pre:!0,attrs:{class:"token rule"}},[t._v("@media")]),t._v(" screen and "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("min-width")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 414px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" and "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("max-width")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 431px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" and "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("orientation")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" portrait"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token selector"}},[t._v("html")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("font-size")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 808.6%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token atrule"}},[a("span",{pre:!0,attrs:{class:"token rule"}},[t._v("@media")]),t._v(" screen and "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("min-width")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 432px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" and "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("max-width")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 479px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" and "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("orientation")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" portrait"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token selector"}},[t._v("html")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("font-size")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 843.75%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br"),a("span",{staticClass:"line-number"},[t._v("15")]),a("br"),a("span",{staticClass:"line-number"},[t._v("16")]),a("br"),a("span",{staticClass:"line-number"},[t._v("17")]),a("br"),a("span",{staticClass:"line-number"},[t._v("18")]),a("br"),a("span",{staticClass:"line-number"},[t._v("19")]),a("br"),a("span",{staticClass:"line-number"},[t._v("20")]),a("br"),a("span",{staticClass:"line-number"},[t._v("21")]),a("br"),a("span",{staticClass:"line-number"},[t._v("22")]),a("br"),a("span",{staticClass:"line-number"},[t._v("23")]),a("br"),a("span",{staticClass:"line-number"},[t._v("24")]),a("br"),a("span",{staticClass:"line-number"},[t._v("25")]),a("br"),a("span",{staticClass:"line-number"},[t._v("26")]),a("br"),a("span",{staticClass:"line-number"},[t._v("27")]),a("br"),a("span",{staticClass:"line-number"},[t._v("28")]),a("br"),a("span",{staticClass:"line-number"},[t._v("29")]),a("br"),a("span",{staticClass:"line-number"},[t._v("30")]),a("br"),a("span",{staticClass:"line-number"},[t._v("31")]),a("br"),a("span",{staticClass:"line-number"},[t._v("32")]),a("br"),a("span",{staticClass:"line-number"},[t._v("33")]),a("br")])]),a("h3",{attrs:{id:"方案二"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#方案二"}},[t._v("#")]),t._v(" 方案二")]),t._v(" "),a("p",[t._v("先对设计稿设定一个"),a("code",[t._v("根font-size")]),t._v("，例如"),a("code",[t._v("font-size：100px")]),t._v("，设计稿上元素用 rem 表示。")]),t._v(" "),a("p",[t._v("再用 js 获得屏幕的实际宽度，根据屏幕实际宽度和设计稿宽度比例来调整"),a("code",[t._v("根font-siz")]),t._v("。")]),t._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[t._v("document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("documentElement"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("style"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("fontSize "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("documentElement"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("clientWidth "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" designDraftWidth"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" ‘px‘"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("p",[t._v("类似于网易的方案。")]),t._v(" "),a("h2",{attrs:{id:"新的-vw、vh-方案"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#新的-vw、vh-方案"}},[t._v("#")]),t._v(" 新的 vw、vh 方案")]),t._v(" "),a("h3",{attrs:{id:"原理-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#原理-2"}},[t._v("#")]),t._v(" 原理")]),t._v(" "),a("p",[a("code",[t._v("1vw")]),t._v("和"),a("code",[t._v("1vh")]),t._v("分别代表浏览器可视窗口宽、高的 1/100，淘宝的 flexible 方法其实就是模仿了 vw 和 vh，但使用 vw 和 vh 就不用再动态设置浏览器的 font-size。")]),t._v(" "),a("p",[t._v("还是设计稿为"),a("code",[t._v("750px * 1334px")]),t._v("，那么"),a("code",[t._v("1vw=7.5px")]),t._v(",对于设计稿上 150px 的元素，只需要设置为"),a("code",[t._v("150/7.5=20vw")]),t._v("。")]),t._v(" "),a("p",[t._v("具体参考："),a("a",{attrs:{href:"https://www.w3cplus.com/css/vw-for-layout.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("再聊移动端页面的适配"),a("OutboundLink")],1)]),t._v(" "),a("h3",{attrs:{id:"不足"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#不足"}},[t._v("#")]),t._v(" 不足")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("容器使用 vw 单位，margin 采用 px 单位时，很容易造成整体宽度超过 100vw，从而影响布局效果。解决：")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("margin 换成 padding，并且配合 box-sizing。")])]),t._v(" "),a("li",[a("p",[t._v("随着将来浏览器或者应用自身的 Webview 对 calc()函数的支持之后，碰到 vw 和 px 混合使用的时候，可以结合 calc()函数一起使用。")])])])]),t._v(" "),a("li",[a("p",[t._v("px 转换成 vw 单位，多少还会存在一定的像素差，毕竟很多时候无法完全整除。")])]),t._v(" "),a("li",[a("p",[t._v("vw 方案的兼容性（安卓 4.4 以下、ios8 以下、IE 浏览器不兼容）")])])]),t._v(" "),a("h2",{attrs:{id:"方案总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#方案总结"}},[t._v("#")]),t._v(" 方案总结")]),t._v(" "),a("p",[t._v("比较上面的几种方法，")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("除了 vw、vh 方案外，其他几种方法都需要动态设定 font-size，只是 font-size 选择方式不同。")])]),t._v(" "),a("li",[a("p",[t._v("除了淘宝的方案外，其他几种方法都需要单独处理 Retina 屏幕下的"),a("code",[t._v("1px细线问题")])])]),t._v(" "),a("li",[a("p",[t._v("对于文本字体，都应该单独去设定（配合媒体查询），而不应该用 rem 或是 vw")])])]),t._v(" "),a("h2",{attrs:{id:"参考文献"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考文献"}},[t._v("#")]),t._v(" 参考文献")]),t._v(" "),a("ol",[a("li",[a("a",{attrs:{href:"https://github.com/amfe/article/issues/17",target:"_blank",rel:"noopener noreferrer"}},[t._v("大漠：使用 Flexible 实现手淘 H5 页面的终端适配"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://www.cnblogs.com/annie211/p/8118857.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("前端页面的适配使用 rem 换算"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://www.jianshu.com/p/7e63f5a32636",target:"_blank",rel:"noopener noreferrer"}},[t._v("7 种方法解决移动端 Retina 屏幕 1px 边框问题"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://juejin.im/post/5cddf289f265da038f77696c#heading-29",target:"_blank",rel:"noopener noreferrer"}},[t._v("关于移动端适配，你必须要知道的"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://www.w3cplus.com/css/vw-for-layout.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("再聊移动端页面的适配"),a("OutboundLink")],1)])])])}),[],!1,null,null,null);s.default=e.exports}}]);