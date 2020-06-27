---
meta:
  - title: vue组件通信总结
    time: 2019-7-16 9:38:32
    tag: vue
---

# vue 组件通信总结

## 路由传参

### 通过 params

#### 1. 动态路由

定义一个动态路由，传递参数 `id`

```javascript
export default new Router({
  routes: [
    {
      path: "/componentB/:id",
      name: "componentB",
      component: componentB
    }
  ]
});
```

<!-- more -->`

通过 `router-link` 标签传递参数

```html
<router-link :to="{path:`/componentB/${user.id}`}"></router-link>
<!-- 通过命名路由 -->
<router-link :to="{name: 'componentB', params: { id: user.id }}"></router-link>
```

使用 `router.push` 方法传递参数

```js
this.$router.push({ path: `/componentB/${user.id}` });
// 通过命名路由
this.$router.push({ name: "componentB", params: { id: user.id } });
```

> 注意：在使用了 `path` 后，`params` 会无效
>
> ```js
> // params无效
> this.$router.push({ path: "/componentB", params: { id: user.id } });
> ```

使用 `this.$route.params.id` 接收参数

#### 2. 普通路由

在普通路由中也可以通过 `params` 传参

```javascript
export default new Router({
  routes: [
    {
      path: "/componentB",
      name: "componentB",
      component: componentB
    }
  ]
});
```

传递参数

```html
<router-link :to="{name: 'componentB', params: { id: user.id }}"></router-link>
```

```javascript
this.$router.push({ name: "componentB", params: { id: user.id } });
```

接收参数：`this.$route.params.id`

### 通过 query

传递参数

```html
<router-link :to="{name: 'componentB', query: { id: user.id }}"></router-link>
```

```javascript
this.$router.push({ name: "componentB", query: { id: user.id } });
```

接收参数：`this.route.query.id`

### 小结

1. 在动态路由传参过程中，参数会附在 `url` 后面

2. 非动态路由使用 `params` 传递参数，参数不会附在 `url` 后面

3. `query` 传递参数，参数会以 `?id=number&name=li` 这种形式附在 `url` 后面

## 组件通信

### 子组件访问父组件

#### props

父组件：

```html
<Child :id="user.id" />
```

子组件：

```javascript
props: {
   id: Number,
},
```

`props` 也可以传递函数

#### \$parent

父组件：

```javascript
export default {
  data() {
    return {
      user: {
        id: 2
      }
    };
  },
  methods: {
    getUserId() {
      return user.id;
    }
  }
};
```

子组件可以通过 `this.$parent.user` 和 `this.$parent.getUserId` 获得父组件的数据和方法

#### provide / inject

`provide` 和 `inject` 允许一个祖先组件向其所有后代组件注入依赖，也就是说不论后代组件嵌套有多深，在祖先组件中提供 `provide` 属性，后代组件能够通过 `inject` 获取到这个属性。

`provide` 和 `inject` 主要为高阶插件/组件库提供用例。并不推荐直接用于应用程序代码中。

父组件：

```javascript
provide() {
  return {
    userId:this.user.id
  }
},
```

子组件：

```javascript
inject:['userId'],

mounted() {
  console.log(this.userId);
}
```

更多用法: https://cn.vuejs.org/v2/api/#provide-inject

`provide` 和 `inject`并不是响应式的，但如果传递的是一个对象，那么就是响应式的。

这时的响应式只限于对象的属性改变，例如`provide`传递对象`obj`，`obj.a`改变时，子组件能观察到`obj.a`的变化，但`obj= Object.assign({}, obj, newObj)`这不能。

但是，如果将一个 computed 的值传递，例如：

```JavaScript
provide () {
  return {
    options: this.curOptions //curOptions 为 computed 属性
  }
}
```

如果`curOptions`只是被`provide`传递，那`curOptions`只会执行一次，不会在其依赖的属性改变时执行。

所以`provide`不要去传递一个 computed 属性。

> 综上：
>
> 1. `provide`传递可响应式对象时，只能去改变对象的属性。
> 2. 不能传递 computed 属性来作为响应式对象。（也就是不能去改变传递对象的引用）

### 父组件访问子组件

#### ref

父组件：

```html
<Child ref="child" />
```

```javascript
mounted() {
  this.$refs.child.fun();
  console.log(this.$refs.child.data);
}
```

#### \$emit + v-on

子组件：

```html
<button @click="$emit('transfer-data',5)"></button>
```

父组件：

```html
<!-- $event表示传递过来的参数 -->
<Child @transfer-data="num+=$event" />
```

### 任意组件通信

#### 使用 bus 配合$emit+$on

根实例定义一个 Vue 的实例 Bus

```javascript
new Vue({
  router,
  store,
  data: {
    bus: new Vue()
  },
  render: h => h(App)
}).$mount("#app");
```

组件 A 使用\$emit 分发事件

```javascript
this.$root.Bus.$emit("transfer-data", arg1, arg2);
```

组件 B 使用\$on 监听事件

```javascript
this.$root.Bus.$on("transfer-data", arg1, arg2);
```

监听事件 $on 一定要先于分发事件 $emit 注册才有效

#### vuex

Vuex 是 vue 的全局状态管理模式，并且它的状态存储是响应式的。

vuex 的使用见官方文档: [vuex](https://vuex.vuejs.org/zh/installation.html)

### 小结

1. 响应式:props、$parent、vuex

2. 非响应式:ref、$emit+v-on、$emit+\$on、provide / inject

3. 对于 ref,可以使用计算属性来达到响应式

> 1. 在 computed 中无法直接访问 \$refs,因为 computed 在 mounted 之前执行，所有无法访问 dom , [vue 中各选项及钩子函数执行顺序](https://www.cnblogs.com/vickylinj/p/9584202.html)
> 2. 可以通过定义一个变量 ismounted ()false ,在 mounted 中将这其设置为 true 来判断是否已经处于 mounted 生命周期
>
> ```javascript
>  computed: {
>    cNum() {
>      if (this.isMounted)
>         return this.$refs.child.cNum;
>    }
>  },
> ```

4. 对于$emit+v-on、$emit+\$on,需要在值改变时重新派发事件

## localStorage 和 SessionStorage

## 总结

在以上几种通信方式中,还有一个需要注意的地方,那就是页面刷新,参数是否会消失以及重置问题.

重置是指:如果因为某个事件改变了传递的参数,那页面刷新后这个参数的值是否还是改变后的值.

1. 路由参数传递,如果是附在 url 后面的参数,页面刷新参数不会消失,其他则会消失

2. 对于所有的组件通信,当页面刷新时,就代表着当前页面的所有组件销毁与重建,那么自然参数会全部重置.

3. 对于本地缓存 localStorage 和 SessionStorage,页面刷新改变的值依然存在

4. 当我们想要实现例如:点击某个按钮,获取数据,在页面刷新后依然是点击按钮后获取的数据.那么应该在点击后改变页面的 url(即:路由改变),然后根据路由来获取数据.
