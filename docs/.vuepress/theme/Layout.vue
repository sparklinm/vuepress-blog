<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <Navbar
      v-if="shouldShowNavbar"
      @toggle-sidebar="toggleSidebar"
    />
    <!-- <div class="top-backImg" v-if="showTopImg"></div> -->
    <!-- <div class="top-img-container" v-if="showTopImg">
      <img src="../../public/img/backImg1.jpg" alt class="top-img">
    </div>-->
    <div
      class="sidebar-mask"
      @click="toggleSidebar(false)"
    />

    <Sidebar
      :items="sidebarItems"
      :class="{ 'doc-sidebar': isDoc }"
      @toggle-sidebar="toggleSidebar"
    >
      <slot
        slot="top"
        name="sidebar-top"
      />
      <slot
        slot="bottom"
        name="sidebar-bottom"
      />
    </Sidebar>
    <div
      v-if="$page.frontmatter.layout"
      class="custom-layout"
    >
      <component :is="$page.frontmatter.layout" />
    </div>

    <Home v-else-if="$page.frontmatter.home" />

    <Doc
      v-else-if="isDoc"
      :items="fielDocSidebar"
    />

    <Page
      v-else
      :sidebar-items="sidebarItems"
      @toggle-topImg="toggleTopImg"
    >
      <slot
        slot="top"
        name="page-top"
      />
      <slot
        slot="bottom"
        name="page-bottom"
      />
    </Page>

    <SWUpdatePopup :update-event="swUpdateEvent" />
  </div>
</template>

<script>
import Vue from 'vue'
import nprogress from 'nprogress'
import Home from './Home.vue'
import Navbar from './Navbar.vue'
import Page from './Page.vue'
import Sidebar from './Sidebar.vue'
import Doc from './Doc.vue'
import SWUpdatePopup from './SWUpdatePopup.vue'

import { resolveSidebarItems, resolveFielDoc } from './util'

export default {
  components: {
    Home,
    Page,
    Sidebar,
    Navbar,
    SWUpdatePopup,
    Doc
  },

  data () {
    return {
      isSidebarOpen: false,
      swUpdateEvent: null,
      showTopImg: true,
      showArticleList: true
    }
  },

  computed: {
    shouldShowNavbar () {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page

      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      )
    },

    shouldShowSidebar () {
      const { frontmatter } = this.$page

      // 当页面的layout、home、sidebar都存在时，以及解析出来的页面标题存在时，侧边栏不显示
      return (
        !frontmatter.layout &&
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        this.sidebarItems.length
      )
    },

    sidebarItems () {
      // 返回页面标题层次结构
      if (this.isDoc) {
        return this.fielDocSidebar
      }

      return resolveSidebarItems(
        this.$page,
        this.$route,
        this.$site,
        this.$localePath
      )
    },

    isDoc () {
      return this.$route.path.includes('/docs/')
    },

    fielDocSidebar () {
      if (this.isDoc) {
        return resolveFielDoc(this.$site)
      }

      return ''
    },

    pageClasses () {
      const userPageClass = this.$page.frontmatter.pageClass

      return [
        {
          'no-navbar': !this.shouldShowNavbar,
          'sidebar-open': this.isSidebarOpen,
          'no-sidebar': !this.shouldShowSidebar,
          'no-topImg': !this.showTopImg
        },
        userPageClass
      ]
    }
  },
  watch: {
    $route () {
      this.routePathChange()
    }
  },

  mounted () {
    // configure progress bar
    nprogress.configure({
      showSpinner: false
    })

    this.$router.beforeEach((to, from, next) => {
      if (to.path !== from.path && !Vue.component(to.name)) {
        nprogress.start()
      }
      next()
    })

    this.$router.afterEach(() => {
      nprogress.done()
      this.isSidebarOpen = false
    })

    this.$on('sw-updated', this.onSWUpdated)
    this.routePathChange()
  },

  methods: {
    toggleSidebar (to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
    },
    toggleTopImg () {
      // console.log("图片切换信息");
      // this.showTopImg=false
    },
    // side swipe
    onTouchStart (e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    },

    onTouchEnd (e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x
      const dy = e.changedTouches[0].clientY - this.touchStart.y

      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true)
        } else {
          this.toggleSidebar(false)
        }
      }
    },

    onSWUpdated (e) {
      this.swUpdateEvent = e
    },
    // 路由路径变化
    routePathChange () {
      const pathRe = /\/[^\/]+\//
      const currentPath = this.$route.path.match(pathRe)
        ? this.$route.path.match(pathRe)[0]
        : ''

      if (currentPath == '/blog/') {
        this.showTopImg = false
        this.showArticleList = false
      } else {
        this.showTopImg = true
        this.showArticleList = true
      }
    }
  }
}
</script>

<style src="../public/font-awe-some/css/font-awesome.min.css"></style>
<style src="prismjs/themes/prism-tomorrow.css"></style>
<style src="./styles/theme.styl" lang="stylus"></style>
