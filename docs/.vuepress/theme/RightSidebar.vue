<!--  -->
<template>
  <div class="sidebar-right">
    <transition name="ani-sidebar">
      <div
        v-show="showSideBar"
        class="sidebar-right-inner"
      >
        <div
          :key="1"
          class="newest"
        >
          <div class="title">
            推荐阅读
          </div>
          <ol class="title-list">
            <li
              v-for="(item, index) in hotArticleAry"
              :key="index"
              @click="toArticle(item.path)"
            >
              <span class="order">{{ index+1 }}</span>
              {{ item.title }}
            </li>
          </ol>
        </div>

        <div
          :key="2"
          class="about"
        >
          <div class="title">
            云标签
          </div>
          <div class="title-list">
            <span
              v-for="(item, index) in tagAry"
              class="tag"
              @click="toBlogByTag(index)"
            >
              <!-- <span class="order">{{index+1}}</span> -->
              {{ item }}
            </span>
          </div>
        </div>

        <div
          v-if="sidebarItems[0].title"
          :key="3"
          class="catalog"
        >
          <div class="title">
            目录
          </div>
          <SidebarLinks
            :depth="0"
            :items="sidebarItems"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { isActive, hashRE, groupHeaders } from './util'
import SidebarLinks from './SidebarLinks.vue'

export default {
  components: {
    SidebarLinks
  },
  props: ['sidebarItems', 'tagAry'],
  data () {
    return {
      hotArticleAry: [],
      showSideBar: true,
      // 根据标签分类后的博客
      blogs: {}
    }
  },
  computed: {
    // 根据所有的静态文本获取标签
    // tagAry() {
    //   return Object.keys(this.blogs);
    // }
  },
  mounted () {
    // this.blogByTag();
    this.getHotArticleAry()
  },

  methods: {
    // 跳转到文章页面
    toArticle (path) {
      this.$router.push(path)
    },

    // 获得推荐博客
    getHotArticleAry () {
      const currentPages = this.$site.pages.filter(page => {
        return page.path.includes('/blog/')
      })

      const blogs = currentPages.map((page, index) => {
        return Object.assign(page.frontmatter.meta[0], page.frontmatter.path)
      })
      const obj = {}

      while (true) {
        const random = Math.floor(Math.random() * blogs.length)

        if (!obj[random]) {
          this.hotArticleAry.push(blogs[random])
          obj[random] = true
        }
        if (
          this.hotArticleAry.length == 5 ||
          this.hotArticleAry.length == blogs.length
        ) {
          break
        }
      }
    },

    // 根据标签对博客分类
    blogByTag () {
      const allPages = this.$site.pages
      const blogs = {}

      for (let i = 0; i < allPages.length; i++) {
        const page = allPages[i]

        if (page.frontmatter.meta && page.frontmatter.meta[0].tag) {
          const key = page.frontmatter.meta[0].tag

          blogs[key] = blogs[key] ? blogs[key] : []
          const meta = page.frontmatter.meta[0]

          meta.path = page.path
          blogs[key].push(meta)
        }
      }
      this.blogs = blogs
    },
    // 标签点击去往相应标签页面
    toBlogByTag (tag) {
      this.$router.push(`/tag/?tag=${tag}`)

      // this.$emit("transfer-blogs",this.blogs[tag])
    }
  }
}
</script>

<style lang="stylus">
@require './styles/config.styl';

.sidebar-right {
  width: 25.86%;
  position: absolute;
  right: 0rem;
  bottom: 0;
  top: 10px;

  .sidebar-right-inner {
    height: 100%;
  }

  .newest, .about, .catalog {
    /* background: pink; */
    padding: 15px;
    margin-bottom: 20px;
    background: #FFFFFF;

    // border-bottom: 1px solid rgba(4, 30, 70, 0.2);
    >ol {
      padding: 0;
    }
  }

  .catalog {
    position: sticky;
    top: 20px;
    max-height: 700px;
    overflow: auto;

    ul {
      list-style: none;
      padding-left: 0;
    }

    .sidebar-heading {
      padding-left: 0;
    }

    .sidebar-links {
      padding-left: 0;
    }


    a {
      padding-left: 20px;
    }

    .active-link {
      color: #3eaf7c;
    }

    .sidebar-group-items {
      font-size: 16px;
      font-weight: bold;
    }

    .sidebar-sub-headers {
      font-size: 14px;
      font-weight: normal;
      padding-left: 12px;


      >li {
        padding: 0px 12px 5px;
      }
    }
  }

  .title {
    text-align: left;
    font-weight: bold;
    // font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
    letter-spacing: 1px;
    font-size: 16px;
    padding: 10px 0;
    border-top: 2px solid #CFCFCF;
    // border-bottom: 2px solid #CFCFCF;
  }

  .title-list {
    list-style: none;
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 0;

    /* padding-left: 15px; */
    .tag {
      cursor: pointer;
      font-size: 14px;
      display: inline-block;
      padding: 0px 8px 2px;
      border-radius: 5px 5px;
      background: #7eb6c9;
      color: #fff;
      margin: 10px 20px 0px 0;
    }
  }

  .title-list li {
    line-height: 1.5;
    padding: 8px 0;
    border-bottom: 1px solid #E8E8E8;
    cursor: pointer;
  }

  .order {
    margin-right: 10px;
    padding: 3px 5px;
    background: #FF9933;
    color: white;
    border-radius: 5px;
  }
}

.ani-sidebar-enter-active {
  animation: ani-sidebar-enter-active 0.3s ease;
}

@keyframes ani-sidebar-enter-active {
  0% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }

  100% {
    transform: translate3d(0, 0, 0px);
    opacity: 1;
  }
}
</style>
