function s () {
  let a = 0

  setTimeout(() => {
    a = 5
  }, 200)
  return function () {
    console.log(a)
  }
}

const m = s()

m()
setTimeout(() => {
  m()
}, 300)

const cury = function (fn) {
  let paramsCount = fn.length
  let caches = []

  return function a () {
    const length = arguments.length

    caches = caches.concat([...arguments])
    paramsCount -= length

    if (paramsCount <= 0) {
      console.log(caches)
      return fn(...caches)
    }
    return a
  }
}

const add = function (a, b, c) {
  return a + b + c
}

const t = cury(add)

console.log(t(1)(2)(3))

function array2Tree (array, parentFlag = 'parentId', flag = 'id') {
  if (!Array.isArray(array)) {
    throw new Error('argument is not Array')
  }
  const obj = {}

  array.forEach((item) => {
    const parent = obj[item[parentFlag]]
    const child = obj[item[flag]]

    obj[item[flag]] = item
    if (child) {
      if (child[flag]) {
        throw new Error(`${flag} is not unique`)
      }
      obj[item[flag]].children = child.children
    }

    if (parent) {
      parent.children = parent.children || []
      parent.children.push(item)
    } else {
      obj[item[parentFlag]] = {
        children: []
      }
      obj[item[parentFlag]].children.push(item)
    }

    delete obj[item[flag]][parentFlag]
  })

  return obj
}

console.log(
  array2Tree([
    {
      id: 2,
      val: '班级1',
      parentId: 1
    },
    {
      id: 3,
      val: '班级2',
      parentId: 1
    },
    {
      id: 1,
      val: '学校',
      parentId: null
    },
    {
      id: 5,
      val: '学生2',
      parentId: 3
    },
    {
      id: 4,
      val: '学生1',
      parentId: 2
    },
    {
      id: 6,
      val: '学生3',
      parentId: 3
    }
  ])
)

function treeDFS (node, cb) {
  const children = node.children

  if (!children.length) {
    return
  }
  for (let i = 0; i < children.length; i++) {
    cb(children[i])
    treeDFS(children[i], cb)
  }
  return
}

const obj = {}

function cb (node) {
  const tagName = node.tagName

  if (/^[SH]+/.test(tagName)) {
    obj[tagName] = obj[tagName] || 0
    obj[tagName]++
  }
}

treeDFS(document.body, cb)

console.log(obj)

function adds (a, b, sum = 0) {
  sum += a
  return a === b ? sum : adds(a + 1, b, sum)
}

console.log(adds(1, 100))

const q = [1, 2, 3, 4, 5]

for (let index = 0; index < 100000; index++) {
  q.push(index)
}

const start = performance.now()

const sss = [...q, 8, 9, 10]

console.log(performance.now() - start)

const start1 = performance.now()

const ttt = [8, 9, 10]

for (let index = q.length - 1; index >= 0; index--) {
  ttt.unshift(index)
}

console.log(performance.now() - start1)

class MyPromise {
  constructor (callback) {
    if (typeof callback !== 'function') {
      throw new Error('argument error')
    }

    this.fulfilledCB = []
    this.rejectedCB = []
    this.status = 'pending'
    this.resolve = (res) => {
      setTimeout(() => {
        this.status = 'fulfilled'
        this.fulfilledCB.forEach((cb) => cb(res))
      })
    }
    this.reject = (res) => {
      setTimeout(() => {
        this.status = 'rejected'
        this.rejectedCB.forEach((cb) => cb(res))
      })
    }

    try {
      callback(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }
  addFulfilledCB (callback) {
    typeof callback === 'function' && this.fulfilledCB.push(callback)
  }
  addRejectedCB (callback) {
    typeof callback === 'function' && this.rejectedCB.push(callback)
  }
  then (onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    onRejected =
      typeof onRejected === 'function' ? onRejected : (reason) => reason
    return new MyPromise((resove, reject) => {
      this.addFulfilledCB((value) => {
        const res = onFulfilled(value)

        resove(res)
      })

      this.addRejectedCB((value) => {
        const res = onRejected(value)

        reject(res)
      })
    })
  }
  catch (onRejected) {
    this.onRejected = onRejected
    return new MyPromise((resove, reject) => {
      this.nextResolve = resove
      this.nextReject = reject
    })
  }
}

new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject(1)
  }, 500)
})
  .then((res) => {
    console.log(res)
    return 2
  })
  .then((res) => {
    console.log(res)
  })
  .then((res) => {
    console.log('3')
  })
  .catch((res) => {
    console.log(res)
  })

