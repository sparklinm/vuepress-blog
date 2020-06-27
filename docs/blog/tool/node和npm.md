---
meta:
  - title: node与npm
    time: 2019-6-19 16:33:55
    tag: 环境搭建,工具使用
---

# node 与 npm

## 一 下载

打开[node 官网下载链接](https://nodejs.org/en/download/)，下载自己需要的 node 安装包，由于我的电脑是 Windows，所以我下载的是 windows 下的安装包
![](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1560931065098.png)

<!-- more -->

## 二 安装

一路点是，安装到自己需要的目录，这里我安装的目录是`F:\My development tools\node`，在安装过程中，程序会自动为你配置环境变量。

如果没有自动配置环境变量，可以手动在`path`中添加`F:\My development tools\node`

安装完后，打开`cmd`，输入`node -v`,`npm -v`,如果出现对应的版本信息，安装成功：
![](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1560933415483.png)

## 三 自定义全局包安装路径

默认情况下，使用`npm install 包名 -g`全局安装的包在`C:\Users\Administrator\AppData\Roaming\npm`目录下，这样会占据 C 盘的空间，通过自定义全局包安装路径可以更改全局包的默认安装位置。

1. 首先在 node 安装目录下创建两个文件夹：`node_cahe`、`node_global`
   ![](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1560933933165.png)
2. 打开 cmd 输入

```lsl
npm config set prefix "F:\My development tools\node\node_global"
npm config set cache "F:\My development tools\node\node_cache"
```

设置完毕后可以使用`npm config list`查看设置是否成功。

如果出现 npm 命令卡死的情况，可以删除`C:\Users\{账户}\.npmrc`文件。

3. 打开系统的环境配置页面，`我的电脑-属性-高级系统设置-系统属性-环境变量`
   ![](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1560931065120.png)
4. 在系统变量下新建一个`NODE_PATH`，输入`F:\My development tools\nodejs\node_global\node_modules`
5. 将用户变量 Path 默认的`C:\Users\Administrator\AppData\Roaming\npm`修改为`F:\My development tools\nodejs\node_global`
6. 配置完成后，安装一个全局模块进行测试，例如：`npm install express -g`，可以看到`express`模块已经安装在了目录`F:\My development tools\node\node_global\node_modules`下
   ![enter description here](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1560933710046.png)

## 四 安装 cnpm

1. 安装命令，通过 cnpm 使用

```tcl
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

2. 添加环境变量

经过上面的配置，`cnpm`会被安装到`F:\My development tools\node\node_global`目录下，所以需要对`cnpm`进行环境变量的配置，用户变量`Path`添加`F:\My development tools\node\node_global`（即 cnpm 脚本的地址）
![](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1560933710146.png)

## 五 npm 常用命令

### 1. 安装

```
npm install [<name><version>][-g]/[--save][-dev]
```

### 2. 更新

```
npm update [<name><version>][-g]/[--save][-dev]
```

### 3. 卸载

```
npm uninstall [<name><version>][-g]/[--save][-dev]
```

### 4. --save 和--save-dev 的区别

1. `-save(-S)`

- 会将模块依赖写入 dependencies 节点。
- 运行 npm install 初始化项目时，会将模块下载到项目目录下。
- 运行 npm install --production 或者注明 NODE_ENV 变量值为 production 时，会自动下载模块到 node_modules 目录中。

2. `--save-dev(-D)`

- 会将模块依赖写入 dependencies 节点。
- 运行 npm install 初始化项目时，会将模块下载到项目目录下。
- 运行 npm install --production 或者注明 NODE_ENV 变量值为 production 时，不会自动下载模块到 node_modules 目录中。

3. 总结

- -D 安装的模块是开发时需要的，但在部署（生产环境）不需要，例如：压缩 css、js 的模块。
- -S 安装的模块开发生产环境都需要。

## git 更改 Windows 下默认编辑器

在 git commit --amend 时，会通过编辑器打开提交信息的文件，可以通过命令修改默认编辑器。

`git config --global core.editor "D:/'My development tools'/'Microsoft VS Code'/Code.exe" --wait`

路径中有空格时，需要使用''。

使用`git config --list`，可以查看配置。

删除全局配置：

core.editord 的值可以配置多个，删除多个时：
`git config --global --unset-all core.editor`

删除一个时
`git config --global --unset core.editor`

## git 配置 ssh

生成密钥：`ssh-keygen -t rsa -C "邮箱"`

C 盘：`C:\Users\{用户}\.ssh` 下，将`id_rsa.pub`文件中复制到 GitHub 网站个人用户 ssh keys 处

六 参考文献

1. [Node.js 安装及环境配置之 Windows 篇](https://www.cnblogs.com/zhouyu2017/p/6485265.html)
2. [NPM install -save 和 -save-dev 傻傻分不清](https://www.cnblogs.com/limitcode/p/7906447.html)
3. [npm 常用命令](https://www.jianshu.com/p/7ea13d57638b)
4. [安装 cnpm （npm 淘宝镜像）](https://www.jianshu.com/p/96d7558e643b)
