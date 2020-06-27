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
      }
    ],
    editLinks: false,
    sidebar: "auto",
    sidebarDepth: 3
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
  ]
};
