function domToStr (dom) {
    const div = document.createElement('div');

    div.appendChild(dom.cloneNode());
    const innerHTML = div.innerHTML;

    div.remove();
    return innerHTML;
}
class PerformanceMonitor {
    isSupportPerformanceObserver = true;

    performance = {
        fp: [],
        fcp: [],
        lcp: [],
        fid: [],
        cls: [],
        longtask: [],
        navigation: [],
        element: [],
        resource: [],
        fsp: {
            element: {
                domStr: '',
                insertTime: 0,
                renderTime: 0
            },
            img: {
                src: '',
                renderTime: 0
            },
            time: 0
        }
    };

    constructor () {
        this.init();
        this.getFP();
        this.getFCP();
        this.getLCP();
        this.getFID();
        this.getCLS();
        this.getLongtask();
        this.getResource();
        this.getElement();
        this.analyseNavigationTiming();
        this.computeFSP();
    }

    init () {
        if (!PerformanceObserver) {
            this.isSupportPerformanceObserver = false;
        }
    }

    getObserve (cb) {
        if (!this.isSupportPerformanceObserver) {
            return;
        }

        const observer = new PerformanceObserver((entryList) => {
            cb && cb(entryList.getEntries());
        });

        return observer;
    }

    handleCachedEntries (type, handleEntries) {
        const handleLoad = () => {
            setTimeout(() => {
                const entries = performance.getEntriesByType(type);

                handleEntries(entries);
            });
        };

        if (type === 'layout-shift') {
            this.onEvent({
                type: 'unload',
                cb: handleLoad
            });
            return;
        }

        this.onEvent({
            type: 'load',
            cb: handleLoad
        });

        handleLoad();
    }

    onEvent ({ type, cb }) {
        if (!type || typeof cb !== 'function') {
            return;
        }

        if (type === 'load' && document.readyState === 'complete') {
            cb();
            return;
        }

        const handler = () => {
            cb();
            window.removeEventListener(type, cb);
        };

        window.addEventListener(type, handler);
    }

    observe ({ type, disconnect = true, cb }) {
        const handleEntries = (entries) => {
            if (typeof cb === 'function') {
                cb(entries);
            }
        };

        if (!this.isSupportPerformanceObserver) {
            this.handleCachedEntries(type, handleEntries);
            return;
        }

        const observer = this.getObserve((entries) => {
            handleEntries(entries);
            disconnect && observer.disconnect();
        });

        // buffered 属性表示是否观察缓存数据，也就是说观察代码添加时机比事情触发时机晚也没关系。
        observer.observe({
            type,
            buffered: true
        });
    }

    travelEntries (entries, cb) {
        entries.forEach((entry) => {
            cb(entry);
        });
    }

    getFP () {
        this.observe({
            type: 'paint',
            cb: (entries) => {
                this.travelEntries(entries, (entry) => {
                    if (entry.name === 'first-paint') {
                        this.performance.fp.push(entry);
                    }
                });
            }
        });
    }

    getFCP () {
        this.observe({
            type: 'paint',
            cb: (entries) => {
                this.travelEntries(entries, (entry) => {
                    if (entry.name === 'first-contentful-paint') {
                        this.performance.fcp.push(entry);
                    }
                });
            }
        });
    }

    getLCP () {
        this.observe({
            type: 'largest-contentful-paint',
            cb: (entries) => {
                this.travelEntries(entries, (entry) => {
                    this.performance.lcp.push(entry);
                });
            },
            disconnect: false
        });
    }

    getFID () {
        this.observe({
            type: 'first-input',
            cb: (entries) => {
                this.travelEntries(entries, (entry) => {
                    this.performance.fid.push(entry);
                });
            }
        });
    }

    getCLS () {
        const computeMaxCLS = () => {
            let sessionValue = 0;
            let sessionEntries = [];
            const cls = {
                subType: 'layout-shift',
                name: 'layout-shift',
                type: 'performance',
                value: 0
            };

            const entryHandler = (entries) => {
                for (const entry of entries) {
                    // Only count layout shifts without recent user input.
                    if (!entry.hadRecentInput) {
                        const firstSessionEntry = sessionEntries[0];
                        const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

                        // If the entry occurred less than 1 second after the previous entry and
                        // less than 5 seconds after the first entry in the session, include the
                        // entry in the current session. Otherwise, start a new session.
                        if (
                            sessionValue &&
                            entry.startTime - lastSessionEntry.startTime < 1000 &&
                            entry.startTime - firstSessionEntry.startTime < 5000
                        ) {
                            sessionValue += entry.value;
                            sessionEntries.push(entry);
                        } else {
                            sessionValue = entry.value;
                            sessionEntries = [entry];
                        }

                        // If the current session value is larger than the current CLS value,
                        // update CLS and the entries contributing to it.
                        if (sessionValue > cls.value) {
                            cls.value = sessionValue;
                            cls.entries = sessionEntries;
                            cls.startTime = performance.now();
                            this.performance.cls = cls;
                        }
                    }
                }
            };

            this.observe({
                type: 'layout-shift',
                cb: entryHandler,
                disconnect: false
            });
        };

        computeMaxCLS();
    }

