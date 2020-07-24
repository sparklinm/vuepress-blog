---
meta:
  - title: vue路由动画和缓存
    time: 2020-02-05 18:38:32
    tag: vue
---

# vue 路由动画和缓存

## 前言

在使用 vue 路由动画和缓存时，遇到了一些问题，比如：

1. 正确产生动画；
2. 有条件产生动画，比如 A 页面到 B 页面使用动画，A 到其他页面不使用动画；
3. 有条件缓存，管理缓存
4. 动画和缓存的同时使用

在这里把自己能想到的做一个总结。

<!-- more -->

以下的内容已经写成了一个插件，方便快速配置，并增加了判断前进后退的方法，**github 地址**：

[vue-router-cache-animate](https://github.com/sparklinm/vue-router-cache-animate)

## 路由动画

### 如何动画

```html
<template>
  <div id="app">
    <header></header>
    <!-- 用transition 把切换组件页面的容器包含 -->
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>
```

当路由切换时，动画的实质是在`router-view`渲染的节点（curNode)后面添加个下一个路由的节点(nextNode)。

curNode 执行离开动画，nextNode 执行进入动画。由于 curNode 和 nextNode 是兄弟节点，如果要实现右进左出的话，需要添加`absolute`定位。

```css
/* 进入动画 */
.slide-enter {
  opacity: 0;
  transform: translate(100%, 0);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease;
  position: absolute;
}

/*离开动画*/
.slide-leave-to {
  transform: translate(-100%, 0);
}

#app {
  overflow-x: hidden;
  overflow-y: auto;
}
```

元素右超出视窗会使页面出现横向滚动条，所以需要为父元素添加 `overflow:hidden`。

当然也可以使用 `fixed` 定位，不会出现滚动条。

### 动态过渡

根据路由信息动态设置动画效果，比如从`a`路由到`b`路由使用左滑效果，从`b`路由返回`a`路由使用右滑效果。

```html
<!-- 使用动态的 transition name -->
<transition :name="transitionName">
  <router-view></router-view>
</transition>
```

```javascript
export default {
  watch: {
    $route(to, from) {
      const toName = to.name
      const fromName = from.name
      if (fromName === 'a' && toName === 'b') {
        this.transitionName = 'slide-left'
      } else if (fromName === 'b' && toName === 'a') {
        this.transitionName = 'slide-right'
      }
    }
  }
}
```

同级路由无动画，上级路由到子路由有动画（返回时相反动画）。例如：点击文章列表的文章进入文章详情页，文章详情页有返回按钮返回列表。

```html
<!-- 使用动态的 transition name -->
<transition :name="transitionName" :css="css">
  <router-view></router-view>
</transition>
```

```javascript
export default {
  watch: {
    $route(to, from) {
      if (to.meta.child && from.meta.parent) {
        this.transitionName = 'slide-left'
        this.css = true
      } else if (to.meta.parent && from.meta.child) {
        this.transitionName = 'slide-right'
        this.css = true
      } else {
        this.transitionName = ''
        this.css = false
      }
    }
  }
}
```

```css
.slide-right-enter {
  transform: translate(-100%, 0);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease;
  position: fixed;
  width: 100%;
  box-sizing: border-box;
}

.slide-right-leave-to {
  transform: translate(100%, 0);
}

.slide-left-enter {
  transform: translate(100%, 0);
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease;
  position: fixed;
  width: 100%;
  box-sizing: border-box;
}

.slide-left-leave-to {
  transform: translate(-100%, 0);
}
```

即使`transition`的`name`为空，也会出现闪烁现象，此时需要设置`transition`的`css`为`false`。

