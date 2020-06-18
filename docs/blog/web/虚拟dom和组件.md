---
meta:
  - title: 虚拟dom和组件
    time: 2019-11-15 17:24:43
    tag: vue,组件
---

# 虚拟 dom 和组件

## 前言

在 vue 项目中，我想实现一个点击目标元素，在目标元素周围弹出框的功能。

![enter description here](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1592994223548.png)

像这样，点击按钮，在下面弹出菜单栏。

原理很简单，点击时获取目标位置，在目标下方插入菜单栏就行了。

那么这应该怎么封装成一个组件呢？

<!-- more -->

## ToolTip 组件

按照上面的需求，我们常规的想法是，封装一个组件，使用两个 `slot` 来承载上面描述的按钮和菜单栏。

```html
<!-- my-component -->
<div>
  <slot></slot>
  <slot name="content"></slot>
</div>

<my-component>
  <button></button>
  <div class="menu" v-slot:content>
    <li>1</li>
    <li>2</li>
  </div>
</my-component>
```

但这会有 2 个问题：

1. 将按钮和菜单栏组合在一个 `div` 中，这对菜单栏的定位并不友好，例如如果要将菜单栏放到右边、左边、上边、斜上边等等。这时你会想到用 fixed 定位，但这依然不可行，因为 fixed 定位不一定会根据可视窗口定位，还会根据设置了 `transform` 的父元素定位。
2. 我们为按钮外增加了一个 `div` 作为父元素，这会导致按钮位置改变。

所以这里，我们需要做的是：

1. 让按钮依旧保持在原来一致的文档结构中。
2. 让这个菜单栏插入到 `body` 中去，并定位。

`Element-ui` 有类似的组件 —— `Tooltip` 文字提示，用法如下：

```html
<el-tooltip content="Top center" placement="top">
  <el-button>Dark</el-button>
</el-tooltip>

<el-tooltip placement="top">
  <div slot="content">多行信息<br />第二行信息</div>
  <el-button>Top center</el-button>
</el-tooltip>
```

再看它的渲染，确实只有一个`button`按钮：

![enter description here](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1592993916529.png)

它是怎么做到的呢？

查阅 `api`，可以知道 `vm.$slot` 和 `vm.$scopedSlots` 可以访问插槽(具名或默认插槽)或作用域插槽，得到的是相应的 `vNode`(虚拟 `dom`)数组。

