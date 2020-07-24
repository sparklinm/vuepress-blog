---
meta:
  - title: 实践 token 验证
    time: 2020-07-30 15:42:36
    tag: token,js,后端
---

# 实践 token 验证

## 原理

token 代表用户的身份，当用户第一次登录后，服务器生成一个 token 并将此 token 返回给客户端，当客户端需要请求数据时，带上 token，服务器根据 token 识别用户。

后端需要**验证**、**刷新**和返回 token。

前端也需要根据返回的验证结果来作出不同相应（例如验证失败跳转登录页面），同时相应页面作**路由拦截**。

<!-- more -->

## 前端

### 登录

检查本地 token 是否存在

- 存在，请求用户信息
  用户信息接口验证 token
  - 合法
    返回用户信息
  - 不合法
    返回 401
- 不存在，调用登录接口
  登录成功返回 token，保存 token

token 保存在全局变量中，例如 vuex。

离开页面时，token 保存在 localStorage(或 cookie) 中。

用户进入页面时，从 localStorage 获取 token，如果 token 存在，直接调用登录接口自动登录，并保存 token 到全局。

### 路由拦截

路由如果需要登录权限
获取当前 token

- 如果 token 存在
  跳转路由
- 不存在
  弹出登录框（或提示前往登录页面），
  登录成功后，跳转路由

```js
// 路由拦截
router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  if (to.meta.auth) {
    const token = store.state.user.token

    if (token) {
      next()
    } else {
      // // 跳往登录页面
      // next({
      //   path: '/login',
      //   // 将跳转的路由path作为参数，登录成功后再跳转回来
      //   query: {
      //     redirect: to.fullPath
      //   }
      // })

      // 弹出登录框
      // 为Vue添加弹出登录框的实例方法
      // Vue.prototype.login().then(()=>{
      //   next()
      // })
  } else {
    next()
  }
})
```

### 请求拦截

如果当前 token 存在，请求附带 token

```js
import axios from 'axios'
import store from '@/store'
// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 这里使用了 vuex 存储当前 token
    const token = store.state.user.token

    // token 保存在请求头的 Authorization字段
    // Bearer 类型 token
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }

    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)
```

### 响应拦截

- 响应成功（返回 200）
  如果返回信息中有 token，保存 token
- 响应失败
  如果状态码是否等于 401，提示登录过期，清除当前 token

```js
const getToken = (authorization) => {
  return authorization.split(' ')[1]
}

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 后端返回的新 token 放到返回头的 authorization 中
    const authorization = response.headers.authorization

    if (authorization) {
      const token = getToken(authorization)

      store.commit('user/setToken', token)
    }
    return response
  },
  function(error) {
    const res = error.response

    // 身份验证失败
    if (res.status === 401) {
      const token = store.state.user.token

      if (token) {
        // 提示登录过期
        // 清除本地的用户信息
        // 删除token
      }
    }

    return Promise.reject(error)
  }
)
```

## 服务端

### 登录接口

登录接口登录成功时返回 token

### 验证和刷新 token

在处理请求前拦截请求，如果访问的是需要登录权限的接口，则验证 token

- 验证成功
  - 如果 token 满足刷新条件，创建一个新 token
  - 处理请求成功，将新 token 一起返回
- 验证失败
  - 返回 401

## token

### 生成

token 生成可以使用 [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)。

这里根据 用户 ID 生成 token

```js
const jwt = require('jsonwebtoken')
const secret = 'a secret key2'
const options = {
  // 1小时过期
  expiresIn: 60 * 60,
  // 加密算法
  algorithm: 'HS256'
}
const generateToken = (user) => {
  const payload = {
    userID: user.id
  }
  const token = jwt.sign(payload, secret, options)

  return token
}
```

### 解析

要获取 token 中保存的信息，例如用户 ID，可以通过 `decode` 方法：

```js
const decodeToken = (token) => {
  const decoded = jwt.decode(token)
  // decoded.userID

  return decoded
}
```

### 刷新 token

当 token 的剩余时间在 30 分钟以内时，创建新的 token，并返回给客户端。

```js
const refreshToken = (token) => {
  const optionKeys = ['iat', 'exp', 'iss', 'sub']
  const playload = decodeToken(token)
  let newToken = ''
  const obj = {}
  // 剩余时间 30min
  const remainTime = 30 * 60
  const now = Math.floor(Date.now() / 1000)
  const timeToExpire = playload['exp'] - now

  if (timeToExpire < remainTime) {
    for (const key in playload) {
      if (optionKeys.indexOf(key) === -1) {
        obj[key] = playload[key]
      }
    }

    newToken = jwt.sign(obj, secret, options)
  }

  return newToken
}
```

也可以自定义刷新策略，例如剩余 2 小时刷新。

或者每次请求都刷新 token 时间，或是即使 token 过期后一段时间任然可以刷新。

当新 token 产生后，旧的 token 依然生效。如果需要可以自定义一个黑名单，并将旧的 token 其加入。

如果你是每次请求都去刷新 token，那会不断向黑名单中加入 token，不断的生成 token 和黑名单占用空间对服务器性能的影响需要考虑。

## 服务端拦截请求

在客户端请求被处理前需要拦截并验证 token 和判断 token 是否需要刷新。

这里用的 `nodejs` 的 `express` 框架，验证 token 使用的 [express-jwt](https://github.com/auth0/express-jwt) 库:

```js
const app = express()
const expressJWT = require('express-jwt')
const { secret, refreshToken, getToken } = require('./token')

// 请求前先验证token
app.use(
  expressJWT({
    secret: secret,
    algorithms: ['HS256']
  }).unless({
    // login 请求不验证
    path: ['/login']
  })
)

// 错误处理
app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send(err)
  } else if (err.name === 'TokenExpiredError') {
    res.status(401).send(err)
    // 或者刷新token
  } else {
    next()
  }
})

// 刷新token
app.use(function(req, res, next) {
  const authorization = req.get('Authorization')

  if (authorization) {
    const token = getToken(authorization)
    const newToken = refreshToken(token)

    if (newToken) {
      // 放入到返回头中
      res.set('authorization', 'Bearer ' + newToken)
    }
  }

  next()
})

// 路由
app.use('/user', userRouter)
```

## 参考文献

1. [express-jwt](https://github.com/auth0/express-jwt)
2. [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
3. [nodejs 之 express 的 token 验证](https://www.jianshu.com/p/474ee942ea8d)
4. [前端如何实现登录拦截?](https://www.jianshu.com/p/9ec1c351f2e4)