const o = {
  x: 5,
  a: function (m, fn) {
    fn()
  }
}

global.x = 5

function fn () {
  console.log(this.x)
}

o.a(1, fn)

function map (ary = [], fn) {
  return ary.reduce((total, item, index) => {
    total[index] = fn(item, index)
    return total
  }, [])
}

function throttle (fn, timeout = 20, fisrtExe = true) {
  if (typeof fn !== 'function') {
    throw new Error('argument(s) error')
  }
  let timer = null

  return function () {
    if (fisrtExe) {
      fn.apply(this, arguments)
      fisrtExe = false
    }
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, arguments)
        clearTimeout(timer)
      }, timeout)
    }
  }
}

function debounce (fn, timeout = 20, fisrtExe = true) {
  if (typeof fn !== 'function') {
    throw new Error('argument(s) error')
  }
  let timer = null

  return function () {
    if (fisrtExe) {
      fn.apply(this, arguments)
      fisrtExe = false
    }
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      clearTimeout(timer)
    }, timeout)
  }
}

function bubble (array, desc = false) {
  if (!Array.isArray(array)) {
    throw new Error('argument(s) error')
  }

  for (let i = array.length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      if (desc) {
        if (array[j] < array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]]
        }
      } else {
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]]
        }
      }
    }
  }
  return array
}

function insertSort (array, desc = false) {
  if (!Array.isArray(array)) {
    throw new Error('argument(s) error')
  }

  for (let i = 1; i < array.length; i++) {
    const current = array[i]
    let index = 0

    for (let j = i - 1; j >= 0; j--) {
      if ((!desc && current < array[j]) || (desc && current > array[j])) {
        array[j + 1] = array[j]
      } else {
        index = j + 1
        break
      }
    }

    array[index] = current
  }
  return array
}

class Node {
  constructor (value, next, pre) {
    this.value = value
    this.next = next
    this.pre = pre
  }
}

class LinkedList {
  constructor () {
    this.head = null
    this.tail = null
  }

  append (value) {
    const node = new Node(value)

    if (this.head) {
      node.next = this.head
      this.head = node
    } else {
      this.head = node
    }
  }

  getIndex (value) {
    let index = 0
    let node = this.head

    while (node) {
      if (node.value === value) {
        return index
      }
      node = node.next
      index++
    }
    return -1
  }

  findByValue (value) {
    let node = this.head

    while (node) {
      if (node.value === value) {
        return node
      }
      node = node.next
    }
    return null
  }

  findByIndex (index) {
    let currentIndex = 0
    let node = this.head

    while (node) {
      if (currentIndex === index) {
        return node
      }
      node = node.next
      currentIndex++
    }
    return null
  }

  findPreNode (value) {
    let node = this.head

    while (node && node.next) {
      if (node.next.value === value) {
        return node
      }
      node = node.next
    }
    return null
  }

  insert (value, newValue) {
    const node = this.findByValue(value)

    if (node) {
      const newNode = new Node(newValue)

      newNode.next = node.next
      node.next = newNode
    }
  }

  remove (value) {
    const preNode = this.findPreNode(value)

    if (this.head.value === value) {
      this.clear()
    }

    if (preNode) {
      preNode.next = preNode.next.next
    }
  }

  size () {
    let size = 0
    let node = this.head

    while (node) {
      size++
      node = node.next
    }
    return size
  }

  clear () {
    this.head = null
  }
}

const list = new LinkedList()

list.append('a')
console.log(list)
list.append('b')
console.log(list)
list.insert('a', 'c')
console.log(list)
list.insert('c', 'd')
console.log(list)
list.remove('a')
console.log(list)
list.remove('b')
console.log(list)

/**
 *
 * @param {Array|String} str 带排列的字符串或者数组
 * @param {Number} [str.length] 从中选取多少项排列
 */