具体用法：[Vue \$slots](https://cn.vuejs.org/v2/api/#vm-slots)

**如果能将虚拟 `dom` 主动渲染成真实 `dom`，那这个问题也就不刃而解了。**

## 组件的注册

一直以来我就对于组件产生的原理很迷惑，只是机械式的引入`import xx.vue`，然后注册`components:{xx}`。

`import` 的 `vue` 文件会解析成一个对象，是一个`包含组件选项的对象`：

![enter description here](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1592993916537.png)

组件的注册方式有 2 种：

1. 全局注册

```JavaScript
  Vue.component('component-a', { /* ... */ })
```

2. 局部注册

```JavaScript
new Vue({
  el: '#app',
  components: {
    'component-a': ComponentA,
    'component-b': ComponentB
  }
})
```

`.vue` 文件中的注册是局部注册，并且这两种注册方式接收的参数都是一个`包含组件选项的对象`。

注册后的组件打印:

![enter description here](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/1592993916551.png)

也就是组件内部的`this`的值。

除此之外还可以用 `Vue.extend` 创建组件：

```javascript
// 创建构造器
var Profile = Vue.extend({
  template: "<p>{{firstName}} {{lastName}} aka {{alias}}</p>",
  data: function() {
    return {
      firstName: "Walter",
      lastName: "White",
      alias: "Heisenberg"
    };
  }
});
// 创建 Profile 实例，并挂载到一个元素上。
new Profile().$mount("#mount-point");
```

同样需要一个`包含组件选项的对象`，这里的`new Profile()`生成一个组件的实例，和上面的两种注册方式结果一样。

## 渲染函数

以模板的方式注册组件：

```javascript
Vue.component("anchored-heading", {
  template: "<p>test</p>"
});
```

以渲染函数的方式注册组件：

```javascript
Vue.component("anchored-heading", {
  render: function(createElement) {
    return createElement("p", "test");
  }
});
```

这里 `createElement` 函数就会返回一个 `vNode`。

> 1. 同时存在 `render` 函数和 `template`，`template` 会不起作用。
> 2. 在单 `.vue` 文件中，不存在 `html` 模板时，`render` 函数才会生效。

渲染函数参考官方文档：

[vue 渲染函数](https://cn.vuejs.org/v2/guide/render-function.html#%E8%8A%82%E7%82%B9%E3%80%81%E6%A0%91%E4%BB%A5%E5%8F%8A%E8%99%9A%E6%8B%9F-DOM)

所以回到开始的问题，**`vNode` 转换为真实 `dom`** 的步骤为：

`vNode` -> 用于 `render` 函数去构建组件选项对象 -> 注册组件（局部注册，全局注册，`Vue.extend` 生成并挂载）

## 实现 ToolTip 组件

对于点击的目标，只需要 `render` 函数直接返回 `vNode` 就可以生成。

```js
// ToolTip.vue
export default {
  render() {
    return this.$slots.default[0];
  }
};
```

而对于点击后产生的内容，则需要手动将 `vNode` 转换为组件，这里采用 `Vue.extend` 的方法。

在组件中引入`import Vue from 'vue'`，才能使用 `Vue.extend` 这个全局方法。

生成 `content` 组件，并挂载到 `body`：

```js
export default {
  methods: {
    creatContent() {
      // that 代表 ToolTip 组件
      const that = this;
      // 创建content组件
      const Content = Vue.extend({
        props: {
          show: {
            type: Boolean,
            default: false
          }
        },
        data() {
          return {
            showContent: false
          };
        },
        watch: {
          show(val) {
            this.showContent = val;
          }
        },
        mounted() {
          // 动画产生需要先 false 后 true 的状态改变
          this.showContent = true;
          this.$nextTick(() => {
            // 设置 content 的位置
            that.setPosition(this.$refs.content, that.$el);
          });
        },
        methods: {
          hide() {
            this.showContent = false;
          },
          afterLeave() {
            // 动画结束后移除
            this.$el.remove();
            that.curShow = false;
            that.$emit("update:show", false);
          }
        },
        render(createElement) {
          const content = createElement(
            "div",
            {
              style: {
                position: "absolute"
              },
              attrs: {
                id: "com-tooltip-content"
              },
              directives: [
                {
                  // v-show指令
                  name: "show",
                  value: this.showContent
                }
              ],
              ref: "content"
            },
            // 传递给 ToolTip 组件的名为 content 的 slot
            that.$slots.content
          );

          return createElement(
            "div",
            {
              class: {
                "com-tooltip": true
              },
              props: {
                show: that.curShow
              },
              on: {
                click: this.hide
              }
            },
            [
              createElement(
                // transition 节点
                "transition",
                {
                  attrs: {
                    name: "com-tooltip-content"
                  },
                  on: {
                    "after-leave": this.afterLeave
                  }
                },
                [content]
              )
            ]
          );
        }
      });

      const div = document.createElement("div");

      document.body.appendChild(div);
      new Content().$mount(div);
    }
  }
};
```

这里生成了 `render` 函数生成的模板为：

```html
<template>
  <div class="com-tooltip" @click="hide">
    <transition name="com-tooltip-content" @after-leave="afterLeave">
      <div
        v-show="showContent"
        id="com-tooltip-content"
        ref="content"
        style="position:absolute"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>
```

`ToolTip` 其实包含两个组件，一个组件（`ToolTip` 组件本身）渲染了`默认 slot`，一个组件（`content` 组件）渲染了 `content slot`。

如果向 `ToolTip` 传递配置 `props`，例如：控制显示、控制位置信息、控制动画，只需要将这些 `props` 再传递给 `content` 组件即可。

当然我们也可以新建一个`.vue` 文件，以模板方式创建 `content` 组件：

```html
<template>
  <div class="com-tooltip" @click="hide">
    <transition name="com-tooltip-content" @after-leave="afterLeave">
      <div
        v-show="showContent"
        id="com-tooltip-content"
        ref="content"
        style="position:absolute"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      // ToolTip组件的引用
      component: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        showContent: false
      };
    },
    watch: {
      show(val) {
        this.showContent = val;
      }
    },
    mounted() {
      this.showContent = true;
      this.$nextTick(() => {
        this.component.setPosition(this.$refs.content, this.component.$el);
      });
    },
    methods: {
      hide() {
        this.showContent = false;
      },
      afterLeave() {
        this.$el.remove();
        this.component.curShow = false;
        this.component.$emit("update:show", false);
      }
    }
  };
</script>

<style lang="less">
  .com-tooltip {
    .fixed-full-screen();
    background-color: transparent;
    font-size: 12px;
    transition: all;
    z-index: 5000;
  }

  .com-tooltip-content-enter-active {
    animation: fade 0.15s ease-out;
  }

  .com-tooltip-content-leave-active {
    animation: fade 0.15s ease-out reverse;
  }
</style>
```

然后在 `ToolTip` 中引入

```html
<!-- ToolTip组件 -->
<script>
  import content from "./content";
  export default {
    methods: {
      creatContent() {
        // that 代表 ToolTip 组件
        const that = this;
        // 创建content组件
        const Content = Vue.extend({
          render(createElement) {
            return createElement(
              content,
              {
                props: {
                  // 传递 show 控制显示
                  show: that.curShow,
                  // 传递 ToolTip 组件本身
                  component: that
                }
              },
              // 将content插槽传递给content组件
              that.$slots.content
            );
          }
          // 渲染为: <content> xx </content>
        });

        const div = document.createElement("div");

        document.body.appendChild(div);
        new Content().$mount(div);
      }
    },
    render() {
      return this.$slots.default[0];
    }
  };
</script>
```

## 总结

任何模板都能写作 `render` 函数，因为就算是使用模板，最后也会被编译成 `render` 函数来创建 `vNode`。

`render` 函数就是层级的使用 `createElement` 来创建层级的 `vNode`。

`vNode` 和组件间存在直接关系，只要知道 `vNode` 那么我们就能以 `vNode`（用于 `render` 函数）来创建组件，进而渲染 `vNode` 为真实 dom。
