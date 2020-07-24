---
meta:
  - title: Express 配置https
    time: 2020-07-25 18:40:51
    tag: 后端,https
---

# Express 配置 https

## Mixed Content

https 网页中，如果请求的内容属于 http 协议，则称为 `Mixed Content`，W3C 将 `Mixed Content` 分为 `Optionally-blockable` 和 `Blockable。`

也就是说当我们的前端页面部署在 https 下，而去请求 http 协议的资源就会发生 `Mixed Content`，从而引发请求不成功。

<!-- more -->

对于 img, video, audio 等资源，属于 `Optionally-blockable`，现代浏览器默认会加载这类资源，但会在控制台打印警告信息。

而其他的属于 `Blockable`，这类资源不会被加载，例如：JavaScript, CSS。并且会在控制台打印出错误信息。

`Mixed Content: The page at 'https://your.page.url' was loaded over HTTPS, but requested an insecure XMLHttpRequest endpoint 'http://your.request.url'. This request has been blocked; the content must be served over HTTPS`

要解决这个问题，有以下几种方式：

1. 如果是 js 等静态资源，可以下载下来由自己维护。
2. 升级 http 为 https。
3. 自己配置了 https 的后台去请求资源，再转发给前端。
4. 前端使用 `nginx` 作代理，将 https 请求转发到 http 服务器：

   ```nginx
     location /api/ {
         proxy_redirect off;
         proxy_pass_header Server;
         proxy_set_header X-Scheme $scheme;
         proxy_set_header Host $http_host;
         proxy_set_header X-Real-IP $remote_addr;
         proxy_set_header x-Forwarded-For $proxy_add_x_forwarded_for;
         # 转发到 http 服务器中
         proxy_pass http://your.backend.com/;
     }
   ```

当需要调用后端 `http://your.backend.com/test` 接口时，前端写法 `/api/test`。

## Express 配置

由于项目部署在第三方静态页面托管网站下，使用的是 https 协议，在无法将关闭 https，并且也无法将 https 请求代理成 http 时，想要去请求后端接口，就只能将接口升级为 https 了。

### openssl

`openssl` 可以用来生成 ssl 证书。下载地址：