function permutation (str, n = str.length) {
  const array = Array.isArray(str) ? str : str.split('')

  if (array.length === 0) {
    return []
  }

  const res = []
  const length = n

  function select (array, start, end, n) {
    if (n < 1) {
      res.push(array.slice(0, length).join(''))
      return ''
    }

    const selected = {}

    for (let i = start; i < end; i++) {
      // 去除重复的选择
      if (selected[array[i]]) {
        continue
      }
      selected[array[i]] = 1;
      [array[start], array[i]] = [array[i], array[start]]
      select(array, start + 1, end, n - 1);
      [array[start], array[i]] = [array[i], array[start]]
    }
  }
  select(array, 0, array.length, n)
  return res
}

console.log(permutation('aabc'))

function permutationDictionary (str) {
  const array = Array.isArray(str) ? str : str.split('')

  if (array.length === 0) {
    return []
  }

  array.sort()

  const res = [array.concat().join('')]

  let i

  while (true) {
    for (i = array.length - 2; i >= 0; i--) {
      if (array[i] < array[i + 1]) {
        let index = 0

        for (let j = array.length - 1; j > i; j--) {
          if (array[j] > array[i]) {
            index = j
            break
          }
        }

        [array[i], array[index]] = [array[index], array[i]]

        for (let s = i + 1, e = array.length - 1; s < e; s++, e--) {
          [array[s], array[e]] = [array[e], array[s]]
        }
        res.push(array.concat().join(''))
        break
      }
    }
    // 没有发生交换，跳出while
    if (i < 0) {
      break
    }
  }

  return res
}

console.log(permutationDictionary('aabc'))

function lengthOfLongestSubstring (str) {
  let maxLength = 1
  const dp = []

  dp[0] = str[0]
  maxLength = dp[0].length

  for (let i = 1; i < str.length; i++) {
    const index = dp[i - 1].indexOf(str[i])

    dp[i] = dp[i - 1].slice(index + 1) + str[i]
    maxLength = Math.max(maxLength, dp[i].length)
  }
  return maxLength
}

console.log(lengthOfLongestSubstring('pwwwwwsaqkew'))

function longestPalindrome (str) {
  if (str.length === 0) {
    return
  }
  const dp = []
  let start = 0
  let end = 0

  for (let i = 0; i < str.length; i++) {
    dp[i] = []
    dp[i][i] = true
  }

  for (let j = 1; j < str.length; j++) {
    for (let i = 0; i < j; i++) {
      if (j - i < 3) {
        dp[i][j] = str[i] === str[j]
      } else {
        dp[i][j] = str[i] === str[j] && dp[i + 1][j - 1]
      }

      if (dp[i][j] && j - i > end - start) {
        start = i
        end = j
      }
    }
  }

  return str.slice(start, end + 1)
}

console.log(longestPalindrome('pwwwawwsaqkew'))

function aaaaa (array) {
  const dp = []

  dp[0] = array[0]
  dp[1] = array[1]
  for (let i = 2; i < array.length; i++) {
    const element = array[i]

    dp[i] = Math.min(dp[i - 1] + array[i], dp[i - 2] + array[i])
  }
  return Math.min(dp[array.length - 1], dp[array.length - 2])
}

console.log(aaaaa([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]))

function hasPath (matrix, rows, cols, path) {
  const array = []

  for (let i = 0; i < rows; i++) {
    array[i] = matrix.slice(i * cols, cols * (i + 1))
  }
  matrix = array

  const cache = []

  function check (i, j, p) {
    if (cache.includes(i + '' + j)) {
      return false
    }
    if (path[p] === undefined) {
      return true
    }
    if ((matrix[i] && matrix[i][j]) === path[p]) {
      cache.push(i + '' + j)

      for (let s = 0; s < 4; s++) {
        if (s === 0) {
          if (check(i, j - 1, p + 1)) {
            return true
          }
        }
        if (s === 1) {
          if (check(i - 1, j, p + 1)) {
            return true
          }
        }
        if (s === 2) {
          if (check(i, j + 1, p + 1)) {
            return true
          }
        }
        if (s === 3) {
          if (check(i + 1, j, p + 1)) {
            return true
          }
        }
      }
      cache.pop()
    }
    return false
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (check(i, j, 0)) {
        return true
      }
    }
  }
  return false
}

console.log(hasPath('ABCESFCSADEE', 3, 4, 'ABCCED'))

