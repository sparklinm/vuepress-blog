---
meta:
  - title: Vue3.0使用与配置
    time: 2020-10-11 23:42:29
    tag: vue
---

# Vue3.0 使用与配置

## 前言

一个 `Vue3.0` 的使用小结。

<!-- more -->

## main.js

### createApp

`createApp` 可以创建一个应用实例。在 `vue2.x` 中的任何全局改变 `Vue` 行为的 `API` 现在都会移动到应用实例上。例如：

```js
Vue.component -> app.component
Vue.directive -> app.directive
Vue.mixin -> app.mixin
Vue.use -> app.use
// 等等其他
```

具体查看 [应用 API](https://v3.vuejs.org/api/application-api.html)。

注入全局方法：

```js
import { createApp } from 'vue'
import axios from 'axios'
const app = createApp({})

app.config.globalProperties.$axios = axios
```

更多查看 [应用配置](https://v3.vuejs.org/api/application-config.html)。

`main.js` 写法改为：

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
app.use(router).use(store)
app.mount('#app')
```

## vue-router

使用：

```js
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Wall',
    component: Wall
  },
  {
    path: '/card/:id',
    name: 'CardDetail',
    component: () => import('../views/CardDetail.vue'),
    props: true
  }
]

const router = createRouter({
  // history: createWebHistory()
  history: createWebHashHistory(),
  routes
})

export default router
```

路由模式通过 `createWebHashHistory` 和 `createWebHistory` 来指定。

更多见：[vue-router-next](https://github.com/vuejs/vue-router-next)。

## vuex

使用：

```js
import { createStore } from 'vuex'
import user from './modules/user'
import chat from './modules/chat'

export default createStore({
  modules: {
    user,
    chat
  }
})
```

更多见：[Vuex 4](https://github.com/vuejs/vuex/tree/4.0)。

## 使用 TS

按照官方教程即可：[TypeScript Support](https://v3.vuejs.org/guide/typescript-support.html)。

### 添加全局方法

为全局方法添加类型推导，例如：`this.$axios`。

```ts
import { AxiosStatic } from 'axios'
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios?: AxiosStatic
  }
}
```

### 添加自定义组件选项

类似于给组件选项添加额外的属性，类似于 `vue-router` 的 `beforeRouteEnter`：

```ts
declare module '@vue/runtime-core' {
  interface ComponentCustomOptions {
    test?(param: string): void
  }
}
```

使用时：

```ts
import A from './A.vue'

A.test // right
```

### 推导组件实例

```ts
import { ComponentPublicInstance } from 'vue'

interface Return {}
export default defineComponent({
  setup(): Return {}
})
let inastanceA: ComponentPublicInstance<Props, Return>
```

### 问题

1.  **Cannot find module '@/components/card/Card.vue'.Vetur(2307)**
    配置 `tsconfig` 的 `path` 属性：

    ```json
    {
      "compilerOptions": {
        "paths": {
          "@/_": ["src/_"]
        }
      }
    }
    ```

    如果处于项目处于 `vscode` 工作区内，将该项目移动到工作区最上面。

## Composition API

Vue 3.x 最大的改变就是 **组合 API**，和现在基于选项的 `api` 不同，所有的操作都在一个 `setup` 函数中完成。

`setup` 函数在组件实例被创建前执行，所以其内部无法访问 `this`，即使在生命周期中也无法访问。

完整的介绍看官方文档即可：

1. [高阶指南](https://vue-docs-next-zh-cn.netlify.app/guide/reactivity.html)
2. [响应性基础 API](https://vue-docs-next-zh-cn.netlify.app/api/basic-reactivity.html)

上面给出的链接是中文文档，推荐看 [英文文档](https://v3.vuejs.org/)。中文文档可能不是最新的。

### setup 中访问路由

在 `setup` 中访问路由需要借助额外的函数：

例如：访问 `$route`

```js
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()

    watch(route, () => {
      // xx
    })
  }
}
```

路由的全部 **组合 API** 可以查看[这里](https://next.router.vuejs.org/api/#composition-api)。

### setup 中访问组件实例

对于 `Vue2.x` 我们经常习惯在组件实例上挂载一系列方法，或者访问父组件、根组件等。

但 `setup` 中不能访问组件实例，所以上面这些都不能获取到。

这时可以借助函数 `getCurrentInstance` :

```js
import { getCurrentInstance } from 'vue'

export default {
  setup() {
    const ins = getCurrentInstance()

    ins.appContext.config.globalProperties
    // $route
    // $router
    // $store
    // 或者其他写入到 app 实例上的全局方法，例如 $axios 等

    ins.root
    ins.parent
    ins.emit
    // 等等
  }
}
```

如何在组合 api 中访问当前组件实例上的方法。

### emit 和 on

在 `Vue3.0` 中 `this.$on` 方法已经删除。

使用第三方库代 [mitt](https://github.com/developit/mitt/) 代替：

```bash
yarn add mitt
```

在 App.vue 中为根实例添加方法：

```js
// App.vue
import mitt from 'mitt'

const emitter = mitt()
export default {
  components: {
    Nav,
    Banner
  },
  setup() {
    const ins = getCurrentInstance()
    ins.root.emit = emitter.emit
    ins.root.on = emitter.on
  }
}
```

### async setup

要使用 `async setup`，需要使用组件时，在外面包裹 `<Suspense>` 组件。

```html
<Suspense>
  <my-component />
</Suspense>
```

```js
// my-component
export default {
  async setup(props) {}
}
```

### watchEffect

[watchEffect](https://v3.vuejs.org/guide/reactivity-computed-watchers.html#watcheffect)
是 `Vue3` 新增加的一个 Api。

和 `watch` 不同的是：

1. 它不需要指定观察的值，而是在依赖发生变化时，自动运行。（类似于 `computed` ，但不返回一个值）
2. 注册时自动运行。（ `watch` 的 `immediate` 为 `true` ）
3. 不能得到依赖项改变前后的值。

```js
const count = ref(0)

const stop = watchEffect(() => console.log(count.value))
// -> logs 0

setTimeout(() => {
  count.value++
  // -> logs 1
}, 100)
```

#### 清除副作用

`watchEffect` 接收一个 `onInvalidate` 函数作入参，用来注册清理失效时的回调。

`onInvalidate` 执行时间：

1. 副作用即将重新执行时
2. 侦听器被停止 (如果在 `setup()` 或生命周期钩子函数中使用了 `watchEffect`，则在组件卸载时)

典型的应用是在异步操作时：

```js
watchEffect(() => {
  // 异步api调用，返回一个操作对象
  const apiCall = someAsyncMethod(props.userID)
  onInvalidate(() => {
    // 取消异步api的调用。
    apiCall.cancel()
  })
})
```

即在下一次运行时，取消上一次还未完成的异步 `api`。