[openssl 下载](http://slproweb.com/products/win32openssl.html)

安装后进入 `openssl` 安装目录的 `bin` 里面。

点击 `openssl.exe` 运行，输入命令生成证书：

1. 生成私钥 key 文件：

   ```bash
   openssl genrsa -out privatekey.key 1024
   ```

2. 通过私钥生成 CSR 证书签名 （需要填一些信息、可直接回车）

   ```bash
   openssl req -new -key privatekey.key -out certrequest.csr
   ```

3. 通过私钥和证书签名生成证书文件

   ```bash
   openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.cert
   ```

执行完成后，会在当前目录生成 3 个文件。

在 windows 下，`openssl` 的使用可能并不如预期顺利。当运行命令时可能会出现：

```bash
can't open config file: /usr/local/ssl/openssl.cnf
```

这是没有找到配置文件，需要将 `bin` 目录下的 `openssl.cfg` 添加到环境变量。

```bash
setx OPENSSL_CONF D:\OpenSSL-Win64\bin\openssl.cfg
```

也可以主动在环境变量窗口添加。

### Express

将上面生成的 3 个文件放入到 express 项目目录下。

```js
const express = require('express')
const app = express()
const https = require('https')
const http = require('http')
const fs = require('fs')
const path = require('path')

const options = {
  key: fs.readFileSync(path.join(__dirname, './privatekey.key'), 'utf-8'),
  cert: fs.readFileSync(path.join(__dirname, './certificate.cert'), 'utf-8')
}
const httpServer = http.createServer(app)
const httpsServer = https.createServer(options, app)

const PORT = 3001
const SSLPORT = 3002

httpServer.listen(PORT)
httpsServer.listen(SSLPORT)

app.get('/test', (req, res) => {
  res.send('hello world')
})
```

启动 `express` 服务器，当调用接口 `https:<your-path>:3002/test` 时，会出现错误：

```bash
Failed to load resource: net::ERR_INSECURE_RESPONSE
```

这是由于这是自己生成的证书，未被认证。解决方法只有去证书网站申请合法的证书。

这里可以去腾讯云、阿里云申请免费的证书。也可去 [FreeSSL.cn](https://freessl.cn) 申请。

https 证书一般只用于域名，所以还需要申请域名，如果只是用于后端接口，域名可以不用备案。

腾讯 https 认证可以参考文档：[SSL 证书](https://cloud.tencent.com/document/product/400)。

域名申请 https 证书后，如果通过验证，可以将证书文件下载下来。

将里面 `Nginx` 版本认证文件放入到 `express` 项目目录下，像上面一样引入证书：

```js
const options = {
  key: fs.readFileSync(path.join(__dirname, './nginx/xx.key'), 'utf-8'),
  cert: fs.readFileSync(path.join(__dirname, './nginx/xx.crt'), 'utf-8')
}
const httpsServer = https.createServer(options, app)
```

再将**域名添加 A 记录解析到云服务器公网 i**p。express 上传到云服务器，并添加云服务器安全组规则，**打开服务器 443(https) 端口**。

这时前端调用相应 https 接口就不会报错了。

## socket.io 配置 https

同样，`socket.io` 也存在 `Mixed Content` 问题。可以根据当前协议类型，动态设置连接接口：

```js
// 客户端
const url =
  window.location.protocol === 'http' ? 'http://xx:3001' : 'https://xx:3002'
const socket = io(url, {
  reconnection: false
}) // 建立链接
```

服务端同时监听 http 端口和 https 端口：

```js
// 服务端
const httpio = require('socket.io')(httpServer)
const httpsio = require('socket.io')(httpsServer)

httpio.on('connection', function(socket) {})
httpsio.on('connection', function(socket) {})
```

这样当前端在 http 或者 https 协议下部署时，都可以正常运行。

> 事实上只有前端在 https 下调用 http 后端接口，才会出现 `Mixed Content` 问题。所以当后端采用 https 时，前端使用 http 也不会导致接口调用失败。

## 其他

### CSP

`CSP`，全称是 `Content Security Policy`，它有非常多的指令，用来实现各种各样与页面内容安全相关的功能。

`CSP` 的实质就是白名单制度，开发者明确告诉客户端，哪些外部资源可以加载和执行，等同于提供白名单。它的实现和执行全部由浏览器完成，开发者只需提供配置。配置可以查看文档：

[CSP 文档](https://cloud.tencent.com/developer/chapter/13541)

下面介绍两个与 https 有关的配置。

#### block-all-mixed-content

`CSP` 的 `block-all-mixed-content` 指令，可以让所有非 HTTPS 资源都不允许加载。启用方法：

HTTP 响应头方式：

```bash
Content-Security-Policy: block-all-mixed-content
```

meta 标签方式：

```html
<meta http-equiv="Content-Security-Policy" content="block-all-mixed-content" />
```

#### upgrade-insecure-requests

`upgrade-insecure-requests` 指令可以让页面中所有 HTTP 资源，都会首先被替换为 HTTPS 地址再发起请求；页面所有站内链接，点击后会被替换为 HTTPS 地址再跳转。

使用方式如上面。

### Nginx 代理

#### 开启 https

```nginx
server {
    listen  443 ssl;
    server_name  my.domain.com;
    ssl         on;
    ssl_certificate     xx.crt;
    ssl_certificate_key xx.key;
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;


    location / {
    }
}
```

访问 `https://my.domain.com` 即可。如果证书是自己生成，会提示非安全连接。

#### http 重定向到 https

```nginx
server {
  listen   80;
  server_name  my.domain.com;
  return   301 https://$server_name$request_uri;
}
```

访问 `http://my.domain.com` 重定向到 `https://my.domain.com`。

### 后端重定向到 https

```js
const http = require('http')

let sever = http.createServer(function(req, res) {
  res.writeHead(301, { Location: 'https://your.backend.com' })
  res.end()
})

sever.listen(80, '0.0.0.0')
```

### webpack 开发环境配置 https

```js
module.exports = {
  //...
  devServer: {
    https: true,
    key: fs.readFileSync('xx.key'),
    cert: fs.readFileSync('xx.crt')
  }
}
```

访问：`https://localhost:8080`。

## 参考文献

1. [Mixed Content](https://yq.aliyun.com/articles/701703)
2. [用 Nginx 实现 https 转 http](https://blog.csdn.net/lvye1221/article/details/53843607)
3. [nodejs 从 http 升级到 https（阿里云证书的使用）](http://www.likecs.com/show-33302.html)
4. [关于启用 HTTPS 的一些经验分享（一）](https://imququ.com/post/sth-about-switch-to-https.html)
5. [CSP 文档](https://cloud.tencent.com/developer/chapter/13541)
