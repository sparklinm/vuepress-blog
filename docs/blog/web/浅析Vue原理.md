---
meta:
    - title: Vue原理浅析
      time: 2020-10-27 09:31:51
      tag: Vue
---

# Vue 原理浅析

## 前言

对 vue 原理的一些简单解析。

## 数据监听

`vue` 的数据监听是通过 `Object.defineProperty` （ 或 `proxy` ）实现的。当访问和更改数据时，触发绑定的回调函数。

<!-- more -->

例如：

```js
function defineReactive(data, key, val) {
    // 递归遍历所有子属性
    observe(val);
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            // more
            return val;
        },
        set: function(newVal) {
            // more
            val = newVal;
        }
    });
}

function observe(data) {
    if (!data || typeof data !== 'object') {
        return;
    }
    Object.keys(data).forEach(function(key) {
        defineReactive(data, key, data[key]);
    });
}

var data = {
    book1: {
        name: ''
    },
    book2: ''
};
observe(data);
```

这样当获取/改变 `data` 的属性（或是子属性）时，便会触发相应的 `get/set` 回调。

## 订阅者

除了上面的数据监听外，还需要一个订阅者（ `Watcher` ），订阅者存有视图更新的方法。当数据改变时，通知订阅者，执行订阅者的视图更新方法。

同一个数据改变时，可能会触发多个订阅者，所以这里需要一个订阅器来统一管理这些订阅者。

订阅器会在数据被监听时初始化，那订阅者是在何时被添加进入订阅器的呢？

设置 `Dep.target`， `target` 储存的是一个订阅者，当访问监听的数据时，如果 `target` 存在，那就将 `target` 添加进入对应的订阅器中。

这样只要设置 `Dep.target === someWatcher` ，再主动访问莫个被 `observe` 的数据，那就会将这个订阅者添加进入对应的订阅器。

```js
function defineReactive(data, key, val) {
    // 递归遍历所有子属性
    const dep = new Dep();

    observe(val);
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            if (Dep.target) {
                // 订阅器中添加Dep.target
                dep.depend();
            }
            return val;
        },
        set: function(newVal) {
            val = newVal;
            // 通知订阅器
            dep.notify();
        }
    });
}

// 订阅器
class Dep {
    id;
    constructor() {
        this.id = uid++;
        // 所有订阅者
        this.subs = [];
    }

    // 添加订阅者
    addSub(sub) {
        this.subs.push(sub);
    }

    // 将 target 存储的订阅者添加进入当前 dep
    depend() {
        if (Dep.target) {
            Dep.target.addDep(this);
        }
    }

    notify() {
        const subs = this.subs;

        for (let i = 0, l = subs.length; i < l; i++) {
            // 订阅者的更新方法
            subs[i].update();
        }
    }
}

Dep.target = null;
const targetStack = [];

// 设置 Dep.target
function pushTarget(target) {
    targetStack.push(target);
    Dep.target = target;
}

function popTarget() {
    targetStack.pop();
    Dep.target = targetStack[targetStack.length - 1];
}
```

接下来需要实现的是订阅者，订阅者在模板编译的时候被创建，订阅的消息是某个数据的改变。

创建订阅者时，设置 `Dep.target`，再访问对应数据，触发相应 `get` 来使订阅者被添加到对应订阅器。

