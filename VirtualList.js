// https://juejin.im/post/6844904015440904200#heading-16
// https://github.com/tangbc/vue-virtual-scroll-list
class VirtualList {
  constructor (options) {
    this.$container = options.container
    this.$list = options.list
    this.length = options.length
    this.callback = options.callback
    this.minSize = 50
    this.containerHeight = this.$container.clientHeight || +options.height
    this.visibleNums = Math.ceil(this.containerHeight / this.minSize)
    this.nums = 3 * this.visibleNums
    this._init()
    this.setSupportsPassive()
    this._on(this.$container, 'scroll', this._scroll)
  }

  _init () {
    this._style(this.$list, {
      height: this.minSize * this.length + 'px',
      boxSizing: 'border-box'
    })
  }

  _on (el, event, fn) {
    el.addEventListener(
      event,
      fn,
      this.supportsPassive
        ? {
          capture: false,
          passive: false
        }
        : false
    )
  }

  _off (el, event, fn) {
    el.removeEventListener(
      event,
      fn,
      this.supportsPassive
        ? {
          capture: false,
          passive: false
        }
        : false
    )
  }

  setSupportsPassive () {
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get: () => {
          this.supportsPassive = true
          return true
        }
      })

      window.addEventListener('testPassive', null, opts)
      window.removeEventListener('testPassive', null, opts)
    } catch (e) {
      console.error(e)
    }
  }

  _scroll = (e) => {
    const scrollTop = e.target.scrollTop

    console.log('sc:' + scrollTop)
    if (
      scrollTop <= this.upperUpdateThreshold &&
      scrollTop >= this.lowerUpdateThreshold
    ) {
      return
    }

    if (
      scrollTop > this.lowerUpdateThreshold &&
      this.oldEnd === this.length - 1
    ) {
      return
    }

    const index = Math.floor(scrollTop / this.minSize)
    let start = Math.max(0, index - this.visibleNums)
    const end = Math.min(this.length - 1, start + this.nums - 1)

    if (end === this.length - 1) {
      start = end - 30
    }

    this.callback(start, end)
    const itemsHeight = [...this.$list.children].reduce((height, node) => {
      return height + node.clientHeight
    }, 0)

    console.log(itemsHeight)
    const paddingTop = Math.max(0, scrollTop - this.visibleNums * this.minSize)

    this._style(this.$list, {
      paddingTop: paddingTop + 'px'
    })

    this.oldStart = start
    this.oldEnd = end
    this.upperUpdateThreshold = scrollTop + this.containerHeight
    this.lowerUpdateThreshold = scrollTop - this.containerHeight

    console.log(start, end)
  }

  _style (el, styles) {
    Object.assign(el.style, styles)
  }
}
