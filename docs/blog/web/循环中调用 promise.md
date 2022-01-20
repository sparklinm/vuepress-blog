---
meta:
    - title: 循环中调用 promise
      time: 2019-12-21 10:08:46
      tag: js
---

# 循环中调用 Promise

## 前言

有这样一个需求：

1. 让循环中所有 `promise` 都调用完成后，再执行某个操作。
2. 循环中后一个 `promise` 依赖于前一个 `promise` 的结果。

例如：请求后台某个接口，得到数据后再请求另一个另一个接口，最后所有请求完毕后执行一个操作。

<!-- more -->

## Promise 特性

`promise` 有三种状态：

1. `pending` - 进行中
2. `fulfilled` - 成功
3. rejected - 失败

```js
// pending状态
new Promise((reolve, reject) => {
    // 转换为 fulfilled 状态
    resolve();
    // 转换为 rejected 状态
    reject();
});
```

也就是当为 `fulfilled` 状态时，可以执行 `then` 函数；当为 `rejected` 状态时可以执行 `catch` 函数。

除此之外，Promise 还有以下特性：

1. `then()` 中会返回一个 `promise` 对象，因此可以 `promise.then().then()` 这样链式调用。
2. 中断 promise 链，可以通过在其中一个 `then()` 抛出一个异常或者返回 Promise.reject，那么就会直接跳到下一个 `catch` 处捕获。
3. `Promise.prototype.then(onFulfilled, onRejected)` 会返回一个新的 `promise` ，若 `onFulfilled` 或 `onRejected` 是一个函数，当函数内返回一个新 `promise` 对象时， `then` 返回的 `promise` 对象的状态将跟新对象保持一致。也就是说 **then 得到的 promise 对象始终跟随回调函数的返回**。
4. 如果 `promise` 链中的某个 `then` 捕获了错误，那么后续的 `catch` 将不会有作用，并且后续的 `then` 还是会被调用，如下：

    ```js
    Promise.resolve()
        .then(() => {
            console.log('[onFulfilled_1]');
            throw 'throw on onFulfilled_1';
        })
        .then(
            () => {
                console.log('[onFulfilled_2]');
            },
            (err) => {
                // 捕获错误
                console.log('[onRejected_2]', err);
                // 返回一个pending状态的promise中断这样的promise
                // return new Promise(()=>{})
            }
        )
        .then(() => {
            // 该函数将被调用
            console.log('[onFulfilled_3]');
        })
        .catch((err) => {
            // 不会捕获
            console.log('[catch]', err);
        })
        .then(() => {
            console.log('[onFulfilled_4]');
        });
    ```

5. `finally` 得到的 `promise` 状态与原 `promise` 一致，但如果 `finally` 的回调函数中 `throw` （或返回 `rejected` 的 `promise` ），那 `finally` 得到的 `promise` 也会以同样的值拒绝：

    ```js
    // (fulfilled的结果为undefined)
    Promise.reject(3).then(
        () => {},
        () => {}
    );
    // rejected 的结果为 3，与原 promise 一致
    Promise.reject(3).finally(() => {});
    // rejected 的结果为 1，与回调中 rejected promise 一致
    Promise.resolve(2).finally(() => {
        return Promise.reject(1);
    });
    ```

根据规则 3，可以在 `then` 或 `catch` **返回一个 `pending` 状态的 promise 来中断 promise 链**。

## 实现

```Js
/**
 * @description 依次按序执行 promise，全部调用完毕后返回一个新的 promise。
 * @param {Arry} pFAry 数组，元素是函数，函数返回 promise 对象。
 * 函数接收上一次 promise resolve 的参数。
 * @returns {Promise} 新的 fulfilled 状态 promise 对象。
 * 传递最后一次 promise resolve 的参数。
 */
function promiseOrder (pFAry) {
  return new Promise((resolve, reject) => {
    let promise = Promise.resolve()

    // 由于要最后一个promise执行完毕，才resolve，这里需要pFAry.length + 1
    for (let i = 0; i < pFAry.length + 1; i++) {
      promise = promise.then((res) => {
        if (i === pFAry.length) {
          resolve(res)
        } else {
          return pFAry[i](res)
        }
      }).catch((error) => {
        reject(error)
        // 捕获错误后由于下一次循环依然会添加then，需要返回一个pending状态的promise来中断后面的所有操作
        return new Promise(() => {})
      })
    }
  })
}

// 使用
function getA() {
    return new Promise((resolve, reject) => {
        get('/user/a', (status, res) => {
            if (status == 200) {
                resolve(res)
            } else {
                reject('error')
            }
        })
    })
}
function getB(dataA) {
    return new Promise((resolve, reject) => {
        get('/user/b', dataA, (status, res) => {
            if (status == 200) {
                resolve(res)
            } else {
                reject('error')
            }
        })

    })
}
function getC(dataB) {
    return new Promise((resolve, reject) => {
        get('/user/c', dataB, (status, res) => {
            if (status == 200) {
                resolve(res)
            } else {
                reject('error')
            }
        })

    })
}
promiseOrder([getA,getB,getC]).then((res)=>{
    console.log('success');
    console.log(res);
})
```
