import routes from './router'

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
  // router.beforeEach((to, from, next) => {
  //   if (to.name !== from.name) {
  //     postions[from.name] = {
  //       x: window && window.scrollX,
  //       y: window && window.scrollY
  //     }
  //   }
  //   next()
  // })

  Vue.mixin({
    beforeRouteLeave(to, from, next) {
      if (to.name !== from.name) {
        postions[from.name] = {
          x: window && window.scrollX,
          y: window && window.scrollY
        }
      }
      next()
    }
  })
  router.options.scrollBehavior = (to, from, savedPosition) => {
    // 前进后退按钮会返回保存的滚动轴位置
    if (savedPosition) {
      if (postions[to.name]) {
        return window.scrollTo({
          top: postions[to.name].y,
          behavior: 'smooth'
        })
      }

      // a.html 跳转到 b.html
      // 点击浏览器返回按钮
      // savedPosition 存储的位置是 b.html 的滚动位置
      return window.scrollTo({
        top: savedPosition.y,
        behavior: 'smooth'
      })
    } else if (to.hash) {
      if (Vue.$vuepress.$get('disableScrollBehavior')) {
        return
      }
      // 平滑滚到到目标页面的对应hash元素处
      const targetElement = document.querySelector(to.hash)
      if (targetElement) {
        return window.scrollTo({
          top: getElementPosition(targetElement).y,
          behavior: 'smooth'
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
