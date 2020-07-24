
const onLoadCallbacks = []
let instance = null
const onLoad = function (fn) {
  onLoadCallbacks.push(fn)
}
const setData = function (obj) {
  instance.setData(obj)
}

const define = function (options) {
  const obj = options.setup()
  const pageConfig = {}
  const onLoads = onLoadCallbacks

  onLoadCallbacks.length = 0
  pageConfig.data = obj.data
  if (onLoads.length) {
    pageConfig.onLoad = function () {
      instance = this
      onLoads.forEach(fn => {
        fn && fn()
      })
    }
  }

  return pageConfig
}



define({
  setup () {
    const a = 1

    onLoad(() => {
      setData({
        a: 2
      })
    })

    return {
      data: {
        a
      }
    }
  }
})