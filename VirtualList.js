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
    this.index = 0
    this._init()
    this.setSupportsPassive()
    this._on(this.$container, 'scroll', this._scroll)

    this.scrollHeight = this.$container.scrollHeight
    this.clientHeight = this.$container.clientHeight || +options.height
    this.scrollTopMax = this.scrollHeight - this.clientHeight
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
    // const scrollTop = e.target.scrollTop

    // console.log('sc:' + scrollTop)
    // if (
    //   scrollTop <= this.upperUpdateThreshold &&
    //   scrollTop >= this.lowerUpdateThreshold
    // ) {
    //   return
    // }

    // if (
    //   scrollTop > this.lowerUpdateThreshold &&
    //   this.oldEnd === this.length - 1
    // ) {
    //   return
    // }

    // let start = this.index
    // const end = Math.min(this.length - 1, start + this.nums - 1)
    // const index = Math.floor(scrollTop / this.minSize)

    // console.log(index)

    // if (end === this.length - 1) {
    //   start = end - 30
    // }

    // this.callback(start, end)
    // const itemOffsetFromStart = [...this.$list.children].slice(0, index - start).reduce((height, node) => {
    //   return height + node.clientHeight
    // }, 0)

    // // console.log(itemsHeight)
    // const paddingTop = Math.max(0, scrollTop - itemOffsetFromStart)

    // this._style(this.$list, {
    //   paddingTop: paddingTop + 'px'
    // })

    // this.oldStart = start
    // this.oldEnd = end
    // this.index = index
    // this.upperUpdateThreshold = scrollTop + this.containerHeight
    // this.lowerUpdateThreshold = scrollTop - this.containerHeight

    // console.log(start, end)

    const scrollTop = e.target.scrollTop

    // console.log('sc:' + scrollTop)
    const itemCount = this.length
    /** 进度条滚动百分比 */
    const scrollPtg = scrollTop / this.scrollTopMax
    /** 确定定位项 */
    const index = Math.floor(scrollPtg * itemCount)

    // if (Math.abs(index - this.oldIndex) < 5) {
    //   return
    // }

    console.log(index)

    /** 可见列表项个数 = 可见容器高度 / 每个列表项高度 ，记得向上取整 */
    const visibleCount = Math.ceil(this.clientHeight / this.minSize)
    /** 确定起始项和结束项 */
    const start = Math.max(0, index - Math.ceil(scrollPtg * visibleCount))
    const end = Math.min(
      itemCount - 1,
      index + Math.ceil((1 - scrollPtg) * visibleCount)
    )

    this.callback(start, end)

    const itemOffsetFromStart = [...this.$list.children]
      .slice(0, index - start)
      .reduce((height, node) => {
        return height + node.clientHeight
      }, 0)

    const itemRelativeTop =
      scrollPtg * this.clientHeight - scrollPtg * this.minSize

    const itemAbsoluteTop = scrollTop + itemRelativeTop
    const startItemTop = itemAbsoluteTop - itemOffsetFromStart

    this._style(this.$list, {
      paddingTop: startItemTop + 'px'
    })

    console.log(start, end)
    this.oldIndex = index
  }

  _style (el, styles) {
    Object.assign(el.style, styles)
  }
}