```js
function parsePath(path) {
    const segments = path.split('.');

    return function(obj) {
        for (let i = 0; i < segments.length; i++) {
            if (!obj) return;
            obj = obj[segments[i]];
        }
        return obj;
    };
}

class Watcher {
    constructor(vm, exp, cb) {
        this.vm = vm;
        this.cb = cb;
        // 添加了当前 Watcher 的 Dep 数组
        this.deps = new Set();
        this.getter = parsePath(exp);
        this.value = this.get();
    }

    get() {
        pushTarget(this);
        let value;
        const vm = this.vm;

        try {
            // 触发数据的 get，将当前 Watcher 添加到对应 Dep
            value = this.getter.call(vm, vm);
        } catch (e) {
            if (this.user) {
                console.error(e, vm, `getter for watcher "${this.expression}"`);
            } else {
                throw e;
            }
        } finally {
            popTarget();
        }
        return value;
    }

    addDep(dep) {
        // 检查是否已经添加了
        if (!this.deps.has(dep)) {
            this.deps.add(dep);
            dep.addSub(this);
        }
    }

    update() {
        const oldValue = this.value;
        const value = this.get();

        if (value !== oldValue) {
            this.value = value;
            if (this.cb) {
                this.cb.call(this.vm, value, oldValue);
            }
        }
    }
}

var data = {
    book1: {
        name: ''
    },
    book2: ''
};
observe(data);
new Watcher(data, 'book1.name', () => {
    console.log('update view');
});

data.book1.name = '书名';
// update view
```

## watch API

`watch` 就是对上述过程的一个封装：

```js
const data = {
    book1: {
        name: '书名1'
    },
    book2: ''
};

observe(data);

function watch(exp, fn) {
    return new Watcher(data, exp, cb);
}

watch('book1.name', () => {
    console.log('change');
});

data.book1.name = '书名2';
// change
```

## Computed

首先要明白 `computed` 的特性：

```js
export default {
    computed: {
        text() {
            return this.name + this.id;
        }
    }
};
```

1. 在组件实例上定义一个 **text 属性**。
2. 当访问 **text 属性** 时，会调用 `computed` 中 **text 函数**，将函数的返回值赋值给 **text 属性**。
3. 如果 **text 函数** 依赖值未发生改变时，再次访问 **text 属性**，那么不会执行 **text 函数**，而是直接返回上一次的结果。

首先，需要创建一个 `Watcher`，将 **text 函数** 传入 `Watcher`。如果 **text 属性** 不被访问，**text 函数** 永远不被执行。

当第一次访问 **text 属性** 时，会设置 `Dep.target` ，执行 **text 函数** ，并将这个 `Watcher` 添加到所有依赖数据的 `Dep` 中。

然后，在依赖项改变时，并不是去直接执行**text 函数**。而是给这个 `Watcher` 设置一个标志，表示依赖项已经改变。

获取值时，从 `Watcher` 中获取，判断依赖项是否改变，如果改变，则从新执行函数，没有改变则获取上一次的值。

```js
class Watcher {
    constructor(vm, expOrFn, cb, options) {
        if (options) {
            this.lazy = !!options.lazy;
        }

        // 用于 computed，表示依赖性是否改变
        this.dirty = this.lazy;
        this.vm = vm;
        this.cb = cb;
        // 添加了当前订阅者的 Dep 数组
        this.deps = new Set();

        if (typeof expOrFn === 'function') {
            this.getter = expOrFn;
        } else {
            this.getter = parsePath(expOrFn);
        }
        this.value = this.lazy ? undefined : this.get();
    }

    // ... 其他的方法同上面

    evaluate() {
        this.value = this.get();
        this.dirty = false;
    }

    // Dep 通知 Watcher 更新
    update() {
        if (this.lazy) {
            // 依赖项已经改变
            this.dirty = true;
        } else {
            this.run();
        }
    }

    run() {
        const oldValue = this.value;
        const value = this.get();

        if (value !== oldValue) {
            this.value = value;
            if (this.cb) {
                this.cb.call(this.vm, value, oldValue);
            }
        }
    }
}

function computed(fn) {
    const watcher = new Watcher(data, fn, () => {}, {
        lazy: true
    });

    return function() {
        if (watcher) {
            // 依赖项改变时，重新获取
            if (watcher.dirty) {
                watcher.evaluate();
            }
            return watcher.value;
        }
    };
}

const data = {
    book1: {
        name: '书名1'
    },
    book2: '第二本书'
};

observe(data);

const name = computed(() => {
    console.log('run computed');

    return data.book1.name + '，' + data.book2;
});

console.log(name());
console.log(name());
data.book1.name = '书名2';
console.log(name());

// run computed
// 书名1，第二本书

// 书名1，第二本书

// run computed
// 书名2，第二本书
```
