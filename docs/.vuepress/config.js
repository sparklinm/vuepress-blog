const Mode = require("frontmatter-markdown-loader/mode")


module.exports = {
  title: "My Blog",
  description: "Just playing around",
  themeConfig: {
    nav: [
      {
        text: "首页",
        link: "/",
      },
      {
        text: "Web开发",
        link: "/web/",
      },
      {
        text: "工具使用",
        link: "/tool/",
      },
      {
        text: "微代码",
        link: "/docs/",
      },
    ],
    editLinks: false,
    sidebar: "auto",
    sidebarDepth: 3,
    // 文档的侧边栏配置，和sidebar一致
    fileDocSidebar: [
      ["/docs/", "工具函数"],
      ["/docs/marquee", "文字走马灯"],
    ],
  },
  markdown: {
    lineNumbers: true,
    extractHeaders: ["h2", "h3"],
  },
  base: "/vuepress-blog/",
  plugins: {
    "@vuepress/active-header-links": {
      sidebarLinkSelector: ".sidebar-link",
      headerAnchorSelector: ".header-anchor",
    },
    "@vuepress/medium-zoom": {
      selector: ".content__default :not(a) > img",
    },
    "demo-code": {},
    // "vuepress-plugin-smooth-scroll"
  },
  // chainWebpack: config => {
  //   config.module
  //     .rule('markdown')
  //     .test(/\.md$/)
  //     .use('frontmatter-markdown-loader')
  //     .loader('frontmatter-markdown-loader')
  //     .tap(() => {
  //       return {
  //         mode: [Mode.HTML, Mode.VUE_COMPONENT],
  //         vue: {
  //           root: 'markdown-body'
  //         }
  //       }
  //     })
  // }
}
