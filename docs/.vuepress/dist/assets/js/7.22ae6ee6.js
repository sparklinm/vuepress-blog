(window.webpackJsonp = window.webpackJsonp || []).push([
  [7], {
    375: function (t, a, s) {'use strict'; s.r(a); const e = s(0); const n = Object(e.a)({}, (function () {const t = this; const a = t.$createElement; const s = t._self._c || a

      return s('ContentSlotsDistributor', {
        attrs: {
          'slot-key': t.$parent.slotKey
        }
      }, [
        s('h1', {
          attrs: {
            id: 'pc、移动端拖拽'
          }
        }, [
          s('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#pc、移动端拖拽'
            }
          }, [t._v('#')]), t._v(' PC、移动端拖拽')
        ]), t._v(' '), s('h2', {
          attrs: {
            id: 'h5-拖拽'
          }
        }, [
          s('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#h5-拖拽'
            }
          }, [t._v('#')]), t._v(' H5 拖拽')
        ]), t._v(' '), s('h3', {
          attrs: {
            id: '设置元素可拖动'
          }
        }, [
          s('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#设置元素可拖动'
            }
          }, [t._v('#')]), t._v(' 设置元素可拖动')
        ]), t._v(' '), s('p', [t._v('设置拖拽属性'), s('code', [t._v('draggable="true"')]), t._v('。')]), t._v(' '), s('div', {
          staticClass: 'language-html line-numbers-mode'
        }, [
          s('pre', {
            pre: !0,
            attrs: {
              class: 'language-html'
            }
          }, [
            s('code', [
              s('span', {
                pre: !0,
                attrs: {
                  class: 'token tag'
                }
              }, [
                s('span', {
                  pre: !0,
                  attrs: {
                    class: 'token tag'
                  }
                }, [
                  s('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [t._v('<')]), t._v('img')
                ]), t._v(' '), s('span', {
                  pre: !0,
                  attrs: {
                    class: 'token attr-name'
                  }
                }, [t._v('draggable')]), s('span', {
                  pre: !0,
                  attrs: {
                    class: 'token attr-value'
                  }
                }, [
                  s('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [t._v('=')]), s('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [t._v('"')]), t._v('true'), s('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [t._v('"')])
                ]), t._v(' '), s('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v('/>')])
              ]), t._v('\n')
            ])
          ]), t._v(' '), s('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            s('span', {
              staticClass: 'line-number'
            }, [t._v('1')]), s('br')
          ])
        ]), t._v(' '), s('h3', {
          attrs: {
            id: '拖拽事件'
          }
        }, [
          s('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#拖拽事件'
            }
          }, [t._v('#')]), t._v(' 拖拽事件')
        ]), t._v(' '), s('h4', {
          attrs: {
            id: 'dragstart'
          }
        }, [
          s('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#dragstart'
            }
          }, [t._v('#')]), t._v(' dragstart')
        ]), t._v(' '), s('p', [t._v('拖拽开始，使用 '), s('code', [t._v('dataTransfer.setData()')]), t._v(' 方法设置被拖数据的数据类型和值。')]), t._v(' '), s('div', {
          staticClass: 'language-javascript line-numbers-mode'
        }, [
          s('pre', {
            pre: !0,
            attrs: {
              class: 'language-javascript'
            }
          }, [
            s('code', [
              s('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('function')]), t._v(' '), s('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('dragstart')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token parameter'
                }
              }, [t._v('e')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n  e'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('dataTransfer'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('setData')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"Text"')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v(' e'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('target'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('id'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n')
            ])
          ]), t._v(' '), s('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            s('span', {
              staticClass: 'line-number'
            }, [t._v('1')]), s('br'), s('span', {
              staticClass: 'line-number'
            }, [t._v('2')]), s('br'), s('span', {
              staticClass: 'line-number'
            }, [t._v('3')]), s('br')
          ])
        ]), s('p', [t._v('需要注意的是：在 '), s('code', [t._v('IE')]), t._v(' 下 '), s('code', [t._v('setData')]), t._v(' 会报错，在火狐浏览器下必须有 '), s('code', [t._v('setData')]), t._v(' 才能拖动。')]), t._v(' '), s('div', {
          staticClass: 'language-javascript line-numbers-mode'
        }, [
          s('pre', {
            pre: !0,
            attrs: {
              class: 'language-javascript'
            }
          }, [
            s('code', [
              s('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('let')]), t._v(' id '), s('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('=')]), t._v(' '), s('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('""')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('function')]), t._v(' '), s('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('dragstart')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token parameter'
                }
              }, [t._v('e')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n  '), s('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('if')]), t._v(' '), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), t._v('e'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('dataTransfer'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('setData'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n    e'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('dataTransfer'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('setData')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"text/plain"')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v(' e'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('target'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('id'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n  '), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n  '), s('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('if')]), t._v(' '), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), t._v('e'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('dataTransfer'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('dropEffect'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n    '), s('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [t._v('// 拖动效果，兼容性不明')]), t._v('\n    e'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('dataTransfer'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('dropEffect '), s('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('=')]), t._v(' '), s('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"move"')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n  '), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n  id '), s('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('=')]), t._v(' e'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('target'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('id'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n')
            ])
          ]), t._v(' '), s('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            s('span', {
              staticClass: 'line-number'
            }, [t._v('1')]), s('br'), s('span', {
              staticClass: 'line-number'
            }, [t._v('2')]), s('br'), s('span', {
              staticClass: 'line-number'
            }, [t._v('3')]), s('br'), s('span', {
              staticClass: 'line-number'
            }, [t._v('4')]), s('br'), s('span', {
              staticClass: 'line-number'
            }, [t._v('5')]), s('br'), s('span', {
              staticClass: 'line-number'
            }, [t._v('6')]), s('br'), s('span', {
              staticClass: 'line-number'
            }, [t._v('7')]), s('br'), s('span', {
              staticClass: 'line-number'
            }, [t._v('8')]), s('br'), s('span', {
              staticClass: 'line-number'
            }, [t._v('9')]), s('br'), s('span', {
              staticClass: 'line-number'
            }, [t._v('10')]), s('br'), s('span', {
              staticClass: 'line-number'
            }, [t._v('11')]), s('br')
          ])
        ]), s('p', [
          t._v('关于 '), s('code', [t._v('dataTransfer')]), t._v(' 的更多：'), s('a', {
            attrs: {
              href: 'https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer',
              target: '_blank',
              rel: 'noopener noreferrer'
            }
          }, [t._v('MDN dataTransfer'), s('OutboundLink')], 1), t._v('。')
        ]), t._v(' '), s('h4', {
          attrs: {
            id: 'drag'
          }
        }, [
          s('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#drag'
            }
          }, [t._v('#')]), t._v(' drag')
        ]), t._v(' '), s('p', [t._v('拖拽过程中触发。')]), t._v(' '), s('h4', {
          attrs: {
            id: 'dragend'
          }
        }, [
          s('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#dragend'
            }
          }, [t._v('#')]), t._v(' dragend')
        ]), t._v(' '), s('p', [t._v('在释放鼠标后触发（无论是把元素放到了有效的放置目标，还是放置到了无效的放置目标上）。')]), t._v(' '), s('h3', {
          attrs: {
            id: '放置事件'
          }
        }, [
          s('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#放置事件'
            }
          }, [t._v('#')]), t._v(' 放置事件')
        ]), t._v(' '), s('h4', {
          attrs: {
            id: 'dragenter'
          }
        }, [
          s('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#dragenter'
            }
          }, [t._v('#')]), t._v(' dragenter')
        ]), t._v(' '), s('p', [t._v('元素被拖动到放置目标上触发')]), t._v(' '), s('h4', {
          attrs: {
            id: 'dragover'
          }
        }, [
          s('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#dragover'
            }
          }, [t._v('#')]), t._v(' dragover')
        ]), t._v(' '), s('p', [t._v('被拖动的元素在放置目标的范围内移动时，持续触发。')]), t._v(' '), s('p', [t._v('默认地，无法将数据/元素放置到其他元素中。如果需要设置允许放置，我们必须阻止对元素的默认处理方式。')]), t._v(' '), s('p', [t._v('这要通过调用 '), s('code', [t._v('dragover')]), t._v(' 事件的 '), s('code', [t._v('event.preventDefault()')]), t._v(' 方法。')]), t._v(' '), s('div', {
          staticClass: 'language-js line-numbers-mode'
        }, [
          s('pre', {
            pre: !0,
            attrs: {
              class: 'language-js'
            }
          }, [
            s('code', [
              s('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('function')]), t._v(' '), s('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('dragover')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token parameter'
                }
              }, [t._v('ev')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n  ev'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('preventDefault')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n')
            ])
          ]), t._v(' '), s('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            s('span', {
              staticClass: 'line-number'
            }, [t._v('1')]), s('br'), s('span', {
              staticClass: 'line-number'
            }, [t._v('2')]), s('br'), s('span', {
              staticClass: 'line-number'
            }, [t._v('3')]), s('br')
          ])
        ]), s('h4', {
          attrs: {
            id: 'dragleave'
          }
        }, [
          s('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#dragleave'
            }
          }, [t._v('#')]), t._v(' dragleave')
        ]), t._v(' '), s('p', [t._v('被拖到元素离开放置目标。')]), t._v(' '), s('h4', {
          attrs: {
            id: 'drop'
          }
        }, [
          s('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#drop'
            }
          }, [t._v('#')]), t._v(' drop')
        ]), t._v(' '), s('p', [t._v('被拖动元素放置到目标元素上。')]), t._v(' '), s('div', {
          staticClass: 'language-javascript line-numbers-mode'
        }, [
          s('pre', {
            pre: !0,
            attrs: {
              class: 'language-javascript'
            }
          }, [
            s('code', [
              s('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('function')]), t._v(' '), s('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('drop')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token parameter'
                }
              }, [t._v('e')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n  e'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('preventDefault')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n  '), s('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('var')]), t._v(' data '), s('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('=')]), t._v(' e'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('dataTransfer'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('getData')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"Text"')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n  e'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('target'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('appendChild')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), t._v('document'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('getElementById')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), t._v('data'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n')
            ])
          ]), t._v(' '), s('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            s('span', {
              staticClass: 'line-number'
            }, [t._v('1')]), s('br'), s('span', {
              staticClass: 'line-number'
            }, [t._v('2')]), s('br'), s('span', {
              staticClass: 'line-number'
            }, [t._v('3')]), s('br'), s('span', {
              staticClass: 'line-number'
            }, [t._v('4')]), s('br'), s('span', {
              staticClass: 'line-number'
            }, [t._v('5')]), s('br')
          ])
        ]), s('p', [t._v('说明：')]), t._v(' '), s('ol', [s('li', [t._v('调用 '), s('code', [t._v('preventDefault()')]), t._v(' 来避免浏览器对数据的默认处理（drop 事件的默认行为是以链接形式打开）')]), t._v(' '), s('li', [t._v('通过 '), s('code', [t._v('dataTransfer.getData("Text")')]), t._v(' 方法获得被拖的数据。该方法将返回在 '), s('code', [t._v('setData()')]), t._v(' 方法中设置为相同类型的任何数据。')]), t._v(' '), s('li', [t._v('把被拖元素追加到放置元素（目标元素）中')])]), t._v(' '), s('p', [t._v('完整的事件触发顺序：')]), t._v(' '), s('p', [s('code', [t._v('dragstart')]), t._v(' -> '), s('code', [t._v('drag')]), t._v(' -> '), s('code', [t._v('dragenter')]), t._v(' -> '), s('code', [t._v('dragover')]), t._v(' -> ('), s('code', [t._v('dragleave')]), t._v(')-> '), s('code', [t._v('drop')]), t._v(' -> '), s('code', [t._v('dragend')])]), t._v(' '), s('p', [
          t._v('更详细的说明见：'), s('a', {
            attrs: {
              href: 'https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API',
              target: '_blank',
              rel: 'noopener noreferrer'
            }
          }, [t._v('MDN 拖放'), s('OutboundLink')], 1), t._v('。')
        ]), t._v(' '), s('h3', {
          attrs: {
            id: '拖拽过程中鼠标位置'
          }
        }, [
          s('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#拖拽过程中鼠标位置'
            }
          }, [t._v('#')]), t._v(' 拖拽过程中鼠标位置')
        ]), t._v(' '), s('ol', [s('li', [s('code', [t._v('e.pageX')]), t._v(': 距整个文档左上角距离，包括滚动条等')]), t._v(' '), s('li', [s('code', [t._v('e.clientX')]), t._v(': 距离可视窗口左上角距离')]), t._v(' '), s('li', [s('code', [t._v('e.screenX')]), t._v('：距屏幕左上角距离')]), t._v(' '), s('li', [s('code', [t._v('e.offsetX')]), t._v(': 鼠标相比较于触发事件的元素的位置,以元素盒子模型的内容区域(不包括 '), s('code', [t._v('border')]), t._v(')的左上角为参考')]), t._v(' '), s('li', [s('code', [t._v('e.layerX')]), t._v(': 如果触发元素设置了定位，将相对于元素左上角（包括 '), s('code', [t._v('border')]), t._v(')；如果没有，相对于页面左上角')]), t._v(' '), s('li', [s('code', [t._v('e.x')]), t._v(': 和 '), s('code', [t._v('layerX')]), t._v(' 一样')])]), t._v(' '), s('p', [
          t._v('其中 '), s('code', [t._v('layerX')]), t._v(' 和 '), s('code', [t._v('x')]), t._v(' 兼容性不太好，尽量不要使用，其他参考'), s('a', {
            attrs: {
              href: 'https://www.caniuse.com/',
              target: '_blank',
              rel: 'noopener noreferrer'
            }
          }, [t._v('Can I use'), s('OutboundLink')], 1), t._v('。')
        ]), t._v(' '), s('h2', {
          attrs: {
            id: '移动端拖拽'
          }
        }, [
          s('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#移动端拖拽'
            }
          }, [t._v('#')]), t._v(' 移动端拖拽')
        ]), t._v(' '), s('h3', {
          attrs: {
            id: '相关事件'
          }
        }, [
          s('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#相关事件'
            }
          }, [t._v('#')]), t._v(' 相关事件')
        ]), t._v(' '), s('p', [t._v('H5 拖拽 api 在移动端是无效的。移动端的拖拽只能使用触摸事件。')]), t._v(' '), s('p', [s('strong', [t._v('touchstart')]), t._v('\n手指接触屏幕')]), t._v(' '), s('p', [s('strong', [t._v('touchmove')]), t._v('\n手指在屏幕上移动')]), t._v(' '), s('p', [s('strong', [t._v('touchend')]), t._v('\n手指离开屏幕')]), t._v(' '), s('p', [
          t._v('参考：'), s('a', {
            attrs: {
              href: 'https://developer.mozilla.org/zh-CN/docs/Web/API/Touch_events',
              target: '_blank',
              rel: 'noopener noreferrer'
            }
          }, [t._v('MDN touch events'), s('OutboundLink')], 1)
        ]), t._v(' '), s('h3', {
          attrs: {
            id: '触摸点'
          }
        }, [
          s('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#触摸点'
            }
          }, [t._v('#')]), t._v(' 触摸点')
        ]), t._v(' '), s('ul', [s('li', [s('code', [t._v('target')]), t._v(' 触发事件节点')]), t._v(' '), s('li', [s('code', [t._v('touches')]), t._v(' 当前位于屏幕上的所有手指触摸点的一个列表。')]), t._v(' '), s('li', [s('code', [t._v('targetTouches')]), t._v(' 当前元素对象上所有触摸点的列表。')]), t._v(' '), s('li', [s('code', [t._v('changedTouches')]), t._v(' 涉及当前事件的触摸点的列表。')])]), t._v(' '), s('p', [t._v('三者的区别：')]), t._v(' '), s('ol', [s('li', [s('p', [t._v('用一个手指接触屏幕，触发事件，此时这三个属性有相同的值。')])]), t._v(' '), s('li', [s('p', [t._v('用第二个手指接触屏幕，此时，'), s('code', [t._v('touches')]), t._v(' 有两个元素，每个手指触摸点为一个值。')]), t._v(' '), s('ul', [s('li', [t._v('当两个手指触摸相同元素时，'), s('code', [t._v('targetTouches')]), t._v(' 和 '), s('code', [t._v('touches')]), t._v(' 的值相同，')]), t._v(' '), s('li', [t._v('否则 '), s('code', [t._v('targetTouches')]), t._v(' 只有一个值。'), s('code', [t._v('changedTouches')]), t._v(' 此时只有一个值，为第二个手指的触摸点，因为第二个手指是引发事件的原因')])])]), t._v(' '), s('li', [s('p', [t._v('用两个手指同时接触屏幕，此时 '), s('code', [t._v('changedTouches')]), t._v(' 有两个值，每一个手指的触摸点都有一个值。')])]), t._v(' '), s('li', [s('p', [t._v('手指滑动时，三个值都会发生变化。')])]), t._v(' '), s('li', [s('p', [t._v('一个手指离开屏幕，'), s('code', [t._v('touches')]), t._v(' 和 '), s('code', [t._v('targetTouches')]), t._v(' 中对应的元素会同时移除，而 '), s('code', [t._v('changedTouches')]), t._v(' 仍然会存在元素。')])]), t._v(' '), s('li', [s('p', [t._v('手指都离开屏幕之后，'), s('code', [t._v('touches')]), t._v(' 和 '), s('code', [t._v('targetTouches')]), t._v(' 中将不会再有值，'), s('code', [t._v('changedTouches')]), t._v(' 还会有一个值，此值为最后一个离开屏幕的手指的接触点。')])])]), t._v(' '), s('blockquote', [s('p', [t._v('总结来说：')]), t._v(' '), s('ol', [s('li', [s('code', [t._v('targetTouches')]), t._v(' 是你监听元素上的触摸点。')]), t._v(' '), s('li', [s('code', [t._v('touches')]), t._v(' 屏幕上的所有触摸点。')]), t._v(' '), s('li', [s('code', [t._v('changedTouches')]), t._v(' 每次触摸改变的触摸点。')])])]), t._v(' '), s('h3', {
          attrs: {
            id: '触摸点位置'
          }
        }, [
          s('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#触摸点位置'
            }
          }, [t._v('#')]), t._v(' 触摸点位置')
        ]), t._v(' '), s('p', [t._v('触摸点属性：')]), t._v(' '), s('ul', [s('li', [s('code', [t._v('clientX')]), t._v('、'), s('code', [t._v('clientY')]), t._v(' 触摸点相对于可视窗口的 x、y 坐标。')]), t._v(' '), s('li', [s('code', [t._v('pageX')]), t._v('、'), s('code', [t._v('pageY')]), t._v(' 触摸点相对于 html 文档左上方，也就是包括滚动区域。')]), t._v(' '), s('li', [s('code', [t._v('screenX')]), t._v('、'), s('code', [t._v('screenY')]), t._v(' 触摸点相对于屏幕的坐标。')])]), t._v(' '), s('p', [t._v('获取触摸点坐标：')]), t._v(' '), s('p', [t._v('touchstart、touchmove: '), s('code', [t._v('e.targetTouches[0].pageX')])]), t._v(' '), s('p', [t._v('touchend: '), s('code', [t._v('e.changedTouches[0].pageX')])])
      ])}), [], !1, null, null, null)

    a.default = n.exports}
  }
])