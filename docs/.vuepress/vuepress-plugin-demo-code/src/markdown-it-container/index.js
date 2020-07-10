// Process block-level custom containers
//
'use strict'

module.exports = function container_plugin (md, name = 'demo', options) {
  // Second param may be useful if you decide
  // to increase minimal allowed marker length

  function validateDefault (params /* , markup*/) {
    return params.trim().split(' ', 2)[0] === name
  }

  function renderDefault (tokens, idx, _options, env, slf) {
    const { content } = tokens[idx]
    // add a class to the opening tag

    return `<div class="class-${name}">${content}</div>`
  }

  options = options || {}

  const min_markers = 3
  const marker_str = options.marker || ':'
  const marker_char = marker_str.charCodeAt(0)
  const marker_len = marker_str.length
  const validate = options.validate || validateDefault
  const render = options.render || renderDefault

  // startLine 每一个块的开始
  // endLine 文档结尾
  //
  function container (state, startLine, endLine, silent) {
    const open = '```'
    const close = '```'
    let openDelim
    let len
    let params
    let nextLine
    let token
    let firstLine
    let lastLine
    let lastLinePos
    let haveEndMarker = false
    // 该行开始字符的索引
    // bMarks 储存该行开始字符在文档中的位置
    // tShift 开始字符前面的空格字符数
    // 这个空格是指符合规范的空格，例如嵌套列表前面的空格。
    let pos = state.bMarks[startLine] + state.tShift[startLine]
    // 该行结束字符的索引
    // eMarks该行结束字符在文档中的位置
    let max = state.eMarks[startLine]

    if (pos + open.length > max) {
      return false
    }

    openDelim = state.src.slice(pos, pos + open.length)

    if (openDelim !== open) {
      return false
    }

    pos += open.length
    firstLine = state.src.slice(pos, max)

    const tags = firstLine.split(' ')

    params = tags[0]

    if (tags.length !== 2) {
      return false
    }

    // code
    if (!['html', 'vue'].includes(params)) {
      return false
    }

    const marker = firstLine.split(' ')[1]

    // 第二个参数
    if (marker !== name) {
      return false
    }

    // Since start is found, we can report success here in validation mode
    if (silent) {
      return true
    }

    if (firstLine.trim().slice(-close.length) === close) {
      // Single line expression, no use
      firstLine = firstLine.trim().slice(0, -close.length)
      haveEndMarker = true
    }

    // search end of block
    nextLine = startLine

    for (;;) {
      if (haveEndMarker) {
        break
      }

      nextLine++

      if (nextLine >= endLine) {
        // unclosed block should be autoclosed by end of document.
        // also block seems to be autoclosed by end of parent
        break
      }

      pos = state.bMarks[nextLine] + state.tShift[nextLine]
      max = state.eMarks[nextLine]

      if (pos < max && state.tShift[nextLine] < state.blkIndent) {
        // non-empty line with negative indent should stop the list:
        break
      }

      if (
        state.src
          .slice(pos, max)
          .trim()
          .slice(-close.length) !== close
      ) {
        continue
      }

      if (state.tShift[nextLine] - state.blkIndent >= 4) {
        // closing block math should be indented less then 4 spaces
        continue
      }

      lastLinePos = state.src.slice(0, max).lastIndexOf(close)
      lastLine = state.src.slice(pos, lastLinePos)

      pos += lastLine.length + close.length

      // make sure tail has spaces only
      pos = state.skipSpaces(pos)

      if (pos < max) {
        continue
      }

      // found!
      haveEndMarker = true
    }

    // If math block has heading spaces, they should be removed from its inner block
    len = state.tShift[startLine]

    state.line = nextLine + (haveEndMarker ? 1 : 0)

    token = state.push('container_' + name, 'div', 0)
    token.block = true
    token.content =
      state.getLines(startLine + 1, nextLine, len, true) +
      (lastLine && lastLine.trim() ? lastLine : '')
    token.children = ['']
    token.info = params
    token.map = [startLine, state.line]
    token.markup = open
    token.hidden = false

    return true
  }
  md.block.ruler.before('fence', 'container_' + name, container, {
    alt: ['paragraph', 'reference', 'blockquote', 'list']
  })
  md.renderer.rules['container_' + name] = render
}
