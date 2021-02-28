---
meta:
    - title: htmlparser2对重复属性解析
      time: 2021-02-03 10:24:39
      tag: html,parser
---

# htmlparser2 对重复属性解析

## 前言

htmlparser2 不处理重复的属性，如果节点拥有重复的属性，那后面的相同的属性会被忽略：

```html
<input id="{{c.id}}" id="{{c.uid}}" />

<!-- htmlparser2 转换后 -->
<input id="{{c.id}}" />
```

原本想换一个 html 解析库，但经过[测试](https://astexplorer.net/#/1CHlCXc4n4)，大多数 html 解析库没有处理重复的属性，只有[hyntax](https://github.com/mykolaharmash/hyntax)可以。

> [AST Explorer](https://astexplorer.net/#/1CHlCXc4n4) 可以看到一些 html 解析库的解析结果的区别。

<!-- more -->

## DomHandler

htmlparser2 是使用 [DomHandler](https://github.com/fb55/domhandler) 来处理 html 字符串的：

```js
const { Parser } = require('htmlparser2');
const { DomHandler } = require('domhandler');
const domSerializer = require('dom-serializer');
const rawHtml =
    "Xyz <script language= javascript>var foo = '<<bar>>';< /  script><!--<!-- Waah! -- -->";
const handler = new DomHandler(function (error, dom) {
    if (error) {
        // Handle error
    } else {
        // Parsing completed, do something
        console.log(dom);
    }
});
const parser = new Parser(handler);
parser.write(rawHtml);
parser.end();
// [
//     {
//         data: "Xyz ",
//         type: "text",
//     },
//     {
//         type: "script",
//         name: "script",
//         attribs: {
//             language: "javascript",
//         },
//         children: [
//             {
//                 data: "var foo = '<bar>';<",
//                 type: "text",
//             },
//         ],
//     },
//     {
//         data: "<!-- Waah! -- ",
//         type: "comment",
//     },
// ];

// 序列化 dom 节点为字符串
domSerializer(handler.dom, {
    xmlMode: false
});
```

可以看出 attribs 存储了标签的属性，而它是一个对象，无法储存重复属性，需要将其改为数组形式：

```js
attribs: [
    {
        [name]: [value]
    },
    {
        [name]: [value]
    }
];
```

Parser 在解析过程中会触发相应事件：

```js
const { Parser } = require('htmlparser2');

const parser = new Parser({
    onattribute(name, value, quote){
        // 每次解析到属性时触发
        // 在onopentag之前触发
    }

    onopentag(name, attributes) {
        // 标签开始时触发
    },

    ontext(text) {
        // 文本节点触发
    },
    onclosetag(tagname) {
        // 标签关闭时触发
    }
    // 其他更多事件...
});
```

每一次解析的结果会保存在 tagStack 中，每一次 onattribute 触发时保存属性，然后 onopentag 触发时改变 tagStack 栈最顶部的元素的 attribs。

```js
import DomHandler from 'domhandler';
export class DomWithAttributeArrayHandler extends DomHandler {
    _attributes = [];

    onattribute(name, value, quote) {
        this._attributes.push({
            [name]: value
        });
    }

    onopentag(name, attribs) {
        super.onopentag(name, attribs);
        this.tagStack[this.tagStack.length - 1].attribs = this._attributes;
        this._attributes = [];
    }
}
```

## dom-serializer

[dom-serializer](https://github.com/cheeriojs/dom-serializer)方法用于将 dom 节点渲染为字符串，因为 attribs 结构的改变，同样这个方法也需要做修改：

```ts
// 原方法
function formatAttributes(
    attributes: Record<string, string | null> | undefined,
    opts: DomSerializerOptions
) {
    if (!attributes) return;

    return Object.keys(attributes)
        .map((key) => {
            const value = attributes[key] ?? '';

            if (opts.xmlMode === 'foreign') {
                /* Fix up mixed-case attribute names */
                key = attributeNames.get(key) ?? key;
            }

            if (!opts.emptyAttrs && !opts.xmlMode && value === '') {
                return key;
            }

            return `${key}="${
                opts.decodeEntities !== false
                    ? encodeXML(value)
                    : value.replace(/"/g, '&quot;')
            }"`;
        })
        .join(' ');
}

// 修改后
function formatAttributes(
    attributes: Record<string, string | null>[] | undefined,
    opts: DomSerializerOptions
) {
    if (!attributes || !attributes.length) return;

    return attributes
        .map((attribute) =>
            Object.keys(attribute)
                .map((key) => {
                    const value = attribute[key] ?? '';

                    if (opts.xmlMode === 'foreign') {
                        /* Fix up mixed-case attribute names */
                        key = attributeNames.get(key) ?? key;
                    }

                    if (!opts.emptyAttrs && !opts.xmlMode && value === '') {
                        return key;
                    }

                    return `${key}="${
                        opts.decodeEntities !== false
                            ? encodeXML(value)
                            : value.replace(/"/g, '&quot;')
                    }"`;
                })
                .join('')
        )
        .join(' ');
}
```

> 对 domhandler 和 dom-serializer 的修改已经 fork 并整理到了 github 上，可以直接使用：
>
> 1. [domhandler 处理重复属性](https://github.com/sparklinm/htmlparser2/tree/dev_array_attrs)
> 2. [dom-serializer 处理重复属性](https://github.com/sparklinm/dom-serializer/tree/dev_array_attrs)