    getLongtask () {
        this.observe({
            type: 'longtask',
            cb: (entries) => {
                this.travelEntries(entries, (entry) => {
                    this.performance.longtask.push(entry);
                });
            },
            disconnect: false
        });
    }

    getResource () {
        this.observe({
            type: 'resource',
            cb: (entries) => {
                this.travelEntries(entries, (entry) => {
                    const record = this.analyseResource(entry);

                    record.resource = entry;
                    this.performance.resource.push(record);
                });
            },
            disconnect: false
        });
    }

    getElement () {
        this.observe({
            type: 'element',
            cb: (entries) => {
                this.travelEntries(entries, (entry) => {
                    this.performance.element.push(entry);
                });
            },
            disconnect: false
        });
    }

    checkFromCache (entry) {
        // 强缓存
        if (entry.transferSize === 0) {
            return 'strong_cache';
        }

        // 协商缓存
        if (entry.transferSize !== 0 && entry.encodedBodySize === 0) {
            return 'negotiation_cache';
        }

        return 'none';
    }

    analyseResource (entry) {
        const record = {};

        // 重定向时间
        record.redirectDuration = entry.redirectEnd - entry.redirectStart;

        // 【重要】DNS 查询时间
        // 【原因】DNS 预加载做了么？页面内是不是使用了太多不同的域名导致域名查询的时间太长？
        // 可使用 HTML5 Prefetch 预查询 DNS ，见：[HTML5 prefetch](http://segmentfault.com/a/1190000000633364)
        record.domainLookupDuration = entry.domainLookupEnd - entry.domainLookupStart;

        // TCP, HTTP连接耗时
        record.connectDuration = entry.connectEnd - entry.connectStart;

        // SSL 连接耗时
        record.SSLConnectDuration = entry.connectEnd - entry.secureConnectionStart;

        // 【重要】首字节时间
        // 【原因】页面内容经过 gzip 压缩了么，静态资源 css/js 等压缩了么？
        record.TTFB = entry.responseStart;

        // 数据传输时间
        record.responseDuration = entry.responseEnd - entry.responseStart;

        // 数据传输完成时间
        record.dataCompleted = entry.responseEnd - entry.fetchStart;

        // http 头部大小
        record.httpHeaderSize = entry.transferSize - entry.encodedBodySize;

        // 资源大小
        record.httpResourceSize = entry.encodedBodySize;

        // 命中缓存
        record.hitCache = this.checkFromCache(entry);

        return record;
    }

    analyseNavigationTiming () {
        const entryHandler = (entries) => {
            for (const entry of entries) {
                const record = this.analyseResource(entry);

                // 卸载前一个页面的时间
                record.prePageUnloadEvent = entry.unloadEventEnd - entry.unloadEventStart;

                // 重定向次数
                record.redirectCount = entry.redirectCount;
                // 【重要】重定向的时间
                // 【原因】拒绝重定向！比如，http://example.com/ 就不该写成 http://example.com

                // dom 解析时间
                // 【重要】解析 DOM 树结构的时间
                // 【原因】反省下你的 DOM 树嵌套是不是太多了！
                record.domParseDuration = entry.domInteractive - entry.responseEnd;

                // DomContentLoaded 事件后到触发 load 事件间的资源加载时间
                record.resourceLoadDurationAfterDomContentLoaded =
                    entry.loadEventStart - entry.domContentLoadedEventEnd;

                // 可交互时间
                record.TTI = entry.domInteractive - entry.fetchStart;

                // dom 解析渲染完毕时间
                record.domReady = entry.domContentLoadedEventEnd - entry.fetchStart;

                // 【重要】页面加载完成的时间
                // 【原因】这几乎代表了用户等待页面可用的时间
                record.pageLoaded = entry.loadEventStart - entry.fetchStart;

                // 【重要】执行 onload 回调函数的时间
                // 【原因】是否太多不必要的操作都放到 onload 回调函数里执行了，考虑过延迟加载、按需加载的策略么？
                record.loadEvent = entry.loadEventEnd - entry.loadEventStart;

                record.resource = entry;

                this.performance.navigation.push(record);
            }

            setTimeout(() => {
                console.log(this.performance);
            }, 3000);
        };

        // performance.timing 已被废弃
        // 使用最新的 navigation
        this.observe({
            type: 'navigation',
            cb: entryHandler
        });
    }

