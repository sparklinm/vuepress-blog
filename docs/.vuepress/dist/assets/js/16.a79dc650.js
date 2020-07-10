(window.webpackJsonp = window.webpackJsonp || []).push([
  [16], {
    392: function (t, a, e) {'use strict'; e.r(a); const s = e(0); const n = Object(s.a)({}, (function () {const t = this; const a = t.$createElement; const e = t._self._c || a

      return e('ContentSlotsDistributor', {
        attrs: {
          'slot-key': t.$parent.slotKey
        }
      }, [
        e('h1', {
          attrs: {
            id: '优化-moment-打包'
          }
        }, [
          e('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#优化-moment-打包'
            }
          }, [t._v('#')]), t._v(' 优化 moment 打包')
        ]), t._v(' '), e('h2', {
          attrs: {
            id: '前言'
          }
        }, [
          e('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#前言'
            }
          }, [t._v('#')]), t._v(' 前言')
        ]), t._v(' '), e('p', [t._v('这几天接到任务：将 '), e('code', [t._v('moment')]), t._v(' 替换为 '), e('code', [t._v('dayjs')]), t._v(' 来减少打包体积。')]), t._v(' '), e('p', [
          e('img', {
            attrs: {
              src: 'https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1583317035063.png',
              alt: 'enter description here'
            }
          })
        ]), t._v(' '), e('p', [t._v('可以发现'), e('code', [t._v('moment')]), t._v('确实是比'), e('code', [t._v('dayjs')]), t._v('大很多。即使压缩后也有 '), e('code', [t._v('69.6k')]), t._v('，而'), e('code', [t._v('dayjs')]), t._v('只有几 '), e('code', [t._v('kb')]), t._v(' 大小。')]), t._v(' '), e('h2', {
          attrs: {
            id: 'you-dont-need-momentjs-插件'
          }
        }, [
          e('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#you-dont-need-momentjs-插件'
            }
          }, [t._v('#')]), t._v(' You-Dont-Need-Momentjs 插件')
        ]), t._v(' '), e('p', [
          e('code', [t._v('eslint')]), t._v(' 插件：'), e('a', {
            attrs: {
              href: 'https://github.com/you-dont-need/You-Dont-Need-Momentjs#add',
              target: '_blank',
              rel: 'noopener noreferrer'
            }
          }, [t._v('You-Dont-Need-Momentjs'), e('OutboundLink')], 1), t._v('，可以找出项目中使用 '), e('code', [t._v('moment')]), t._v(' 地方，并给出错误提醒和更改建议。')
        ]), t._v(' '), e('p', [t._v('在阅读文档时，发现它指出了 '), e('code', [t._v('moment')]), t._v(' 的问题：')]), t._v(' '), e('ul', [e('li', [t._v('It is highly based on OOP APIs, which makes it fail to work with tree-shaking, thus - leading to a huge bundle size and performance issues.')]), t._v(' '), e('li', [t._v('It is mutable and it causes bugs:\n'), e('ul', [e('li', [t._v('clone')]), t._v(' '), e('li', [t._v('How do I work around mutability in moment.js?')])])]), t._v(' '), e('li', [t._v('Complex OOP API (which doubles mutability problem). Here is an example: https://github.com/moment/moment/blob/develop/src/test/moment/add_subtract.js#L244-L286 Moment.js allows to use a.subtract(\'ms\', 50), a.subtract(50, \'ms\') and even a.subtract(\'s\', \'50\').')])]), t._v(' '), e('p', [t._v('moment 是高面向对象的，这导它她不能 '), e('code', [t._v('tree-shaking')]), t._v('。')]), t._v(' '), e('p', [t._v('看到这里问题又来了，什么是 '), e('code', [t._v('tree-shaking')]), t._v('。')]), t._v(' '), e('p', [t._v('百度了一下，从这篇文章中理解了这个概念：')]), t._v(' '), e('p', [
          e('a', {
            attrs: {
              href: 'https://juejin.im/post/5a4dc842518825698e7279a9',
              target: '_blank',
              rel: 'noopener noreferrer'
            }
          }, [t._v('Tree-Shaking 性能优化实践 - 原理篇'), e('OutboundLink')], 1)
        ]), t._v(' '), e('p', [t._v('总结来说：')]), t._v(' '), e('ol', [e('li', [e('code', [t._v('Tree-shaking')]), t._v(' 的本质是消除无用的 js 代码，例如：我们使用了 moment 其中一个函数，理想状态下只有这一个函数被打包到我们的项目中。')]), t._v(' '), e('li', [e('code', [t._v('tree-shaking')]), t._v(' 的消除原理是依赖于 '), e('code', [t._v('ES6')]), t._v(' 的模块特性。'), e('code', [t._v('ES6')]), t._v(' 模块依赖关系是确定的，和运行时的状态无关，可以进行可靠的静态分析，这就是 '), e('code', [t._v('tree-shaking')]), t._v(' 的基础。')]), t._v(' '), e('li', [e('code', [t._v('tree-shaking')]), t._v(' 对函数效果较好，但难以消除类中的无用函数。')])]), t._v(' '), e('p', [t._v('这也解释了为什么 '), e('code', [t._v('moment')]), t._v(' 无法 '), e('code', [t._v('tree-shaking')]), t._v('。当然 '), e('code', [t._v('dayjs')]), t._v(' 也无法 '), e('code', [t._v('tree-shaking')]), t._v(' ,但其本身就非常小。')]), t._v(' '), e('h2', {
          attrs: {
            id: 'webpack-bundle-analyzer-插件'
          }
        }, [
          e('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#webpack-bundle-analyzer-插件'
            }
          }, [t._v('#')]), t._v(' webpack-bundle-analyzer 插件')
        ]), t._v(' '), e('p', [e('code', [t._v('webpack-bundle-analyzer')]), t._v(' 插件可以将打包文件的各模块占据多少以图表方式显示出来，这有助于我们分析。')]), t._v(' '), e('p', [t._v('对于 '), e('code', [t._v('vue-cli 3.0')]), t._v(' 以上的项目，可以：')]), t._v(' '), e('div', {
          staticClass: 'language- line-numbers-mode'
        }, [
          e('pre', {
            pre: !0,
            attrs: {
              class: 'language-text'
            }
          }, [e('code', [t._v('# 先添加插件\nvue add webpack-bundle-analyzer\n# 打包\nnpm run build --report\n')])]), t._v(' '), e('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            e('span', {
              staticClass: 'line-number'
            }, [t._v('1')]), e('br'), e('span', {
              staticClass: 'line-number'
            }, [t._v('2')]), e('br'), e('span', {
              staticClass: 'line-number'
            }, [t._v('3')]), e('br'), e('span', {
              staticClass: 'line-number'
            }, [t._v('4')]), e('br')
          ])
        ]), e('p', [t._v('在 dist 目录下生成 '), e('code', [t._v('report.html')]), t._v('。')]), t._v(' '), e('p', [t._v('而在老版本的 '), e('code', [t._v('vue-cli')]), t._v(' 已经配置好了，只需要直接'), e('code', [t._v('npm run build --report')]), t._v('即可。')]), t._v(' '), e('p', [
          e('img', {
            attrs: {
              src: 'https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1583317035001.png',
              alt: 'enter description here'
            }
          })
        ]), t._v(' '), e('p', [t._v('在 '), e('code', [t._v('webpack')]), t._v(' 中添加插件：')]), t._v(' '), e('p', [t._v('安装：')]), t._v(' '), e('div', {
          staticClass: 'language- line-numbers-mode'
        }, [
          e('pre', {
            pre: !0,
            attrs: {
              class: 'language-text'
            }
          }, [e('code', [t._v('# NPM\nnpm install --save-dev webpack-bundle-analyzer\n# Yarn\nyarn add -D webpack-bundle-analyzer\n')])]), t._v(' '), e('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            e('span', {
              staticClass: 'line-number'
            }, [t._v('1')]), e('br'), e('span', {
              staticClass: 'line-number'
            }, [t._v('2')]), e('br'), e('span', {
              staticClass: 'line-number'
            }, [t._v('3')]), e('br'), e('span', {
              staticClass: 'line-number'
            }, [t._v('4')]), e('br')
          ])
        ]), e('p', [t._v('使用：')]), t._v(' '), e('div', {
          staticClass: 'language-js line-numbers-mode'
        }, [
          e('pre', {
            pre: !0,
            attrs: {
              class: 'language-js'
            }
          }, [
            e('code', [
              e('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('const')]), t._v(' BundleAnalyzerPlugin '), e('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('=')]), t._v(' '), e('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('require')]), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), e('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"webpack-bundle-analyzer"')]), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v('\n  '), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('BundleAnalyzerPlugin'), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n\nmodule'), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('exports '), e('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('=')]), t._v(' '), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n  plugins'), e('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v(':')]), t._v(' '), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('[')]), e('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('new')]), t._v(' '), e('span', {
                pre: !0,
                attrs: {
                  class: 'token class-name'
                }
              }, [t._v('BundleAnalyzerPlugin')]), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(']')]), t._v('\n'), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n')
            ])
          ]), t._v(' '), e('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            e('span', {
              staticClass: 'line-number'
            }, [t._v('1')]), e('br'), e('span', {
              staticClass: 'line-number'
            }, [t._v('2')]), e('br'), e('span', {
              staticClass: 'line-number'
            }, [t._v('3')]), e('br'), e('span', {
              staticClass: 'line-number'
            }, [t._v('4')]), e('br'), e('span', {
              staticClass: 'line-number'
            }, [t._v('5')]), e('br'), e('span', {
              staticClass: 'line-number'
            }, [t._v('6')]), e('br')
          ])
        ]), e('p', [
          t._v('详见：'), e('a', {
            attrs: {
              href: 'https://github.com/webpack-contrib/webpack-bundle-analyzer',
              target: '_blank',
              rel: 'noopener noreferrer'
            }
          }, [t._v('webpack-bundle-analyzer'), e('OutboundLink')], 1)
        ]), t._v(' '), e('h2', {
          attrs: {
            id: '优化-moment-打包-2'
          }
        }, [
          e('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#优化-moment-打包-2'
            }
          }, [t._v('#')]), t._v(' 优化 moment 打包')
        ]), t._v(' '), e('p', [e('code', [t._v('moment')]), t._v(' 为什么会这么大，除了本身很大之外，还与其 '), e('code', [t._v('locale')]), t._v(' 文件有关。'), e('code', [t._v('moment')]), t._v(' 是支持国际化的，打包时会将它的所有国际化文件全部打包。')]), t._v(' '), e('p', [
          e('img', {
            attrs: {
              src: 'https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1583317035002.png',
              alt: ''
            }
          })
        ]), t._v(' '), e('p', [t._v('有两种方法可以优化这些 '), e('code', [t._v('locale')]), t._v(' 文件：')]), t._v(' '), e('h3', {
          attrs: {
            id: 'webpack-插件：ignoreplugin'
          }
        }, [
          e('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#webpack-插件：ignoreplugin'
            }
          }, [t._v('#')]), t._v(' webpack 插件：IgnorePlugin')
        ]), t._v(' '), e('div', {
          staticClass: 'language-JavaScript line-numbers-mode'
        }, [
          e('pre', {
            pre: !0,
            attrs: {
              class: 'language-javascript'
            }
          }, [
            e('code', [
              e('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('const')]), t._v(' webpack '), e('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('=')]), t._v(' '), e('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('require')]), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), e('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('\'webpack\'')]), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\nmodule'), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('exports '), e('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('=')]), t._v(' '), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n  '), e('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [t._v('//...')]), t._v('\n  plugins'), e('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v(':')]), t._v(' '), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('[')]), t._v('\n    '), e('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [t._v('// 忽略 moment.js的所有本地文件')]), t._v('\n    '), e('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('new')]), t._v(' '), e('span', {
                pre: !0,
                attrs: {
                  class: 'token class-name'
                }
              }, [
                t._v('webpack'), e('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v('.')]), t._v('IgnorePlugin')
              ]), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), e('span', {
                pre: !0,
                attrs: {
                  class: 'token regex'
                }
              }, [t._v('/^\\.\\/locale$/')]), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v(' '), e('span', {
                pre: !0,
                attrs: {
                  class: 'token regex'
                }
              }, [t._v('/moment$/')]), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v('\n  '), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(']')]), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v('\n'), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n\n')
            ])
          ]), t._v(' '), e('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            e('span', {
              staticClass: 'line-number'
            }, [t._v('1')]), e('br'), e('span', {
              staticClass: 'line-number'
            }, [t._v('2')]), e('br'), e('span', {
              staticClass: 'line-number'
            }, [t._v('3')]), e('br'), e('span', {
              staticClass: 'line-number'
            }, [t._v('4')]), e('br'), e('span', {
              staticClass: 'line-number'
            }, [t._v('5')]), e('br'), e('span', {
              staticClass: 'line-number'
            }, [t._v('6')]), e('br'), e('span', {
              staticClass: 'line-number'
            }, [t._v('7')]), e('br'), e('span', {
              staticClass: 'line-number'
            }, [t._v('8')]), e('br'), e('span', {
              staticClass: 'line-number'
            }, [t._v('9')]), e('br')
          ])
        ]), e('p', [t._v('此时打包时会忽略所有的 '), e('code', [t._v('locale')]), t._v(' 文件：')]), t._v(' '), e('p', [
          e('img', {
            attrs: {
              src: 'https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1583317034995.png',
              alt: 'moment_无local'
            }
          })
        ]), t._v(' '), e('p', [t._v('当需要使用某个 '), e('code', [t._v('locale')]), t._v(' 文件时，可以手动 引入：')]), t._v(' '), e('div', {
          staticClass: 'language-JavaScript line-numbers-mode'
        }, [
          e('pre', {
            pre: !0,
            attrs: {
              class: 'language-javascript'
            }
          }, [
            e('code', [
              e('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('import')]), t._v(' '), e('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('\'moment/locale/ja\'')]), t._v('\n'), e('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [t._v('// require(\'moment/locale/ja\');')]), t._v('\n')
            ])
          ]), t._v(' '), e('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            e('span', {
              staticClass: 'line-number'
            }, [t._v('1')]), e('br'), e('span', {
              staticClass: 'line-number'
            }, [t._v('2')]), e('br')
          ])
        ]), e('h3', {
          attrs: {
            id: 'webpack-插件：contextreplacementplugin'
          }
        }, [
          e('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#webpack-插件：contextreplacementplugin'
            }
          }, [t._v('#')]), t._v(' webpack 插件：ContextReplacementPlugin')
        ]), t._v(' '), e('div', {
          staticClass: 'language-JavaScript line-numbers-mode'
        }, [
          e('pre', {
            pre: !0,
            attrs: {
              class: 'language-javascript'
            }
          }, [
            e('code', [
              e('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('const')]), t._v(' webpack '), e('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('=')]), t._v(' '), e('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('require')]), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), e('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('\'webpack\'')]), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\nmodule'), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('exports '), e('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('=')]), t._v(' '), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n  '), e('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [t._v('//...')]), t._v('\n  plugins'), e('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v(':')]), t._v(' '), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('[')]), t._v('\n    '), e('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [t._v('// 只加载 `moment/locale/ja.js` 和 `moment/locale/it.js`')]), t._v('\n    '), e('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('new')]), t._v(' '), e('span', {
                pre: !0,
                attrs: {
                  class: 'token class-name'
                }
              }, [
                t._v('webpack'), e('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v('.')]), t._v('ContextReplacementPlugin')
              ]), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), e('span', {
                pre: !0,
                attrs: {
                  class: 'token regex'
                }
              }, [t._v('/moment[/\\\\]locale$/')]), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v(' '), e('span', {
                pre: !0,
                attrs: {
                  class: 'token regex'
                }
              }, [t._v('/ja|it/')]), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v('\n  '), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(']')]), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v('\n'), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), e('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n')
            ])
          ]), t._v(' '), e('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            e('span', {
              staticClass: 'line-number'
            }, [t._v('1')]), e('br'), e('span', {
              staticClass: 'line-number'
            }, [t._v('2')]), e('br'), e('span', {
              staticClass: 'line-number'
            }, [t._v('3')]), e('br'), e('span', {
              staticClass: 'line-number'
            }, [t._v('4')]), e('br'), e('span', {
              staticClass: 'line-number'
            }, [t._v('5')]), e('br'), e('span', {
              staticClass: 'line-number'
            }, [t._v('6')]), e('br'), e('span', {
              staticClass: 'line-number'
            }, [t._v('7')]), e('br'), e('span', {
              staticClass: 'line-number'
            }, [t._v('8')]), e('br')
          ])
        ]), e('p', [t._v('这种方法是告诉 '), e('code', [t._v('webpack')]), t._v(' 我们会使用到哪个 '), e('code', [t._v('locale')]), t._v(' 文件，然后只打包指定的 '), e('code', [t._v('locale')]), t._v(' 文件。')]), t._v(' '), e('p', [t._v('可以看到即使去除所有的 '), e('code', [t._v('locale')]), t._v(' 文件，也依然比 '), e('code', [t._v('dayjs')]), t._v(' 大很多，所以如果可以的话使用 '), e('code', [t._v('dayjs')]), t._v(' 更好。')]), t._v(' '), e('h2', {
          attrs: {
            id: '参考文献'
          }
        }, [
          e('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#参考文献'
            }
          }, [t._v('#')]), t._v(' 参考文献')
        ]), t._v(' '), e('ol', [
          e('li', [
            e('a', {
              attrs: {
                href: 'https://github.com/you-dont-need/You-Dont-Need-Momentjs#add',
                target: '_blank',
                rel: 'noopener noreferrer'
              }
            }, [t._v('eslint 插件 You-Dont-Need-Momentjs：找出代码中使用 Momentjs 地方 '), e('OutboundLink')], 1)
          ]), t._v(' '), e('li', [
            e('a', {
              attrs: {
                href: 'https://juejin.im/post/5a4dc842518825698e7279a9',
                target: '_blank',
                rel: 'noopener noreferrer'
              }
            }, [t._v('Tree-Shaking 性能优化实践 - 原理篇'), e('OutboundLink')], 1)
          ]), t._v(' '), e('li', [
            e('a', {
              attrs: {
                href: 'https://github.com/webpack-contrib/webpack-bundle-analyzer',
                target: '_blank',
                rel: 'noopener noreferrer'
              }
            }, [t._v('webpack-bundle-analyzer 插件：可视化显示打包后各文件大小占比'), e('OutboundLink')], 1)
          ])
        ])
      ])}), [], !1, null, null, null)

    a.default = n.exports}
  }
])