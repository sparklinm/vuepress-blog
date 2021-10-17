function getPerformanceTiming () {
    const performance = window.performance

    if (!performance) {
        // 当前浏览器不支持
        console.log('你的浏览器不支持 performance 接口')
        return
    }

    // performance.timing 已被废弃
    const t = performance.timing
    const times = {}

    // 【重要】重定向的时间
    // 【原因】拒绝重定向！比如，http://example.com/ 就不该写成 http://example.com
    times.redirect = t.redirectEnd - t.redirectStart

    // 【重要】DNS 查询时间
    // 【原因】DNS 预加载做了么？页面内是不是使用了太多不同的域名导致域名查询的时间太长？
    // 可使用 HTML5 Prefetch 预查询 DNS ，见：[HTML5 prefetch](http://segmentfault.com/a/1190000000633364)
    times.lookupDomain = t.domainLookupEnd - t.domainLookupStart

    // HTTP连接耗时
    times.HTTPConnectTime = t.connectEnd - t.connectStart

    // 【重要】读取页面第一个字节的时间
    // 【原因】这可以理解为用户拿到你的资源占用的时间，加异地机房了么，加CDN 处理了么？加带宽了么？加 CPU 运算速度了么？
    // TTFB 即 Time To First Byte 的意思
    // 维基百科：https://en.wikipedia.org/wiki/Time_To_First_Byte
    times.firstByte = t.responseStart - t.fetchStart

    // 【重要】内容加载完成的时间
    // 【原因】页面内容经过 gzip 压缩了么，静态资源 css/js 等压缩了么？
    times.HTTPTime = t.responseEnd - t.requestStart

    // 白屏时间
    times.firstPaintTime = t.domLoading - t.fetchStart

    // 可交互时间
    times.ttiTime = t.domInteractive - t.fetchStart

    // 【重要】解析 DOM 树结构的时间
    // 【原因】反省下你的 DOM 树嵌套是不是太多了！
    times.domReady = t.domComplete - t.responseEnd

    // 【重要】页面加载完成的时间
    // 【原因】这几乎代表了用户等待页面可用的时间
    times.loadPage = t.loadEventStart - t.fetchStart

    // 【重要】执行 onload 回调函数的时间
    // 【原因】是否太多不必要的操作都放到 onload 回调函数里执行了，考虑过延迟加载、按需加载的策略么？
    times.loadEvent = t.loadEventEnd - t.loadEventStart

    // DNS 缓存时间
    // times.appcache = t.domainLookupStart - t.fetchStart

    // 卸载页面的时间
    // times.unloadEvent = t.unloadEventEnd - t.unloadEventStart
    return times
}

class Monitor {
    constructor () {
        this.getFP()
        this.getFCP()
        this.getLCP()
        this.getFID()
        this.getCLS()
    }

    getObserve (cb) {
        const observer = new PerformanceObserver(entryList => {
            cb && cb(entryList)
        })

        return observer
    }

    observe ({ type, name, disconnect = true }) {
        const observer = this.getObserve(entryList => {
            for (const entry of entryList) {
                if (!name) {
                    console.log(entry)
                    return
                }
                if (entry.name === name) {
                    console.log(entry)
                }
            }

            disconnect && observer.disconnect()
        })

        // buffered 属性表示是否观察缓存数据，也就是说观察代码添加时机比事情触发时机晚也没关系。
        observer.observe({
            type,
            buffered: true
        })
    }

    getFP () {
        this.observe({
            type: 'paint',
            name: 'first-paint'
        })
    }

    getFCP () {
        this.observe({
            type: 'paint',
            name: 'first-contentful-paint'
        })
    }

    getLCP () {
        this.observe({
            type: 'largest-contentful-paint'
        })
    }

    getFID () {
        this.observe({
            type: 'first-input'
        })
    }

    getCLS () {
        const computeMax = () => {
            let sessionValue = 0
            let sessionEntries = []
            const cls = {
                subType: 'layout-shift',
                name: 'layout-shift',
                type: 'performance',
                pageURL: getPageURL(),
                value: 0
            }

            const entryHandler = list => {
                for (const entry of list.getEntries()) {
                    // Only count layout shifts without recent user input.
                    if (!entry.hadRecentInput) {
                        const firstSessionEntry = sessionEntries[0]
                        const lastSessionEntry = sessionEntries[sessionEntries.length - 1]

                        // If the entry occurred less than 1 second after the previous entry and
                        // less than 5 seconds after the first entry in the session, include the
                        // entry in the current session. Otherwise, start a new session.
                        if (
                            sessionValue &&
                            entry.startTime - lastSessionEntry.startTime < 1000 &&
                            entry.startTime - firstSessionEntry.startTime < 5000
                        ) {
                            sessionValue += entry.value
                            sessionEntries.push(formatCLSEntry(entry))
                        } else {
                            sessionValue = entry.value
                            sessionEntries = [formatCLSEntry(entry)]
                        }

                        // If the current session value is larger than the current CLS value,
                        // update CLS and the entries contributing to it.
                        if (sessionValue > cls.value) {
                            cls.value = sessionValue
                            cls.entries = sessionEntries
                            cls.startTime = performance.now()
                        }
                    }
                }
            }
        }

        this.observe({
            type: 'layout-shift',
            disconnect: false
        })
    }
}

new Monitor()

const list = performance.getEntries()

for (const entry of list) {
    if (entry.entryType !== 'resource') {
        console.log(entry)
    }
}

const entryHandler = list => {
    for (const entry of list.getEntries()) {
        // Only count layout shifts without recent user input.
        console.log(entry)
    }
}

const observer = new PerformanceObserver(entryHandler)

observer.observe({
    type: 'layout-shift',
    buffered: true
})
