class MyPromise {
    status = 'pending';
    resolvedCbs = [];
    rejectCbs = [];
    value = undefined;
    constructor(cb) {
        let resolve = value => {
            this.status = 'resolved';
            this.value = value;
            this.resolvedCbs.forEach(resolvedCb => {
                resolvedCb();
            });
        };

        let reject = value => {
            this.status = 'rejected';
            this.value = value;
            this.rejectCbs.forEach(rejectCb => {
                rejectCb();
            });
        };

        try {
            cb(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    pushResolvedCb(promise, cb, nextResolve, nextReject) {
        let resolvedCb = () => {
            setTimeout(() => {
                if (cb) {
                    try {
                        let res = cb(this.value);
                        resolvePromise(promise, res, nextResolve, nextReject)
                    } catch (error) {
                        nextReject(error);
                    }
                } else {
                    nextResolve(this.value);
                }
            }, 0);
        };

        this.resolvedCbs.push(resolvedCb);
    }

    pushRejectCb(promise, cb, nextResolve, nextReject) {
        let rejectCb = () => {
            setTimeout(() => {
                if (cb) {
                    try {
                        let res = cb(this.value);

                        resolvePromise(promise, res, nextResolve, nextReject)
                    } catch (error) {
                        nextReject(error);
                    }
                } else {
                    nextReject(this.value);
                }
            }, 0);
        };

        this.rejectCbs.push(rejectCb);
    }

    then(cb1, cb2) {
        let newPromise = new MyPromise((resolve, reject) => {
            this.pushResolvedCb(promise, cb1, resolve, reject);
            this.pushRejectCb(promise, cb2, resolve, reject);
        });
        
        if (this.status === 'resolved') {
            this.resolvedCbs.forEach(resolvedCb => {
                resolvedCb();
            });
        } else if (this.status === 'rejected') {
            this.rejectCbs.forEach(rejectCb => {
                rejectCb();
            });
        }

        return newPromise;
    }

    catch(cb) {
        return this.then(null, cb);
    }
}

function resolvePromise(promise, res, nextResolve, nextReject) {
    // 如果相等了，说明return的是自己，抛出类型错误并返回
    if (promise === res) {
        return nextReject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    }
    // 判断x是不是 MyPromise 实例对象
    if (res instanceof MyPromise) {
        // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
        // x.then(value => resolve(value), reason => reject(reason))
        // 简化之后
        res.then(nextResolve, nextReject);
    } else {
        // 普通值
        // 普通值
        nextResolve(x);
    }
}

new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(1);
    }, 100);
})
    .then(value => {
        console.log(value);
        return 2;
    })
    .then(value => {
        console.log(value);
        return new MyPromise((resolve, reject) => {
            resolve(3);
        });
    })
    .then(value => {
        console.log(value);
        return new MyPromise((resolve, reject) => {
            reject(4);
        });
    })
    .then(value => {
        console.log(value);
        return 5;
    })
    .catch(value => {
        console.log(value);
    })
    .catch(value => {
        console.log(value);
    });

function myPromiseAll(promises) {
    return new Promise((resolve, reject) => {
        let res = [];

        function run(p, index) {
            p.then(value => {
                res[index] = value;

                if (res.length === promises.length) {
                    resolve(res);
                }
            }).catch(error => {
                reject(error);
            });
        }

        promises.forEach((p, index) => {
            run(p, index);
        });
    });
}

Promise.prototype.finally = function(callback) {
    // 返回调用的then方法
    // 只要回调成功 就返回this的状态 如果回调执行失败 则直接返回
    return this.then(
        value => {
            console.log(111);
            callback();
            return value;
        },
        reason => {
            console.log(222);
            callback();
            throw reason;
        }
    );
};

Promise.resolve(2).finally(() => {
    return Promise.reject(1);
});
