(window.webpackJsonp = window.webpackJsonp || []).push([
  [12], {
    382: function (s, t, a) {'use strict'; a.r(t); const n = a(0); const e = Object(n.a)({}, (function () {const s = this; const t = s.$createElement; const a = s._self._c || t

      return a('ContentSlotsDistributor', {
        attrs: {
          'slot-key': s.$parent.slotKey
        }
      }, [
        a('h1', {
          attrs: {
            id: 'js-模块导入导出'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#js-模块导入导出'
            }
          }, [s._v('#')]), s._v(' js 模块导入导出')
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
        ]), s._v(' '), a('p', [s._v('模块导出导入，现在有主要是两种方法：')]), s._v(' '), a('ol', [a('li', [s._v('es6: export 和 import')]), s._v(' '), a('li', [s._v('commonjs: module.exports（exports）和 require')])]), s._v(' '), a('p', [s._v('一直在稀里糊涂的用，知道一些区别，但又有很多不明白的地方，经过查阅各种资料后作一个总结。')]), s._v(' '), a('h2', {
          attrs: {
            id: 'es6-模块与-commonjs-模块的差异'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#es6-模块与-commonjs-模块的差异'
            }
          }, [s._v('#')]), s._v(' ES6 模块与 CommonJS 模块的差异')
        ]), s._v(' '), a('p', [s._v('除了语法差异外，它们的特性还有着巨大区别：')]), s._v(' '), a('ol', [a('li', [s._v('CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。')]), s._v(' '), a('li', [s._v('CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。')])]), s._v(' '), a('p', [a('strong', [s._v('对于差异二')])]), s._v(' '), a('p', [s._v('CommonJS 加载的是一个对象（即 module.exports 属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。')]), s._v(' '), a('p', [a('strong', [s._v('对于差异一')])]), s._v(' '), a('p', [s._v('CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。（除非是对象，或通过函数获得模块中的这个值）')]), s._v(' '), a('div', {
          staticClass: 'language-JavaScript line-numbers-mode'
        }, [
          a('pre', {
            pre: !0,
            attrs: {
              class: 'language-javascript'
            }
          }, [
            a('code', [
              a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// lib.js')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('var')]), s._v(' counter '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('3')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('function')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('incCounter')]), a('span', {
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
              }, [s._v('{')]), s._v('\n  counter'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('++')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v('\nmodule'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('exports '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('\n  counter'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' counter'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n  incCounter'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v(':')]), s._v(' incCounter'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\n\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// main.js')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('var')]), s._v(' mod '), a('span', {
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
              }, [s._v('\'./lib\'')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\nconsole'), a('span', {
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
              }, [s._v('(')]), s._v('mod'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('counter'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 3')]), s._v('\nmod'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('incCounter')]), a('span', {
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
              }, [s._v(';')]), s._v('\nconsole'), a('span', {
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
              }, [s._v('(')]), s._v('mod'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('counter'), a('span', {
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
              }, [s._v('// 3')]), s._v('\n')
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
            }, [s._v('17')]), a('br')
          ])
        ]), a('p', [s._v('ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令 import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的 import 有点像 Unix 系统的“符号连接”，原始值变了，import 加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。')]), s._v(' '), a('p', [s._v('通俗的讲，ES6 模块每次取值时是动态的去模块内部取值。所以能获取到改变后的值。')]), s._v(' '), a('div', {
          staticClass: 'language-javascript line-numbers-mode'
        }, [
          a('pre', {
            pre: !0,
            attrs: {
              class: 'language-javascript'
            }
          }, [
            a('code', [
              a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// lib.js')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('export')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('let')]), s._v(' counter '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('3')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('export')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('function')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('incCounter')]), a('span', {
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
              }, [s._v('{')]), s._v('\n  counter'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('++')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v('\n\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// main.js')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('import')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v(' counter'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' incCounter '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('from')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"./lib"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\nconsole'), a('span', {
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
              }, [s._v('(')]), s._v('counter'), a('span', {
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
              }, [s._v('// 3')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('incCounter')]), a('span', {
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
              }, [s._v(';')]), s._v('\nconsole'), a('span', {
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
              }, [s._v('(')]), s._v('counter'), a('span', {
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
              }, [s._v('// 4')]), s._v('\n')
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
            }, [s._v('11')]), a('br')
          ])
        ]), a('p', [s._v('同时 ES6 引入的模块变量不能重新赋值，是只读的，但 Object 可以改变内部的值，指向的地址不能改变。')]), s._v(' '), a('h2', {
          attrs: {
            id: '模块加载'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#模块加载'
            }
          }, [s._v('#')]), s._v(' 模块加载')
        ]), s._v(' '), a('h3', {
          attrs: {
            id: '浏览器加载'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#浏览器加载'
            }
          }, [s._v('#')]), s._v(' 浏览器加载')
        ]), s._v(' '), a('p', [s._v('CommonJS 实际是 nodejs 的模块管理方法，在浏览器里（html 文件）不能加载。但 ES6 可以在浏览器中加载。')]), s._v(' '), a('p', [s._v('浏览器加载 ES6 模块，也使用'), a('code', [s._v('<script>')]), s._v('标签，但是要加入 '), a('code', [s._v('type="module"')]), s._v('属性。')]), s._v(' '), a('div', {
          staticClass: 'language-html line-numbers-mode'
        }, [
          a('pre', {
            pre: !0,
            attrs: {
              class: 'language-html'
            }
          }, [
            a('code', [
              a('span', {
                pre: !0,
                attrs: {
                  class: 'token tag'
                }
              }, [
                a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token tag'
                  }
                }, [
                  a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v('<')]), s._v('script')
                ]), s._v(' '), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token attr-name'
                  }
                }, [s._v('type')]), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token attr-value'
                  }
                }, [
                  a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v('=')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v('"')]), s._v('module'), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v('"')])
                ]), s._v(' '), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token attr-name'
                  }
                }, [s._v('src')]), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token attr-value'
                  }
                }, [
                  a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v('=')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v('"')]), s._v('./foo.js'), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v('"')])
                ]), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [s._v('>')])
              ]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token script'
                }
              }), a('span', {
                pre: !0,
                attrs: {
                  class: 'token tag'
                }
              }, [
                a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token tag'
                  }
                }, [
                  a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v('</')]), s._v('script')
                ]), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [s._v('>')])
              ]), s._v('\n')
            ])
          ]), s._v(' '), a('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            a('span', {
              staticClass: 'line-number'
            }, [s._v('1')]), a('br')
          ])
        ]), a('p', [s._v('浏览器对于带有'), a('code', [s._v('type="module"')]), s._v('的'), a('code', [s._v('<script>')]), s._v('，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了'), a('code', [s._v('<script>')]), s._v('标签的'), a('code', [s._v('defer')]), s._v('属性。如果有多个会按照在页面出现的顺序依次执行。')]), s._v(' '), a('p', [s._v('对于像这样外部的模块，有几点需要注意。')]), s._v(' '), a('ol', [a('li', [s._v('代码是在模块作用域之中运行，而不是在全局作用域运行。模块内部的顶层变量，外部不可见。')]), s._v(' '), a('li', [s._v('模块脚本自动采用严格模式，不管有没有声明 use strict。')]), s._v(' '), a('li', [s._v('模块之中，可以使用 import 命令加载其他模块（.js 后缀不可省略，需要提供绝对 URL 或相对 URL），也可以使用 export 命令输出对外接口。')]), s._v(' '), a('li', [s._v('模块之中，顶层的 this 关键字返回 undefined，而不是指向 window。也就是说，在模块顶层使用 this 关键字，是无意义的。')]), s._v(' '), a('li', [s._v('同一个模块如果加载多次，将只执行一次。')])]), s._v(' '), a('p', [s._v('ES6 模块也允许内嵌在网页中，语法行为与加载外部脚本完全一致。')]), s._v(' '), a('div', {
          staticClass: 'language-html line-numbers-mode'
        }, [
          a('pre', {
            pre: !0,
            attrs: {
              class: 'language-html'
            }
          }, [
            a('code', [
              a('span', {
                pre: !0,
                attrs: {
                  class: 'token tag'
                }
              }, [
                a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token tag'
                  }
                }, [
                  a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v('<')]), s._v('script')
                ]), s._v(' '), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token attr-name'
                  }
                }, [s._v('type')]), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token attr-value'
                  }
                }, [
                  a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v('=')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v('"')]), s._v('module'), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v('"')])
                ]), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [s._v('>')])
              ]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token script'
                }
              }, [
                a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token language-javascript'
                  }
                }, [
                  s._v('\n  '), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token keyword'
                    }
                  }, [s._v('import')]), s._v(' utils '), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token keyword'
                    }
                  }, [s._v('from')]), s._v(' '), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token string'
                    }
                  }, [s._v('"./utils.js"')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v(';')]), s._v('\n\n  '), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token comment'
                    }
                  }, [s._v('// other code')]), s._v('\n')
                ])
              ]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token tag'
                }
              }, [
                a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token tag'
                  }
                }, [
                  a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [s._v('</')]), s._v('script')
                ]), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [s._v('>')])
              ]), s._v('\n')
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
            }, [s._v('5')]), a('br')
          ])
        ]), a('p', [s._v('**注意：**如果是在本地 html 文件中加载本地 js 文件中的 es6 模块，会出现跨域问题。这时，应当将它们放到一个 web 服务器中。')]), s._v(' '), a('h3', {
          attrs: {
            id: 'node-加载-es6-模块'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#node-加载-es6-模块'
            }
          }, [s._v('#')]), s._v(' Node 加载 ES6 模块')
        ]), s._v(' '), a('p', [s._v('Node 要求 ES6 模块采用 '), a('code', [s._v('.mjs')]), s._v(' 后缀文件名。也就是说，只要脚本文件里面使用 import 或者 export 命令，那么就必须采用 '), a('code', [s._v('.mjs')]), s._v(' 后缀名。require 命令不能加载 '), a('code', [s._v('.mjs')]), s._v(' 文件，会报错，只有 import 命令才可以加载 '), a('code', [s._v('.mjs')]), s._v(' 文件。反过来，'), a('code', [s._v('.mjs')]), s._v(' 文件里面也不能使用 require 命令，必须使用 import。')]), s._v(' '), a('p', [s._v('目前，这项功能还在试验阶段。安装 Node v8.5.0 或以上版本，要用--experimental-modules 参数才能打开该功能。')]), s._v(' '), a('p', [s._v('这里就比较复杂了，直接看 es6 手册：')]), s._v(' '), a('p', [
          a('a', {
            attrs: {
              href: 'http://es6.ruanyifeng.com/#docs/module-loader',
              target: '_blank',
              rel: 'noopener noreferrer'
            }
          }, [s._v('es6 模块加载'), a('OutboundLink')], 1)
        ]), s._v(' '), a('h2', {
          attrs: {
            id: 'webpack-模块'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#webpack-模块'
            }
          }, [s._v('#')]), s._v(' webpack 模块')
        ]), s._v(' '), a('p', [s._v('node 其实并不能完美支持 es6 的模块（有许多限制），但现在 webpack 又能使用 ES6 模块的语法，原因在于，webpack 有自己的模块管理系统，它兼容了所有的模块规范。')]), s._v(' '), a('p', [s._v('在这里所有的 ES6 模块语法都会被转换成 CommonJS 语法。')]), s._v(' '), a('h3', {
          attrs: {
            id: '导出模块'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#导出模块'
            }
          }, [s._v('#')]), s._v(' 导出模块')
        ]), s._v(' '), a('div', {
          staticClass: 'language-JavaScript line-numbers-mode'
        }, [
          a('pre', {
            pre: !0,
            attrs: {
              class: 'language-javascript'
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
                  class: 'token number'
                }
              }, [s._v('123')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('export')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('const')]), s._v(' a '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('123')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('const')]), s._v(' b '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('3')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('const')]), s._v(' c '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('4')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('export')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v(' b'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' c '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 转换为')]), s._v('\nexports'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('default '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('123')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\nexports'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('a '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('123')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\nexports'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('b '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('3')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\nexports'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('c '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('4')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\nexports'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('__esModule '), a('span', {
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
            }, [s._v('14')]), a('br')
          ])
        ]), a('p', [s._v('将所有输出都赋值给 exports，并带上一个标志 __esModule 表明这是个由 es6 转换来的 commonjs 输出。')]), s._v(' '), a('h3', {
          attrs: {
            id: '引入模块'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#引入模块'
            }
          }, [s._v('#')]), s._v(' 引入模块')
        ]), s._v(' '), a('h4', {
          attrs: {
            id: '引入-default'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#引入-default'
            }
          }, [s._v('#')]), s._v(' 引入 default')
        ]), s._v(' '), a('div', {
          staticClass: 'language-JavaScript line-numbers-mode'
        }, [
          a('pre', {
            pre: !0,
            attrs: {
              class: 'language-javascript'
            }
          }, [
            a('code', [
              a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('import')]), s._v(' a '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('from')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('\'./a.js\'')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 转换为')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('var')]), s._v(' a '), a('span', {
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
              }, [s._v('\'./a.js\'')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('default\n')
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
        ]), a('p', [s._v('在 es6 中 '), a('code', [s._v('import a from \'./a.js\'')]), s._v(' 的本意是想去引入一个 es6 模块中的 default 输出。')]), s._v(' '), a('p', [s._v('而'), a('code', [s._v('var a = require(\'./a.js\')')]), s._v('引入的是整个'), a('code', [s._v('exports')]), s._v('对象，而上面导出是将'), a('code', [s._v('default')]), s._v('输出赋值给了'), a('code', [s._v('exports.default')]), s._v('，所以显式改变了 a 的值为 '), a('code', [s._v('default')]), s._v(' 输出。')]), s._v(' '), a('h4', {
          attrs: {
            id: '引入'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#引入'
            }
          }, [s._v('#')]), s._v(' 引入 *')
        ]), s._v(' '), a('div', {
          staticClass: 'language-javascript line-numbers-mode'
        }, [
          a('pre', {
            pre: !0,
            attrs: {
              class: 'language-javascript'
            }
          }, [
            a('code', [
              a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('import')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('*')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('as')]), s._v(' a '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('from')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"./a.js"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 转换为')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('var')]), s._v(' a '), a('span', {
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
              }, [s._v('"./a.js"')]), a('span', {
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
        ]), a('h4', {
          attrs: {
            id: '导入某个变量'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#导入某个变量'
            }
          }, [s._v('#')]), s._v(' 导入某个变量')
        ]), s._v(' '), a('div', {
          staticClass: 'language-javascript line-numbers-mode'
        }, [
          a('pre', {
            pre: !0,
            attrs: {
              class: 'language-javascript'
            }
          }, [
            a('code', [
              a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('import')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v(' a '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('from')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"./a.js"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 转换为')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('var')]), s._v(' a '), a('span', {
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
              }, [s._v('"./a.js"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('a'), a('span', {
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
        ]), a('p', [a('code', [s._v('import * as a from \'./a.js\'')]), s._v(' 将 es6 模块的所有命名输出以及 defalut 输出打包成一个对象赋值给 a 变量。')]), s._v(' '), a('p', [s._v('对于 CommonJs 直接 require 导入整个对象就能满足要求。')]), s._v(' '), a('h3', {
          attrs: {
            id: 'require-引入-es6-模块'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#require-引入-es6-模块'
            }
          }, [s._v('#')]), s._v(' require 引入 es6 模块')
        ]), s._v(' '), a('p', [s._v('由于 es6 模块最后也是转换为 CommonJS 模块，require 自然也能引入 es6 export 语法的模块。')]), s._v(' '), a('h4', {
          attrs: {
            id: 'babel5'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#babel5'
            }
          }, [s._v('#')]), s._v(' babel5')
        ]), s._v(' '), a('div', {
          staticClass: 'language-JavaScript line-numbers-mode'
        }, [
          a('pre', {
            pre: !0,
            attrs: {
              class: 'language-javascript'
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
                  class: 'token number'
                }
              }, [s._v('123')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('var')]), s._v(' foo '), a('span', {
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
              }, [s._v('\'./a.js\'')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), s._v('\n\n')
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
            }, [s._v('3')]), a('br')
          ])
        ]), a('p', [s._v('因为当只有一个 default 输出时，babel5 会将 default 直接复制给 exports，所以可以这样引入。')]), s._v(' '), a('h4', {
          attrs: {
            id: 'babel6（以后）'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#babel6（以后）'
            }
          }, [s._v('#')]), s._v(' babel6（以后）')
        ]), s._v(' '), a('div', {
          staticClass: 'language-JavaScript line-numbers-mode'
        }, [
          a('pre', {
            pre: !0,
            attrs: {
              class: 'language-javascript'
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
                  class: 'token number'
                }
              }, [s._v('123')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('var')]), s._v(' foo '), a('span', {
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
              }, [s._v('\'./a.js\'')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('default\n')
            ])
          ]), s._v(' '), a('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            a('span', {
              staticClass: 'line-number'
            }, [s._v('1')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('2')]), a('br')
          ])
        ]), a('h3', {
          attrs: {
            id: 'ui-库的按需加载原理'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#ui-库的按需加载原理'
            }
          }, [s._v('#')]), s._v(' UI 库的按需加载原理')
        ]), s._v(' '), a('div', {
          staticClass: 'language-JavaScript line-numbers-mode'
        }, [
          a('pre', {
            pre: !0,
            attrs: {
              class: 'language-javascript'
            }
          }, [
            a('code', [
              a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('import')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v(' Button'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' Select '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('from')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('\'element-ui\'')]), s._v('\n\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('//转换为')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('var')]), s._v(' a '), a('span', {
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
              }, [s._v('\'element-ui\'')]), a('span', {
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
                  class: 'token keyword'
                }
              }, [s._v('var')]), s._v(' Button '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' a'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('Button'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('var')]), s._v(' Select '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' a'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), s._v('Select'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\n')
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
            }, [s._v('7')]), a('br')
          ])
        ]), a('p', [s._v('这样会引入全部组件。')]), s._v(' '), a('p', [s._v('借助'), a('code', [s._v('babel-plugin-component')]), s._v('插件，可以')]), s._v(' '), a('div', {
          staticClass: 'language-JavaScript line-numbers-mode'
        }, [
          a('pre', {
            pre: !0,
            attrs: {
              class: 'language-javascript'
            }
          }, [
            a('code', [
              a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('import')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v(' Button'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' Select '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('from')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('\'element-ui\'')]), s._v('\n\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('//转换为')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('import')]), s._v(' Button '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('from')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('\'element-ui/lib/button\'')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('import')]), s._v(' Select '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('from')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('\'element-ui/lib/select\'')]), s._v('\n\n')
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
            }, [s._v('6')]), a('br')
          ])
        ]), a('p', [s._v('所以，对于大多数 UI 库，都是这样的目录')]), s._v(' '), a('div', {
          staticClass: 'language- line-numbers-mode'
        }, [
          a('pre', {
            pre: !0,
            attrs: {
              class: 'language-text'
            }
          }, [a('code', [s._v('|-lib\n||--component1\n||--component2\n||--component3\n|-index.common.js\n\n')])]), s._v(' '), a('div', {
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
            }, [s._v('6')]), a('br')
          ])
        ]), a('p', [
          a('strong', [s._v('更详细的介绍')]), s._v('：\n'), a('a', {
            attrs: {
              href: 'https://juejin.im/post/5a2e5f0851882575d42f5609#heading-4',
              target: '_blank',
              rel: 'noopener noreferrer'
            }
          }, [s._v('import、require、export、module.exports 混合使用详解'), a('OutboundLink')], 1)
        ]), s._v(' '), a('h2', {
          attrs: {
            id: 'es6-模块语法'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#es6-模块语法'
            }
          }, [s._v('#')]), s._v(' es6 模块语法')
        ]), s._v(' '), a('h3', {
          attrs: {
            id: 'export'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#export'
            }
          }, [s._v('#')]), s._v(' export')
        ]), s._v(' '), a('div', {
          staticClass: 'language-javascript line-numbers-mode'
        }, [
          a('pre', {
            pre: !0,
            attrs: {
              class: 'language-javascript'
            }
          }, [
            a('code', [
              s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 导出单个特性')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('export')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('let')]), s._v(' name1'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' name2'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' …'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' nameN'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// also var, const')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('export')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('let')]), s._v(' name1 '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' …'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' name2 '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' …'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' …'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' nameN'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// also var, const')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('export')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('function')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('FunctionName')]), a('span', {
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
              }, [s._v('{')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('...')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('export')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('class')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token class-name'
                }
              }, [s._v('ClassName')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('...')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v('\n\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 导出列表')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('export')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v(' name1'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' name2'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' …'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' nameN '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 重命名导出')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('export')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v(' variable1 '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('as')]), s._v(' name1'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' variable2 '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('as')]), s._v(' name2'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' …'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' nameN '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 默认导出')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('export')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('default')]), s._v(' expression'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n'), a('span', {
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
              }, [s._v('function')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token parameter'
                }
              }, [s._v('…')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v(' … '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// also class, function*')]), s._v('\n'), a('span', {
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
              }, [s._v('function')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('name1')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token parameter'
                }
              }, [s._v('…')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v(' … '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// also class, function*')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('export')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v(' name1 '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('as')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('default')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' … '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// Aggregating modules')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('export')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('*')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('from')]), s._v(' …'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('export')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v(' name1'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' name2'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' …'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' nameN '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('from')]), s._v(' …'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('export')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v(' import1 '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('as')]), s._v(' name1'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' import2 '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('as')]), s._v(' name2'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' …'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' nameN '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('from')]), s._v(' …'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('export')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('default')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('from')]), s._v(' …'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\n')
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
            }, [s._v('25')]), a('br')
          ])
        ]), a('p', [a('code', [s._v('export xx from \'path\'')]), s._v('，在当前模块导出其他模块，等于：')]), s._v(' '), a('div', {
          staticClass: 'language-javascript line-numbers-mode'
        }, [
          a('pre', {
            pre: !0,
            attrs: {
              class: 'language-javascript'
            }
          }, [
            a('code', [
              a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('import')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v(' xx '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('from')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"path"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('export')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v(' xx '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), a('span', {
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
            }, [s._v('3')]), a('br')
          ])
        ]), a('p', [a('code', [s._v('export')]), s._v('命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。下面直接导出一个变量是错误的。')]), s._v(' '), a('div', {
          staticClass: 'language-JavaScript line-numbers-mode'
        }, [
          a('pre', {
            pre: !0,
            attrs: {
              class: 'language-javascript'
            }
          }, [
            a('code', [
              a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 报错')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('export')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('1')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 报错')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('var')]), s._v(' m '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('1')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('export')]), s._v(' m'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 报错')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('function')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('f')]), a('span', {
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
              }, [s._v('{')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('export')]), s._v(' f'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('//正确')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('export')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('var')]), s._v(' m '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('1')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('//正确')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('var')]), s._v(' m '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('1')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('export')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('m'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('//正确')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('var')]), s._v(' n '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [s._v('1')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('export')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('n '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('as')]), s._v(' m'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), a('span', {
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
            id: 'import'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#import'
            }
          }, [s._v('#')]), s._v(' import')
        ]), s._v(' '), a('div', {
          staticClass: 'language-javascript line-numbers-mode'
        }, [
          a('pre', {
            pre: !0,
            attrs: {
              class: 'language-javascript'
            }
          }, [
            a('code', [
              a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('import')]), s._v(' defaultExport '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('from')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"module-name"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('import')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('*')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('as')]), s._v(' name '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('from')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"module-name"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('import')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('export')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('from')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"module-name"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('import')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('export')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('as')]), s._v(' alias '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('from')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"module-name"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('import')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v(' export1 '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' export2 '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('from')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"module-name"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('import')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v(' foo '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' bar '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('from')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"module-name/path/to/specific/un-exported/file"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('import')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v(' export1 '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' export2 '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('as')]), s._v(' alias2 '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('[')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('...')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(']')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('from')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"module-name"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('import')]), s._v(' defaultExport'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('export')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('[')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('[')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('...')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(']')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(']')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('from')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"module-name"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('import')]), s._v(' defaultExport'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('*')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('as')]), s._v(' name '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('from')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"module-name"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('import')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"module-name"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// 动态导入')]), s._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('var')]), s._v(' promise '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [s._v('=')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('import')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('"module-name"')]), a('span', {
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
        ]), a('p', [s._v('直接 '), a('code', [s._v('import name from \'path\'')]), s._v(' 导入的是'), a('code', [s._v('export default')])]), s._v(' '), a('p', [s._v('默认导出和其他导出一起导入时，'), a('code', [s._v('default')]), s._v('导入必须首先声明：')]), s._v(' '), a('div', {
          staticClass: 'language-JavaScript line-numbers-mode'
        }, [
          a('pre', {
            pre: !0,
            attrs: {
              class: 'language-javascript'
            }
          }, [
            a('code', [
              a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('import')]), s._v(' myDefault'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('{')]), s._v('foo'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(',')]), s._v(' bar'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('}')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('from')]), s._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('\'/modules/my-module.js\'')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(';')]), s._v('\n\n')
            ])
          ]), s._v(' '), a('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            a('span', {
              staticClass: 'line-number'
            }, [s._v('1')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [s._v('2')]), a('br')
          ])
        ]), a('p', [a('code', [s._v('import "module-name"')]), s._v('，不导入模块中的任何内容，会运行模块中的全局代码。')]), s._v(' '), a('p', [s._v('动态导入，返回一个 promise 对象：')]), s._v(' '), a('div', {
          staticClass: 'language-JavaScript line-numbers-mode'
        }, [
          a('pre', {
            pre: !0,
            attrs: {
              class: 'language-javascript'
            }
          }, [
            a('code', [
              a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [s._v('import')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [s._v('\'/modules/my-module.js\'')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v(')')]), s._v('\n  '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [s._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [s._v('then')]), a('span', {
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
              }, [s._v('module')]), a('span', {
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
              }, [s._v('{')]), s._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [s._v('// Do something with the module.')]), s._v('\n  '), a('span', {
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
              }, [s._v(';')]), s._v('\n\n')
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
            }, [s._v('5')]), a('br')
          ])
        ]), a('h2', {
          attrs: {
            id: '参考资料'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#参考资料'
            }
          }, [s._v('#')]), s._v(' 参考资料')
        ]), s._v(' '), a('ol', [
          a('li', [
            a('p', [
              a('a', {
                attrs: {
                  href: 'http://es6.ruanyifeng.com/#docs/module',
                  target: '_blank',
                  rel: 'noopener noreferrer'
                }
              }, [s._v('es6 手册 模块'), a('OutboundLink')], 1)
            ])
          ]), s._v(' '), a('li', [
            a('p', [
              a('a', {
                attrs: {
                  href: 'https://juejin.im/post/5a2e5f0851882575d42f5609#heading-4',
                  target: '_blank',
                  rel: 'noopener noreferrer'
                }
              }, [s._v('import、require、export、module.exports 混合使用详解'), a('OutboundLink')], 1)
            ])
          ]), s._v(' '), a('li', [
            a('p', [
              a('a', {
                attrs: {
                  href: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import#%E8%AF%AD%E6%B3%95',
                  target: '_blank',
                  rel: 'noopener noreferrer'
                }
              }, [s._v('MDN import'), a('OutboundLink')], 1)
            ])
          ])
        ])
      ])}), [], !1, null, null, null)

    t.default = e.exports}
  }
])