function backpackFull (c, w, v) {
  if (v.length !== w.length) {
    return 0
  }

  const nums = v.length
  const dp = []

  dp[0] = []
  for (let i = 0; i <= c; i++) {
    // 初始放入0个物品，价值为0
    dp[0][i] = 0
  }

  for (let i = 0; i < nums; i++) {
    // index表示第几个物品，索引从0开始，加1
    const index = i + 1

    dp[index] = []
    for (let j = 0; j <= c; j++) {
      // 初始化为0
      dp[index][j] = 0
      // 循环依次放入 k 个当前物品
      for (let k = 0; k <= j; k++) {
        // 当 k 个物品体积和大于背包体积时，跳出循环
        if (k * w[i] > j) {
          break
        }
        // 取每次最大值
        dp[index][j] = Math.max(
          dp[index][j],
          dp[index - 1][j - k * w[i]] + k * v[i]
        )
      }
    }
  }

  return dp[nums][c]
}

console.log(backpackFull(4, [2, 3], [6, 11]))
// let obj = {},
//   map = new Map(),
//   array=[],
//   n = 10000
// for (let i = 0; i < n; i++) {
//   obj[i] = i
//   map.set(i, i)
//   array.push(i)
// }

// let result

// console.time('Object')
// result = obj['7451']
// console.timeEnd('Object')
// // Object: 0.250ms

// console.time('Map')
// result = map.get(789451)
// console.timeEnd('Map')

// console.time('array')
// result = array[751]
// console.timeEnd('array')

// console.time('Object')
// obj[n] = n
// console.timeEnd('Object')
// // Object: 0.229ms

// console.time('Map')
// map.set(n, n)
// console.timeEnd('Map')

// console.time('Object')
// delete obj['456789']
// console.timeEnd('Object')
// // Object: 0.229ms

// console.time('Map')
// map.delete(456789)
// console.timeEnd('Map')

// console.time('Object')
// for (let i = 0; i < n; i++) {
//   obj[i+'ss']='sss'
// }
// console.timeEnd('Object')
// // Object: 0.229ms

// console.time('Map')
// for (let i = 0; i < n; i++) {
//   map.set(`${i}ss`,'sss')
// }
// console.timeEnd('Map')

new Promise((resolve) => {
  const a = 1

  a.fff()
})

Promise.resolve('ss')

function promiseAll (promises) {
  return new Promise(function (resolve, reject) {
    if (!Array.isArray(promises)) {
      throw new TypeError('argument must be a array')
    }
    let resolvedCounter = 0
    const promiseNum = promises.length
    const resolvedResult = []

    for (let i = 0; i < promiseNum; i++) {
      Promise.resolve(promises[i]).then(
        (value) => {
          resolvedCounter++
          resolvedResult[i] = value
          if (resolvedCounter == promiseNum) {
            return resolve(resolvedResult)
          }
        },
        (error) => {
          return reject(error)
        }
      )
    }
  })
}

const sssss = [
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(1)
    }, 1000)
  }),
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(2)
    }, 80)
  })
]

promiseAll(sssss).then((a) => {
  console.log(a)
})

Promise.resolve(
  new Promise((resolve) => {
    setTimeout(() => {}, 100)
  })
).then((a) => {
  console.log('sss')
})

new Promise((resolve) => {
  setTimeout(() => {}, 100)
}).then((a) => {
  console.log('ss')
})

// let obj = {
//   a: 1,
//   b: 1,
//   c: 1,
//   *[Symbol.iterator]() {
//     for (let key of Object.keys(this)) {
//       yield key
//     }
//   }
// }
// for (let key of obj) {
//   console.log(key)
// }

function quickSort (arr) {
  if (arr.length <= 1) {
    return arr
  }

  const pivotIndex = Math.floor(arr.length / 2)
  const pivot = arr.splice(pivotIndex, 1)[0]


  const left = []
  const right = []

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }

  return quickSort(left).concat(pivot, quickSort(right))
}

console.log(quickSort([1, 78, 33, 45, 99, 0, 1465, 452, 65746]))


Function.prototype.call = function (context, ...args) {
  const fn = Symbol('fn')

  context.fn = this

  const result = context.fn(...args)

  delete context.fn
  return result
}

const ass = {
  a: 5
}


function callF () {
  console.log(this.a)

}

console.log(callF.call(ass))