---
meta:
  - title: Vue原理浅析
    time: 2020-10-27 09:31:51
    tag: Vue
---

# Vue 原理浅析

## 前言

用了这么久的 vue，一直感叹 vue 的神奇之处，本文会对 vue 的一些原理进行阐述，并不是去对源码的一一分析，而是侧重于这些原理的实现方法。

## 数据监听

`vue` 的数据监听是通过 `Object.defineProperty` （ 或 `proxy` ）实现的。当访问和更改数据时，触发绑定的回调函数。

例如：

```js
function defineReactive(data, key, val) {
  // 递归遍历所有子属性
  observe(val)
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      return val
    },
    set: function(newVal) {
      val = newVal
    }
  })
}

function observe(data) {
  if (!data || typeof data !== 'object') {
    return
  }
  Object.keys(data).forEach(function(key) {
    defineReactive(data, key, data[key])
  })
}

var data = {
  book1: {
    name: ''
  },
  book2: ''
}
observe(data)
```

这样当获取/改变 `data` 的属性（或是子属性）时，便会触发相应的 `get/set` 回调。

## 订阅者

除了上面的数据监听外，还需要一个订阅者，订阅者存有视图更新的方法。当数据改变时，通知订阅者，执行订阅者的视图更新方法。

同一个数据改变时，可能会触发多个订阅者，所以这里需要一个订阅器来统一管理这些订阅者。

```js
class Dep {
  constructor() {
    // 所有订阅者
    this.subs = []
  }

  // 添加订阅者
  addSub(sub) {
    this.subs.push(sub)
  }

  notify() {
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}
```

订阅器会在数据被监听时初始化，那订阅者是在何时被添加进入订阅器的呢？


```js
function parsePath(path: string): any {
  const segments = path.split('.')
  return function(obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}
class Watcher {
  constructor(vm, exp) {
    this.vm = vm
    this.getter = parsePath(expOrFn)
  },
  update(){

  }
}
```

initData
proxy 代理
observe(data)
new Observer(data) -- 递归遍历 data，
defineReactive(obj,key,val) 通过闭包方式，维持外部函数 val 引用，使用 Object.defineProperty 为属性添加 set 和 get

Dep 订阅中心，
订阅中心可以添加订阅者
Dep.target 存储的是一个订阅者（Watcher）
每次 defineReactive 都会创建一个订阅中心，同时当触发 get 时，判断 Dep.target 是否存在，如果存在将 Watcher 添加进订阅中心

Watcher 订阅者
每次创建订阅者，会添加进入 Dep.target
可以被添加进订阅中心
