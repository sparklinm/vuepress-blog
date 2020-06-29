---
meta:
  - title: VuePress 个人博客填坑
    time: 2019-6-20 18:30:16
    tag: VuePress
---

# VuePress 个人博客填坑

## 前言

经过几天的努力，自己的个人博客终于大致做好了，最开始也参考了很多别人的博客布局，但做到后面发现静态博客不适合做得那么花哨。

也想过为每一篇博客配上一张封面图，但发现在不同屏幕下，图片的显示方式不好管理，对图片的内容和分辨率也都有一定规定，就没有去弄了。

过程也遇到了许多坑，做一个总结~~~

<!-- more -->

## VuePress 介绍

VuePress 是支持用 Vue 开发主题的极简静态网站生成器，它使用 Markdown 来书写文档，在打包后，将.md 文件预渲染成 HTML 文件，因此具有非常好的加载性能和搜索引擎优化（SEO）。

## VuePress 使用

### 文档目录

一个 Vuepress 应用的所包含的目录应该如下：

![](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1561103951854.png)

1. .vuepress，存放所有与 VuePress 相关的文件
2. public，存放静态资源
3. components，存放自定义布局页面，里面包含的是一个个.vue 组件，并在 Markdown 文件中使用
4. theme，存放自定义主题
5. config.js，默认主题的配置文件
6. override.styl、style.styl，默认主题样式覆盖文件
7. README.md,项目首页，即路由`/`对应的.md 文件，**必须！！**
8. 其他，根据分类而存放的 Markdown 文件

### 基本配置

关于 VuePress 的使用，网上有许多教程了，官方文档也比较详细，跟着操作就行啦。这里就不细说了，推荐看以下文档：

