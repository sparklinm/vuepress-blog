const Mode = require('frontmatter-markdown-loader/mode')

module.exports = {
  title: 'My Blog',
  description: 'Just playing around',
  head: [
    [
      'script',
      {
        src: 'https://cdn.jsdelivr.net/gh/sparklinm/js-library/d/bundle.umd.js'
      }
    ],
    [
      'script',
      {
        src:
          'https://cdn.jsdelivr.net/npm/markdown-it@11.0.0/dist/markdown-it.js'
      }
    ]
  ],
  themeConfig: {
    nav: [
      {
        text: '首页',
        link: '/'
      },
      {
        text: 'Web开发',
        link: '/web/'
      },
      {
        text: '工具使用',
        link: '/tool/'
      },
      {
        text: '微代码',
        link: '/docs/'
      }
    ],
    editLinks: false,
    sidebar: 'auto',
    sidebarDepth: 3,
    lastUpdated: 'Last Updated',
    // 文档的侧边栏配置，和sidebar一致
    fileDocSidebar: [
      ['/docs/', '工具函数'],
      ['/docs/marquee', '文字走马灯'],
      ['/docs/sorter', '拖拽排序']
    ]
  },
  markdown: {
    lineNumbers: false,
    extractHeaders: ['h2', 'h3'],
    extendMarkdown: (md) => {
      md.use(require('markdown-it-container'), 'test', {
        render: function(tokens, idx) {
          return '<div>test test</div>'
        }
      })
      // md.block.ruler.before('html_block', 'script', function(
      //   tokens,
      //   idx,
      //   options,
      //   env,
      //   self
      // ) {
      //   return tokens
      // })
    }
  },
  base: '/vuepress-blog/',
  plugins: [
    [
      '@vuepress/active-header-links',
      {
        sidebarLinkSelector: '.sidebar-link',
        headerAnchorSelector: '.header-anchor'
      }
    ],
    [
      '@vuepress/medium-zoom',
      {
        selector: '.content__default :not(a) > img'
      }
    ],
    // [
    //   'demo-code',
    //   {
    //     jsLibs: [
    //       'https://cdn.jsdelivr.net/npm/@sparklinm/util/d/bundle.min.umd.js'
    //     ],
    //     minHeight: 0
    //   }
    // ]
    [
      require('./vuepress-plugin-demo-code/src/index'),
      {
        jsLibs: [
          'https://cdn.jsdelivr.net/npm/@sparklinm/util/d/bundle.min.umd.js'
        ],
        minHeight: 0
      }
    ]
    // "vuepress-plugin-smooth-scroll"
  ]
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