更多详细内容可查看[vue 路由过渡](https://router.vuejs.org/zh/guide/advanced/transitions.html#%E5%8D%95%E4%B8%AA%E8%B7%AF%E7%94%B1%E7%9A%84%E8%BF%87%E6%B8%A1)。

## 路由缓存

### 缓存特定路由

```html
<keep-alive include="路由渲染得组件name选项">
  <router-view></router-view>
</keep-alive>
```

可以使用`keep-alive`的`include`、`exclude`来有条件的缓存路由。

或者定义路由元数据来有条件缓存：

```JavaScript
{
    path:'/Distribution',
    name:'Distribution',
    component: Distribution,
    meta: {keepAlive: true } // 缓存
 }

```

```html
<keep-alive>
  <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>

<router-view v-if="!$route.meta.keepAlive"></router-view>
```

**但由于使用了`v-if`，在配合`transition`组件进行路由动画时，无法成功。**

### 动态缓存

有时只需要在特定的时候缓存，比如 `a` 页面（对应 A 组件）到 `b` 页面（对应 B 组件）缓存，其他的时候不缓存。

可以通过动态设置`keep-alive`的`include`值。

```html
<transition :name="transitionName" :css="css">
  <keep-alive :include="keepAlive">
    <router-view />
  </keep-alive>
</transition>
```

`keepAlive`是一个数组，保存了当前需要被缓存的组件名字，缓存组件需提供 `name` 选项。

使用`vuex`或者`根实例 data`，储存全局的 `keepAlive`。

在`a`组件中，路由离开守卫，根据下一个路由动态修改`keepAlive`

```js
beforeRouteLeave(to, from, next) {
  // a->b，b->a都需要缓存A组件
  if (
    (from.name === "a" && to.name === "b") ||
    (from.name === "b" && to.name === "a")
  ) {
    // vuex的设置keepAlive方法
    this.storeSetKeepAlive(["A"]);
  } else {
    this.storeSetKeepAlive(["None"]);
  }
  setTimeout(() => {
    next();
  });
}
```

> 1. 这里使用一个延时函数`setTimeout`，确保使用`router-view`的根组件在跳转前拿到 `keepAlive` 值。(`watch`是异步的)
> 2. 同时对于无组件缓存，不要设置`keepAlive=[]`，这样所有的组件都会被缓存。

**不要通过销毁组件的方式来达到让组件不缓存，类似与下面这样：**

```JavaScript
  beforeRouteLeave (to, from, next) {
    if(to.name !== 'b'){
      this.$destroy()
    }
  }
```

路由全部缓存，只是到 b 路由时，销毁本组件。

一旦这样使用，那 a 路由到 b 路由也会缓存，但再从 b 返回 a 路由后，却不会使用缓存的 a 组件，而是重新渲染一个 a 组件。

### 全局管理缓存

为每一个路由组件手动注入`beforeRouteLeave`，当项目庞大时，维护起来会很困难。可以使用全局混入的方式，统一管理缓存状态：

```js
Vue.mixin({
  beforeRouteLeave(to, from, next) {
    if (from.meta.keepAlive && to.meta.keepAlive) {
      // 根实例存储keepAlive
      this.$root.keepAlive = ['A']
    } else {
      this.$root.keepAlive = ['None']
    }
    setTimeout(() => {
      next()
    })
  }
})
```

## 同时动画和缓存

需求：

1. 一级路由和二级路由
2. 一级路由到二级路由有动画（左滑进入），二级路由可以返回一级路由（右滑离开）
3. 二级路由返回时，显示的是缓存的一级路由页面
4. 一级路由和一级路由之间无动画，且不缓存

---

1. 定义路由，为所有一级路由加上元数据 parent，二级路由加上元数据 child

   ```JavaScript
   const router = new Router({
     routes: [
       {
         path: '/a',
         component: A,
         meta: {
           parent: true
         }
       },
       {
         path: '/b',
         component: B,
         meta: {
           child: true
         }
       }
     ]
   })
   ```

2. 缓存数组，保存到根实例的 data 中

   ```JavaScript
   new Vue({
     router,
     store,
     i18n,
     data: {
       keepAlive: []
     },
     render: h => h(App)
   }).$mount('#app')
   ```

3. 为每个路由组件添加`name`选项，这里分别为`A`、`B`

4. 全局混入`beforeRouteLeave`守卫

   ```JavaScript
   Vue.mixin({
     beforeRouteLeave (to, from, next) {
       // 从一级路由到二级路由，二级路由到一级路由时缓存
       if (from.meta.parent && to.meta.child || from.meta.child && to.meta.parent) {
         this.$root.keepAlive = ['A']
       } else {
         this.$root.keepAlive = ['None']
       }
       setTimeout(() => {
         next()
       })
     }
   })
   ```

5. 同时使用`transition`和`keep-alive`

   ```html
   <div id="app">
     <transition :name="transitionName" :css="css">
       <keep-alive :include="$root.keepAlive">
         <router-view />
       </keep-alive>
     </transition>
   </div>
   ```

6. 观察路由信息，动态设置动画

   ```javascript
   export default {
     watch: {
       $route(to, from) {
         if (to.meta.child && from.meta.parent) {
           this.transitionName = 'slide-left'
           this.css = true
         } else if (to.meta.parent && from.meta.child) {
           this.transitionName = 'slide-right'
           this.css = true
         } else {
           this.transitionName = ''
           this.css = false
         }
       }
     }
   }
   ```

   ```css
   #app {
     height: 100%;
     position: relative;
     overflow: hidden;
   }

   .slide-right-enter {
     transform: translate(-100%, 0);
   }

   .slide-right-enter-active,
   .slide-right-leave-active {
     transition: transform 0.3s ease;
     position: absolute;
     width: 100%;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     box-sizing: border-box;
   }

   .slide-right-leave-to {
     transform: translate(100%, 0);
   }

   .slide-left-enter {
     transform: translate(100%, 0);
   }

   .slide-left-enter-active,
   .slide-left-leave-active {
     transition: transform 0.3s ease;
     position: absolute;
     width: 100%;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     box-sizing: border-box;
   }

   .slide-left-leave-to {
     transform: translate(-100%, 0);
   }
   ```

---

**效果演示：**

![路由缓存和动画演示](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/%E8%B7%AF%E7%94%B1%E5%8A%A8%E7%94%BB%E5%92%8C%E7%BC%93%E5%AD%98.gif))
