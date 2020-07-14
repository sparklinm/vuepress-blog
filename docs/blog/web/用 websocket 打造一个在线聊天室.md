---
meta:
  - title: 用 websocket 打造一个在线聊天室
    time: 2020-07-19 19:46:07
    tag: websocket,socket.io
---

# 用 websocket 打造一个在线聊天室

## 前言

前段时间用 `websocket` 写了一个多人聊天室，使用的是 socket.io 库，由于这是第一次使用，这里作一个使用方法的简单整理。

<!-- more -->

## websocket

`WebSocket` 是 `HTML5` 新增的一种通信协议，其特点是服务端可以主动向客户端推送信息，客户端也可以主动向服务端发送信息，是真正的双向平等对话，属于服务器推送技术的一种。

socket.io 封装了 `websocket`，同时包含了其它实时通话的方式，例如 `ajax` 轮询。当浏览器不支持 `websocket`，会自动降级使用轮询的方式。

关于 socket.io 的使用，可以查看文档：

1. [socket.io 官方文档](https://socket.io)
2. [socket.io 文档中文译文](http://www.shuaihuajun.com/article/1504749640971/)

## socket.io

### 安装与使用

socket.io 分为服务端和客户端，npm 安装：

```bash
yarn add socket.io socket.io-client
```

建立连接：

```js
// 客户端
const io = require('socket.io-client')
const socket = io('ws://127.0.0.1:3001')

// 通过事件向服务端发送数据
socket.emit('client-event', data)

// 监听服务端发送过来的事件
socket.on('server-event', function(data) {
  console.log(data)
})
```

```js
// 服务端

const io = require('socket.io')(3001)
// 监听连接
io.on('connection', (socket) => {
  /* ... */
  // 监听断开连接
  socket.on('disconnect', function(data) {
    console.log(data)
  })

  // 监听客户端发过来的事件
  socket.on('client-event', function(data) {
    console.log(data)
  })

  // 通过事件向客户端发送数据
  socket.emit('server-event', data)
})

// 配合express
const express = require('express')
const app = express()
const server = app.listen(3001)
const io = require('socket.io')(server)
io.on('connection', (socket) => {
  /* ... */
})
```

在 socket.io 中，客户端服务端收发消息都采用事件分发机制，如：

```js
socket.emit(event, data)
socket.on(event, function(data) {
  callback(data)
})
```

这里事件机制继承 `EventEmitter` 类，拥有 `EventEmitter` 的全部方法。

## 房间和命名空间

在 socket.io 里有房间与命名空间两个概念。房间和命名空间可分割通信并将单个套接字分组。

建立连接后，`socket` 会属于一个自己默认的房间和主命名空间。

主命名空间是 `/`，也就是 `io`：

```js
const io = require('socket.io')(3001)

// 会发送给所有人
io.emit('some event')
```

创建命名空间：

```js
// 客戶端
const io = require('socket.io-client')
const socket = io('ws://127.0.0.1:3001/chat')

// 服务端
const io = require('socket.io')()
// io.of 访问命名空间，如果没有则创建
const chat = io.of('/chat')
```

这里创建了一个 `chat` 命名空间。

命名空间发送的消息会发送给该命名空间下所有 `socket`。

```js
// chat 命名空间下的所有人
chat.emit('some event')

// chat 命名空间下 room1 房间的所有人
chat.to('room1').emit('some event')
```

也可以通过主命名空间去其他命名空间发送消息：

```js
// 去到 /chat 里发消息
io.of('/chat').emit('some event')

// 去到 /chat 里的 room1 房间里发消息
io.of('/chat')
  .to('room1')
  .emit('some event')
```

通过 `join`, `leave` 方法可以加入、离开房间。

```js
io.on('connection', (socket) => {
  // 加入房间
  socket.join('some room')

  // 离开房间
  socket.leave('some room')
})
```

通过 `socket.rooms` 查看 `socket` 所属房间：

```js
io.on('connection', (socket) => {
  socket.join('room 237', () => {
    let rooms = Object.keys(socket.rooms)
    console.log(rooms) // [ <socket.id>, 'room 237' ]
  })
})
```

通过 `to` 方法可以向房间或某个 `socket` 发送消息：

```js
io.on('connection', (socket) => {
  // 向 room1 room2 room3 房间的所有人发送消息
  io.to('room1')
    .to('room2')
    .to('room3')
    .emit('some event')

  // 向 room1 room2 room3 房间的所有人（但不包括自己）发送消息
  socket
    .to('room1')
    .to('room2')
    .to('room3')
    .emit('some event')

  // 通过其他 socket 的 socket.id
  // 向其发送消息
  socket.to(anotherSocket.id).emit('some event')

  // 同理 io
  io.to(anotherSocket.id).emit('some event')
})
```

每一个 `socket` 可以通过 `broadcast` 广播消息：

```js
// 向该命名空间内的所有人（但不包括自己）发送消息
socket.broadcast.emit('some event', data)

// 向该房间内的所有人（但不包括自己）发送消息
// 如上面，不加 broadcast 时同效果
socket.broadcast.to('room1').emit('some event', data)
```

命名空间内包含多个房间，房间内包含多个 `socket`，`socket` 可以属于同一个命名空间下的多个房间。

## 在线聊天室

群聊时：通过分类的房间，将每一个 `socket` 放入到对应房间去。发送消息时，由房间所在命名空间发送消息给房间所有人。

私聊时：将两个人放入到同一个房间。再发送消息给房间里的两个人。

可以发现，当一个用户发送消息时，无论是私聊还是群聊，都是通过房间来发送，所以房间才是发送消息的主体。

为此，我们可以实现一个房间类，并提供实例化方法来加入成员或离开成员。当成员需要发送消息时，由房间类根据你的消息格式统一封装消息，再借用命名空间发给房间内每个人。

## 参考文献

1. [深入理解 Socket.io 中的 Room 与 Namespace](https://www.dazhuanlan.com/2020/01/29/5e31407cbfe77/)
2. [socket.io 官方文档](https://socket.io)
3. [socket.io 文档中文译文](http://www.shuaihuajun.com/article/1504749640971/)
