class MyPromise {
    status = 'pending';
    resolvedCbs = [];
    rejectedCbs = [];
    value = undefined;
    constructor (cb) {
        const resolve = (value) => {
            this.status = 'resolved';
            this.value = value;
            this.resolvedCbs.forEach((resolvedCb) => {
                resolvedCb();
            });
        };

        const reject = (value) => {
            this.status = 'rejected';
            this.value = value;
            this.rejectedCbs.forEach((rejectedCb) => {
                rejectedCb();
            });
        };

        try {
            cb(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    getResolvedCb (promise, cb, nextResolve, nextReject) {
        const resolvedCb = () => {
            setTimeout(() => {
                try {
                    const res = cb(this.value);

                    resolvePromise(promise, res, nextResolve, nextReject);
                } catch (error) {
                    nextReject(error);
                }
            }, 0);
        };

        return resolvedCb;
    }

    getRejectedCb (promise, cb, nextResolve, nextReject) {
        const rejectedCb = () => {
            setTimeout(() => {
                try {
                    const res = cb(this.value);

                    resolvePromise(promise, res, nextResolve, nextReject);
                } catch (error) {
                    nextReject(error);
                }
            }, 0);
        };

        return rejectedCb;
    }

    then (cb1, cb2) {
        let nextResolve = null;
        let nextReject = null;
        const nextPromise = new MyPromise((resolve, reject) => {
            nextResolve = resolve;
            nextReject = reject;
        });

        if (!cb1) {
            cb1 = () => {
                return;
            };
        }

        if (!cb2) {
            cb2 = () => {
                throw new Error();
            };
        }

        const resolvedCb = this.getResolvedCb(nextPromise, cb1, nextResolve, nextReject);
        const rejectedCb = this.getRejectedCb(nextPromise, cb2, nextResolve, nextReject);

        if (this.status === 'resolved') {
            resolvedCb();
        } else if (this.status === 'rejected') {
            rejectedCb();
        } else if (this.status === 'pending') {
            this.resolvedCbs.push(resolvedCb);
            this.rejectedCbs.push(rejectedCb);
        }

        return nextPromise;
    }

    catch (cb) {
        return this.then(null, cb);
    }
}

function resolvePromise (promise, res, nextResolve, nextReject) {
    // 如果相等了，说明return的是自己，抛出类型错误并返回
    if (promise === res) {
        return nextReject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    }
    // 判断 res 是不是 MyPromise 实例对象
    if (res instanceof MyPromise) {
        // 需要在回调返回的 promise 状态改变时执行 then 函数得到的新 promise 对应的 resolve 或者 reject
        res.then(nextResolve, nextReject);
    } else {
        // 普通值
        nextResolve(res);
    }
}

new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(1);
    }, 100);
})
    .then((value) => {
        console.log(value);
        return 2;
    })
    .then((value) => {
        console.log(value);
        return new MyPromise((resolve, reject) => {
            resolve(3);
        });
    })
    .then((value) => {
        console.log(value);
        return new MyPromise((resolve, reject) => {
            reject(4);
        });
    })
    .then((value) => {
        console.log(value);
        return 5;
    })
    .catch((value) => {
        console.log(value);
    })
    .catch((value) => {
        console.log(value);
    });

function myPromiseAll (promises) {
    return new Promise((resolve, reject) => {
        const res = [];

        function run (p, index) {
            p.then((value) => {
                res[index] = value;

                if (res.length === promises.length) {
                    resolve(res);
                }
            }).catch((error) => {
                reject(error);
            });
        }

        promises.forEach((p, index) => {
            run(p, index);
        });
    });
}

Promise.prototype.finally = function (cb) {
    return this.then(
        function (value) {
            // 这是由于 cb() 可能返回一个 promise
            // 如果 cb() 的 promise 为 rejected，那 finally 得到的 promise 也同样是 rejected
            // 如果是 resolved 那和原 promise 一致
            return Promise.resolve(cb()).then(function () {
                return value;
            });
        },
        function (err) {
            return Promise.resolve(cb()).then(function () {
                throw err;
            });
        }
    );
};


