<!--  -->
<template>
  <div class="sidebar-right">
    <transition name="ani-sidebar">
      <div v-show="showSideBar" class="sidebar-right-inner">
        <div class="newest" :key="1">
          <div class="title">推荐阅读</div>
          <ol class="title-list">
            <li
              v-for="(item, index) in hotArticleAry"
              @click="toArticle(item.path)"
            >
              <!-- <span class="order">{{index+1}}</span> -->
              {{ item.title }}
            </li>
          </ol>
        </div>
        <div class="about" :key="2">
          <div class="title">云标签</div>
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

        <div class="catalog" :key="3" v-if="sidebarItems[0].title">
          <div class="title">目录</div>
          <div class="article-title">
            <h3>{{ sidebarItems[0].title }}</h3>
          </div>
          <div class="title-list">
            <ul class="catalog-level-1">
              <li v-for="(item1, index) in sidebarItems[0].children">
                <a
                  :href="$withBase(item1.path)"
                  :class="{ 'active-link': isActive($route, item1.path) }"
                  >{{ item1.title }}</a
                >
                <ul v-if="item1.children.length" class="catalog-level-2">
                  <li v-for="(item2, index) in item1.children">
                    <a
                      :href="$withBase(item2.path)"
                      :class="{ 'active-link': isActive($route, item2.path) }"
                      >{{ item2.title }}</a
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { isActive, hashRE, groupHeaders } from "./util";
export default {
  props: ["sidebarItems", "tagAry"],
  data() {
    return {
      hotArticleAry: [],
      // tagAry: [
      //   "html",
      //   "css",
      //   "js",
      //   "vue",
      //   "微信小程序",
      //   "html",
      //   "css",
      //   "js",
      //   "vue",
      //   "微信小程序",
      //   "html",
      //   "css",
      //   "js",
      //   "vue",
      //   "微信小程序",
      //   "html",
      //   "css",
      //   "js",
      //   "vue",
      //   "微信小程序"
      // ],
      showSideBar: true,
      //根据标签分类后的博客
      blogs: {}
    };
  },
  computed: {
    //根据所有的静态文本获取标签
    // tagAry() {
    //   return Object.keys(this.blogs);
    // }
  },

  methods: {
    //跳转到文章页面
    toArticle(path) {
      this.$router.push(path);
    },
    isActive: isActive,

    //获得推荐博客
    getHotArticleAry() {
      var currentPages = this.$site.pages.filter(page => {
        return page.path.includes("/blog/");
      });

      var blogs = currentPages.map((page, index) => {
        return Object.assign(page.frontmatter.meta[0], page.frontmatter.path);
      });
      var obj = {};
      while (true) {
        var random = Math.floor(Math.random() * blogs.length);
        if (!obj[random]) {
          this.hotArticleAry.push(blogs[random]);
          obj[random] = true;
        }
        if (
          this.hotArticleAry.length == 5 ||
          this.hotArticleAry.length == blogs.length
        ) {
          break;
        }
      }
    },

    //根据标签对博客分类
    blogByTag() {
      var allPages = this.$site.pages;
      var blogs = {};
      for (let i = 0; i < allPages.length; i++) {
        let page = allPages[i];
        if (page.frontmatter.meta && page.frontmatter.meta[0].tag) {
          let key = page.frontmatter.meta[0].tag;
          blogs[key] = blogs[key] ? blogs[key] : [];
          let meta = page.frontmatter.meta[0];
          meta.path = page.path;
          blogs[key].push(meta);
        }
      }
      this.blogs = blogs;
    },
    //标签点击去往相应标签页面
    toBlogByTag(tag) {
      this.$router.push(`/tag/${tag}/`);

      // this.$emit("transfer-blogs",this.blogs[tag])
    }
  },
  mounted() {
    // this.blogByTag();
    this.getHotArticleAry();
  }
};
</script>

<style lang="stylus">
@require './styles/config.styl';

.sidebar-right {
  width: 25.86%;
  position: absolute;
  right: 0rem;
  bottom 0;
  top: 10px;

  .sidebar-right-inner {
    height :100%;
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

    .title-list {
      max-height: 700px;
      overflow: auto;

      a {
        color:black;
      }

      .active-link {
        color: #3eaf7c;
      }

      .catalog-level-1 {
        list-style: square;
        font-size: 16px;
        font-weight: bold;

        >li {
          padding-top: 0;
          padding-bottom: 10px;
          list-style: none;

          span {
            display: list-item;
            list-style: square;
            list-style-position: inside;

            &:hover {
              // background: #7eb6c9;
              color: #7eb6c9;
            }
          }
        }
      }

      .catalog-level-2 {
        list-style: disc;
        font-size: 14px;
        font-weight: normal;
        padding-top: 16px;

        >li {
          padding: 0px 24px 8px;
          list-style: none;

          span {
            display: list-item;
            list-style: disc;
            list-style-position: inside;

            &:hover {
              // background: #7eb6c9;
              color: #7eb6c9;
            }
          }
        }
      }

      li {
        border: none;
        list-style-position: inside;
      }

      ul {
        padding-left: 0;
      }
    }

    .article-title {
      margin: 10px 0 0;

      h3 {
        cursor: progress;
        font-size :18px;
        &:hover {
          color: #292828;
        }
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
    background: #d9534f;
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
