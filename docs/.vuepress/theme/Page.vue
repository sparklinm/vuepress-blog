<template>
  <div class="page">
    <slot name="top" />
    <router-link
      to="/blog/web/元素大小、位置、滚动相关知识点.html#判断是否有滚动条"
    />
    <ArticleList
      :blogs="blogs"
      :content="$refs.content"
      :tag-ary="tagAry"
      @toggle-topImg="$emit('toggle-topImg')"
    />
    <Content
      ref="content"
      :custom="false"
    />

    <RightSidebar
      :sidebar-items="sidebarItems"
      :tag-ary="tagAry"
      @transfer-blogs="transferBlogs"
    />
    <div class="page-edit">
      <div
        v-if="editLink"
        class="edit-link"
      >
        <a
          :href="editLink"
          target="_blank"
          rel="noopener noreferrer"
        >{{
          editLinkText
        }}</a>
        <OutboundLink />
      </div>

      <div
        v-if="lastUpdated"
        class="last-updated"
      >
        <span class="prefix">{{ lastUpdatedText }}:</span>
        <span class="time">{{ lastUpdated }}</span>
      </div>
    </div>

    <div
      v-if="prev || next"
      class="page-nav"
    >
      <p class="inner">
        <span
          v-if="prev"
          class="prev"
        >
          ←
          <router-link
            v-if="prev"
            class="prev"
            :to="prev.path"
          >{{
            prev.title || prev.path
          }}</router-link>
        </span>

        <span
          v-if="next"
          class="next"
        >
          <router-link
            v-if="next"
            :to="next.path"
          >{{
            next.title || next.path
          }}</router-link>
          →
        </span>
      </p>
    </div>

    <slot name="bottom" />
  </div>
</template>

<script>
import { resolvePage, normalize, outboundRE, endingSlashRE } from './util'
import RightSidebar from './RightSidebar'
import ArticleList from './ArticleList.vue'

export default {
  components: {
    RightSidebar,
    ArticleList
  },
  props: ['sidebarItems'],
  data () {
    return {
      blogs: []
    }
  },
  computed: {
    lastUpdated () {
      if (this.$page.lastUpdated) {
        return new Date(this.$page.lastUpdated).toLocaleString(this.$lang)
      }
    },

    lastUpdatedText () {
      if (typeof this.$themeLocaleConfig.lastUpdated === 'string') {
        return this.$themeLocaleConfig.lastUpdated
      }
      if (typeof this.$site.themeConfig.lastUpdated === 'string') {
        return this.$site.themeConfig.lastUpdated
      }
      return 'Last Updated'
    },

    prev () {
      const prev = this.$page.frontmatter.prev

      if (prev === false) {
        return
      } if (prev) {
        return resolvePage(this.$site.pages, prev, this.$route.path)
      }
      return resolvePrev(this.$page, this.sidebarItems)

    },

    next () {
      const next = this.$page.frontmatter.next

      if (next === false) {
        return
      } if (next) {
        return resolvePage(this.$site.pages, next, this.$route.path)
      }
      return resolveNext(this.$page, this.sidebarItems)

    },

    editLink () {
      if (this.$page.frontmatter.editLink === false) {
        return
      }
      const {
        repo,
        editLinks,
        docsDir = '',
        docsBranch = 'master',
        docsRepo = repo
      } = this.$site.themeConfig

      let path = normalize(this.$page.path)

      if (endingSlashRE.test(path)) {
        path += 'README.md'
      } else {
        path += '.md'
      }
      if (docsRepo && editLinks) {
        return this.createEditLink(repo, docsRepo, docsDir, docsBranch, path)
      }
    },

    editLinkText () {
      return (
        this.$themeLocaleConfig.editLinkText ||
        this.$site.themeConfig.editLinkText ||
        'Edit this page'
      )
    },
    // 获得博客的标签种类
    tagAry () {
      const allPages = this.$site.pages
      const blogs = {}

      for (let i = 0; i < allPages.length; i++) {
        const page = allPages[i]

        if (page.frontmatter.meta && page.frontmatter.meta[0].tag) {
          const key = page.frontmatter.meta[0].tag
          const keyAry = key.split(',')

          for (let j = 0; j < keyAry.length; j++) {
            blogs[keyAry[j]] = blogs[keyAry[j]] ? blogs[keyAry[j]] : []
            const meta = page.frontmatter.meta[0]

            meta.path = page.path
            blogs[keyAry[j]].push(meta)
          }
        }
      }
      return Object.keys(blogs)
    }
  },
  mounted () {},
  methods: {
    createEditLink (repo, docsRepo, docsDir, docsBranch, path) {
      const bitbucket = /bitbucket.org/

      if (bitbucket.test(repo)) {
        const base = outboundRE.test(docsRepo) ? docsRepo : repo

        return (
          base.replace(endingSlashRE, '') +
          '/src' +
          `/${docsBranch}` +
          (docsDir ? '/' + docsDir.replace(endingSlashRE, '') : '') +
          path +
          `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
        )
      }

      const base = outboundRE.test(docsRepo)
        ? docsRepo
        : `https://github.com/${docsRepo}`

      return (
        base.replace(endingSlashRE, '') +
        `/edit/${docsBranch}` +
        (docsDir ? '/' + docsDir.replace(endingSlashRE, '') : '') +
        path
      )
    },
    transferBlogs (blogs) {
      // this.blogs=blogs
    }
  }
}

function resolvePrev (page, items) {
  return find(page, items, -1)
}

function resolveNext (page, items) {
  return find(page, items, 1)
}

function find (page, items, offset) {
  const res = []

  items.forEach(item => {
    if (item.type === 'group') {
      res.push(...(item.children || []))
    } else {
      res.push(item)
    }
  })
  for (let i = 0; i < res.length; i++) {
    const cur = res[i]

    if (cur.type === 'page' && cur.path === page.path) {
      return res[i + offset]
    }
  }
}
</script>

<style lang="stylus">
@import './styles/config.styl';
@require './styles/wrapper.styl';

.page {
  padding: 0rem 0rem;
  margin: 6rem auto 0;
  position: relative;
  // background: #f1f1f1;
}

.page-edit {
  @extend $wrapper;
  padding-top: 1rem;
  padding-bottom: 1rem;
  overflow: auto;

  .edit-link {
    display: inline-block;

    a {
      color: lighten($textColor, 25%);
      margin-right: 0.25rem;
    }
  }

  .last-updated {
    float: right;
    font-size: 0.9em;

    .prefix {
      font-weight: 500;
      color: lighten($textColor, 25%);
    }

    .time {
      font-weight: 400;
      color: #aaa;
    }
  }
}

.page-nav {
  @extend $wrapper;
  padding-top: 1rem;
  padding-bottom: 0;

  .inner {
    min-height: 2rem;
    margin-top: 0;
    border-top: 1px solid $borderColor;
    padding-top: 1rem;
    overflow: auto; // clear float
  }

  .next {
    float: right;
  }
}

@media (max-width: $MQMobile) {
  .page-edit {
    .edit-link {
      margin-bottom: 0.5rem;
    }

    .last-updated {
      font-size: 0.8em;
      float: none;
      text-align: left;
    }
  }
}
</style>
