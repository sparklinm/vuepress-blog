<template>
  <div class="article-list-inner" v-show="articleArray.length">
    <div class="tag-container">
      <div class="tag-item-container" v-show="this.category == '/tag/'">
        <span
          v-for="(item, index) in tagAry"
          class="tag"
          @click="toBlogByTag(item)"
        >
          <!-- <span class="order">{{index+1}}</span> -->
          {{ item }}
        </span>
      </div>
      <div class="tag-tip" v-show="currentTag">
        标签为
        <span>{{ currentTag }}</span
        >下的文章
      </div>
    </div>
    <transition-group
      name="ani-article-item"
      enter-active-class="ani-article-item-in"
      tag="div"
    >
      <article
        class="article-item"
        v-for="(article, index) in articleArray"
        :key="index + 5"
        v-if="showarticleItem"
      >
        <div class="article-title" @click="toArticle(article.path)">
          <h3 class>{{ article.title }}</h3>
        </div>
        <div class="article-bref">
          <!-- <div class="article-cover-container"> -->
          <!-- <img
            :src="article.coverImg"
            alt=" "
            class="article-cover"
            @click="toArticle(article.path)"
          >-->
          <!-- </div> -->
          <!-- <h3  class="article-text">{{article.title}}</h3> -->

          <span class="article-text" v-html="article.content"></span>
          <div class="article-card">
            <span>
              <i class="fa-calendar-check-o fa"></i>
              {{ article.time }}
            </span>
            <span class="article-tag-container">
              <i class="fa-tag fa"></i>

              <span
                class="article-tag"
                v-for="(item, index) in article.tag"
                @click="toBlogByTag(item)"
                >{{ item }}</span
              >
            </span>
          </div>
        </div>
        <!-- <div class="article-card">
          <span class="article-tag">
            {{article.tag}}
          </span>
          <span>
            {{article.time}}
          </span>
        </div>-->
      </article>
    </transition-group>
    <!-- <Loading v-show="showLoading"></Loading>
    <Tip style="margin-bottom:20px" v-show="showTip"></Tip>-->
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import { formatTime } from "./util.js";
// import Loading from "./Loading";
// import Tip from "./Tip";
export default {
  data() {
    return {
      showarticleItem: true,

      articleArray: [],
      showLoading: false,
      showTip: false,
      category: ""
    };
  },
  props: ["blogs", "content", "tagAry"],
  //   computed: {
  //     ...mapGetters({
  //       //   articleArray: "getarticleArray"
  //     })
  //   },
  computed: {
    currentTag() {
      return this.tagAry[this.getCurrentTagIndex()];
    }
  },
  watch: {
    $route() {
      this.getArticleList();
    }
  },

  methods: {
    //日志显示动画
    setShowarticleItem(flag) {
      this.showarticleItem = flag;
    },
    //跳转到文章页面
    toArticle(path) {
      this.$router.push(path);
      this.$emit("toggle-topImg");
    },

    //鼠标滚动事件
    wheelEvent() {
      if (this.isToPageBottom()) {
        this.setShowLoading(true);
        this.pageNum++;
        this.pageSize = 5;
        this.addArticleAry(
          this.fromComponent,
          this.category,
          this.pageNum,
          this.pageSize
        );
      }
    },

    //得到当前分类信息
    getCurrentCategory() {
      var pathRe = /\/[^\/]+\//;
      this.category = this.$route.path.match(pathRe)
        ? this.$route.path.match(pathRe)[0]
        : "";
    },
    //得到当前标签信息
    getCurrentTagIndex() {
      var pathRe = /[^\/]+/g;
      return this.$route.path.match(pathRe)
        ? this.$route.path.match(pathRe)[1]
        : "";
    },
    //根据当前分类获取相应博客信息
    getArticleList() {
      this.getCurrentCategory();
      var allPages = this.$site.pages;
      // console.log(allPages);
      var currentPages = [];
      // console.log(this.category);

      if (this.category === "") {
        currentPages = allPages.filter(page => {
          return page.path.includes("/blog/");
        });
      } else if (this.category === "/web/") {
        currentPages = allPages.filter(page => {
          return page.path.includes("/blog/web/");
        });
      } else if (this.category === "/tool/") {
        currentPages = allPages.filter(page => {
          return page.path.includes("/blog/tool/");
        });
      } else if (this.category === "/tag/") {
        if (this.currentTag) {
          currentPages = allPages.filter(page => {
            if (page.frontmatter.meta && page.frontmatter.meta[0].tag) {
              let key = page.frontmatter.meta[0].tag;
              let keyAry = key.split(",");
              return keyAry.some(item => {
                return item == this.currentTag;
              });
            }
          });
        } else {
          currentPages = allPages.filter(page => {
            return page.path.includes("/blog/");
          });
        }
      }
      currentPages.sort((current, next) => {
        return (
          new Date(next.frontmatter.meta[0].time) -
          new Date(current.frontmatter.meta[0].time)
        );
      });
      this.articleArray = currentPages.map(page => {
        var meta = page.frontmatter.meta[0];
        return {
          title: meta.title,
          content: page.excerpt,
          // coverImg: require("../public/img/a2.jpg"),
          tag: meta.tag.split(","),
          time: formatTime(meta.time),
          path: page.path
        };
      });
    },
    //标签点击去往相应标签页面
    toBlogByTag(tag) {
      var index = this.tagAry.indexOf(tag);
      this.$router.push(`/tag/${index}/`);
    }
  },
  mounted() {
    this.getArticleList();
  },
  destroyed() {}
};
</script>
<style lang="stylus">
.article-list-inner {
  width: 70.69%;
  padding: 0 0 0 0;
  padding: 20px 20px 0px;
  box-sizing: border-box;
}

