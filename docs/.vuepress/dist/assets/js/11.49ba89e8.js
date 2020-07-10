(window.webpackJsonp = window.webpackJsonp || []).push([
  [11], {
    381: function (t, s, a) {'use strict'; a.r(s); const n = a(0); const e = Object(n.a)({}, (function () {const t = this; const s = t.$createElement; const a = t._self._c || s

      return a('ContentSlotsDistributor', {
        attrs: {
          'slot-key': t.$parent.slotKey
        }
      }, [
        a('h1', {
          attrs: {
            id: 'div宽高等比例自适应'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#div宽高等比例自适应'
            }
          }, [t._v('#')]), t._v(' div宽高等比例自适应')
        ]), t._v(' '), a('h2', {
          attrs: {
            id: '前言'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#前言'
            }
          }, [t._v('#')]), t._v(' 前言')
        ]), t._v(' '), a('p', [t._v('需要实现这样一个效果，div的宽高成比例，例如：宽:高=1:1。')]), t._v(' '), a('ol', [a('li', [t._v('当窗口宽度大于'), a('code', [t._v('500px')]), t._v('时，div宽度为'), a('code', [t._v('500px')])]), t._v(' '), a('li', [t._v('当窗口宽度小于'), a('code', [t._v('500px')]), t._v('时，div宽度自适应屏幕')])]), t._v(' '), a('p', [t._v('主要的方法有js控制、'), a('code', [t._v('padding-bottom')]), t._v('补充、vw、rem，'), a('code', [t._v('padding-bottom')]), t._v('设定为百分比时，真是一个神奇的属性。\n')]), t._v(' '), a('h2', {
          attrs: {
            id: 'js控制法'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#js控制法'
            }
          }, [t._v('#')]), t._v(' js控制法')
        ]), t._v(' '), a('p', [t._v('使用js获取元素的宽度，再将高度设置为和元素的宽度相同。')]), t._v(' '), a('div', {
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
                  }, [t._v('<')]), t._v('div')
                ]), t._v(' '), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token attr-name'
                  }
                }, [t._v('class')]), a('span', {
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
                  }, [t._v('=')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [t._v('"')]), t._v('container'), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [t._v('"')])
                ]), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v('>')])
              ]), t._v('\n    宽：高=1：1\n'), a('span', {
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
                  }, [t._v('</')]), t._v('div')
                ]), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v('>')])
              ]), t._v('\n')
            ])
          ]), t._v(' '), a('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            a('span', {
              staticClass: 'line-number'
            }, [t._v('1')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('2')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('3')]), a('br')
          ])
        ]), a('div', {
          staticClass: 'language-css line-numbers-mode'
        }, [
          a('pre', {
            pre: !0,
            attrs: {
              class: 'language-css'
            }
          }, [
            a('code', [
              a('span', {
                pre: !0,
                attrs: {
                  class: 'token selector'
                }
              }, [t._v('.container')]), t._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('max-width')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' 500px'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('background')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' yellow'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n')
            ])
          ]), t._v(' '), a('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            a('span', {
              staticClass: 'line-number'
            }, [t._v('1')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('2')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('3')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('4')]), a('br')
          ])
        ]), a('div', {
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
              }, [t._v('//调整元素宽：高=1：1')]), t._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('function')]), t._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('adjust')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('var')]), t._v(' container '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('=')]), t._v(' document'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('querySelector')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('".container"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v('\n    container'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('style'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('height '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('=')]), t._v(' container'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('clientWidth '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('+')]), t._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"px"')]), t._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token comment'
                }
              }, [t._v('//监听窗口变化事件')]), t._v('\nwindow'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('addEventListener')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"resize"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v('adjust'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v('\n')
            ])
          ]), t._v(' '), a('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            a('span', {
              staticClass: 'line-number'
            }, [t._v('1')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('2')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('3')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('4')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('5')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('6')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('7')]), a('br')
          ])
        ]), a('h2', {
          attrs: {
            id: 'padding补充法'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#padding补充法'
            }
          }, [t._v('#')]), t._v(' padding补充法')
        ]), t._v(' '), a('h3', {
          attrs: {
            id: '原理'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#原理'
            }
          }, [t._v('#')]), t._v(' 原理')
        ]), t._v(' '), a('p', [t._v('当元素的'), a('code', [t._v('padding')]), t._v('和'), a('code', [t._v('margin')]), t._v('被设置为百分比时，是相对于父元素的内容宽度'), a('code', [t._v('content-width')]), t._v('来计算的。')]), t._v(' '), a('p', [t._v('而父元素的宽度有两种情况：')]), t._v(' '), a('blockquote', [a('ol', [a('li', [t._v('当父元素设置为'), a('code', [t._v('box-sizing: content-box')]), t._v('时'), a('br'), t._v(' '), a('code', [t._v('content-width')]), t._v('='), a('code', [t._v('width')])]), t._v(' '), a('li', [t._v('当父元素设置为'), a('code', [t._v('box-sizing: border-box')]), t._v('时'), a('br'), t._v(' '), a('code', [t._v('content-width')]), t._v('='), a('code', [t._v('width')]), t._v('-'), a('code', [t._v('padding')]), t._v('-'), a('code', [t._v('border')])])])]), t._v(' '), a('h3', {
          attrs: {
            id: '实现'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#实现'
            }
          }, [t._v('#')]), t._v(' 实现')
        ]), t._v(' '), a('p', [t._v('当屏幕宽度缩小到'), a('code', [t._v('500px')]), t._v('以下时，'), a('code', [t._v('wrapper')]), t._v('宽度自适应，同时'), a('code', [t._v('container')]), t._v('宽高成'), a('code', [t._v('1：1')]), t._v('缩放。')]), t._v(' '), a('div', {
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
                  }, [t._v('<')]), t._v('div')
                ]), t._v(' '), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token attr-name'
                  }
                }, [t._v('class')]), a('span', {
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
                  }, [t._v('=')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [t._v('"')]), t._v('wrapper'), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [t._v('"')])
                ]), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v('>')])
              ]), t._v('\n    '), a('span', {
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
                  }, [t._v('<')]), t._v('div')
                ]), t._v(' '), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token attr-name'
                  }
                }, [t._v('class')]), a('span', {
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
                  }, [t._v('=')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [t._v('"')]), t._v('container'), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [t._v('"')])
                ]), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v('>')])
              ]), t._v('\n        宽：高=1：1\n    '), a('span', {
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
                  }, [t._v('</')]), t._v('div')
                ]), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v('>')])
              ]), t._v('\n'), a('span', {
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
                  }, [t._v('</')]), t._v('div')
                ]), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v('>')])
              ]), t._v('\n')
            ])
          ]), t._v(' '), a('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            a('span', {
              staticClass: 'line-number'
            }, [t._v('1')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('2')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('3')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('4')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('5')]), a('br')
          ])
        ]), a('div', {
          staticClass: 'language-css line-numbers-mode'
        }, [
          a('pre', {
            pre: !0,
            attrs: {
              class: 'language-css'
            }
          }, [
            a('code', [
              a('span', {
                pre: !0,
                attrs: {
                  class: 'token selector'
                }
              }, [t._v('.wrapper')]), t._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('max-width')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' 500px'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('margin')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' 0 auto'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token selector'
                }
              }, [t._v('.container')]), t._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('width')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' 100%'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('background')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' yellow'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('height')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' 0'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('padding-bottom')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' 100%'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n')
            ])
          ]), t._v(' '), a('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            a('span', {
              staticClass: 'line-number'
            }, [t._v('1')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('2')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('3')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('4')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('5')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('6')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('7')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('8')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('9')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('10')]), a('br')
          ])
        ]), a('h3', {
          attrs: {
            id: '存在问题'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#存在问题'
            }
          }, [t._v('#')]), t._v(' 存在问题')
        ]), t._v(' '), a('p', [t._v('当'), a('code', [t._v('container')]), t._v('内部有其他'), a('code', [t._v('item')]), t._v('，'), a('code', [t._v('item')]), t._v('的高度依赖于'), a('code', [t._v('container')]), t._v('时，因为'), a('code', [t._v('container')]), t._v('的高度为0，所以'), a('code', [t._v('item')]), t._v('的高度无法设置，这时候需要设置'), a('code', [t._v('item')]), t._v('为'), a('code', [t._v('absolute')]), t._v('。')]), t._v(' '), a('div', {
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
                  }, [t._v('<')]), t._v('div')
                ]), t._v(' '), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token attr-name'
                  }
                }, [t._v('class')]), a('span', {
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
                  }, [t._v('=')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [t._v('"')]), t._v('wrapper'), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [t._v('"')])
                ]), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v('>')])
              ]), t._v('\n    '), a('span', {
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
                  }, [t._v('<')]), t._v('div')
                ]), t._v(' '), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token attr-name'
                  }
                }, [t._v('class')]), a('span', {
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
                  }, [t._v('=')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [t._v('"')]), t._v('container'), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [t._v('"')])
                ]), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v('>')])
              ]), t._v('\n        宽：高=1：1\n        '), a('span', {
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
                  }, [t._v('<')]), t._v('div')
                ]), t._v(' '), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token attr-name'
                  }
                }, [t._v('class')]), a('span', {
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
                  }, [t._v('=')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [t._v('"')]), t._v('item'), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [t._v('"')])
                ]), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v('>')])
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
                  }, [t._v('</')]), t._v('div')
                ]), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v('>')])
              ]), t._v('\n    '), a('span', {
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
                  }, [t._v('</')]), t._v('div')
                ]), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v('>')])
              ]), t._v('\n    \n'), a('span', {
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
                  }, [t._v('</')]), t._v('div')
                ]), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v('>')])
              ]), t._v('\n')
            ])
          ]), t._v(' '), a('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            a('span', {
              staticClass: 'line-number'
            }, [t._v('1')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('2')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('3')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('4')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('5')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('6')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('7')]), a('br')
          ])
        ]), a('div', {
          staticClass: 'language-css line-numbers-mode'
        }, [
          a('pre', {
            pre: !0,
            attrs: {
              class: 'language-css'
            }
          }, [
            a('code', [
              a('span', {
                pre: !0,
                attrs: {
                  class: 'token selector'
                }
              }, [t._v('.container')]), t._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('width')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' 100%'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('height')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' 0'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('padding-bottom')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' 100%'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('background')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' yellow'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('position')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' relative'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token selector'
                }
              }, [t._v('.item')]), t._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('width')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' 100%'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('height')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' 50%'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('background')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' red'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('position')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' absolute'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n')
            ])
          ]), t._v(' '), a('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            a('span', {
              staticClass: 'line-number'
            }, [t._v('1')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('2')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('3')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('4')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('5')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('6')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('7')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('8')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('9')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('10')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('11')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('12')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('13')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('14')]), a('br')
          ])
        ]), a('blockquote', [a('p', [t._v('据W3C文档，当子元素使用'), a('code', [t._v('absolute')]), t._v('定位时，宽高设定百分比的参考量是其第一个非'), a('code', [t._v('static')]), t._v('祖先元素的'), a('code', [t._v('padding box')]), t._v('宽高，即width/height + padding')])]), t._v(' '), a('h2', {
          attrs: {
            id: '使用-vw-media'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#使用-vw-media'
            }
          }, [t._v('#')]), t._v(' 使用 vw + @media')
        ]), t._v(' '), a('p', [a('code', [t._v('vw')]), t._v('：相对于可视窗口，可视窗口被分为100'), a('code', [t._v('vw')])]), t._v(' '), a('ol', [a('li', [a('p', [t._v('当可视窗口大于'), a('code', [t._v('500px')]), t._v('时，'), a('code', [t._v('height: 500px')])])]), t._v(' '), a('li', [a('p', [t._v('当可视窗口小于'), a('code', [t._v('500px')]), t._v('时，'), a('code', [t._v('height: 100vw')])])])]), t._v(' '), a('div', {
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
                  }, [t._v('<')]), t._v('div')
                ]), t._v(' '), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token attr-name'
                  }
                }, [t._v('class')]), a('span', {
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
                  }, [t._v('=')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [t._v('"')]), t._v('container'), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [t._v('"')])
                ]), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v('>')])
              ]), t._v('\n    宽：高=1：1\n'), a('span', {
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
                  }, [t._v('</')]), t._v('div')
                ]), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v('>')])
              ]), t._v('\n')
            ])
          ]), t._v(' '), a('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            a('span', {
              staticClass: 'line-number'
            }, [t._v('1')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('2')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('3')]), a('br')
          ])
        ]), a('div', {
          staticClass: 'language-css line-numbers-mode'
        }, [
          a('pre', {
            pre: !0,
            attrs: {
              class: 'language-css'
            }
          }, [
            a('code', [
              a('span', {
                pre: !0,
                attrs: {
                  class: 'token selector'
                }
              }, [t._v('.container')]), t._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('background')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' yellow'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('max-width')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' 500px'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('height')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' 500px'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token atrule'
                }
              }, [
                a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token rule'
                  }
                }, [t._v('@media')]), t._v(' '), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v('(')]), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token property'
                  }
                }, [t._v('max-width')]), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v(':')]), t._v(' 500px'), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v(')')])
              ]), t._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token selector'
                }
              }, [t._v('.container')]), t._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n        '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('height')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' 100vw'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n')
            ])
          ]), t._v(' '), a('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            a('span', {
              staticClass: 'line-number'
            }, [t._v('1')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('2')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('3')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('4')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('5')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('6')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('7')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('8')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('9')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('10')]), a('br')
          ])
        ]), a('h2', {
          attrs: {
            id: '动态设置-rem-media'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#动态设置-rem-media'
            }
          }, [t._v('#')]), t._v(' 动态设置 rem + @media')
        ]), t._v(' '), a('p', [a('code', [t._v('rem')]), t._v('：相对于根（html）元素'), a('code', [t._v('font-size')]), t._v('值的倍数')]), t._v(' '), a('div', {
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
                  }, [t._v('<')]), t._v('div')
                ]), t._v(' '), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token attr-name'
                  }
                }, [t._v('class')]), a('span', {
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
                  }, [t._v('=')]), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [t._v('"')]), t._v('container'), a('span', {
                    pre: !0,
                    attrs: {
                      class: 'token punctuation'
                    }
                  }, [t._v('"')])
                ]), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v('>')])
              ]), t._v('\n    宽：高=1：1\n'), a('span', {
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
                  }, [t._v('</')]), t._v('div')
                ]), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v('>')])
              ]), t._v('\n')
            ])
          ]), t._v(' '), a('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            a('span', {
              staticClass: 'line-number'
            }, [t._v('1')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('2')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('3')]), a('br')
          ])
        ]), a('div', {
          staticClass: 'language-css line-numbers-mode'
        }, [
          a('pre', {
            pre: !0,
            attrs: {
              class: 'language-css'
            }
          }, [
            a('code', [
              a('span', {
                pre: !0,
                attrs: {
                  class: 'token selector'
                }
              }, [t._v('.container')]), t._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('background')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' yellow'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('max-width')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' 500px'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('height')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' 500px'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token atrule'
                }
              }, [
                a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token rule'
                  }
                }, [t._v('@media')]), t._v(' '), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v('(')]), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token property'
                  }
                }, [t._v('max-width')]), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v(':')]), t._v(' 500px'), a('span', {
                  pre: !0,
                  attrs: {
                    class: 'token punctuation'
                  }
                }, [t._v(')')])
              ]), t._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token selector'
                }
              }, [t._v('.container')]), t._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n        '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token property'
                }
              }, [t._v('height')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(':')]), t._v(' 5rem'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(';')]), t._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\n')
            ])
          ]), t._v(' '), a('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            a('span', {
              staticClass: 'line-number'
            }, [t._v('1')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('2')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('3')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('4')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('5')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('6')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('7')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('8')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('9')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('10')]), a('br')
          ])
        ]), a('div', {
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
              }, [t._v('//设置html元素的font-size=可视窗口/5')]), t._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('function')]), t._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('setRootFontSize')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('{')]), t._v('\n    '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token keyword'
                }
              }, [t._v('var')]), t._v(' width '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('=')]), t._v(' document'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('documentElement'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('clientWidth '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('||')]), t._v('document'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('body'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('clientWidth\n    document'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('documentElement'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('style'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), t._v('fontSize '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('=')]), t._v(' width '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('/')]), t._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token number'
                }
              }, [t._v('5')]), t._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [t._v('+')]), t._v(' '), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"px"')]), t._v('\n'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('}')]), t._v('\nwindow'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('.')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token function'
                }
              }, [t._v('addEventListener')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v('(')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token string'
                }
              }, [t._v('"resize"')]), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(',')]), t._v(' setRootFontSize'), a('span', {
                pre: !0,
                attrs: {
                  class: 'token punctuation'
                }
              }, [t._v(')')]), t._v('\n')
            ])
          ]), t._v(' '), a('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            a('span', {
              staticClass: 'line-number'
            }, [t._v('1')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('2')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('3')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('4')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('5')]), a('br'), a('span', {
              staticClass: 'line-number'
            }, [t._v('6')]), a('br')
          ])
        ]), a('h2', {
          attrs: {
            id: '总结'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#总结'
            }
          }, [t._v('#')]), t._v(' 总结')
        ]), t._v(' '), a('ol', [a('li', [a('p', [t._v('js控制法直接明了，并且很简单，但有时会不太想使用js。')])]), t._v(' '), a('li', [a('p', [t._v('用padding补充的话，如果内部有元素高度设为百分比，需要对内部元素使用绝对定位，并且需要一个父元素。')])]), t._v(' '), a('li', [a('p', [t._v('使用vw，是很好的方法，现在兼容性也不错。')])]), t._v(' '), a('li', [a('p', [t._v('动态设定rem的话，如果只是单单用在这上面就显得有点麻烦了，rem现在也是移动端布局的主流方法，如果本身就使用的rem布局，这个方法也很好。')])]), t._v(' '), a('li', [a('p', [t._v('如果想兼容IE8（包括）以下，那么vw和rem都不能使用，同时vw、vh、vmin、vmax在IE9以上也只是支持部分。')])])]), t._v(' '), a('h2', {
          attrs: {
            id: '拓展：padding-bottom（或padding-top）的其他用处'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#拓展：padding-bottom（或padding-top）的其他用处'
            }
          }, [t._v('#')]), t._v(' 拓展：padding-bottom（或padding-top）的其他用处')
        ]), t._v(' '), a('p', [t._v('如果有一张背景图，其在pc端显示为'), a('code', [t._v('1000 * 400px')]), t._v('，我们想让它在屏幕缩小时逐渐显示为'), a('code', [t._v('400 * 200px')]), t._v('，如果使用等比缩放的方式，显然不成立。')]), t._v(' '), a('p', [t._v('这时候就可以使用padding-bottom来补充差距。')]), t._v(' '), a('p', [
          t._v('参考：'), a('a', {
            attrs: {
              href: 'https://juejin.im/post/5ade866051882567370604a2',
              target: '_blank',
              rel: 'noopener noreferrer'
            }
          }, [t._v('移动端-图片及背景图的缩放     '), a('OutboundLink')], 1)
        ]), t._v(' '), a('h2', {
          attrs: {
            id: '参考文献'
          }
        }, [
          a('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#参考文献'
            }
          }, [t._v('#')]), t._v(' 参考文献')
        ]), t._v(' '), a('ol', [
          a('li', [
            a('a', {
              attrs: {
                href: 'https://juejin.im/post/5b0784566fb9a07abd0e14ae',
                target: '_blank',
                rel: 'noopener noreferrer'
              }
            }, [t._v('CSS实现宽高等比例自适应矩形'), a('OutboundLink')], 1)
          ]), t._v(' '), a('li', [
            a('a', {
              attrs: {
                href: 'https://juejin.im/post/5ade866051882567370604a2',
                target: '_blank',
                rel: 'noopener noreferrer'
              }
            }, [t._v('移动端-图片及背景图的缩放'), a('OutboundLink')], 1)
          ])
        ])
      ])}), [], !1, null, null, null)

    s.default = e.exports}
  }
])