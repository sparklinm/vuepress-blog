(window.webpackJsonp = window.webpackJsonp || []).push([
  [27], {
    396: function (s, t, a) {'use strict'; a.r(t); const n = a(0); const e = Object(n.a)({}, (function () {const s = this; const t = s.$createElement; const a = s._self._c || t

      return a('ContentSlotsDistributor', {
        attrs: {
          'slot-key': s.$parent.slotKey
        }
      }, [
        a('h1', {
          attrs: {
            id: '自定义事件'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#自定义事件'
            }
          }, [s._v('#')]), s._v(' 自定义事件')
        ]), s._v(' '), a('h2', {
          attrs: {
            id: '前言'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#前言'
            }
          }, [s._v('#')]), s._v(' 前言')
        ]), s._v(' '), a('p', [a('code', [s._v('dom')]), s._v(' 的原生事件有时并不能满足需求，比如长按事件、封装原生事件，或者各种自定义事件，这些并没有直接的 '), a('code', [s._v('api')]), s._v(' 去使用。')]), s._v(' '), a('p', [a('code', [s._v('CustomEvent()')]), s._v('允许为 '), a('code', [s._v('dom')]), s._v(' 创建自定义事件，这些事件可以像原生事件那样冒泡或取消。')]), s._v(' '), a('p', [s._v('另外，事件分发机制在代码中也会广泛用到，比如延迟函数结束、或某些代码执行完毕时分发事件，这样可以在其他地方监听事件并执行函数。')]), s._v(' '), a('h2', {
          attrs: {
            id: 'customevent-接口'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#customevent-接口'
            }
          }, [s._v('#')]), s._v(' CustomEvent 接口')
        ]), s._v(' '), a('h3', {
          attrs: {
            id: '用法'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#用法'
            }
          }, [s._v('#')]), s._v(' 用法')
        ]), s._v(' '), a('p', [a('code', [s._v('CustomEvent')]), s._v(' 的用法如下')]), s._v(' '), a('div', {
          staticClass: 'language-js line-numbers-mode'
        }, [
          a('pre', {
            pre: !0,
            attrs: {
              class: 'language-js'
            }
          }, [
            a('code', [
              a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 初始化事件')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('let')]), s._v(' event '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('new')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token class-name'
                }
              }, [s._v('CustomEvent')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"myEvent"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 自定义数据')]), s._v('\n  detail'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n    text'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"this is a custom event"')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 是否冒泡')]), s._v('\n  bubbles'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token boolean'
                }
              }, [s._v('true')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 是否可以取消')]), s._v('\n  cancelable'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token boolean'
                }
              }, [s._v('true')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 监听事件')]), s._v('\ndocument'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('body'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('addEventListener')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"myEvent"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('function')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token parameter'
                }
              }, [s._v('e')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n  console'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('log')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), s._v('e'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('detail'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('text'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// this is a custom event')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 分发事件(监听的dom分发)')]), s._v('\ndocument'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('body'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('dispatchEvent')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), s._v('event'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 销毁事件使用removeEventListener')]), s._v('\ndocument'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('body'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('removeEventListener')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"myEvent"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' func'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n')
            ])
          ]), s._v(' '), a('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            a('span', {
              staticClass: 'line-number'
            }, [s._v('1')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('2')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('3')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('4')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('5')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('6')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('7')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('8')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('9')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('10')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('11')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('12')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('13')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('14')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('15')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('16')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('17')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('18')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('19')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('20')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('21')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('22')]), a('br')
          ])
        ]), a('p', [s._v('在 '), a('code', [s._v('IE')]), s._v(' 浏览器或是某些老的浏览器中，'), a('code', [s._v('CustomEvent')]), s._v('的构造函数可能无法使用，但可以使用'), a('code', [s._v('document.createEvent(\'CustomEvent\')')]), s._v('替代。')]), s._v(' '), a('div', {
          staticClass: 'language-js line-numbers-mode'
        }, [
          a('pre', {
            pre: !0,
            attrs: {
              class: 'language-js'
            }
          }, [
            a('code', [
              a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('let')]), s._v(' event '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' document'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('createEvent')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"CustomEvent"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 初始化事件')]), s._v('\nevent'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('initCustomEvent')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"myEvent"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 是否冒泡')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token boolean'
                }
              }, [s._v('true')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 是否可以取消')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token boolean'
                }
              }, [s._v('true')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 自定义数据')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n    text'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"this is a custom event"')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 监听事件')]), s._v('\ndocument'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('body'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('addEventListener')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"myEvent"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('function')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token parameter'
                }
              }, [s._v('e')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n  console'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('log')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), s._v('e'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('detail'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('text'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// this is a custom event')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 分发事件(监听的dom分发)')]), s._v('\ndocument'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('body'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('dispatchEvent')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), s._v('event'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n')
            ])
          ]), s._v(' '), a('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            a('span', {
              staticClass: 'line-number'
            }, [s._v('1')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('2')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('3')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('4')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('5')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('6')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('7')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('8')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('9')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('10')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('11')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('12')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('13')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('14')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('15')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('16')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('17')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('18')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('19')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('20')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('21')]), a('br')
          ])
        ]), a('h3', {
          attrs: {
            id: '实例：自定义滑动事件'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#实例：自定义滑动事件'
            }
          }, [s._v('#')]), s._v(' 实例：自定义滑动事件')
        ]), s._v(' '), a('p', [a('code', [s._v('滑动')]), s._v('表示手指滑动是产生的事件，在移动端'), a('code', [s._v('touchstart')]), s._v('、'), a('code', [s._v('touchmove')]), s._v('、'), a('code', [s._v('touchend')]), s._v('来实现。但经常我们需要计算每次'), a('code', [s._v('touchmove')]), s._v('相较于'), a('code', [s._v('touchstart')]), s._v('或是每次'), a('code', [s._v('touchmove')]), s._v('相较于上次'), a('code', [s._v('touchmove')]), s._v('产生的距离，也可能需要使单次滑过的距离不超过一个值。对此我们可以对触摸事件进行一个封装来更方便的在不同情况下使用。')]), s._v(' '), a('div', {
          staticClass: 'language-js line-numbers-mode'
        }, [
          a('pre', {
            pre: !0,
            attrs: {
              class: 'language-js'
            }
          }, [
            a('code', [
              a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('export')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('default')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('class')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// dom节点')]), s._v('\n  el'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 手指移动过程中上一个坐标')]), s._v('\n  prePoint '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n    x'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('0')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n    y'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('0')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 自定义用户数据')]), s._v('\n  customData '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 滑动开始的点')]), s._v('\n    startx'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('0')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n    starty'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('0')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 滑动过程的点')]), s._v('\n    endx'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('0')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n    endy'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('0')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 滑动过程中与上一个点的距离')]), s._v('\n    dx'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('0')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n    dy'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('0')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 滑动过程中与开始点的距离')]), s._v('\n    offsetx'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('0')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n    offsety'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('0')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('constructor')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token parameter'
                }
              }, [
                s._v('el'), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [s._v(',')]), s._v(' maxSlideDx')
              ]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('el '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' el'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 单次的最大横向滑动距离')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('maxSlideDx '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' maxSlideDx'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('_init')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v('\n\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('_init')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 注册滑动开始、过程、结束事件')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('slidestart '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('new')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token class-name'
                }
              }, [s._v('CustomEvent')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"slidestart"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n      detail'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('customData'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n      bubbles'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token boolean'
                }
              }, [s._v('true')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n      cancelable'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token boolean'
                }
              }, [s._v('true')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('slidemove '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('new')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token class-name'
                }
              }, [s._v('CustomEvent')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"slidemove"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n      detail'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('customData'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n      bubbles'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token boolean'
                }
              }, [s._v('true')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n      cancelable'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token boolean'
                }
              }, [s._v('true')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('slideend '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('new')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token class-name'
                }
              }, [s._v('CustomEvent')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"slideend"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n      detail'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('customData'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n      bubbles'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token boolean'
                }
              }, [s._v('true')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n      cancelable'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token boolean'
                }
              }, [s._v('true')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 监听原生触摸事件')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('el'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('addEventListener')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"touchstart"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('_start'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('el'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('addEventListener')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"touchmove"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('_move'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('el'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('addEventListener')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"touchend"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('_end'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v('\n\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function-variable function'
                }
              }, [s._v('_start')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token parameter'
                }
              }, [s._v('e')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=>')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('const')]), s._v(' startx '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' e'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('targetTouches'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('[')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('0')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(']')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('pageX'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('const')]), s._v(' starty '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' e'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('targetTouches'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('[')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('0')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(']')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('pageY'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 初始化data')]), s._v('\n    Object'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('assign')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('customData'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n      startx'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n      starty'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n      endx'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' startx'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n      endy'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' starty'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n      dx'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('0')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n      dy'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('0')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n      offsetx'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('0')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n      offsety'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('0')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('prePoint '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n      x'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' startx'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n      y'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' starty\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('el'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('dispatchEvent')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('slidestart'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function-variable function'
                }
              }, [s._v('_move')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token parameter'
                }
              }, [s._v('e')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=>')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('const')]), s._v(' endx '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' e'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('targetTouches'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('[')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('0')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(']')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('pageX'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('const')]), s._v(' endy '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' e'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('targetTouches'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('[')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('0')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(']')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('pageY'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 相较于上一次touchmove点的距离')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('let')]), s._v(' dx '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' endx '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('-')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('prePoint'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('x'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('const')]), s._v(' dy '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' endy '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('-')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('prePoint'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('y'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('let')]), s._v(' offsetx '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('0')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('let')]), s._v(' offsety '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('0')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 单次滑动过程不能超过设定maxSlideDx值')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('if')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('customData'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('offsetx '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('+')]), s._v(' dx '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('>')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('maxSlideDx'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n      dx '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('maxSlideDx '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('-')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('customData'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('offsetx'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n      offsetx '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('maxSlideDx'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('else')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('if')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('customData'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('offsetx '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('+')]), s._v(' dx '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('<')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('-')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('maxSlideDx'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n      dx '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('-')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('maxSlideDx '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('-')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('customData'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('offsetx'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n      offsetx '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('-')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('maxSlideDx'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('else')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n      offsetx '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' endx '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('-')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('customData'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('startx'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v('\n    offsety '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' endy '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('-')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('customData'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('starty'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\n    Object'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('assign')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('customData'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n      endx'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n      endy'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n      dx'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n      dy'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n      offsetx'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n      offsety\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('prePoint '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n      x'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' endx'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n      y'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' endy\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('el'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('dispatchEvent')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('slidemove'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function-variable function'
                }
              }, [s._v('_end')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token parameter'
                }
              }, [s._v('e')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=>')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('const')]), s._v(' endx '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' e'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('changedTouches'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('[')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('0')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(']')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('pageX'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('const')]), s._v(' endy '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' e'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('changedTouches'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('[')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('0')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(']')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('pageY'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n    Object'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('assign')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('customData'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n      endx'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n      endy\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('el'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('dispatchEvent')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('slideend'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('setMaxSlideDx')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token parameter'
                }
              }, [s._v('ds')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('maxSlideDx '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' ds'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v('\n\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 销毁自定义事件')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('destroy')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('el'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('removeEventListener')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"touchstart"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('_start'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('el'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('removeEventListener')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"touchmove"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('_move'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('el'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('removeEventListener')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"touchend"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('_end'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v('\n')
            ])
          ]), s._v(' '), a('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            a('span', {
              staticClass: 'line-number'
            }, [s._v('1')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('2')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('3')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('4')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('5')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('6')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('7')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('8')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('9')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('10')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('11')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('12')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('13')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('14')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('15')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('16')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('17')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('18')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('19')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('20')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('21')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('22')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('23')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('24')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('25')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('26')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('27')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('28')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('29')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('30')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('31')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('32')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('33')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('34')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('35')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('36')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('37')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('38')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('39')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('40')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('41')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('42')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('43')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('44')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('45')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('46')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('47')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('48')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('49')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('50')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('51')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('52')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('53')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('54')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('55')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('56')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('57')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('58')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('59')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('60')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('61')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('62')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('63')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('64')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('65')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('66')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('67')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('68')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('69')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('70')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('71')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('72')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('73')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('74')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('75')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('76')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('77')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('78')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('79')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('80')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('81')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('82')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('83')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('84')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('85')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('86')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('87')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('88')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('89')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('90')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('91')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('92')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('93')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('94')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('95')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('96')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('97')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('98')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('99')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('100')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('101')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('102')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('103')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('104')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('105')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('106')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('107')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('108')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('109')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('110')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('111')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('112')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('113')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('114')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('115')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('116')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('117')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('118')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('119')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('120')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('121')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('122')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('123')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('124')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('125')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('126')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('127')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('128')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('129')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('130')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('131')]), a('br')
          ])
        ]), a('p', [s._v('使用时，直接监听自定义事件')]), s._v(' '), a('div', {
          staticClass: 'language-js line-numbers-mode'
        }, [
          a('pre', {
            pre: !0,
            attrs: {
              class: 'language-js'
            }
          }, [
            a('code', [
              s._v('document'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('getElementById')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"container"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('addEventListener')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"slidemove"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token parameter'
                }
              }, [s._v('e')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=>')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 获取到已经计算好的值')]), s._v('\n  console'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('log')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), s._v('e'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('detail'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n')
            ])
          ]), s._v(' '), a('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            a('span', {
              staticClass: 'line-number'
            }, [s._v('1')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('2')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('3')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('4')]), a('br')
          ])
        ]), a('h3', {
          attrs: {
            id: '总结'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#总结'
            }
          }, [s._v('#')]), s._v(' 总结')
        ]), s._v(' '), a('p', [a('code', [s._v('CustomEvent')]), s._v(' 的优点在于：与原生 '), a('code', [s._v('dom')]), s._v(' 事件近乎一致，使用很简洁方便。但可能存在兼容性问题，只能由 '), a('code', [s._v('dom')]), s._v(' 节点触发。')]), s._v(' '), a('p', [s._v('这样的自定义事件是对原生事件进行了封装，再分发另一个事件 '), a('code', [s._v('customEvent')]), s._v('，监听 '), a('code', [s._v('customEvent')]), s._v(' 然后执行函数。也可以不用去分发事件，直接将函数以回调方式传入原生事件。')]), s._v(' '), a('h2', {
          attrs: {
            id: 'nodejs-中的事件'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#nodejs-中的事件'
            }
          }, [s._v('#')]), s._v(' nodejs 中的事件')
        ]), s._v(' '), a('p', [s._v('nodejs 提供了一个'), a('code', [s._v('EventEmitter')]), s._v('类，大多数模块都会继承'), a('code', [s._v('EventEmitter')]), s._v('类来触发事件。')]), s._v(' '), a('p', [a('code', [s._v('EventEmitter')]), s._v('主要拥有以下几个方法：')]), s._v(' '), a('ol', [a('li', [s._v('on(eventName, listener)和 emitter.addListener(eventName, listener)：对指定事件绑定事件处理函数')]), s._v(' '), a('li', [s._v('once(eventName, listener)：对指定事件指定只执行一次的事件处理函数')]), s._v(' '), a('li', [s._v('emit(eventName[, ...args])： 触发指定事件')]), s._v(' '), a('li', [s._v('removeListener(eventName, listener)：对指定事件解除事件处理函数')]), s._v(' '), a('li', [s._v('removeAllListeners([event])：对指定的事件接触所有的事件处理函数')]), s._v(' '), a('li', [s._v('setMaxListeners 设置最大队列的长度')])]), s._v(' '), a('p', [s._v('全部方法参考官网文档：')]), s._v(' '), a('p', [
          a('a', {
            attrs: {
              href: 'http://nodejs.cn/api/events.html#events_emitter_emit_eventname_args',
              target: '_blank',
              rel: 'noopener noreferrer'
            }
          }, [s._v('Node.js events（事件触发器）'), a('OutboundLink')], 1)
        ]), s._v(' '), a('p', [s._v('使用如下：')]), s._v(' '), a('div', {
          staticClass: 'language-js line-numbers-mode'
        }, [
          a('pre', {
            pre: !0,
            attrs: {
              class: 'language-js'
            }
          }, [
            a('code', [
              a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 引入 events 模块')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('var')]), s._v(' events '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('require')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"events"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 创建 eventEmitter 对象')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('var')]), s._v(' eventEmitter '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('new')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token class-name'
                }
              }, [
                s._v('events'), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [s._v('.')]), s._v('EventEmitter')
              ]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 注册事件')]), s._v('\nevent'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('on')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"some_event"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('function')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n  console'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('log')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"some_event 事件触发"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 分发')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('setTimeout')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('function')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n  event'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('emit')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"some_event"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('1000')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n')
            ])
          ]), s._v(' '), a('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            a('span', {
              staticClass: 'line-number'
            }, [s._v('1')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('2')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('3')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('4')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('5')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('6')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('7')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('8')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('9')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('10')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('11')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('12')]), a('br')
          ])
        ]), a('h2', {
          attrs: {
            id: '简易实现的事件分发监听'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#简易实现的事件分发监听'
            }
          }, [s._v('#')]), s._v(' 简易实现的事件分发监听')
        ]), s._v(' '), a('p', [s._v('也可以自己实现事件的分发和监听，只需要一个数组或对象存储注册的事件，在分发事件时，遍历分发的事件，执行回调即可。')]), s._v(' '), a('div', {
          staticClass: 'language-js line-numbers-mode'
        }, [
          a('pre', {
            pre: !0,
            attrs: {
              class: 'language-js'
            }
          }, [
            a('code', [
              a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('class')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token class-name'
                }
              }, [s._v('Event')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// on 监听的事件')]), s._v('\n  onEvents '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n  index '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('-')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('1')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n  count '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('0')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// once 表示注册的事件只执行一次便自动移除')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('on')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token parameter'
                }
              }, [
                s._v('name'), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [s._v(',')]), s._v(' callback'), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [s._v(',')]), s._v(' once '), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token operator'
                  }
                }, [s._v('=')]), s._v(' '), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token boolean'
                  }
                }, [s._v('false')])
              ]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('onEvents'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('[')]), s._v('name'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(']')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('onEvents'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('[')]), s._v('name'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(']')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('||')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('[')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(']')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('onEvents'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('[')]), s._v('name'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(']')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('push')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n      name'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' name'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n      callback'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' callback'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n      once'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' once\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v('\n\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 移除事件')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('off')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token parameter'
                }
              }, [
                s._v('name'), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [s._v(',')]), s._v(' callback')
              ]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('if')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('!')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('onEvents'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('[')]), s._v('name'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(']')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('||')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('!')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('onEvents'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('[')]), s._v('name'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(']')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('length'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n      '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('return')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('onEvents'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('[')]), s._v('name'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(']')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('onEvents'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('[')]), s._v('name'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(']')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('filter')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token parameter'
                }
              }, [
                s._v('event'), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [s._v(',')]), s._v(' index')
              ]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=>')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n      '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('let')]), s._v(' flag '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token boolean'
                }
              }, [s._v('true')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\n      '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 在emit的回调中，可能会off事件')]), s._v('\n      '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('if')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), s._v('event'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('callback '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('===')]), s._v(' callback'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n        flag '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token boolean'
                }
              }, [s._v('false')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n        '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('if')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), s._v('index '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('<=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('index '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('&&')]), s._v(' name '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('===')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('name'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n          '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('count'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('++')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n        '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v('\n      '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v('\n\n      '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('return')]), s._v(' flag'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v('\n\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('emit')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token parameter'
                }
              }, [s._v('name')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('if')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('!')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('onEvents'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('[')]), s._v('name'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(']')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('||')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('!')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('onEvents'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('[')]), s._v('name'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(']')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('length'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n      '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('return')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v('\n\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('const')]), s._v(' params '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('[')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('...')]), s._v('arguments'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(']')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('slice')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('1')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('name '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' name'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 循环触发监听的事件')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('for')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('let')]), s._v(' i '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('0')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v(' i '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('<')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('onEvents'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('[')]), s._v('name'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(']')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('length'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v(' i'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('++')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n      '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('const')]), s._v(' event '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('onEvents'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('[')]), s._v('name'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(']')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('[')]), s._v('i'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(']')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\n      '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 需要先判断是否为一次性事件，移除')]), s._v('\n      '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 以防在事件回调中继续触发当前事件时即使是一次性事件也会执行多次')]), s._v('\n      '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('if')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), s._v('event'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('once'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n        '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('onEvents'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('[')]), s._v('name'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(']')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('splice')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), s._v('i'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('1')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n        i'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('--')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n      '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v('\n      '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 记录此时的index，如果回调中off同类事件，需要记录off的小于等于这个index的个数')]), s._v('\n      '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('index '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' i'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n      event'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('callback')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('...')]), s._v('params'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n      '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 修正索引')]), s._v('\n      i '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('-=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('count'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n      '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('count '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('0')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('count '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('0')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('this')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('index '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('-')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('1')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v('\n')
            ])
          ]), s._v(' '), a('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            a('span', {
              staticClass: 'line-number'
            }, [s._v('1')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('2')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('3')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('4')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('5')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('6')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('7')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('8')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('9')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('10')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('11')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('12')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('13')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('14')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('15')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('16')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('17')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('18')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('19')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('20')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('21')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('22')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('23')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('24')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('25')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('26')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('27')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('28')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('29')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('30')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('31')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('32')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('33')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('34')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('35')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('36')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('37')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('38')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('39')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('40')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('41')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('42')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('43')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('44')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('45')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('46')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('47')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('48')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('49')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('50')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('51')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('52')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('53')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('54')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('55')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('56')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('57')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('58')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('59')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('60')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('61')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('62')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('63')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('64')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('65')]), a('br')
          ])
        ]), a('p', [s._v('实现自定义事件需要注意几个地方：')]), s._v(' '), a('ol', [
          a('li', [
            a('p', [s._v('如果监听的是一次性事件，那么在一次性事件的回调中继续触发这个事件，应当不响应，例如：')]), s._v(' '), a('div', {
              staticClass: 'language-js line-numbers-mode'
            }, [
              a('pre', {
                pre: !0,
                attrs: {
                  class: 'language-js'
                }
              }, [
                a('code', [
                  s._v('event'), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v('.')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token function'
                    }
                  }, [s._v('on')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v('(')]), s._v('\n  '), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token string'
                    }
                  }, [s._v('"myevent"')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v(',')]), s._v('\n  '), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v('(')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v(')')]), s._v(' '), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token operator'
                    }
                  }, [s._v('=>')]), s._v(' '), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v('{')]), s._v('\n    event'), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v('.')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token function'
                    }
                  }, [s._v('on')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v('(')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token string'
                    }
                  }, [s._v('"myevent"')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v(')')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v(';')]), s._v(' '), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token comment'
                    }
                  }, [s._v('//不响应')]), s._v('\n  '), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v('}')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v(',')]), s._v('\n  '), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token boolean'
                    }
                  }, [s._v('false')]), s._v('\n'), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v(')')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v(';')]), s._v('\nevent'), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v('.')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token function'
                    }
                  }, [s._v('emit')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v('(')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token string'
                    }
                  }, [s._v('"myevent"')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v(')')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v(';')]), s._v('\n')
                ])
              ]), s._v(' '), a('div', {
                staticClass: 'line-numbers-wrapper'
              }, [
                a('span', {
                  staticClass: 'line-number'
                }, [s._v('1')]), a('br'), a('span', {
                  staticClass: 'line-number'
                }, [s._v('2')]), a('br'), a('span', {
                  staticClass: 'line-number'
                }, [s._v('3')]), a('br'), a('span', {
                  staticClass: 'line-number'
                }, [s._v('4')]), a('br'), a('span', {
                  staticClass: 'line-number'
                }, [s._v('5')]), a('br'), a('span', {
                  staticClass: 'line-number'
                }, [s._v('6')]), a('br'), a('span', {
                  staticClass: 'line-number'
                }, [s._v('7')]), a('br'), a('span', {
                  staticClass: 'line-number'
                }, [s._v('8')]), a('br')
              ])
            ]), a('p', [s._v('所以触发事件时，遇到一次性的监听，应该先删除再触发回调。')])
          ]), s._v(' '), a('li', [
            a('p', [s._v('如果监听的事件回调中 '), a('code', [s._v('off')]), s._v(' 了同类事件，那么要注意修正循环时的索引。例如：')]), s._v(' '), a('div', {
              staticClass: 'language-js line-numbers-mode'
            }, [
              a('pre', {
                pre: !0,
                attrs: {
                  class: 'language-js'
                }
              }, [
                a('code', [
                  s._v('events '), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token operator'
                    }
                  }, [s._v('=')]), s._v(' '), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v('[')]), s._v('\n  '), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v('{')]), s._v('\n    name'), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token operator'
                    }
                  }, [s._v(':')]), s._v(' '), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token string'
                    }
                  }, [s._v('"myevent"')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v(',')]), s._v('\n    callback0\n  '), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v('}')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v(',')]), s._v('\n  '), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v('{')]), s._v('\n    name'), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token operator'
                    }
                  }, [s._v(':')]), s._v(' '), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token string'
                    }
                  }, [s._v('"myevent"')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v(',')]), s._v('\n    callback1\n  '), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v('}')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v(',')]), s._v('\n  '), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v('{')]), s._v('\n    name'), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token operator'
                    }
                  }, [s._v(':')]), s._v(' '), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token string'
                    }
                  }, [s._v('"myevent"')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v(',')]), s._v('\n    callback2\n  '), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v('}')]), s._v('\n'), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v(']')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v(';')]), s._v('\n\nevent'), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v('.')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token function'
                    }
                  }, [s._v('emit')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v('(')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token string'
                    }
                  }, [s._v('"myevent"')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v(')')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v(';')]), s._v('\n')
                ])
              ]), s._v(' '), a('div', {
                staticClass: 'line-numbers-wrapper'
              }, [
                a('span', {
                  staticClass: 'line-number'
                }, [s._v('1')]), a('br'), a('span', {
                  staticClass: 'line-number'
                }, [s._v('2')]), a('br'), a('span', {
                  staticClass: 'line-number'
                }, [s._v('3')]), a('br'), a('span', {
                  staticClass: 'line-number'
                }, [s._v('4')]), a('br'), a('span', {
                  staticClass: 'line-number'
                }, [s._v('5')]), a('br'), a('span', {
                  staticClass: 'line-number'
                }, [s._v('6')]), a('br'), a('span', {
                  staticClass: 'line-number'
                }, [s._v('7')]), a('br'), a('span', {
                  staticClass: 'line-number'
                }, [s._v('8')]), a('br'), a('span', {
                  staticClass: 'line-number'
                }, [s._v('9')]), a('br'), a('span', {
                  staticClass: 'line-number'
                }, [s._v('10')]), a('br'), a('span', {
                  staticClass: 'line-number'
                }, [s._v('11')]), a('br'), a('span', {
                  staticClass: 'line-number'
                }, [s._v('12')]), a('br'), a('span', {
                  staticClass: 'line-number'
                }, [s._v('13')]), a('br'), a('span', {
                  staticClass: 'line-number'
                }, [s._v('14')]), a('br'), a('span', {
                  staticClass: 'line-number'
                }, [s._v('15')]), a('br'), a('span', {
                  staticClass: 'line-number'
                }, [s._v('16')]), a('br')
              ])
            ]), a('p', [s._v('循环 '), a('code', [s._v('events')]), s._v(' 触发回调，先触发了 '), a('code', [s._v('callback0')]), s._v('，但在 '), a('code', [s._v('callback1')]), s._v(' 中 '), a('code', [s._v('off')]), s._v(' 了 '), a('code', [s._v('callback0')]), s._v('，导致 '), a('code', [s._v('events')]), s._v(' 中删除了 '), a('code', [s._v('callback0')]), s._v(' 的元素，那循环的索引也应该减 1 才能指向 '), a('code', [s._v('callback2')]), s._v('。')])
          ])
        ]), s._v(' '), a('h2', {
          attrs: {
            id: '参考文献'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#参考文献'
            }
          }, [s._v('#')]), s._v(' 参考文献')
        ]), s._v(' '), a('ol', [
          a('li', [
            a('a', {
              attrs: {
                href: 'https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent',
                target: '_blank',
                rel: 'noopener noreferrer'
              }
            }, [s._v('mdn CustomEven'), a('OutboundLink')], 1)
          ]), s._v(' '), a('li', [
            a('a', {
              attrs: {
                href: 'https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent',
                target: '_blank',
                rel: 'noopener noreferrer'
              }
            }, [s._v('mdn CustomEvent()'), a('OutboundLink')], 1)
          ]), s._v(' '), a('li', [
            a('a', {
              attrs: {
                href: 'http://nodejs.cn/api/events.html#events_emitter_emit_eventname_args',
                target: '_blank',
                rel: 'noopener noreferrer'
              }
            }, [s._v('Node.js events（事件触发器）'), a('OutboundLink')], 1)
          ])
        ])
      ])}), [], !1, null, null, null)

    t.default = e.exports}
  }
])