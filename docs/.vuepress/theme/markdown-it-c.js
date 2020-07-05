// Process block-level custom containers
//
'use strict'
function container_plugin(md, name, options) {
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

  function container(state, startLine, endLine, silent) {
    let open = `::: ${name || 'demo'}`
    let close = ':::'
    var openDelim,
      len,
      params,
      nextLine,
      token,
      firstLine,
      lastLine,
      lastLinePos,
      haveEndMarker = false,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine]

    if (pos + open.length > max) {
      return false
    }

    openDelim = state.src.slice(pos, pos + open.length)

    if (openDelim !== open) {
      return false
    }

    pos += open.length
    firstLine = state.src.slice(pos, max)
    params = state.src.slice(pos, max);

    // Since start is found, we can report success here in validation mode
    if (silent) {
      return true
    }

    if (firstLine.trim().slice(-close.length) === close) {
      // Single line expression
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
      (firstLine && firstLine.trim() ? firstLine + '\n' : '') +
      state.getLines(startLine + 1, nextLine, len, true) +
      (lastLine && lastLine.trim() ? lastLine : '')
    token.children = ['']
    token.info = params
    token.map = [startLine, state.line]
    token.markup = open
    token.hidden = false

    // console.log(token)

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

function block(state, startLine, endLine, silent) {
  let open = '<script>'
  let close = '</script>'
  var openDelim,
    len,
    params,
    nextLine,
    token,
    firstLine,
    lastLine,
    lastLinePos,
    haveEndMarker = false,
    pos = state.bMarks[startLine] + state.tShift[startLine],
    max = state.eMarks[startLine]

  console.log(startLine)
  console.log(endLine)

  if (pos + open.length > max) {
    return false
  }

  openDelim = state.src.slice(pos, pos + open.length)

  if (openDelim !== open) {
    return false
  }

  pos += open.length
  firstLine = state.src.slice(pos, max)

  // Since start is found, we can report success here in validation mode
  if (silent) {
    return true
  }

  if (firstLine.trim().slice(-close.length) === close) {
    // Single line expression
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

  token = state.push('tt', 'tt', 0)
  token.block = true
  token.content =
    (firstLine && firstLine.trim() ? firstLine + '\n' : '') +
    state.getLines(startLine + 1, nextLine, len, true) +
    (lastLine && lastLine.trim() ? lastLine : '')
  token.info = params
  token.map = [startLine, state.line]
  token.markup = open
  token.hidden = false
  console.log(state)
  console.log(token)

  return true
}

function blocks(state, startLine, endLine, silent) {
  let open = '::: test'
  let close = ':::'
  var openDelim,
    len,
    params,
    nextLine,
    token,
    firstLine,
    lastLine,
    lastLinePos,
    haveEndMarker = false,
    pos = state.bMarks[startLine] + state.tShift[startLine],
    max = state.eMarks[startLine]

  if (pos + open.length > max) {
    return false
  }

  openDelim = state.src.slice(pos, pos + open.length)

  if (openDelim !== open) {
    return false
  }

  pos += open.length
  firstLine = state.src.slice(pos, max)

  // Since start is found, we can report success here in validation mode
  if (silent) {
    return true
  }

  if (firstLine.trim().slice(-close.length) === close) {
    // Single line expression
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

  token = state.push('scriptss', 'scriptss', 0)
  token.block = true
  token.content =
    (firstLine && firstLine.trim() ? firstLine + '\n' : '') +
    state.getLines(startLine + 1, nextLine, len, true) +
    (lastLine && lastLine.trim() ? lastLine : '')
  token.children = ['']
  token.info = params
  token.map = [startLine, state.line]
  token.markup = open
  token.hidden = false

  // console.log(token)

  return true
}
// md.block.ruler.before('html_block', 'scriptss', container)

// // md.block.ruler.before('fence', 'script', block)
// md.renderer.rules.scriptss = function(tokens, idx) {
//   let content = tokens[idx].content
//   return `<ss>${content}</ss>`
// }

md.use(markdownitc, 'demo', {
  render: function(tokens, idx) {
    console.log(tokens);
    
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
  `::: demo vue
<div>
test text
</div>

<script>
util.marquee(document.querySelector(".marquee"))
</script>

:::
`
)

console.log(t)
