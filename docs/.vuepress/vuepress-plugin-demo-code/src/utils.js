const { getParameters } = require('codesandbox/lib/api/define')
const { CODE_SANDBOX_JS, CODE_SANDBOX_HTML } = require('./constants')

const getJsTmpl = (js, language = 'html') => {
  if (language === 'html') {
    return js
  } else if (language === 'vue') {
    const vueAttrs = js
      .replace(/export\s+default\s*?\{\n*/, '')
      .replace(/\n*\}\s*$/, '')
      .trim()

    return `new Vue({\n\tel: '#app', \n\t${vueAttrs}\n})`
  }
}

/* istanbul ignore next */
const getHtmlTmpl = (html, language = 'html') => {
  if (language === 'html') {
    return html
  } else if (language === 'vue') {
    return `<div id="app">\n\n${html}\n\n</div>`
  }
}

const getMatchedResult = (re) => (str) => {
  const matched = str.match(re)

  return matched && matched[1].trim()
}

/* istanbul ignore next */
const urlToHtmlTag = (type) => (url) =>
  type === 'js'
    ? `<script src="${url}"></script>\n`
    : type === 'css'
    ? `<link rel="stylesheet" href="${url}">\n`
    : 'Error type: js | css'

/* istanbul ignore next */
const getCodeSandboxTmpl = ({ js, css, html, deps, jsLibs, cssLibs }) =>
  getParameters({
    files: {
      'index.js': { content: CODE_SANDBOX_JS },
      'App.vue': {
        content:
          `<template>\n\n${html}\n\n</template>\n\n` +
          `<script>\n${js}\n</script>\n\n` +
          `<style>\n${css}\n</style>\n`
      },
      'index.html': {
        content:
          cssLibs.map(urlToHtmlTag('css')) +
          jsLibs.map(urlToHtmlTag('js')) +
          CODE_SANDBOX_HTML
      },
      'package.json': {
        content: {
          dependencies: Object.assign({ vue: 'latest' }, deps)
        }
      }
    }
  })

function HTMLEncode(str) {
  // var temp = document.createElement("div");
  // (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
  // var output = temp.innerHTML;
  // temp = null;
  // return output;

  var s = ''
  if (str.length == 0) return ''
  s = str.replace(/&/g, '&amp;')
  s = s.replace(/</g, '&lt;')
  s = s.replace(/>/g, '&gt;')
  s = s.replace(/ /g, '&nbsp;')
  s = s.replace(/\'/g, '&#39;')
  s = s.replace(/\"/g, '&quot;')
  s = s.replace(/\n/g, '<br/>')
  return s
}

function HTMLDecode(str) {
  // var temp = document.createElement("div");
  // temp.innerHTML = text;
  // var output = temp.innerText || temp.textContent;
  // temp = null;
  // return output;
  var s = ''
  if (str.length == 0) return ''
  s = str.replace(/&amp;/g, '&')
  s = s.replace(/&lt;/g, '<')
  s = s.replace(/&gt;/g, '>')
  s = s.replace(/&nbsp;/g, ' ')
  s = s.replace(/&#39;/g, "'")
  s = s.replace(/&quot;/g, '"')
  s = s.replace(/<br\/>/g, '\n')
  return s
}

const parseAndDecode = (str) => JSON.parse(decodeURIComponent(str))
const encodeAndStringify = (obj) => encodeURIComponent(JSON.stringify(obj))

let scripts = []

function setScripts(scripts) {
  scripts = scripts
}

module.exports = {
  getJsTmpl,
  getHtmlTmpl,
  parseAndDecode,
  getMatchedResult,
  encodeAndStringify,
  getCodeSandboxTmpl,
  HTMLDecode,
  HTMLEncode,
  scripts,
  setScripts
}
