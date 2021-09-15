let uid = 0;

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

function parsePath(path) {
    const segments = path.split('.');

    return function (obj) {
        for (let i = 0; i < segments.length; i++) {
            if (!obj) return;
            obj = obj[segments[i]];
        }
        return obj;
    };
}

class Watcher {
    constructor(vm, expOrFn, cb, options) {
        if (options) {
            this.lazy = !!options.lazy;
        }
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

    get() {
        pushTarget(this);
        let value;
        const vm = this.vm;

        try {
            // 触发数据的 get，将当前订阅者添加到对应订阅器
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

    evaluate() {
        this.value = this.get();
        this.dirty = false;
    }

    update() {
        if (this.lazy) {
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

function defineReactive(data, key, val) {
    // 递归遍历所有子属性
    const dep = new Dep();

    observe(val);
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            if (Dep.target) {
                // 订阅器中添加Dep.target
                dep.depend();
            }
            return val;
        },
        set: function (newVal) {
            val = newVal;
            // 通知订阅器
            dep.notify();
        }
    });
}

function observe(data) {
    if (!data || typeof data !== 'object') {
        return;
    }
    Object.keys(data).forEach(function (key) {
        defineReactive(data, key, data[key]);
    });
}

const data = {
    book1: {
        name: '书名1'
    },
    book2: '第二本书'
};

observe(data);

function watch(exp, cb) {
    new Watcher(data, exp, cb);
}

// watch('book1', () => {
//   console.log('change')
// })

function computed(fn) {
    const watcher = new Watcher(data, fn, () => {}, {
        lazy: true
    });

    return function () {
        if (watcher) {
            if (watcher.dirty) {
                watcher.evaluate();
            }
            return watcher.value;
        }
    };
}

const name = computed(() => {
    console.log('run computed');

    return data.book1.name + '，' + data.book2;
});

console.log(name());
console.log(name());
data.book1.name = '书名2';
console.log(name());

class AxiosRace {
    #preCancelTokenSource = null;
    #firstRequest = null;
    hasFirstRequest = false;

    constructor(options) {
        let { blockAfter, cancelBefore } = options;

        if (cancelBefore) {
            this.request = this.#requestCancelBefore;
            return;
        }

        if (blockAfter) {
            this.request = this.#requestBlockAfter;
            return;
        }

        throw new Error('please provide the correct options');
    }

    // 取消之前的请求，只有最后一个请求有效
    #requestCancelBefore(url, config) {
        let axiosConfig = { ...config };

        // 取消上一次请求
        if (this.#preCancelTokenSource) {
            this.#preCancelTokenSource.cancel();
        }

        // 创建 cancel token
        const source = CancelToken.source();
        axiosConfig.cancelToken = source.token;

        // 存储 cancel token
        this.#preCancelTokenSource = source;

        return axios.request(url, axiosConfig).finally(() => {
            this.#preCancelTokenSource = null;
        });
    }

    // 后面的请求不执行，并返回第一个请求的结果
    #requestBlockAfter(url, config) {
        // 返回第一次请求的结果
        if (this.#firstRequest) {
            return this.#firstRequest;
        }

        this.#firstRequest = axios.request(url, config).finally(() => {
            this.#firstRequest = null;
            this.hasFirstRequest = false;
        });
        this.hasFirstRequest = true;

        return this.#firstRequest;
    }
}

let axiosRace = new AxiosRace({ blockAfter: true });

console.log(axiosRace);
