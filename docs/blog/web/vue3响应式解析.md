---
meta:
  - title: vue3响应式解析
    time: 2021-02-22 19:10:39
    tag: vue3,响应式
---

# vue3响应式解析

## 响应式状态

响应式状态一般用 `reactive`, `ref` 语法声明，使用 `Proxy` 监听对象属性的变化。

当声明一个响应式对象时，会深度遍历对象，将对象和子对象放入 `targetMap` 变量中，并为它们的属性添加一个 `dep` 存储所有的 `effects`。

当对应属性变化时，从 `targetMap` 读取到对应 `key` 的 `dep`，并按策略调用所有 `effects` 函数。

![vue响应式数据](https://fireli-1256465711.cos.ap-chengdu.myqcloud.com/img/vue%E5%93%8D%E5%BA%94%E5%BC%8F.png)

<!-- more -->

## effect

`effect` 是响应式基础，`watch`, `watchEffect`, `computed` 都是借助 `effect` 实现，它是一个函数，但会有一些选项：

1. `deps`, `effect` 的依赖。一个 `effect` 可能会有多个依赖，当依赖变化时, `effect` 会根据策略执行。
2. `active`, `effect` 的状态，初始化为 `true`。调用 `stop` 函数，`active` 会被设置成 false，每个 `dep` 中的当前 `effect` 会被清除。当为 `false` 时，`effect` 不会被添加到 `dep` 中。
3. `scheduler`, 调度器。决定 `effect` 会在什么时候执行，一般有以下几个时机：同步、视图更新前、视图更新时、视图更新后。

`effect` 根据函数来创建：

```js
const count = ref(1);
let getter = () => {
  return count.value;
};

let runner = effect(getter, {
  lazy: true,
  onTrack,
  onTrigger,
  scheduler
});
```

当 `count` 变化时：

1. 如果有调度器 `scheduler`，会执行 `scheduler` 函数。
2. 没有会直接执行 `runner`，也就是执行 `getter` 函数。

> 每次执行 `effect` 前，每个 `dep` 中的这个 `effect` 会被清除，然后执行 `effect`，又会将这个 `effect` 添加到每个 `dep` 中去。

## computed

```js
const plusOne = computed({
  get: () => count.value + 1,
  set: (val) => {
    count.value = val - 1;
  }
});
```

`computed` 实现：使用 `get` 函数创建一个 `effect`。**访问时**，如果依赖变化，重新执行回调，如果没变化，返回缓存的值。

内部使用 `effect` 如下：

```js
effect(getter, {
  lazy: true,
  scheduler: () => {
    if (!this._dirty) {
      this._dirty = true;
    }
  }
});
```

自定义了一个调度器 `scheduler`，当 `count` 变化时，执行 `scheduler`，将 `_dirty` 设置为 true，表示下次访问时，表示下次访问时，重新执行 `get` 函数。

## watchEffect

```js
const count = ref(0);

watchEffect(() => console.log(count.value));
```

`watchEffect` 的实现：使用回调创建一个 `effect`。设置一个调度器函数 `scheduler` :

```js
scheduler = () => {
  if (!instance || instance.isMounted) {
    // 推入pre队列
    queuePreFlushCb(runner);
  } else {
    // with 'pre' option, the first call must happen before
    // the component is mounted so it is called synchronously.
    runner();
  }
};

const runner = effect(getter, {
  lazy: true,
  onTrack,
  onTrigger,
  scheduler
});

runner();
```

`scheduler` 作用是将 `effect` 推入一个 `pre` 任务队列。

## watch

```js
const count = ref(0);
watch(count, (count, prevCount) => {
  /* ... */
});
```

`watch` 的实现和 `watchEffect` 类似，不过它是针对依赖对象来创建 `effect`：

```js
getter = () => {
  // 访问count.value
  source.value;
};

scheduler = () => {
  if (!instance || instance.isMounted) {
    // 回调推入pre队列
    queuePreFlushCb(cb);
  } else {
    // with 'pre' option, the first call must happen before
    // the component is mounted so it is called synchronously.
    cb();
  }
};

const runner = effect(getter, {
  lazy: true,
  onTrack,
  onTrigger,
  scheduler
});
```

`count` 变化时，执行 `scheduler`，将 `watch` 的回调推入 `pre` 队列。

## 视图更新

视图更新也是一个 `effect`。通过模板解析，可以得到一个渲染函数，用渲染函数创建一个 `effect`，当对应依赖变化时，`scheduler` 会将渲染函数推入一个 `update` 任务队列。

> 这个 `update` 队列会在 `pre` 队列之后执行。

## 状态变化

当状态变化时，会有 `effect` 推入 pre 或 `update` 队列，在第一次推入时，会设置一个函数在 `nextTick` 释放 `pre` 和 `update` 队列。

> `pre` 队列释放时是递归的，因为 `effect` 执行可能会引起其他 `effect` 被推入到 `pre` 队列，所以需要不断释放 `pre` 队列，直到 `pre` 队列为空。
