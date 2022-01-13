---
meta:
    - title: 使用 yarn workspaces + lerna 管理 monorepo 多包项目
      time: 2022-01-12 15:39:16
      tag: monorepo,workspaces,lerna,工具使用
---

# 使用 yarn workspaces + lerna 管理 monorepo 多包项目

## 前言

`monorepo` 指单仓多包的管理模式，即一个仓库下同时管理多个包，目前主流的方式是 `yarn workspaces + lerna` 。

现在也有也有更为方便快捷的选择 `pnpm` ，目前越来越多大型项目采用 `pnpm` ， x相比于 `yarn` `npm` ，它有着更小的依赖磁盘空间占用，更快的依赖安装速度，更为简洁的 `monorepo` 配置。

<!-- more -->

## lerna

[lerna](https://github.com/lerna/lerna) 是社区主流的 `monorepo` 管理工具之一，集成了依赖管理、版本发布管理等功能。

下面简单介绍一下， `lerna` 的部分命令和功能。

### lerna init

[lerna init](https://github.com/lerna/lerna/tree/main/commands/init) 用于初始化项目。

lerna 有两种管理项目的模式：

1. `Fixed/Locked` 模式 (默认)： 所有的包共用一个版本号。
2. `Independent` 模式： 每个包有自己的版本号，在初始化的时候指定 `--independent` 参数。

在项目中运行：

```
lerna init --independent
```

运行后会生成一个 `lerna.json` 文件，对于 `lerna.json` 可以有以下字段：

```json
{
    // 当前项目的版本，如果是independent模式的话这里是 "independent" 字符串
    "version": "1.1.3",
    // 默认是 npm，可以使用yarn
    "npmClient": "npm",
    "command": {
        "publish": {
            // 指定哪些文件的更新不需要发布，例如修改 README。
            "ignoreChanges": ["ignored-file", "*.md"],
            // 在发版更新 version 的时候指定自定义 commit message
            "message": "chore(release): publish",
            // 指定npm地址，如果是发布在私域下的npm地址，这里需要修改
            "registry": "https://npm.pkg.github.com"
        },
        "bootstrap": {
            // 执行 lerna bootstrap 时忽略的文件
            "ignore": "component-*",
            // 执行 lerna bootstrap 命令会去执行 npm install 这里的参数就是传递给 npm install 的。
            "npmClientArgs": ["--no-package-lock"]
        }
    },
    // 指定 packages 存放的位置
    "packages": ["packages/*"],
    // 是否开启workspaces模式
    "useWorkspaces": true
    // 其他等等
}
```

`command.publish.registry` 可以通过根目录的 `.npmrc` 代替：

```
registry="http://localhost:4873/"
```

### lerna create

[lerna create](https://github.com/lerna/lerna/tree/main/commands/create) 创建一个新的包，当然你也可以手动创建。

```bash
lerna create module-2
lerna create module-1
```

### lerna add

[lerna add](https://github.com/lerna/lerna/tree/main/commands/add) 添加本地或者远程包作为另一个包的依赖。

```bash
# 向名字以 prefix- 为前缀的文件夹里面添加 module-1 作为依赖
lerna add module-1 packages/prefix-*

# 向 module-2 中添加 module-1 作为依赖
lerna add module-1 --scope=module-2

# 向 module-2 中添加 module-1 作为开发依赖（devDependencies）
lerna add module-1 --scope=module-2 --dev

# 向 module-2 中添加 module-1 作为peerDependencies
lerna add module-1 --scope=module-2 --peer

# 向除了module-1（因为 module-1 是本地包）的所有包中添加 module-1 作为依赖
lerna add module-1

# 向所有的包中添加 babel-core 作为依赖（ babel-core 是远程包）
lerna add babel-core
```

`lerna add` 是一个好用的命令，因为它可以将本地包添加为另一个本地包的依赖，这对于本地开发调试很方便。

### lerna version

[lerna version](https://github.com/lerna/lerna/tree/main/commands/version) 发布前更新包的版本 （lerna publish 包含这一步）。

```bash
# 直接指定特定的版本
lerna version 1.0.1
# 使用语义关键字
lerna version patch
# 通过交互式命令选择
lerna version
```

1. 识别出自上次发布以后更新过的包；
2. 提示选择新版本；
3. 修改包的元数据来反映最新发版（修改包的版本号），在根目录和每个包里面运行 [生命周期](https://github.com/lerna/lerna/tree/main/commands/version#lifecycle-scripts) 脚本；
4. 对提交打 `tag` ；
5. 推送到远程代码仓库。

运行命令后如下：

```bash
lerna version --no-push
info cli using local version of lerna
lerna notice cli v4.0.0
lerna info versioning independent
lerna info Looking for changed packages since animal@1.0.1
? Select a new version for cat (currently 1.0.0) (Use arrow keys)
❯ Patch (0.0.1)
  Minor (0.1.0)
  Major (1.0.0)
  Prepatch (0.0.1-alpha.0)
  Preminor (0.1.0-alpha.0)
  Premajor (1.0.0-alpha.0)
  Custom Prerelease
  Custom Version
```

### lerna publish

[lerna publish](https://github.com/lerna/lerna/tree/main/commands/publish) 发布本地包到 `npm` 。

```bash
# 发布自上次发布过后更新过的包 （背后会执行 lerna version）
lerna publish
# 发布当前通过 lerna version 打好 tag 的包，需要先使用 lerna version 更新版本
lerna publish from-git
# 只发布远程 npm 仓库中没有的版本，适用于 lerna publish 没有全部发布成功的场景。
lerna publish from-package
```

### lerna bootstrap

[lerna bootstrap](https://github.com/lerna/lerna/tree/main/commands/bootstrap) 建立相互依赖的包之间的软连接并安装其他的依赖。

这个命令在背后执行了以下步骤:

1. 安装所有包的外部依赖
2. 在互相依赖的包之间建立链接
3. 在 `bootstrapped` 的包中执行 `npm run prepublish` （没有指定 `--ignore-prepublish` 的情况下）
4. 在 `bootstrapped` 的包中执行 `npm run prepare`

```bash
lerna bootstrap
info cli using local version of lerna
lerna notice cli v4.0.0
lerna info versioning independent
lerna info Bootstrapping 3 packages
lerna info Symlinking packages and binaries
lerna success Bootstrapped 3 packages
```

### 其他

1. [lerna list](https://github.com/lerna/lerna/tree/main/commands/list) 列出所有的本地包。
2. [lerna info](https://github.com/lerna/lerna/tree/main/commands/info) 打印本地环境信息。
3. [lerna changed](https://github.com/lerna/lerna/tree/main/commands/changed) 列出自上一次发布过后修改过的包。
4. [lerna clean](https://github.com/lerna/lerna/tree/main/commands/clean) 移除所有 `package` 下的 `node_modules` ，除了根目录下的 `node_modules` 。
5. [lerna diff](https://github.com/lerna/lerna/tree/main/commands/diff) 列出自上一次发布过后所做的修改，和 `lerna changed` 类似，但 `lerna changed` 是列出修改过的包，这个是列出修改的文件，内部是运行了 `git diff` 。
6. [lerna exec](https://github.com/lerna/lerna/tree/main/commands/exec) 在所有的包下执行任意的命令。

    ```bash
    lerna exec -- <command> [..args] # runs the command in all packages
    lerna exec -- rm -rf ./node_modules # 删除所有包下面的 node_modules
    ```

7. [lerna import](https://github.com/lerna/lerna/tree/main/commands/import) 将已经存在的项目作为一个包导入到现有的 `lerna` 项目中，同时项目的 `commit` 历史记录会被一并导入。
8. [lerna link](https://github.com/lerna/lerna/tree/main/commands/link) 建立存在依赖关系的包之间的软连接。

## yarn workspaces

从上面 `lerna` 的命令中，可以发现 `lerna` 集成了包依赖管理以及版本发布的功能。

但如果使用 `lerna` 的依赖管理，就意味着每个 `package` 下都会生成 `node_modules` ，重复依赖会重复安装。这种情况可以借助 `yarn workspaces` 解决，`yarn workspaces` 的作用如下：

1. 工作区内的依赖关系可以链接在一起，这意味着工作区可以相互依赖，同时始终使用最新的可用代码。这也是一个相对于 `yarn link` 更好的机制，因为它只影响你的工作空间树，而不是整个系统。
2. 所有的 `package` 依赖关系都将被安装在一起，即根目录的 `node_modules` ，为 `yarn` 提供更多的自由度来更好地优化它们。
3. 对于每个项目， `yarn` 将使用一个公共的的 `yarn.lock` 文件而不是为每个 `pacakge` 创建一个的 `yarn.lock` 文件，这意味着更少的冲突和更容易的版本审查。

所以，目前社区的主流方案是： **`lerna` 做版本发布管理， `yarn workspaces` 做依赖管理** 。

### 启用 workspaces

在根目录 `package.json` 添加：

```json
// packag.json
{
    // 确保工作区间并不会被发布
    "private": true,
    "workspaces": ["packages/*"]
}
```

### yarn <add|remove> <package> -W

将依赖安装在 `workspaces` 的根目录

```bash
# 在根目录安装 eslint
yarn add eslint -D -W
```

### yarn workspace <workspace_name> <command>

在指定的 workspace 下执行命令 。

```bash
# 为 module-1 安装 lodash
yarn workspace module-1 add lodash

# 执行 module-1 中的 yarn start 命令
yarn `workspace` module-1 run start
```

### yarn workspaces run <command>

在每个 `workspace` 中运行命令

```bash
# 在所有 workspace 中执行 yarn start 命令
yarn workspaces run start
```

### yarn workspaces info [--json]

获得 `workspaces` 的信息。

```json
// yarn workspaces v1.22.10
{
    "module-1": {
        "location": "packages/module-1",
        "workspaceDependencies": [],
        "mismatchedWorkspaceDependencies": []
    },
    "module-2": {
        "location": "packages/module-2",
        "workspaceDependencies": [],
        "mismatchedWorkspaceDependencies": []
    }
}
```

### yarn 2.x

`yarn 2.x` 增加了新的工作区间命令。

1. `yarn workspaces focus`: 安装单个工作区及其依赖项。
2. `yarn workspaces foreach [command]`: 在所有工作空间上运行 `command` 命令（类似 `yarn 1.x` 中的 `yarn workspaces run <command>` ）
3. `yarn workspaces list`: 列出所有可用的工作区。

> 新增加的命令需要使用安装 [workspace-tools](https://github.com/yarnpkg/berry/blob/HEAD/packages/plugin-workspace-tools/README.md) 插件才可以使用：`yarn plugin import workspace-tools`

同时，在 `yarn 2.x` 中的 `yarn workspaces info` 已经被删除。

### 工作区间相互引用

现在有以下两个工作区间：

```json
{
    "module-1": {
        "location": "packages/module-1",
        "workspaceDependencies": [],
        "mismatchedWorkspaceDependencies": []
    },
    "module-2": {
        "location": "packages/module-2",
        "workspaceDependencies": [],
        "mismatchedWorkspaceDependencies": []
    }
}
```

如果想在 `module-2` 中引用 `module-1`，只需运行以下命令：

```bash
cd projects/module-2 &
yarn add module-1@1.0.0 # 指定version，确保准确命中
or
yarn workspace module-2 add module-1@1.0.0 # 在 root 中指定 workspace，进行安装
```

> 安装时，需要确切指定包的版本，如果版本和本地包一致，就会使用本地包，如果不一致，就会从 `npm` 上下载。

这可能带来一些问题，例如：我们先是引用本地包，然后本地包升级版本发布后，但我们引用的本地包还是老版本，这种情况需要及时更新引用的本地包版本。

引用本地包后，运行 `yarn workspaces info --json` ，工作区间信息会变成下面这样：

```json
{
    "module-1": {
        "location": "packages/module-1",
        "workspaceDependencies": [],
        "mismatchedWorkspaceDependencies": []
    },
    "module-2": {
        "location": "packages/module-2",
        "workspaceDependencies": ["module-1"],
        "mismatchedWorkspaceDependencies": []
    }
}
```

### lerna + workspaces

由于 `workspaces` 管理依赖的优势，在 `monorepo` 多包项目中，常采用 `lerna + workspaces` ，即： **`lerna` 做版本发布管理， `yarn workspaces` 做依赖管理** 。

只需在 `lerna.json` 指定 `useWorkspaces` 字段就可以和 `yarn workspaces` 联合使用：

```json
{
    // 当前项目的版本，如果是independent模式的话这里是 "independent" 字符串
    "version": "1.1.3",
    // 默认是 npm，可以使用yarn
    "npmClient": "npm",
    // 指定 packages 存放的位置
    "packages": ["packages/*"],
    // 是否开启workspaces模式
    "useWorkspaces": true
    // 其他等等
}
```

这时，我们应该只使用 `lerna` 中与版本发布有关的命令，例如：`lerna version`, `lerna publish` 等；将依赖管理交给 `yarn workspaces` 。

## pnpm

那有没有更简便的方式管理 `monorepo` 多包项目呢？

有，那就是 [pnpm](https://pnpm.io/zh/) ，只使用 `pnpm` ，你就能做到 `yarn + lerna` 的效果。并且 `pnpm` 有着比 `yarn` 更小的依赖磁盘空间占用，更快的依赖安装速度。

为什么 `pnpm` 能做到这些，以下官方的说法：

当使用 `npm` 或 `Yarn` 时，如果你有 `100` 个项目使用了某个依赖（ `dependency` ），就会有 `100` 份该依赖的副本保存在硬盘上。 而在使用 `pnpm` 时，依赖会被存储在内容可寻址的存储中，所以：

1. 如果你用到了某依赖项的不同版本，那么只会将有差异的文件添加到仓库。 例如，如果某个包有 `100` 个文件，而它的新版本只改变了其中 `1` 个文件。那么 p`npm update` 时只会向存储中心额外添加 `1` 个新文件，而不会因为仅仅一个文件的改变复制整新版本包的内容。
2. 所有文件都会存储在硬盘上的某一位置。 当软件包被被安装时，包里的文件会硬链接到这一位置，而不会占用额外的磁盘空间。 这允许你跨项目地共享同一版本的依赖。

用 `pnpm` 管理单仓多包项目只需以下几步。

### 创建 pnpm-workspace.yaml 文件

根目录创建 `pnpm-workspace.yaml` 文件：

```yaml
packages:
    # 所有在 packages/ 和 components/ 子目录下的 package
    - 'packages/**'
    - 'components/**'
    # 不包括在 test 文件夹下的 package
    - '!**/test/**'
```

### 本地包相互引用

工作区间内有 `2` 个包：

```
+ packages
    + foo
    + bar
```

`foo` 中引用 `bar` 可通过以下写法：

```json
// foo 的 package.json
{
    "dependencies": {
        "foo": "workspace:*"
        // 指定版本：
        // "foo": "workspace:2.0.0"
        // 别名：
        // "myfoo": "workspace:foo@*"
    }
}
```

默认情况下，我们不需要使用 `workspace:*` 语法去引用本地包，工作区间内的包会自动相互链接。

例如：如果 `bar` 中有 `"foo"："^1.0.0"` 的这个依赖项，则 `foo@1.0.0` 链接到 `bar` 。 但是，如果 `bar` 的依赖项中有 `"foo": "2.0.0"` ，而 `foo@2.0.0` 在工作空间中并不存在，则将从 `npm registry` 安装 `foo@2.0.0` 。

这种行为和 `yarn workspaces` 类似，即会出现这样的问题：先是引用本地包，然后本地包升级版本发布后，但我们引用的本地包还是老版本，未能及时更新。

所以有了上面的 `workspace:` 语法，即只会从工作区间内安装包，如果没有就会安装失败。

在 `.npmrc` 中配置 `link-workspace-packages` 为 `false` ，可以仅当使用 `workspace:` 协议声明依赖， `pnpm` 才会从工作空间链接所需的包。

```
link-workspace-packages: true
```

### pnpm recursive

[pnpm recursive](https://pnpm.io/zh/cli/recursive) ：在 `package` 中的所有子目录或每个可用的工作空间中递归运行 `pnpm` 命令。

### pnpm publish

[pnpm publish](https://pnpm.io/zh/cli/publish) ：发布工作区间。

使用 `pnpm publish -r` 可以发布所有版本尚未发布到 `npm` 上的包。

### pnpm changeset

工作空间内的 `packages` 的版本管理是个十分复杂的任务， `pnpm` 暂未支持内置的解决方案。

官方推荐使用 [Changesets](https://pnpm.io/zh/using-changesets) 工具。

在根目录安装 `changesets` ：

```bash
pnpm add -DW @changesets/cli
```

初始化 `changesets` ：

```bash
pnpm changeset init
```

添加新的 `changesets` ，在根目录中执行 `pnpm changeset` 。 `.changeset` 目录中生成的 `markdown` 文件需要被提交到到仓库。

发布：

1. 运行 `pnpm changeset version` 。 这将提高先前使用 `pnpm changeset` （以及它们的任何依赖项）的版本，并更新变更日志文件。
2. 运行 `pnpm install` 。 这将更新 `.lock` 并重新构建包。
3. 提交更改。
4. 运行 `pnpm publish -r` 。发布到 `npm` 。

## 参考

1. [lerna](https://github.com/lerna/lerna)
2. [yarn 1.x workspaces](https://classic.yarnpkg.com/en/docs/workspaces)
3. [yarn 2.x workspaces](https://yarnpkg.com/cli/workspace)
4. [Monorepo 最佳实践之 Yarn Workspaces](https://juejin.cn/post/7011024137707585544)
5. [pnpm](https://pnpm.io/zh/)
6. [pnpm workspaces](https://pnpm.io/zh/workspaces)
7. [pnpm changesets](https://pnpm.io/zh/using-changesets)
