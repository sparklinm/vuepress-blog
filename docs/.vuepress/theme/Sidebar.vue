<template>
  <div class="sidebar">
    <NavLinks fromComponent="sidebar" v-if="showNavLinks" />
    <slot name="top" />
    <SidebarLinks
      :depth="0"
      :items="items"
    />
    <slot name="bottom" />
  </div>
</template>

<script>
import NavLinks from "./NavLinks.vue";
import SidebarLinks from './SidebarLinks.vue'

export default {
  components: { SidebarLinks, NavLinks },

  props: {
    items: {
      default: {}
    },
    showNavLinks: {
      default: true
    }
  },
};

</script>

<style lang="stylus">
@import './styles/config.styl';

.sidebar {
  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  a {
    display: inline-block;
  }

  .nav-links {
    display: none;
    border-bottom: 1px solid $borderColor;
    padding: 0.5rem 0 0.75rem 0;

    a {
      font-weight: 600;
    }

    .nav-item, .repo-link {
      display: block;
      line-height: 1.25rem;
      font-size: 1.1em;
      padding: 0.5rem 0 0.5rem 1.5rem;
    }
  }

  .sidebar-links {
    padding: 1.5rem 0;
  }
}

@media (max-width: 800px) {
  .sidebar {
    .nav-links {
      display: block;

      .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after {
        top: calc(1rem - 2px);
      }
    }

    .sidebar-links {
      padding: 1rem 0;
    }
  }
}
</style>
