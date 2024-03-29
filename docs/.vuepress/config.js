const Mode = require('frontmatter-markdown-loader/mode');

module.exports = {
    cache: false,
    title: 'Blogs',
    description: '前端个人博客，记录开发中的问题',
    dest: 'public',
    head: [
        // [
        //     'script',
        //     {
        //         src: 'https://cdn.jsdelivr.net/gh/sparklinm/js-library/d/bundle.umd.js'
        //     }
        // ],
        [
            'link',
            {
                rel: 'icon',
                href: '/logo.png'
            }
        ],
        [
            'link',
            {
                rel: 'icon',
                href: '/logo.png'
            }
        ],
        // [
        //     'script',
        //     {
        //         src: 'https://cdn.jsdelivr.net/npm/markdown-it@11.0.0/dist/markdown-it.js'
        //     }
        // ],
        [
            'link',
            {
                rel: 'stylesheet',
                href: 'https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css'
            }
        ]
    ],
    themeConfig: {
        logo: '/logo.png',
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
            ['/docs/', '工具函数']
            // ['/docs/marquee', '文字走马灯'],
            // ['/docs/sorter', '拖拽排序'],
            // ['/docs/slide-select', '滑动选择'],
            // ['/docs/broadcast', '轮播图'],
            // {
            //     title: '算法题总结',
            //     children: [
            //         ['/algorithm/树', '树'],
            //         ['/algorithm/二分法', '二分法'],
            //         ['/algorithm/排序算法', '排序算法'],
            //         ['/algorithm/分治法', '分治法'],
            //         ['/algorithm/动态规划', '动态规划'],
            //         ['/algorithm/深度优先遍历', '深度优先遍历'],
            //         ['/algorithm/回溯算法', '回溯算法'],
            //         ['/algorithm/其他', '其他']
            //     ]
            // }
        ]
    },
    markdown: {
        lineNumbers: false,
        extractHeaders: ['h2', 'h3'],
        extendMarkdown: (md) => {
            // markdown-it-katex 插件使用的是老版本 katex，会出现渲染问题
            // 这里copy了其源码
            md.use(require('./markdown-it-katex'), {});
            md.use(require('markdown-it-sub'));
            md.use(require('markdown-it-sup'));
            md.use(require('markdown-it-footnote'));
        }
    },
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
        ]
        // [
        //     'md-enhance',
        //     {
        //         // 启用下角标功能
        //         sub: true,
        //         // 启用上角标
        //         sup: true,
        //         footnote: true,
        //         mark: true,
        //         // flowchart: true,
        //         tex: true
        //     }
        // ]
        // [
        //     require('./vuepress-plugin-demo-code/src/index'),
        //     {
        //         jsLibs: ['https://cdn.jsdelivr.net/npm/@sparklinm/util/d/bundle.min.umd.js'],
        //         minHeight: 0,
        //         onlineBtns: {
        //             codepen: true,
        //             jsfiddle: false,
        //             codesandbox: false
        //         }
        //     }
        // ]
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
};