1. [从今天开始，拿起 VuePress 打造属于自己的专属博客](https://juejin.im/post/5cd7d3286fb9a0323a01d29a#heading-19)
2. [VuePress 官方文档](https://vuepress.vuejs.org)

> 1. VuePress 包含一个默认主题，如果只是对默认主题进行配置，那么只需要按照官方的说明修改 config.js 就行了
> 2. 如果需要自定义主题，那么就需要在 theme 文件夹下创建相关文件

## 博客

### 博客构建

本博客是在默认主题下进行修改的。

1. 首先命令行中输入：

```
vuepress eject docs
```

将默认主题复制到`docs/.vuepress/theme` 文件夹下

2. 然后就可以对 theme 文件下的文件进行修改，来满足自己的需要，修改过程就不细说了，主要是调整页面布局加部分更改功能

3. 博客使用了响应式布局，如下：

![](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1561168263164.png)

> 1. 设备宽度 > 1100px， main 宽度 1100px
> 2. 800px < 设备宽度 < 1100px， main 宽度根据设备宽度自适应
> 3. 设备宽度 <800px，右侧边栏消失，文章列表宽度自适应屏幕，同时导航栏消失变成一个按钮，大部分字体不随宽度变化而缩放

### 博客部署

1. 登录 GitHub，新建一个仓库
2. 按照官方文档说明，进行部署

## 遇到的问题！！！

除了参考各个博客，在基本的布局上修修改改，然后总是不能令人满意外，还遇到了许多其他的问题，总结如下：

### 路由和目录

最开始看官方文档不仔细，总是出现 404。`config.js`中配置的导航栏和侧边栏，一定要在`docs/`下建立相应目录。

### 应用级别配置（增加额外的路由）【**未解决**】

可以看到，当点击博客导航栏或者侧边栏相应的标签时，路由变化，然后出现符合条件的博客列表。所以我在默认主题下增加了一个`ArticleList.vue`组件。

但前面说到，Vuepress 中每一个路由，都需要在`docs/`下建立相应目录，例如：我现在的路由是`/tag/0/`，那我一定要建立`docs/tag/0/README.md`，才能使这个路由生效，否者会出现 404。

但我导航栏有很多，标签栏更多，并且都对应自己的路由，那每一个都建立相应目录，就会显得非常麻烦，所以有其他简单的解决方法吗？答案是有的。

参考：[VuePress 文档：应用配置](https://vuepress.vuejs.org/zh/guide/custom-themes.html#应用配置)，我们可以自定义路由。

1. 新建 theme/router/index.js 文件，在里面输入：

```javascript
import Layout from "../Layout"
const install = (Vue, { router }) => {
  let ru = ["/", "/:category", "/tag/", "/tag/:tag"]
  const routes = []

  for (var i = 0, len = ru.length; i < len; i++) {
    routes.push({
      name: ru[i],
      path: ru[i],
      component: Layout
    })
  }

  router.addRoutes(routes)
}

export default {
  install
}
```

这里自定义了一个路由插件，语法可参照[Vue 文档：插件](https://cn.vuejs.org/v2/guide/plugins.html)

其实这里本质就是使用`router`的`addRoutes`方法，为`router`添加额外的路由

2. 新建 theme/enhanceApp.js 文件，在里面输入：

```javascript
import routes from "./router"
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  Vue.use(routes, { router })
}
```

使用 Vue.use 使用上面自定义的路由，传入参数 router。

3. 运行`npm run dev`，启动项目，在不建立路由的对应目录下，路由依然可以正常切换，而不出现 404。

到此为止，本来应该完美解决了，但是！当我打包项目放到 GitHub 上去后，点击导航标签切换路由啥的都没问题。可当我刷新页面后，还是出现了熟悉的 404。

> 1. 经过查阅各种资料，最后知道了原因，VuePress 路由使用的**history 模式**，history 模式什么都好，就是刷新页面时会直接请求后台相应目录下的 index.html 文件，因为没有相应文件，所以就出现了 404。
>
> 2. 然后我试着将路由改为 hash 模式，`theme/enhanceApp.js`文件中添加：`router.mode = "hash"`，但好像没啥用。所以只得老老实实对应路由去建立目录。

### 有关 computed 属性的问题

在编写过程中，我需要实现这样个一个需求，导航栏显示博客的分类，右侧边栏显示博客的标签类似于这样：

![](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1561109478295.png)

但当在移动端时，我需要把右侧边栏的标签移动到和导航栏一起：

![](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1561109478298.png)

**解决方法：**

默认主题下，导航栏的实现是通过 NavLinks.vue 组件实现的：

```html
<div class="nav-item" v-for="item in userLinks" :key="item.link"></div>
```

其中`userLinks`是一个计算属性，返回了用户在`config.js`中配置的`nav`属性，类似于这样：

```javascript
nav: [{
                text: '首页',
                link: '/'
            },
            {
                text: 'Web开发',
                link: '/web/'
            },
            {
                text: '工具使用',
                link: '/tool/'
            }

        ],
```

> 在 pc 端时，导航栏是通过`Navbar.vue`组件引入`NavLinks.vue`组件实现
> 在移动端时，导航栏是通过`Sidebar.vue`组件引入`NavLinks.vue`组件实现

现在我们需要的是在移动端时，即当是`Sidebar.vue`组件引入`NavLinks.vue`组件时，`userLinks`再添加一个:

```javascript
{
    text: "云标签",
    link: "/tag/"
}
```

实现也很简单，判断父组件传入一个参数 fromComponent 给子组件，如果`fromComponent == "sidebar"`，`userLinks`添加：

```javascript
if (this.fromComponent == "sidebar") {
  if (
    userLinks.findIndex(navItem => {
      return navItem.text == "云标签"
    }) === -1
  ) {
    userLinks.push({
      text: "云标签",
      link: "/tag/"
    })
  }
}
```

~~`npm run dev`运行没有问题，但是！当我打包项目放到 GitHub 上去后，又出问题了。除了导航栏外，其他的都未显示，并且点击导航栏报错。~~

> 1. ~~经过一步步分析，发现出错的原因是计算属性`userLinks`添加了值。~~
>
> 2. ~~当我对`userLinks`进行一次深拷贝，然后再修改拷贝后的值，就没有出现这个问题了。~~

> 补充：
> 几天后重新运行放到服务器上，上次的错误没有了，具体原因未知

### 浏览器前进后退保持页面原位置

看 `vuepress` 官方文档，从 A 页面跳转到 B 页面，再点击浏览器后退按钮，返回 A 页面时，滚动条处于 A 页面跳转前的位置。

也就是页面跳转时，它**保存了滚动条的位置**，然而自己的博客却无法做到。

官方有一个插件：[vuepress-plugin-smooth-scroll](https://vuepress.github.io/zh/plugins/smooth-scroll/)。该插件用于平滑滚动。起初我以为是没有安装插件的问题，但安装后还是不能实现这个功能。

但经过实验，如果页面跳转时路由是这样：`/a/aa` 到 `/b/bb`，就会保存滚动条位置。而从 `/a.html` 到 `b.html` 这样的路由却无法保存。

查看 `vuepress-plugin-smooth-scroll` 插件源码：

```js
router.options.scrollBehavior = (to, from, savedPosition) => {
  // 前进后退按钮会返回保存的滚动轴位置
  if (savedPosition) {
    return window.scrollTo({
      top: savedPosition.y,
      behavior: "smooth"
    })
  } else if (to.hash) {
    if (Vue.$vuepress.$get("disableScrollBehavior")) {
      return false
    }
    // 平滑滚到到目标页面的对应hash元素处
    const targetElement = document.querySelector(to.hash)
    if (targetElement) {
      return window.scrollTo({
        top: getElementPosition(targetElement).y,
        behavior: "smooth"
      })
    }
  } else {
    return window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
}
```

使用了 `router` 的 `scrollBehavior` 属性，见文档：[Vue Router 滚动行为](https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html)。

这里的 `savedPosition` 确实在从 `/a.html` 到 `b.html` 的过程中出错了，它总是保存了 `b.html` 的滚动条的位置。

在 `enhanceApp.js` 中改进这个方法，自己保存滚动条位置：

```js
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  // Vue.use(routes,{router})
  // router.mode = "hash"

  let postions = {}

  // 必须在路由跳转前保存
  router.beforeEach((to, from, next) => {
    if (to.name !== from.name) {
      postions[from.name] = {
        x: window.scrollX,
        y: window.scrollY
      }
    }
    next()
  })

  router.options.scrollBehavior = (to, from, savedPosition) => {
    // 前进后退按钮会返回保存的滚动轴位置
    if (savedPosition) {
      if (postions[to.name]) {
        return window.scrollTo({
          top: postions[to.name].y,
          behavior: "smooth"
        })
      }

      // a.html 跳转到 b.html
      // 点击浏览器返回按钮
      // savedPosition 存储的位置是 b.html 的滚动位置
      return window.scrollTo({
        top: savedPosition.y,
        behavior: "smooth"
      })
    } else if (to.hash) {
      if (Vue.$vuepress.$get("disableScrollBehavior")) {
        return
      }
      // 平滑滚到到目标页面的对应hash元素处
      const targetElement = document.querySelector(to.hash)
      if (targetElement) {
        return window.scrollTo({
          top: getElementPosition(targetElement).y,
          behavior: "smooth"
        })
      }
    } else {
      return { x: 0, y: 0 }

      // 360 浏览器有bug
      // 当路由跳转时，from 页面的滚动条位置大于 to 页面的高度
      // fixed 定位于顶部的 nav 会从底部快速平移到顶部

      // return window.scrollTo({
      //   top: 0,
      //   behavior: "smooth"
      // })
    }
  }
}

function getElementPosition(el) {
  const docEl = document.documentElement
  const docRect = docEl.getBoundingClientRect()
  const elRect = el.getBoundingClientRect()
  return {
    x: elRect.left - docRect.left,
    y: elRect.top - docRect.top
  }
}
```

此外，在测试时还发现一个 `bug`：

```js
window.scrollTo({
  top: 0,
  behavior: "smooth"
})
```

在 **360 浏览器**中，如果 `a` 页面的滚动条位置已经比 `b` 页面的高度高，那从 `a` 跳转到 `b` 后使用这个方法平滑滚动，会出现 `fixed` 定位的元素先处于预期位置下面，然后再平移到预期位置的显示问题。
