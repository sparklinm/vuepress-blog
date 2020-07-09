// Process block-level custom containers
//
'use strict'
function container_plugin(md, name = 'demo', options) {
  // Second param may be useful if you decide
  // to increase minimal allowed marker length
  function validateDefault(params /*, markup*/) {
    return params.trim().split(' ', 2)[0] === name
  }

  function renderDefault(tokens, idx, _options, env, slf) {
    // add a class to the opening tag
    if (tokens[idx].nesting === 1) {
      tokens[idx].attrJoin('class', name)
    }

    return slf.renderToken(tokens, idx, _options, env, slf)
  }

  options = options || {}

  var min_markers = 3,
    marker_str = options.marker || ':',
    marker_char = marker_str.charCodeAt(0),
    marker_len = marker_str.length,
    validate = options.validate || validateDefault,
    render = options.render || renderDefault

  // startLine 每一个块的开始
  // endLine 文档结尾
  //
  function container(state, startLine, endLine, silent) {
    let open = `'''`
    let close = `'''`
    var openDelim,
      len,
      params,
      nextLine,
      token,
      firstLine,
      lastLine,
      lastLinePos,
      haveEndMarker = false,
      // 该行开始字符的索引
      pos = state.bMarks[startLine] + state.tShift[startLine],
      // 该行结束字符的索引
      max = state.eMarks[startLine]

    // console.log(state.blkIndent);
    // console.log(state.sCount);
    

    // console.log(state.bMarks);

    // console.log(endLine);

    if (pos + open.length > max) {
      return false
    }

    openDelim = state.src.slice(pos, pos + open.length)

    if (openDelim !== open) {
      return false
    }

    pos += open.length
    firstLine = state.src.slice(pos, max)

    let tags = firstLine.split(' ')

    params = tags[0]

    if (tags.length !== 2) {
      return false
    }

    if (!['html', 'vue'].includes(params)) {
      return false
    }

    let marker = firstLine.split(' ')[1]

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

    console.log(token)

    return true
  }

  md.block.ruler.before('fence', 'container_' + name, container, {
    alt: ['paragraph', 'reference', 'blockquote', 'list']
  })
  md.renderer.rules['container_' + name] = render
}

let markdownit = require('markdown-it')
let markdownitc = container_plugin
let md = new markdownit({
  html: true,
  linkify: true,
  typographer: true
})

md.use(markdownitc, 'demo', {
  render: function(tokens, idx) {
    let content = tokens[idx].content

    const renderedContent = content.replace(/<script>[\w\W]+<\/script>/g, '')
    const scripts = content.match(/<script>[\w\W]+<\/script>/g)
    return ` <DemoAndCode>
                    <template slot="demo">
                        ${renderedContent}
                    </template>
              </DemoAndCode>
            `
  }
})

let t = md.render(
  `
- 456

'''vue demo
 
<div>
test text
</div>

<script>
util.marquee(document.querySelector(".marquee"))
</script>

'''
`
)

console.log(t)
