(window.webpackJsonp = window.webpackJsonp || []).push([
  [18], {
    386: function (t, s, n) {'use strict'; n.r(s); const a = n(0); const e = Object(a.a)({}, (function () {const t = this; const s = t.$createElement; const n = t._self._c || s

      return n('ContentSlotsDistributor', {
        attrs: {
          'slot-key': t.$parent.slotKey
        }
      }, [
        n('h1', {
          attrs: {
            id: '全屏和横竖屏'
          }
        }, [
          n('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#全屏和横竖屏'
            }
          }, [t._v('#')]), t._v(' 全屏和横竖屏')
        ]), t._v(' '), n('h2', {
          attrs: {
            id: '横屏'
          }
        }, [
          n('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#横屏'
            }
          }, [t._v('#')]), t._v(' 横屏')
        ]), t._v(' '), n('h3', {
          attrs: {
            id: '判断横向'
          }
        }, [
          n('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#判断横向'
            }
          }, [t._v('#')]), t._v(' 判断横向')
        ]), t._v(' '), n('p', [t._v('有些页面要求在横屏和竖屏下有不同的显示，这时候一般会设置 2 套 css，一套用于横屏一套用于竖屏。')]), t._v(' '), n('p', [t._v('手机的横屏实际是由系统控制的：')]), t._v(' '), n('p', [
          n('img', {
            attrs: {
              src: 'https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1584333134862.png',
              alt: 'enter description here'
            }
          })
        ]), t._v(' '), n('p', [t._v('当'), n('code', [t._v('方向锁定')]), t._v('关闭后，网页在横向手持设备时就会横向显示。')]), t._v(' '), n('p', [t._v('判断是横屏还是竖屏可以采用'), n('code', [t._v('window.orientation')]), t._v('。它返回一个与默认屏幕方向偏离的角度值：')]), t._v(' '), n('ol', [n('li', [t._v('0：代表此时是默认屏幕方向')]), t._v(' '), n('li', [t._v('90：代表顺时针偏离默认屏幕方向 90 度')]), t._v(' '), n('li', [t._v('-90：代表逆时针偏离默认屏幕方向 90 度')]), t._v(' '), n('li', [t._v('180：代表偏离默认屏幕方向 180 度')])]), t._v(' '), n('p', [t._v('需要注意的是，'), n('code', [t._v('0')]), t._v('只是代表默认方向，如果是平板电脑，那默认方向就是横屏。')]), t._v(' '), n('div', {
          staticClass: 'language-js line-numbers-mode'
        }, [
          n('pre', {
            pre: !0,
            attrs: {
              class: 'language-js'
            }
          }, [
            n('code', [
              t._v('window'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('addEventListener')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"resize"')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('=>')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('if')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), t._v('Math'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('abs')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), t._v('window'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('orientation'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('===')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [t._v('90')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [t._v('// 横屏')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('else')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [t._v('// 竖屏')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n')
            ])
          ]), t._v(' '), n('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            n('span', {
              staticClass: 'line-number'
            }, [t._v('1')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('2')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('3')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('4')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('5')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('6')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('7')]), n('br')
          ])
        ]), n('p', [t._v('还可以通过媒体查询判断：')]), t._v(' '), n('div', {
          staticClass: 'language-css line-numbers-mode'
        }, [
          n('pre', {
            pre: !0,
            attrs: {
              class: 'language-css'
            }
          }, [
            n('code', [
              n('span', {
                pre: !0,
                attrs: {
                  class: 'token atrule'
                }
              }, [
                n('span', {
                  pre: !0,
                  attrs: {
                    class: 'token rule'
                  }
                }, [t._v('@media')]), t._v(' screen and '), n('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v('(')]), n('span', {
                  pre: !0,
                  attrs: {
                    class: 'token property'
                  }
                }, [t._v('orientation')]), n('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v(':')]), t._v(' portrait'), n('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v(')')])
              ]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [t._v('/* 竖屏 */')]), t._v('\n'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token atrule'
                }
              }, [
                n('span', {
                  pre: !0,
                  attrs: {
                    class: 'token rule'
                  }
                }, [t._v('@media')]), t._v(' screen and '), n('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v('(')]), n('span', {
                  pre: !0,
                  attrs: {
                    class: 'token property'
                  }
                }, [t._v('orientation')]), n('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v(':')]), t._v(' landscape'), n('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v(')')])
              ]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [t._v('/* 横屏 */')]), t._v('\n'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n')
            ])
          ]), t._v(' '), n('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            n('span', {
              staticClass: 'line-number'
            }, [t._v('1')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('2')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('3')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('4')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('5')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('6')]), n('br')
          ])
        ]), n('p', [t._v('更具体的判断方法：')]), t._v(' '), n('p', [
          n('a', {
            attrs: {
              href: 'https://juejin.im/entry/59092dd1b123db3ee496a5be',
              target: '_blank',
              rel: 'noopener noreferrer'
            }
          }, [t._v('探讨判断横竖屏的最佳实现'), n('OutboundLink')], 1)
        ]), t._v(' '), n('h3', {
          attrs: {
            id: '只能横屏'
          }
        }, [
          n('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#只能横屏'
            }
          }, [t._v('#')]), t._v(' 只能横屏')
        ]), t._v(' '), n('p', [t._v('但很多人的'), n('code', [t._v('方向锁定')]), t._v('都是开启的，有些页面又是需要强制横屏显示。例如：点击按钮，让页面横屏；或是一些横屏小游戏。')]), t._v(' '), n('p', [t._v('如果这时候提示：用户关闭系统的'), n('code', [t._v('方向锁定')]), t._v('，再将手机横向过来。用户做完这些操作后，才能正确显示页面，也太繁琐了。')]), t._v(' '), n('p', [t._v('最好的方案，是直接将页面显示成横屏模式，而不关心是否开启'), n('code', [t._v('方向锁定')]), t._v('。')]), t._v(' '), n('p', [t._v('实现原理就是在竖屏下，写一个横屏的'), n('code', [t._v('div')]), t._v('，然后再将这个'), n('code', [t._v('div')]), t._v('顺时针选择 90 度，以达到横屏效果。大致如下：')]), t._v(' '), n('p', [
          n('img', {
            attrs: {
              src: 'https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1584333134836.png',
              alt: 'enter description here'
            }
          }), t._v('。')
        ]), t._v(' '), n('div', {
          staticClass: 'language-css line-numbers-mode'
        }, [
          n('pre', {
            pre: !0,
            attrs: {
              class: 'language-css'
            }
          }, [
            n('code', [
              n('span', {
                pre: !0,
                attrs: {
                  class: 'token selector'
                }
              }, [t._v('.container')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('background')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' red'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('text-align')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' center'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('color')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' white'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n\n'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token atrule'
                }
              }, [
                n('span', {
                  pre: !0,
                  attrs: {
                    class: 'token rule'
                  }
                }, [t._v('@media')]), t._v(' screen and '), n('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v('(')]), n('span', {
                  pre: !0,
                  attrs: {
                    class: 'token property'
                  }
                }, [t._v('orientation')]), n('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v(':')]), t._v(' portrait'), n('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v(')')])
              ]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token selector'
                }
              }, [t._v('.container')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('position')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' absolute'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('left')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' 50%'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('top')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' 50%'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('z-index')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' 100000'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [t._v('/* div宽为屏幕高 */')]), t._v('\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('width')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' 100vh'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('height')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' 100vw'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('transform')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('translate')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), t._v('-50%'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v(' -50%'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('rotate')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), t._v('90deg'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n')
            ])
          ]), t._v(' '), n('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            n('span', {
              staticClass: 'line-number'
            }, [t._v('1')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('2')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('3')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('4')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('5')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('6')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('7')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('8')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('9')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('10')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('11')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('12')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('13')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('14')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('15')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('16')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('17')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('18')]), n('br')
          ])
        ]), n('p', [t._v('如果系统的'), n('code', [t._v('方向锁定')]), t._v('关闭，那么在横向手持设备时，需要维持不变：')]), t._v(' '), n('div', {
          staticClass: 'language-css line-numbers-mode'
        }, [
          n('pre', {
            pre: !0,
            attrs: {
              class: 'language-css'
            }
          }, [
            n('code', [
              n('span', {
                pre: !0,
                attrs: {
                  class: 'token atrule'
                }
              }, [
                n('span', {
                  pre: !0,
                  attrs: {
                    class: 'token rule'
                  }
                }, [t._v('@media')]), t._v(' screen and '), n('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v('(')]), n('span', {
                  pre: !0,
                  attrs: {
                    class: 'token property'
                  }
                }, [t._v('orientation')]), n('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v(':')]), t._v(' landscape'), n('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v(')')])
              ]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token selector'
                }
              }, [t._v('.container')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [t._v('/* 横向屏时保持不变 */')]), t._v('\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('width')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' 100vw'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('height')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' 100vh'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n')
            ])
          ]), t._v(' '), n('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            n('span', {
              staticClass: 'line-number'
            }, [t._v('1')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('2')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('3')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('4')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('5')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('6')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('7')]), n('br')
          ])
        ]), n('h2', {
          attrs: {
            id: '全屏'
          }
        }, [
          n('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#全屏'
            }
          }, [t._v('#')]), t._v(' 全屏')
        ]), t._v(' '), n('h3', {
          attrs: {
            id: '进入全屏'
          }
        }, [
          n('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#进入全屏'
            }
          }, [t._v('#')]), t._v(' 进入全屏')
        ]), t._v(' '), n('p', [n('code', [t._v('Element.requestFullscreen()')]), t._v(' 方法用于发出异步请求使元素进入全屏模式。也就是页面和屏幕大小一致，不局限于浏览器的可用部分。')]), t._v(' '), n('p', [t._v('全屏成功后会返回一个'), n('code', [t._v('resolved')]), t._v('状态的'), n('code', [t._v('Promise')]), t._v('对象，值为'), n('code', [t._v('undefined')]), t._v('。')]), t._v(' '), n('p', [t._v('失败会返回一个'), n('code', [t._v('rejected')]), t._v('状态的'), n('code', [t._v('Promise')]), t._v('对象。')]), t._v(' '), n('p', [t._v('兼容写法：')]), t._v(' '), n('div', {
          staticClass: 'language-js line-numbers-mode'
        }, [
          n('pre', {
            pre: !0,
            attrs: {
              class: 'language-js'
            }
          }, [
            n('code', [
              n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('function')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('fullScreen')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token parameter'
                }
              }, [t._v('el')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('if')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), t._v('el'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('requestFullscreen'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('return')]), t._v(' el'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('requestFullscreen')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('else')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('if')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), t._v('el'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('mozRequestFullScreen'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('return')]), t._v(' el'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('mozRequestFullScreen')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('else')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('if')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), t._v('el'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('webkitRequestFullscreen'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('return')]), t._v(' el'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('webkitRequestFullscreen')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('else')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('if')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), t._v('el'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('msRequestFullscreen'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('return')]), t._v(' el'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('msRequestFullscreen')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n\n'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('fullScreen')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), t._v('document'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('body'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('then')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('=>')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n  console'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('log')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"succeed"')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n')
            ])
          ]), t._v(' '), n('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            n('span', {
              staticClass: 'line-number'
            }, [t._v('1')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('2')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('3')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('4')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('5')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('6')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('7')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('8')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('9')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('10')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('11')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('12')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('13')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('14')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('15')]), n('br')
          ])
        ]), n('h3', {
          attrs: {
            id: '退出全屏'
          }
        }, [
          n('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#退出全屏'
            }
          }, [t._v('#')]), t._v(' 退出全屏')
        ]), t._v(' '), n('p', [n('code', [t._v('document.exitFullScreen()')]), t._v(' 用于退出全屏。')]), t._v(' '), n('p', [t._v('兼容写法：')]), t._v(' '), n('div', {
          staticClass: 'language-js line-numbers-mode'
        }, [
          n('pre', {
            pre: !0,
            attrs: {
              class: 'language-js'
            }
          }, [
            n('code', [
              n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('function')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('exitFullscreen')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('if')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), t._v('document'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('exitFullScreen'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n    document'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('exitFullScreen')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('else')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('if')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), t._v('document'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('mozCancelFullScreen'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n    document'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('mozCancelFullScreen')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('else')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('if')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), t._v('document'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('webkitExitFullscreen'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n    document'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('webkitExitFullscreen')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('else')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('if')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), t._v('document'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('msExitFullscreen'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n    document'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('msExitFullscreen')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n')
            ])
          ]), t._v(' '), n('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            n('span', {
              staticClass: 'line-number'
            }, [t._v('1')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('2')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('3')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('4')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('5')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('6')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('7')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('8')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('9')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('10')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('11')]), n('br')
          ])
        ]), n('h3', {
          attrs: {
            id: '成功失败事件'
          }
        }, [
          n('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#成功失败事件'
            }
          }, [t._v('#')]), t._v(' 成功失败事件')
        ]), t._v(' '), n('p', [t._v('也可以通过监听 '), n('code', [t._v('fullscreenchange')]), t._v(' 和 '), n('code', [t._v('fullscreenerror')]), t._v(' 事件，在 '), n('code', [t._v('全屏/退出全屏')]), t._v(' 成功或失败时作出响应。')]), t._v(' '), n('div', {
          staticClass: 'language-js line-numbers-mode'
        }, [
          n('pre', {
            pre: !0,
            attrs: {
              class: 'language-js'
            }
          }, [
            n('code', [
              n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('function')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('fullscreenchange')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token parameter'
                }
              }, [
                t._v('el'), n('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v(',')]), t._v(' callback')
              ]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('if')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"onfullscreenchange"')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('in')]), t._v(' el'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n    el'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('addEventListener')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"fullscreenchange"')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('function')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n      callback '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('&&')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('callback')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), t._v('document'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('fullscreen'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('return')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('if')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"onwebkitfullscreenchange"')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('in')]), t._v(' el'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n    el'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('addEventListener')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"webkitfullscreenchange"')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('function')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n      callback '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('&&')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('callback')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), t._v('document'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('webkitIsFullScreen'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('return')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('if')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"onmozfullscreenchange"')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('in')]), t._v(' el'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n    el'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('addEventListener')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"mozfullscreenchange"')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('function')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n      callback '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('&&')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('callback')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), t._v('document'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('mozFullScreen'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('return')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('if')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"onmsfullscreenchange"')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('in')]), t._v(' el'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n    el'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('addEventListener')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"msfullscreenchange"')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('function')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n      callback '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('&&')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('callback')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), t._v('document'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('msFullscreenElement'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('return')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n\n'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('fullScreenchange')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), t._v('el'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('=>')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('if')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('!')]), t._v('document'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('fullscreenElement'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n    console'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('log')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"退出全屏成功"')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n')
            ])
          ]), t._v(' '), n('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            n('span', {
              staticClass: 'line-number'
            }, [t._v('1')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('2')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('3')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('4')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('5')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('6')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('7')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('8')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('9')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('10')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('11')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('12')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('13')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('14')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('15')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('16')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('17')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('18')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('19')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('20')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('21')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('22')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('23')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('24')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('25')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('26')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('27')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('28')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('29')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('30')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('31')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('32')]), n('br')
          ])
        ]), n('p', [n('code', [t._v('document.fullscreenElement')]), t._v('表示当前全屏的元素，如果没有，值为'), n('code', [t._v('null')]), t._v('。根据它可以在'), n('code', [t._v('fullscreenchange')]), t._v(' 判断是进入全屏还是退出全屏事件。')]), t._v(' '), n('p', [t._v('全屏 api 一般用于图片或者视频等。全屏元素的样式会改变，在谷歌浏览器下，默认背景会成为黑色。')]), t._v(' '), n('p', [t._v('可以使用'), n('code', [t._v(':fullscreen')]), t._v('伪类（实验中的功能）来改变全屏元素的样式。')]), t._v(' '), n('div', {
          staticClass: 'language-css line-numbers-mode'
        }, [
          n('pre', {
            pre: !0,
            attrs: {
              class: 'language-css'
            }
          }, [
            n('code', [
              n('span', {
                pre: !0,
                attrs: {
                  class: 'token selector'
                }
              }, [t._v('#full-screen:-moz-full-screen')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('background')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' red'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n\n'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token selector'
                }
              }, [t._v('#full-screen:-webkit-full-screen')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('background')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' red'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n\n'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token selector'
                }
              }, [t._v('#full-screen:fullscreen')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('background')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' red'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n')
            ])
          ]), t._v(' '), n('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            n('span', {
              staticClass: 'line-number'
            }, [t._v('1')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('2')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('3')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('4')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('5')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('6')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('7')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('8')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('9')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('10')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('11')]), n('br')
          ])
        ]), n('blockquote', [n('p', [t._v('在移动端，全屏会令屏幕横向显示。')])]), t._v(' '), n('h2', {
          attrs: {
            id: '移动端全屏'
          }
        }, [
          n('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#移动端全屏'
            }
          }, [t._v('#')]), t._v(' 移动端全屏')
        ]), t._v(' '), n('p', [t._v('在移动端，浏览器会显示'), n('code', [t._v('url栏')]), t._v('和'), n('code', [t._v('菜单栏')]), t._v('，'), n('code', [t._v('url栏')]), t._v('一般可以通过向下滚动消除，但浏览器自带'), n('code', [t._v('菜单栏')]), t._v('却无法关闭。')]), t._v(' '), n('p', [t._v('现在想要实现：')]), t._v(' '), n('ol', [n('li', [t._v('全屏显示(无'), n('code', [t._v('url栏')]), t._v('和'), n('code', [t._v('菜单栏')]), t._v(')')]), t._v(' '), n('li', [t._v('且为竖屏')])]), t._v(' '), n('p', [
          n('img', {
            attrs: {
              src: 'https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1584333134803.png',
              alt: 'enter description here'
            }
          })
        ]), t._v(' '), n('p', [t._v('在移动端，全屏可以使用全屏 api，但会自动横屏，竖屏只需要将页面逆时针旋转 90 度即可。需要注意的是页面的宽高在横屏和竖屏下是相反的。')]), t._v(' '), n('p', [t._v('同时加上动画，让全屏时元素隐藏，全屏结束后，元素渐显。')]), t._v(' '), n('div', {
          staticClass: 'language-js line-numbers-mode'
        }, [
          n('pre', {
            pre: !0,
            attrs: {
              class: 'language-js'
            }
          }, [
            n('code', [
              t._v('document'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('addEventListener')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"fullscreenchange"')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('=>')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n  document'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('documentElement'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('classList'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('add')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), t._v('\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"full-screen"')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v('\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"full-screen-enter"')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v('\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"full-screen-enter-active"')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [t._v('// 全屏有动画过程，只有全屏结束后，才能正确获得有关设备宽高的值')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('setTimeout')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('=>')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [t._v('// 是否为全屏退出事件')]), t._v('\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('if')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('!')]), t._v('document'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('fullscreenElement'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n      Object'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('assign')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), t._v('document'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('documentElement'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('style'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n        width'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v(':')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"auto"')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v('\n        height'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v(':')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"auto"')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v('\n        left'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v(':')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"auto"')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v('\n        top'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v(':')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"auto"')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v('\n        transform'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v(':')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"none"')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v('\n        position'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v(':')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"static"')]), t._v('\n      '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('else')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n      '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [t._v('// 当屏幕宽度大于高度时，才是横屏')]), t._v('\n      '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('if')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), t._v('window'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('screen'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('width '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('>')]), t._v(' window'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('screen'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('height'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n        '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [t._v('// 宽度为屏幕高度')]), t._v('\n        '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('let')]), t._v(' rootWidth '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('=')]), t._v(' window'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('screen'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('height'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n        '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('let')]), t._v(' rootHeight '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('=')]), t._v(' window'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('screen'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('width'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n        '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('let')]), t._v(' rotate '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('=')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('-')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [t._v('90')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n        Object'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('assign')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), t._v('document'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('documentElement'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('style'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n          width'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v(':')]), t._v(' rootWidth '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('+')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"px"')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v('\n          height'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v(':')]), t._v(' rootHeight '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('+')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"px"')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v('\n          '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [t._v('// 需要将页面中心移动到屏幕中央，再旋转')]), t._v('\n          left'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v(':')]), t._v(' rootHeight '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('/')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [t._v('2')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('-')]), t._v(' rootWidth '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('/')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [t._v('2')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('+')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"px"')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v('\n          top'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v(':')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('-')]), t._v('rootHeight '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('/')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [t._v('2')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('+')]), t._v(' rootWidth '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('/')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [t._v('2')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('+')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"px"')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v('\n          transform'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v(':')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token template-string'
                }
              }, [
                n('span', {
                  pre: !0,
                  attrs: {
                    class: 'token template-punctuation string'
                  }
                }, [t._v('`')]), n('span', {
                  pre: !0,
                  attrs: {
                    class: 'token string'
                  }
                }, [t._v('rotate(')]), n('span', {
                  pre: !0,
                  attrs: {
                    class: 'token interpolation'
                  }
                }, [
                  n('span', {
                    pre: !0,
                    attrs: {
                      class: 'token interpolation-punctuation punctuation'
                    }
                  }, [t._v('${')]), t._v('rotate'), n('span', {
                    pre: !0,
                    attrs: {
                      class: 'token interpolation-punctuation punctuation'
                    }
                  }, [t._v('}')])
                ]), n('span', {
                  pre: !0,
                  attrs: {
                    class: 'token string'
                  }
                }, [t._v('deg)')]), n('span', {
                  pre: !0,
                  attrs: {
                    class: 'token template-punctuation string'
                  }
                }, [t._v('`')])
              ]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v('\n          position'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v(':')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"fixed"')]), t._v('\n        '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n      '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n\n    document'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('documentElement'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('classList'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('remove')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"full-screen-enter"')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('setTimeout')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('=>')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n      document'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('documentElement'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('classList'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('remove')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), t._v('\n        '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"full-screen"')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v('\n        '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"full-screen-active"')]), t._v('\n      '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [t._v('200')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [t._v('300')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n')
            ])
          ]), t._v(' '), n('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            n('span', {
              staticClass: 'line-number'
            }, [t._v('1')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('2')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('3')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('4')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('5')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('6')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('7')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('8')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('9')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('10')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('11')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('12')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('13')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('14')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('15')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('16')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('17')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('18')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('19')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('20')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('21')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('22')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('23')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('24')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('25')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('26')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('27')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('28')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('29')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('30')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('31')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('32')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('33')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('34')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('35')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('36')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('37')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('38')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('39')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('40')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('41')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('42')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('43')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('44')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('45')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('46')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('47')]), n('br')
          ])
        ]), n('div', {
          staticClass: 'language-css line-numbers-mode'
        }, [
          n('pre', {
            pre: !0,
            attrs: {
              class: 'language-css'
            }
          }, [
            n('code', [
              n('span', {
                pre: !0,
                attrs: {
                  class: 'token selector'
                }
              }, [t._v('.full-screen')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('background')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' black'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n\n'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token selector'
                }
              }, [t._v('.full-screen-enter *')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('opacity')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' 0'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n\n'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token selector'
                }
              }, [t._v('.full-screen-enter-active *')]), t._v(' '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n  '), n('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('transition')]), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' opacity 0.2s ease'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n'), n('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n')
            ])
          ]), t._v(' '), n('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            n('span', {
              staticClass: 'line-number'
            }, [t._v('1')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('2')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('3')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('4')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('5')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('6')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('7')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('8')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('9')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('10')]), n('br'), n('span', {
              staticClass: 'line-number'
            }, [t._v('11')]), n('br')
          ])
        ]), n('p', [n('strong', [t._v('全屏后，'), n('code', [t._v('浏览器的左滑返回')]), t._v('，'), n('code', [t._v('系统的上滑退出')]), t._v('会互换，如果像这样转换为竖屏，会造成操作上的不方便。')])]), t._v(' '), n('h2', {
          attrs: {
            id: '参考文献'
          }
        }, [
          n('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#参考文献'
            }
          }, [t._v('#')]), t._v(' 参考文献')
        ]), t._v(' '), n('ol', [
          n('li', [
            n('a', {
              attrs: {
                href: 'https://juejin.im/entry/59092dd1b123db3ee496a5be',
                target: '_blank',
                rel: 'noopener noreferrer'
              }
            }, [t._v('探讨判断横竖屏的最佳实现'), n('OutboundLink')], 1)
          ]), t._v(' '), n('li', [
            n('a', {
              attrs: {
                href: 'https://juejin.im/entry/5a30a76df265da430703411e',
                target: '_blank',
                rel: 'noopener noreferrer'
              }
            }, [t._v('移动端如何强制页面横屏'), n('OutboundLink')], 1)
          ]), t._v(' '), n('li', [
            n('a', {
              attrs: {
                href: 'https://juejin.im/entry/5b990ed76fb9a05d2c43956e',
                target: '_blank',
                rel: 'noopener noreferrer'
              }
            }, [t._v('H5 游戏开发：横屏适配'), n('OutboundLink')], 1)
          ]), t._v(' '), n('li', [
            n('a', {
              attrs: {
                href: 'https://developer.mozilla.org/zh-CN/docs/Web/API/Element/requestFullScreen',
                target: '_blank',
                rel: 'noopener noreferrer'
              }
            }, [t._v('MDN requestFullScreen'), n('OutboundLink')], 1)
          ])
        ])
      ])}), [], !1, null, null, null)

    s.default = e.exports}
  }
])