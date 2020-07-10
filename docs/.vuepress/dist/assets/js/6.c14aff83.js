(window.webpackJsonp = window.webpackJsonp || []).push([
  [6], {
    377: function (e, t, s) {'use strict'; s.r(t); const a = s(0); const n = Object(a.a)({}, (function () {const e = this; const t = e.$createElement; const s = e._self._c || t

      return s('ContentSlotsDistributor', {
        attrs: {
          'slot-key': e.$parent.slotKey
        }
      }, [
        s('h1', {
          attrs: {
            id: 'node-与-npm'
          }
        }, [
          s('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#node-与-npm'
            }
          }, [e._v('#')]), e._v(' node 与 npm')
        ]), e._v(' '), s('h2', {
          attrs: {
            id: '一-下载'
          }
        }, [
          s('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#一-下载'
            }
          }, [e._v('#')]), e._v(' 一 下载')
        ]), e._v(' '), s('p', [
          e._v('打开'), s('a', {
            attrs: {
              href: 'https://nodejs.org/en/download/',
              target: '_blank',
              rel: 'noopener noreferrer'
            }
          }, [e._v('node 官网下载链接'), s('OutboundLink')], 1), e._v('，下载自己需要的 node 安装包，由于我的电脑是 Windows，所以我下载的是 windows 下的安装包\n'), s('img', {
            attrs: {
              src: 'https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1560931065098.png',
              alt: ''
            }
          })
        ]), e._v(' '), s('h2', {
          attrs: {
            id: '二-安装'
          }
        }, [
          s('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#二-安装'
            }
          }, [e._v('#')]), e._v(' 二 安装')
        ]), e._v(' '), s('p', [e._v('一路点是，安装到自己需要的目录，这里我安装的目录是'), s('code', [e._v('F:\\My development tools\\node')]), e._v('，在安装过程中，程序会自动为你配置环境变量。')]), e._v(' '), s('p', [e._v('如果没有自动配置环境变量，可以手动在'), s('code', [e._v('path')]), e._v('中添加'), s('code', [e._v('F:\\My development tools\\node')])]), e._v(' '), s('p', [
          e._v('安装完后，打开'), s('code', [e._v('cmd')]), e._v('，输入'), s('code', [e._v('node -v')]), e._v(','), s('code', [e._v('npm -v')]), e._v(',如果出现对应的版本信息，安装成功：\n'), s('img', {
            attrs: {
              src: 'https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1560933415483.png',
              alt: ''
            }
          })
        ]), e._v(' '), s('h2', {
          attrs: {
            id: '三-自定义全局包安装路径'
          }
        }, [
          s('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#三-自定义全局包安装路径'
            }
          }, [e._v('#')]), e._v(' 三 自定义全局包安装路径')
        ]), e._v(' '), s('p', [e._v('默认情况下，使用'), s('code', [e._v('npm install 包名 -g')]), e._v('全局安装的包在'), s('code', [e._v('C:\\Users\\Administrator\\AppData\\Roaming\\npm')]), e._v('目录下，这样会占据 C 盘的空间，通过自定义全局包安装路径可以更改全局包的默认安装位置。')]), e._v(' '), s('ol', [
          s('li', [
            e._v('首先在 node 安装目录下创建两个文件夹：'), s('code', [e._v('node_cahe')]), e._v('、'), s('code', [e._v('node_global')]), e._v(' '), s('img', {
              attrs: {
                src: 'https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1560933933165.png',
                alt: ''
              }
            })
          ]), e._v(' '), s('li', [e._v('打开 cmd 输入')])
        ]), e._v(' '), s('div', {
          staticClass: 'language-lsl line-numbers-mode'
        }, [
          s('pre', {
            pre: !0,
            attrs: {
              class: 'language-text'
            }
          }, [s('code', [e._v('npm config set prefix "F:\\My development tools\\node\\node_global"\nnpm config set cache "F:\\My development tools\\node\\node_cache"\n')])]), e._v(' '), s('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            s('span', {
              staticClass: 'line-number'
            }, [e._v('1')]), s('br'), s('span', {
              staticClass: 'line-number'
            }, [e._v('2')]), s('br')
          ])
        ]), s('p', [e._v('设置完毕后可以使用'), s('code', [e._v('npm config list')]), e._v('查看设置是否成功。')]), e._v(' '), s('p', [e._v('如果出现 npm 命令卡死的情况，可以删除'), s('code', [e._v('C:\\Users\\{账户}\\.npmrc')]), e._v('文件。')]), e._v(' '), s('ol', {
          attrs: {
            start: '3'
          }
        }, [
          s('li', [
            e._v('打开系统的环境配置页面，'), s('code', [e._v('我的电脑-属性-高级系统设置-系统属性-环境变量')]), e._v(' '), s('img', {
              attrs: {
                src: 'https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1560931065120.png',
                alt: ''
              }
            })
          ]), e._v(' '), s('li', [e._v('在系统变量下新建一个'), s('code', [e._v('NODE_PATH')]), e._v('，输入'), s('code', [e._v('F:\\My development tools\\nodejs\\node_global\\node_modules')])]), e._v(' '), s('li', [e._v('将用户变量 Path 默认的'), s('code', [e._v('C:\\Users\\Administrator\\AppData\\Roaming\\npm')]), e._v('修改为'), s('code', [e._v('F:\\My development tools\\nodejs\\node_global')])]), e._v(' '), s('li', [
            e._v('配置完成后，安装一个全局模块进行测试，例如：'), s('code', [e._v('npm install express -g')]), e._v('，可以看到'), s('code', [e._v('express')]), e._v('模块已经安装在了目录'), s('code', [e._v('F:\\My development tools\\node\\node_global\\node_modules')]), e._v('下\n'), s('img', {
              attrs: {
                src: 'https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1560933710046.png',
                alt: 'enter description here'
              }
            })
          ])
        ]), e._v(' '), s('h2', {
          attrs: {
            id: '四-安装-cnpm'
          }
        }, [
          s('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#四-安装-cnpm'
            }
          }, [e._v('#')]), e._v(' 四 安装 cnpm')
        ]), e._v(' '), s('ol', [s('li', [e._v('安装命令，通过 cnpm 使用')])]), e._v(' '), s('div', {
          staticClass: 'language-tcl line-numbers-mode'
        }, [
          s('pre', {
            pre: !0,
            attrs: {
              class: 'language-tcl'
            }
          }, [
            s('code', [
              e._v('npm install '), s('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [e._v('-')]), e._v('g cnpm '), s('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [e._v('-')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [e._v('-')]), e._v('registry=https:'), s('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [e._v('/')]), s('span', {
                pre: !0,
                attrs: {
                  class: 'token operator'
                }
              }, [e._v('/')]), e._v('registry.npm.taobao.org\n')
            ])
          ]), e._v(' '), s('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            s('span', {
              staticClass: 'line-number'
            }, [e._v('1')]), s('br')
          ])
        ]), s('ol', {
          attrs: {
            start: '2'
          }
        }, [s('li', [e._v('添加环境变量')])]), e._v(' '), s('p', [
          e._v('经过上面的配置，'), s('code', [e._v('cnpm')]), e._v('会被安装到'), s('code', [e._v('F:\\My development tools\\node\\node_global')]), e._v('目录下，所以需要对'), s('code', [e._v('cnpm')]), e._v('进行环境变量的配置，用户变量'), s('code', [e._v('Path')]), e._v('添加'), s('code', [e._v('F:\\My development tools\\node\\node_global')]), e._v('（即 cnpm 脚本的地址）\n'), s('img', {
            attrs: {
              src: 'https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1560933710146.png',
              alt: ''
            }
          })
        ]), e._v(' '), s('h2', {
          attrs: {
            id: '五-npm-常用命令'
          }
        }, [
          s('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#五-npm-常用命令'
            }
          }, [e._v('#')]), e._v(' 五 npm 常用命令')
        ]), e._v(' '), s('h3', {
          attrs: {
            id: '_1-安装'
          }
        }, [
          s('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#_1-安装'
            }
          }, [e._v('#')]), e._v(' 1. 安装')
        ]), e._v(' '), s('div', {
          staticClass: 'language- line-numbers-mode'
        }, [
          s('pre', {
            pre: !0,
            attrs: {
              class: 'language-text'
            }
          }, [s('code', [e._v('npm install [<name><version>][-g]/[--save][-dev]\n')])]), e._v(' '), s('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            s('span', {
              staticClass: 'line-number'
            }, [e._v('1')]), s('br')
          ])
        ]), s('h3', {
          attrs: {
            id: '_2-更新'
          }
        }, [
          s('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#_2-更新'
            }
          }, [e._v('#')]), e._v(' 2. 更新')
        ]), e._v(' '), s('div', {
          staticClass: 'language- line-numbers-mode'
        }, [
          s('pre', {
            pre: !0,
            attrs: {
              class: 'language-text'
            }
          }, [s('code', [e._v('npm update [<name><version>][-g]/[--save][-dev]\n')])]), e._v(' '), s('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            s('span', {
              staticClass: 'line-number'
            }, [e._v('1')]), s('br')
          ])
        ]), s('h3', {
          attrs: {
            id: '_3-卸载'
          }
        }, [
          s('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#_3-卸载'
            }
          }, [e._v('#')]), e._v(' 3. 卸载')
        ]), e._v(' '), s('div', {
          staticClass: 'language- line-numbers-mode'
        }, [
          s('pre', {
            pre: !0,
            attrs: {
              class: 'language-text'
            }
          }, [s('code', [e._v('npm uninstall [<name><version>][-g]/[--save][-dev]\n')])]), e._v(' '), s('div', {
            staticClass: 'line-numbers-wrapper'
          }, [
            s('span', {
              staticClass: 'line-number'
            }, [e._v('1')]), s('br')
          ])
        ]), s('h3', {
          attrs: {
            id: '_4-save-和-save-dev-的区别'
          }
        }, [
          s('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#_4-save-和-save-dev-的区别'
            }
          }, [e._v('#')]), e._v(' 4. --save 和--save-dev 的区别')
        ]), e._v(' '), s('ol', [s('li', [s('code', [e._v('-save(-S)')])])]), e._v(' '), s('ul', [s('li', [e._v('会将模块依赖写入 dependencies 节点。')]), e._v(' '), s('li', [e._v('运行 npm install 初始化项目时，会将模块下载到项目目录下。')]), e._v(' '), s('li', [e._v('运行 npm install --production 或者注明 NODE_ENV 变量值为 production 时，会自动下载模块到 node_modules 目录中。')])]), e._v(' '), s('ol', {
          attrs: {
            start: '2'
          }
        }, [s('li', [s('code', [e._v('--save-dev(-D)')])])]), e._v(' '), s('ul', [s('li', [e._v('会将模块依赖写入 dependencies 节点。')]), e._v(' '), s('li', [e._v('运行 npm install 初始化项目时，会将模块下载到项目目录下。')]), e._v(' '), s('li', [e._v('运行 npm install --production 或者注明 NODE_ENV 变量值为 production 时，不会自动下载模块到 node_modules 目录中。')])]), e._v(' '), s('ol', {
          attrs: {
            start: '3'
          }
        }, [s('li', [e._v('总结')])]), e._v(' '), s('ul', [s('li', [e._v('-D 安装的模块是开发时需要的，但在部署（生产环境）不需要，例如：压缩 css、js 的模块。')]), e._v(' '), s('li', [e._v('-S 安装的模块开发生产环境都需要。')])]), e._v(' '), s('h2', {
          attrs: {
            id: 'git-更改-windows-下默认编辑器'
          }
        }, [
          s('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#git-更改-windows-下默认编辑器'
            }
          }, [e._v('#')]), e._v(' git 更改 Windows 下默认编辑器')
        ]), e._v(' '), s('p', [e._v('在 git commit --amend 时，会通过编辑器打开提交信息的文件，可以通过命令修改默认编辑器。')]), e._v(' '), s('p', [s('code', [e._v('git config --global core.editor "D:/\'My development tools\'/\'Microsoft VS Code\'/Code.exe" --wait')])]), e._v(' '), s('p', [e._v('路径中有空格时，需要使用\'\'。')]), e._v(' '), s('p', [e._v('使用'), s('code', [e._v('git config --list')]), e._v('，可以查看配置。')]), e._v(' '), s('p', [e._v('删除全局配置：')]), e._v(' '), s('p', [e._v('core.editord 的值可以配置多个，删除多个时：\n'), s('code', [e._v('git config --global --unset-all core.editor')])]), e._v(' '), s('p', [e._v('删除一个时\n'), s('code', [e._v('git config --global --unset core.editor')])]), e._v(' '), s('h2', {
          attrs: {
            id: 'git-配置-ssh'
          }
        }, [
          s('a', {
            staticClass: 'header-anchor',
            attrs: {
              href: '#git-配置-ssh'
            }
          }, [e._v('#')]), e._v(' git 配置 ssh')
        ]), e._v(' '), s('p', [e._v('生成密钥：'), s('code', [e._v('ssh-keygen -t rsa -C "邮箱"')])]), e._v(' '), s('p', [e._v('C 盘：'), s('code', [e._v('C:\\Users\\{用户}\\.ssh')]), e._v(' 下，将'), s('code', [e._v('id_rsa.pub')]), e._v('文件中复制到 GitHub 网站个人用户 ssh keys 处')]), e._v(' '), s('p', [e._v('六 参考文献')]), e._v(' '), s('ol', [
          s('li', [
            s('a', {
              attrs: {
                href: 'https://www.cnblogs.com/zhouyu2017/p/6485265.html',
                target: '_blank',
                rel: 'noopener noreferrer'
              }
            }, [e._v('Node.js 安装及环境配置之 Windows 篇'), s('OutboundLink')], 1)
          ]), e._v(' '), s('li', [
            s('a', {
              attrs: {
                href: 'https://www.cnblogs.com/limitcode/p/7906447.html',
                target: '_blank',
                rel: 'noopener noreferrer'
              }
            }, [e._v('NPM install -save 和 -save-dev 傻傻分不清'), s('OutboundLink')], 1)
          ]), e._v(' '), s('li', [
            s('a', {
              attrs: {
                href: 'https://www.jianshu.com/p/7ea13d57638b',
                target: '_blank',
                rel: 'noopener noreferrer'
              }
            }, [e._v('npm 常用命令'), s('OutboundLink')], 1)
          ]), e._v(' '), s('li', [
            s('a', {
              attrs: {
                href: 'https://www.jianshu.com/p/96d7558e643b',
                target: '_blank',
                rel: 'noopener noreferrer'
              }
            }, [e._v('安装 cnpm （npm 淘宝镜像）'), s('OutboundLink')], 1)
          ])
        ])
      ])}), [], !1, null, null, null)

    t.default = n.exports}
  }
])