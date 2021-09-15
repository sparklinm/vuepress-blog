---
meta:
    - title: taro插件添加唯一id
      time: 2021-02-18 14:24:39
      tag: taro,html,parser,babel,微信小程序
---

::: v-pre

# taro 插件添加唯一 id

## 前言

最近做的小程序可回溯工具需要支持 `taro`, 为了实现可回溯，需要给每一个节点加上 `id`, 也就是**需要编写一个 taro 插件，在编译时动态为每一个节点添加 id**。

<!-- more -->

## taro3 插件

taro 插件的编写，官方已经给好了[文档](https://taro-docs.jd.com/taro/docs/plugin#%E5%A6%82%E4%BD%95%E7%BC%96%E5%86%99%E4%B8%80%E4%B8%AA%E6%8F%92%E4%BB%B6)。

编译过程会触发以下几个钩子：

-   `ctx.onBuildStart(() => viod)`，编译开始，接收一个回调函数
-   `ctx.modifyWebpackChain(args: { chain: any }) => void)`，编译中修改 webpack 配置，在这个钩子中，你可以对 webpackChain 作出想要的调整，等同于配置 webpackChain
-   `ctx.modifyBuildAssets(args: { assets: any }) => void)`，修改编译后的结果
-   `ctx.modifyBuildTempFileContent(args: { tempFiles: any }) => void)`，修改编译过程中的中间文件，例如修改 app 或页面的 config 配置
-   `ctx.onBuildFinish(() => viod)`，编译结束，接收一个回调函数

`ctx.modifyBuildTempFileContent` 可以修改编译过程中的中间文件，试了一下：

```js
module.exports = (ctx) => {
    ctx.modifyBuildTempFileContent(({ tempFiles }) => {
        console.log(tempFilest);
    });
};
```

却发现这个钩子根本不会触发。查了下资料，才发现 **modifyBuildTempFileContent 已经在 taro3 移除掉了**。

既然如此，只有试试 modifyBuildAssets 钩子了：

```js
module.exports = (ctx) => {
    ctx.modifyBuildAssets(({ assets }) => {
        console.log(assets);
        // 输出一个数组
        // 可以获得文件路径和文件内容

        Object.keys(assets).forEach((src) => {
            if (src.endsWith('.wxml')) {
                console.log('转换的文件', src);

                // source() 函数可以获得文件内容
                // 原生组件为 buffer 对象，需要 toString
                const source = wxml[src].source().toString();

                // parserXML 添加id
                const domStr = parserXML(source);

                // 覆写source函数
                wxml[src].source = function () {
                    return domStr;
                };
            }
        });
    });
};
```

因为要添加 `id`，就要涉及到将 `dom` 解析为 `ast` 树，这里选择了 `htmlparser2`，简单封装一下：

```js
let { Parser, DomHandler } = require('htmlparser2');

function parserDomStr(domStr) {
    if (!domStr) {
        return;
    }

    const handler = new DomHandler(
        (err, dom) => {
            if (err) {
                console.error(`XML错误:${domStr}`);
            }
        },
        {
            normalizeWhitespace: false // default:false
        }
    );

    const parser = new Parser(handler, {
        xmlMode: true // forgiving html parser
    });

    parser.write(domStr);

    parser.end();

    return handler.dom;
}
```

再遍历 `ast` 树，添加 `id` 属性：

```js
function rewrite(dom) {
    dom.forEach((v) => {
        if (v.attribs) {
            // 如果原先不存在id，则注入ID
            if (!v.attribs.id) {
                v.attribs.id = `rr-hijack-${v.name}-${Math.floor(Math.random() * 100000)}`;
            }
        }

        if (v.children) {
            rewrite(v.children);
        }
    });
}
```

修改 `ast` 树后，重新序列化为 `dom` 字符串：

```js
let domSerializer = require('dom-serializer');

function parserXML(domStr) {
    if (typeof domStr !== 'string') {
        throw new Error('arguments error');
    }

    let dom = parserDomStr(domStr);

    rewrite(dom);

    return domSerializer(dom, {
        xmlMode: true,
        decodeEntities: false
    });
}
```

原以为这样就结束了，但实际拿项目试验的时候却发现有一些节点没有注入 `id`。

## taro3 编译

`taro3` 的编译结果大致分为以下三种情况：

1.  所有用 `taro` 语法（就是 `vue`, `react` 等非原生小程序语法）写的**组件和页面**最终都会编译到一个基础组件文件 `base.wxml` 中，具体的页面是引入 `base.wxml` 中的基础组件。

    ```jsx
    // 编译前
    export default class {
        render() {
            //ec-canvas 是一个原生小程序组件
            return <View>主页</View>;
        }
    }
    ```

    ```html
    <!--编译后  -->

    <!-- home -->
    <import src="../../base.wxml" />
    <template is="taro_tmpl" data="{{root:root}}" />

    <!--base.wxml  -->
    <template name="taro_tmpl">
        <block wx:for="{{root.cn}}" wx:key="uid">
            <template is="tmpl_0_container" data="{{i:item,l:''}}" />
        </block>
    </template>

    <template name="tmpl_0_container">
        <template is="{{xs.a(0, i.nn, l)}}" data="{{i:i,cid:0,l:xs.f(l,i.nn)}}" />
    </template>

    <template name="tmpl_0_view">
        <view
            hover-class="{{xs.b(i.hoverClass,'none')}}"
            hover-stop-propagation="{{xs.b(i.hoverStopPropagation,false)}}"
            hover-start-time="{{xs.b(i.hoverStartTime,50)}}"
            hover-stay-time="{{xs.b(i.hoverStayTime,400)}}"
            animation="{{i.animation}}"
            bindanimationstart="eh"
            bindanimationiteration="eh"
            bindanimationend="eh"
            bindtransitionend="eh"
            bindtouchstart="eh"
            bindtouchmove="eh"
            bindtouchend="eh"
            bindtouchcancel="eh"
            bindlongpress="eh"
            style="{{i.st}}"
            class="{{i.cl}}"
            bindtap="eh"
            id="{{i.uid}}"
        >
            <block wx:for="{{i.cn}}" wx:key="uid" wx:for-index="index_rr_0_">
                <template is="{{xs.e(cid+1)}}" data="{{i:item,l:l}}" />
            </block>
        </view>
    </template>

    <!-- 更多模板 -->
    ```

2.  原生小程序组件不会编译到 `base.wxml` 中去。

    ```jsx
    // 编译前
    export default class {
        render() {
            //ec-canvas 是一个原生小程序组件
            return (
                <View className='echarts'>
                    <ec-canvas id='mychart-dom-area' canvas-id='mychart-area' ec={this.state.ec}></ec-canvas>
                </View>
            );
        }
    }
    ```

    ```html
    <!-- 编译后 -->

    <!-- ec-canvas.wxml 组件 -->
    <!-- 省略编译后的内容 -->

    <!-- base.wxml -->
    <template name="tmpl_0_ec-canvas">
        <ec-canvas id="{{i.id}}" ec="{{i.ec}}" id="{{i.uid}}">
            <block wx:for="{{i.cn}}" wx:key="uid">
                <template is="tmpl_1_container" data="{{i:item,l:l}}" />
            </block>
        </ec-canvas>
    </template>
    ```

3.  原生小程序页面也不会编译到 `base.wxml` 中去

    ```html
    <!-- 原生小程序页面 -->
    <!-- 编译前和编译后一致 native.wxml -->
    <view class="native" bindtap="viewTap">
        <text>{{text}}{{x}}</text>
    </view>

    <com-panel />
    ```

在查看编译后的文件时，发现 `taro3` 已经会给 `base.wxml` 中的每一个节点注入 `id` 了，具体可以分为以下两种情况：

1. 如果节点本身没有 `id`，会注入一个 `id="{{c.id}}"`。
2. 如果节点本身有 `id`，会注入 `id="{{c.id}}" id ="{{c.uid}}"`，当然 `c.id` 会没有值，`c.uid` 就是节点本身的 `id`。

**但如果是混合开发，taro3 并不会给原生小程序页面和原生小程序组件添加 id。**

## 修改 htmlparser2

`htmlparser2` 不处理重复的属性，如果节点拥有重复的属性，那后面的相同的属性会被忽略：

```html
<input id="{{c.id}}" id="{{c.uid}}" />

<!-- htmlparser2 转换后 -->
<input id="{{c.id}}" />
```

当使用 `htmlparser2` 处理 `taro3` 编译后的文件时会出现 `id` 缺失的问题。

所以需要修改 `htmlparser2`，来让它支持重复属性。具体可以串查看[htmlparser2 对重复属性解析](./htmlparser2对重复属性解析.md)。

修改后，`attribs` 会变成一个数组，所以 `rewrite` 函数也要作修改：

```js
// 快捷操作attribs
class HandleAttribs {
    constructor(attribs) {
        this.attribs = attribs || [];
    }

    get(key) {
        let value;
        this.attribs.some((item) => {
            if (item[key]) {
                value = item[key];
            }
            return item[key];
        });

        return value;
    }

    delete(key) {
        const index = this.attribs.findIndex((item) => item[key]);

        if (index > -1) {
            this.attribs.splice(index, 1);
        }
    }

    push(obj) {
        this.attribs.push(obj);
    }

    set(key, value) {
        this.attribs.push({
            [key]: value
        });
    }
}

function rewrite(dom) {
    dom.forEach((v) => {
        const attribs = v.attribs;
        if (attribs) {
            const attrs = new HandleAttribs(attribs);

            // 为每个节点注入ID
            if (!attrs.get('id')) {
                const obj = {
                    id: `wxa-hijack-${v.name}-${Math.floor(Math.random() * 100000)}`
                };

                attrs.push(obj);
            }
        }

        if (v.children) {
            rewrite(v.children);
        }
    });
}
```

## 循环组件

对 `htmlparser2` 的修改解决了 `base.wxml` 中重复 `id` 属性不能正常解析的问题。

但在原生小程序组件和页面中，对于循环嵌套的组件，要想添加一个唯一 `id`，这个 `id` 还必须依赖于循环本身。

例如下面，`id` 依赖循环的 `index`：

```html
<view wx:for="{{forms}}" wx:for-index="index1">
    <view wx:for="{{item.children}}" wx:for-index="index2">
        <view wx:for="{{item.children}}" wx:for-index="index3">
            <com-input id="{{`_rr_id_${index1}-${index2}-${index2}`}}" wx:key="*this"> </com-input>
        </view>
    </view>
</view>
```

在 `rewrite` 函数中，我们遍历了 `dom` 树，这是一个深度遍历，遍历到叶子节点时会回溯到上一层，所以只需在**进入 wx:for 时存储 index，回溯到 wx:for 时删除最近存储的 index，就能得到上层所有 index 的集合**。

```js
// 存储上层index的栈
const indexs = [];
// 存储旧index的栈
const oIndexs = [];
// 存储wx:for节点的栈
const roots = [];
// wx:for 嵌套深度
let deep = 0;

function rewrite(dom) {
    dom.forEach((v) => {
        const attribs = v.attribs;
        if (attribs) {
            const attrs = new HandleAttribs(attribs);

            if (attrs.get('wx:for')) {
                if (attrs.get('wx:for-index')) {
                    const index = attrs.get('wx:for-index');
                    indexs.push(index);
                    oIndexs.push(index);
                } else {
                    const index = `index_rr_${deep}_`;
                    // 设置 wx:for-index
                    attrs.set('wx:for-index', index);
                    indexs.push(index);
                    oIndexs.push('index');
                }
                roots.push(v);
                deep++;
            }

            // 为每个节点注入ID
            if (
                !attrs.get('id') &&
            ) {
                const obj = {
                    id: `wxa-hijack-${v.name}-${Math.floor(
                        Math.random() * 100000
                    )}`
                };

                // id依赖于嵌套的 wx:for 的 index
                const str = indexs.map((item) => `{{${item}}}`).join('-');
                if (str) {
                    obj.id += `-${str}`;
                }

                attrs.push(obj);
            }
        }

        if (v.children) {
            rewrite(v.children);
        }

        // 回溯到wx:for节点
        if (v === roots[roots.length - 1]) {
            indexs.pop();
            oIndexs.pop();
            roots.pop();
            deep--;
        }
    });
}
```

可以看到为了存储嵌套循环的 `index`，我们主动设置了 `wx:for-index`，那么模板语法（`{{}}`）中的 `index` 也应该被替换。

```html
<!-- 修改前 -->
<view wx:for="{{forms}}" wx:for-index="index1">
    <view wx:for="{{item.children}}">
        {{index}}
        <view wx:for="{{item.children}}" wx:for-index="index3">
            <com-input wx:key="*this"> </com-input>
        </view>
    </view>
</view>

<!-- 修改后 -->
<view wx:for="{{forms}}" wx:for-index="index1">
    <view wx:for="{{item.children}}" wx:for-index="index2">
        {{index2}}
        <view wx:for="{{item.children}}" wx:for-index="index3">
            <com-input wx:key="*this" id="{{`_rr_id_${index1}-${index2}-${index2}`}}"> </com-input>
        </view>
    </view>
</view>
```

`{{}}` 中的语法本质上是一串 js 代码，可以使用[@babel/parser](https://babeljs.io/docs/en/babel-parser)来将 `js` 代码解析为 `ast` 树，遍历 `ast` 树修改指定节点。具体查看[babel-parser 解析 js](./babel-parser解析js.md)。

```js
const { parse } = require('@babel/parser');
const generate = require('@babel/generator').default;
const traverse = require('@babel/traverse').default;

// 解析获得 `{{}}` 中的表达式
// 匹配第一个不在引号之间的{{和第一个不在引号之间的}}
// 它们之间的内容就是表达式中的内容
function getExpression(content) {
    let isSingleQuotes = false;
    let isDoubleQuotes = false;
    let isTemplateStr = false;
    const singleQuotes = "'";
    const doubleQuotes = '"';
    const templateStr = '`';

    const canStart = (open) => open === '{{' && !isSingleQuotes && !isDoubleQuotes && !isTemplateStr;
    const canEnd = (close) => close === '}}' && !isSingleQuotes && !isDoubleQuotes && !isTemplateStr;

    const isQuotes = function (s) {
        return [singleQuotes, doubleQuotes, templateStr].includes(s);
    };

    const expressions = [];
    let current = '';
    let isExpression = false;

    for (let i = 0; i < content.length; i++) {
        const c = content[i];
        const n = content[i + 1];

        if (c === '\\' && isQuotes(n)) {
            i++;
            if (isExpression) {
                current += c + n;
            }
            continue;
        } else if (c === singleQuotes) {
            isSingleQuotes = !isSingleQuotes;
        } else if (c === doubleQuotes) {
            isDoubleQuotes = !isDoubleQuotes;
        } else if (c === templateStr) {
            isTemplateStr = !isTemplateStr;
        } else if (canStart(c + n)) {
            isExpression = true;
            i++;
            continue;
        } else if (canEnd(c + n)) {
            expressions.push(current);
            current = '';
            isExpression = false;
            i++;
        }

        if (isExpression) {
            current += c;
        }
    }

    return expressions;
}

/**
 * 替换js表达式中的[index]
 * @param {string} expression js表达式
 * @param {array} nIndexs 嵌套wx:for的index集合
 * @param {array} oIndexs 原先嵌套wx:for的index集合
 */
function replaceExpression(expression, nIndexs, oIndexs) {
    if (!nIndexs || !nIndexs.length) {
        return;
    }

    // ast树
    const ast = parse(expression);

    try {
        traverse(ast, {
            enter(path) {
                // 是对象属性时跳过该节点
                if (path.isMemberExpression() && !path.node.computed) {
                    path.skip();
                }

                const lowerIndexs = [];
                for (let i = nIndexs.length - 1; i >= 0; i--) {
                    const nIndex = nIndexs[i];
                    const oIndex = oIndexs[i];
                    if (nIndex !== oIndex && !lowerIndexs.includes(nIndex)) {
                        // 类型是identifier，且变量名是[oIndex]
                        if (path.isIdentifier({ name: oIndex })) {
                            path.node.name = nIndex;
                        }
                    }
                    lowerIndexs.push(nIndex);
                }
            }
        });
    } catch (error) {
        console.error(`表达式${expression}解析出错`);
    }

    // 输出时，不能有空行
    // 否则小程序将解析失败
    return generate(ast, { compact: true }).code.slice(0, -1);
}

function handleExpression(text, nIndexs, oIndexs) {
    if (!text || !nIndexs || !nIndexs.length) {
        return text;
    }
    const expressions = getExpression(text);

    if (!expressions.length) {
        return text;
    }

    expressions.forEach((expression) => {
        const exp = replaceExpression(expression, nIndexs, oIndexs);

        // exp 中不要带 $
        // 在 replace 函数中，替代字符串中的 $ 有特殊含义
        text = text.replace(expression, exp);
    });

    return text;
}

module.exports = {
    handleExpression
};
```

修改 `rewrite` 函数，对所有属性和文本内容都进行表达式处理：

```js
attribs.forEach((attr) => {
    const key = Object.keys(attr)[0];
    attr[key] = handleExpression(attr[key], indexs, oIndexs);
});

if (v.type === 'text') {
    v.data = handleExpression(v.data, indexs, oIndexs);
}
```

### 使用模板的问题

但还有一种情况是使用模板，即以下这种情况：

```html
<template name="tpl_0">
    <view>
        <block wx:for="{{data}}" for-index="index1">
            <view wx:for="{{data2}}" for-index="index2">
                <template is="tpl_1" data="{{i:item}}" />
            </view>
        </block>
    </view>
</template>

<template name="tpl_1">
    <block wx:for="{{i}}" for-index="index0">
        <text id=""> </text>
    </block>
</template>
```

这种情况下，难以使 `text` 组件添加的 `id` 和 `wx:for` 循环有关。（因为他们形式上没嵌套，那深度遍历时就难以知道他们的是否是嵌套关系）。

**解决方法：**

1. 遇到 `template` 时，往 `data` 中放入一个与上层所有 `wx:for` 的 `index` 有关的值，例如上面的：

    ```html
    <template is="tpl_1" data="{{i : item, _rr_index_ : index1 + '-' + 'index2'}}" />
    ```

2. 如果一个组件处于 template，那它的 id 取决于 _rr_index_ 和它上层的循环

    ```html
    <block wx:for="{{i}}" for-index="index0">
        <text id="{{_rr_index_ + '-' + 'index0'}}"> </text>
    </block>
    ```

> `data="{{i : item}}"` 用 babel 解析为 ast 树会报错，可以在外面加一个`{}`，拼接成一个对象`{{{i : item}}}`

:::