    // 计算首屏渲染完成时间
    // todo, 考虑滚动情况
    // https://juejin.cn/post/6962742206692065287
    computeFSP () {
        const next = window.requestAnimationFrame ? requestAnimationFrame : setTimeout;
        const lastRenderElement = {};

        const isObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                // 元素部分或全部在屏内
                if (entry.intersectionRatio > 0) {
                    // 记录节点及其时间，这里也可以使用人工打点的方式：performance.now()
                    next(() => {
                        const renderTime = performance.now();

                        if (!lastRenderElement.renderTime || renderTime >= lastRenderElement.renderTime) {
                            lastRenderElement.dom = entry.target;
                            lastRenderElement.domStr = entry.target.outerHTML;
                            lastRenderElement.insertTime = entry.time;
                            lastRenderElement.renderTime = renderTime;
                            this.performance.fsp.element = lastRenderElement;
                        }
                    });
                }
            });
        });

        // 注册DOM树变更监听器
        const muObserver = new MutationObserver((mutations) => {
            if (!mutations) return;
            mutations.forEach((mu) => {
                if (!mu.addedNodes || !mu.addedNodes.length) return;
                mu.addedNodes.forEach((ele) => {
                    // 只对元素节点进行监听
                    if (ele.nodeType === 1) {
                        // 添加可视性变化监听器
                        isObserver.observe(ele);
                    }
                });
            });
        });

        // 监听document的子树变化
        muObserver.observe(document, {
            // 观察目标节点的属性节点(增，删，改)
            attributes: false,
            // 观察目标节点的子节点(增, 删)
            childList: true,
            // 观察characterData节点(一种抽象接口,具体可以为文本节点,注释节点,以及处理指令节点)的变化
            characterData: false,
            // 观察目标节点所包含的整棵DOM树上的上述三种节点变化
            subtree: true,
            // 在attributes属性已经设为true的前提下,将发生变化的属性节点之前的属性值记录下来(MutationRecord对象的oldValue属性中)
            attributeOldValue: false,
            // 在characterData属性已经设为true的前提下,将发生变化的characterData节点之前的文本内容记录下来(MutationRecord对象的oldValue属性中)
            characterDataOldValue: false
        });

        this.onEvent({
            type: 'load',
            cb: () => {
                setTimeout(() => {
                    const lastLoadImg = {};

                    // 获取首屏最后一张图片的渲染时间
                    // todo, 处理滚动下的首屏图片情况
                    this.performance.resource.forEach((item) => {
                        if (
                            item.initiatorType === 'img' &&
                            (!lastLoadImg.src || item.responseEnd >= lastLoadImg.renderTime)
                        ) {
                            lastLoadImg.src = item.name;
                            lastLoadImg.renderTime = item.responseEnd;
                            lastLoadImg.resource = item;
                        }
                    });

                    this.performance.fsp.img = lastLoadImg;
                    this.performance.fsp.time = Math.max(lastLoadImg.renderTime, lastRenderElement.renderTime);
                    muObserver.disconnect();
                    isObserver.disconnect();
                });
            }
        });
    }
}

new PerformanceMonitor();


// todo, 处理 sourcemap
class ErrorMonitor {
    error = {
        resource: [],
        js: [],
        unhandledrejection: []
    };

    constructor () {
        this.onError();
        this.onUnhandledrejection();
    }

    onError () {
        window.addEventListener(
            'error',
            (e) => {
                const target = e.target;

                if (!target.localName) {
                    const { message, lineno, colno, error, timeStamp } = e;
                    const errorInfo = {
                        message,
                        line: lineno,
                        column: colno,
                        stack: error.stack,
                        subType: 'js',
                        type: 'error',
                        startTime: timeStamp
                    };

                    this.error.js.push(errorInfo);
                }

                if (target && (target.src || target.href)) {
                    const url = target.src || target.href;
                    const errorInfo = {
                        url,
                        type: 'error',
                        subType: 'resource',
                        startTime: e.timeStamp,
                        html: target.outerHTML,
                        resourceType: target.tagName,
                        paths: e.path.map((item) => item.tagName).filter(Boolean)
                    };

                    this.error.resource.push(errorInfo);
                }
            },
            true
        );
    }

    onUnhandledrejection () {
        window.addEventListener('unhandledrejection', e => {
            const errorInfo = {
                reason: e.reason?.stack,
                subType: 'promise',
                type: 'error',
                startTime: e.timeStamp

            };

            this.error.unhandledrejection.push(errorInfo);
        });
    }
}

const em = new ErrorMonitor();


class BehaviorMonitor {
    constructor () {

    }

    getPV () {

    }
}

function setXMLHttpRequest (params) {}

setXMLHttpRequest();
