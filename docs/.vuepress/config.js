module.exports = {
  title: "My Blog",
  description: "Just playing around",
  themeConfig: {
    nav: [
      {
        text: "首页",
        link: "/"
      },
      {
        text: "Web开发",
        link: "/web/"
      },
      {
        text: "工具使用",
        link: "/tool/"
      },
      {
        text: "微代码",
        link: "/doc/"
      }
    ],
    editLinks: false,
    sidebar: "auto",
    sidebarDepth: 3,
    // 文档的侧边栏配置，和sidebar一致
    fileDocSidebar: [
      ["/doc/", "工具函数"],
      ["/doc/canvas保存下载图片", "canvas保存下载图片"]
    ]
  },
  markdown: {
    lineNumbers: true
  },
  base: "/vuepress-blog/",
  plugins: [
    "@vuepress/active-header-links",
    {
      sidebarLinkSelector: ".sidebar-link",
      headerAnchorSelector: ".header-anchor"
    }
    // "vuepress-plugin-smooth-scroll"
  ]
}