.article-item {
  margin-bottom: 30px;
  padding: 20px 20px 20px;
  box-sizing: border-box;
  // box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  border-bottom: 1px solid #e8e8e8;
  padding-bottom: 20px;
  background: #FFFFFF;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.article-title {
  margin-bottom: 20px;
  color: rgb(41, 40, 40);
  cursor: pointer;

  h2 {
    padding-bottom: 0;
    border-bottom: none;
    margin: 0;
  }

  h3 {
    font-size: 1.3rem;
    margin-top: 0;
  }
}

.article-title:hover {
  color: rgb(138, 48, 48);
}

.article-bref {
  // margin-bottom: 10px;
  position: relative;
}

.article-bref::after {
  content: '';
  display: block;
  clear: both;
}

.article-cover-container {
  height: 135px;
  overflow: hidden;
  display: inline-block;
  float: left;
}

.article-cover {
  width: 27.6%;
  height: 135px;
  float: left;
  cursor: pointer;
}

.article-text {
  display: block;
  // width: 72%;
  // max-height: 100px;
  // overflow: hidden;
  // padding-left: 20px;
  box-sizing: border-box;
  // font-size: 14px;
  // letter-spacing: 0.5px;
  line-height: 1.8;

  color: #666;
  h1 {
    font-size: 22px;
    font-weight: 600;
  }

  h2 {
    font-size: 20px;
    font-weight: 600;
  }

  h1, h2, h3, h4 {
    display: none;
  }

  h2 {
    font-size: 18px;
    font-weight: 600;
  }

  img {
    max-width: 100%;
  }
}

.article-card {
  color: #a1a1a1;
  // display: inline-block;
  // padding-left: 20px;
  // text-align: right;
  // position: absolute;
  right: 0;
  bottom: 0;
  border-top: 1px solid #e8e8e8;
  padding-top: 10px;
  font-size: 14px;

  .article-tag {
    // text-align:center;
    font-size: 14px;
    display: inline-block;
    padding: 0px 8px 1px;
    border-radius: 5px 5px;
    background: #7EB6C9;
    margin-right: 10px;
    color: white;
    cursor: pointer;
  }
}

.article-card span {
  margin-right: 20px;
}

.article-card i {
  margin-right: 5px;
}

.ani-article-item-in {
  animation: ani-article-item-in 0.3s ease;
}

@keyframes ani-article-item-in {
  0% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }

  100% {
    transform: translate3d(0, 0, 0px);
    opacity: 1;
  }
}

.ani-tip-enter-active {
  animation: ani-tip-enter-active 0.2s ease-in;
}

@keyframes ani-tip-enter-active {
  0% {
    transform: translate3d(0, 20px, 0);
  }

  100% {
    transform: translate3d(0px, 0, 0px);
  }
}

.ani-tip-leave-active {
  animation: ani-tip-leave-active 0.2s ease-in;
}

@keyframes ani-tip-leave-active {
  0% {
    transform: translate3d(0, 0px, 0);
  }

  100% {
    transform: translate3d(-1000px, 0, 0px);
  }
}
</style>
