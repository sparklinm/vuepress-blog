<template>
  <div class="navbar-container">
    <header class="navbar">
      <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />

      <router-link
        :to="$localePath"
        class="home-link"
      >
        <img
          v-if="$site.themeConfig.logo"
          class="logo"
          :src="$withBase($site.themeConfig.logo)"
          :alt="$siteTitle"
        >
        <span
          v-if="$siteTitle"
          ref="siteName"
          class="site-name"
          :class="{ 'can-hide': $site.themeConfig.logo }"
        >{{ $siteTitle }}</span>
      </router-link>

      <div
        class="links"
        :style="{
          'max-width': linksWrapMaxWidth + 'px'
        }"
      >
        <NavLinks class="can-hide" />
        <AlgoliaSearchBox
          v-if="isAlgoliaSearch"
          :options="algolia"
        />
        <SearchBox v-else-if="$site.themeConfig.search !== false" />
      </div>
    </header>
  </div>
</template>

<script>
import SidebarButton from './SidebarButton.vue'
import AlgoliaSearchBox from './AlgoliaSearchBox'
import SearchBox from './SearchBox.vue'
import NavLinks from './NavLinks.vue'

export default {
  components: {
    SidebarButton,
    NavLinks,
    SearchBox,
    AlgoliaSearchBox
  },

  data () {
    return {
      linksWrapMaxWidth: null
    }
  },

  computed: {
    algolia () {
      return (
        this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
      )
    },

    isAlgoliaSearch () {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    }
  },

  mounted () {

    const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
    const NAVBAR_VERTICAL_PADDING =
      parseInt(css(this.$el, 'paddingLeft')) +
      parseInt(css(this.$el, 'paddingRight'))
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null
      } else {
        this.linksWrapMaxWidth =
          this.$el.offsetWidth -
          NAVBAR_VERTICAL_PADDING -
          ((this.$refs.siteName && this.$refs.siteName.offsetWidth) || 0)
      }
    }

    handleLinksWrapWidth()
    window.addEventListener('resize', handleLinksWrapWidth, false)
  }
}

function css (el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView

  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
</script>

<style lang="stylus">
@import './styles/config.styl';

$navbar-vertical-padding = 0.7rem;
$navbar-horizontal-padding = 1.5rem;

.navbar {
  padding: $navbar-vertical-padding $navbar-horizontal-padding;
  line-height: $navbarHeight - 1.4rem;
  position: relative;
  margin: 0 auto;
  max-width: 1200px;

  a, span, img {
    display: inline-block;
  }

  .logo {
    height: $navbarHeight - 1.4rem;
    min-width: $navbarHeight - 1.4rem;
    margin-right: 0.8rem;
    vertical-align: top;
  }

  .site-name {
    font-size: 1.5rem;
    font-weight: 600;
    color: $textColor;
    position: relative;
  }

  .links {
    padding-left: 1.5rem;
    box-sizing: border-box;
    background-color: white;
    white-space: nowrap;
    font-size: 1rem;
    // float left
    position: absolute;
    right: $navbar-horizontal-padding;

    // left:200px;
    top: $navbar-vertical-padding;
    display: flex;

    .search-box {
      flex: 0 0 auto;
      vertical-align: top;
    }

    .nav-links {
      flex: 1;
    }
  }
}

@media (max-width: 800px) {
  .navbar {
    padding-left: 4rem;

    .can-hide {
      display: none;
    }

    .links {
      padding-left: 1.5rem;
    }
  }
}
</style>
