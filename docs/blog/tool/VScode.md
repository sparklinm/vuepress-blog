---
meta:
    - title: VScode
      time: 2019-6-20 10:20:10
      tag: 工具使用
---

# VScode

## VScode 常用插件

1.  `Auto rename tag`  
    修改 HTML 标签时，自动修改匹配的标签
2.  `Color Highlight`  
    颜色值在代码中高亮显示
3.  `Beautify`  
     代码格式化，包括：javascript, JSON, CSS, Sass, and HTML
    <!-- more -->
4.  `vetur`  
    vue 代码提示 错误检查 格式化等等 vue 必备
5.  `open-in-browser`  
    默认浏览器打开
6.  `Path Intellisense`  
    路径自动补全
7.  `Icon Fonts`  
    字体图标提示
8.  `HTML CSS Support`  
    css 类、id 智能提示（支持 vue）
9.  `CSS Peek`  
    追踪至样式表中 CSS 类和 ids 定义的地方
10. `JavaScript (ES6) code snippets`  
    es6 语法速写和提示
11. `Chinese (Simplified) Language Pack for Visual Studio Code`  
    vscode 中文
12. `Quokka.js`  
    js 代码实时反馈，预览变量的函数和计算值结果。  
    使用方法：  
    ctrl+shift+p：输入 quokka  
    选择新建 JavaScript file
13. `Faker`  
    随机生成字符串（名字、地址、邮箱等）  
    使用方法：  
    ctrl+shift+p：输入 faker
14. `Change Case`  
    修改变量命名格式 （驼峰命名、下划线分隔命名等）  
    使用方法：  
    ctrl+shift+p：输入 Change Case Commands
15. `Regex Previewer`  
    测试正则表达式  
    使用方法:  
    ctrl+shift+p：输入 Regex Previewer，打开侧边栏，好像只能对 js 文件中的正则验证
16. `Color Picker`  
    颜色选择  
    使用方法：  
    ctrl+shift+p：输入 Pick Color
17. `Code Runner`  
    运行指定代码

18. `tencent-cloud-cos-upload-image`
    支持直接在 Markdown 文件中 **粘贴截图** 和 **选择图片** 上传到**腾讯云 COS**，得到文件地址后引用显示。

    插件有一个配置：

    ```js
    // remotePath，您的存储目录，例如要把文件存在 `http://${你的域名}/images/png` 这下。
    // 则这里填写 `images/png`。默认为空，即存储在根路径下
    "tencentCOSUpload.remotePath": ""
    ```

    这个配置有问题：**如果在 `windows` 下配置，那不会生效，`linux` 下可以**。应该是 `windows` 和 `linux` 路径分割符不同的原因。

## 修改插件默认安装位置

vscode 快捷方式图标——右键属性——目标——路径后面加上：

```
--extensions-dir "D:\My development tools\Microsoft VS Code\extensions"
```

## eslint 保存自动修复

配置文件中添加：

```json
    "eslint.autoFixOnSave": true, //  启用保存时自动修复,默认只支持.js文件
    "eslint.validate": [
        "javascript", //  用eslint的规则检测js文件
        {
            "language": "vue", // 检测vue文件
            "autoFix": true //  为vue文件开启保存自动修复的功能
        },
        {
            "language": "html",
            "autoFix": true
        },
    ]
```

**最新 vscode 不需要这个配置**。

## 自定义 markdown 代码片段

设置 > 用户代码片段 > 选择相应语言，打开或新建相应 json 文件。

```json
{
    "markdown sample": {
        "prefix": "markdown",
        "body": [
            "---",
            "meta:",
            "\t- title: $1",
            "\t\ttime: $CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE $CURRENT_HOUR:$CURRENT_MINUTE:$CURRENT_SECOND",
            "\t\ttag: $3",
            "---",
            "",
            "# $4"
        ],
        "description": "The full sample code - markdown."
    }
}
```

建立的模板如下:

```md
---
meta:
    - title:
      time: 2020-07-02 10:54:04
      tag:
---

#
```

**自定义代码片段语法：**

`body` 中每个数组元素代表一行。

行内可以使用 `空格`，`\t`，`\n`。

其他关于：`制表符：$1`、`系统变量` 等的语法见：[vscode 自定义代码片段](https://blog.csdn.net/ucmir183/article/details/88413369)。

上面的 `$CURRENT_YEAR` 等分别代表当前年月日时分秒。

这样建立的 `markdown` 模板，输入前缀 `markdown` 发现并不能在 `.md` 文件中弹出模板。还需要在 `settings.json` 中配置：

```json
  "[markdown]":{
    "editor.quickSuggestions": true
  }
```

**这样的配置后，在任何地方（不仅限于 `.md` 文件中）输入 `markdown` 都会提示使用模板。**

## 调试 js

在 vscode 中调试 js，可以参考以下两篇文章：

1. [如何在 vscode 里面调试 js 和 node.js](https://juejin.cn/post/6844903744304316429)
2. [使用 vscode 调试编译后的 js 代码](https://meixg.cn/2018/05/13/vscode-debug/)

## 参考文献

1. [精选!15 个 web 前端必备的 VSCode 插件](http://baijiahao.baidu.com/s?id=1585469813997965563&wfr=spider&for=pc)
2. [前端开发 VScode 常用插件](https://segmentfault.com/a/1190000012558414)
3. [vscode 自定义代码片段](https://blog.csdn.net/ucmir183/article/details/88413369)
4. [如何在 vscode 里面调试 js 和 node.js](https://juejin.cn/post/6844903744304316429)
5. [使用 vscode 调试编译后的 js 代码](https://meixg.cn/2018/05/13/vscode-debug/)
