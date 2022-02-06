import * as shiki from 'shiki'
import * as escapeGoat from 'escape-goat'
import LRUCache from 'lru-cache'
import { visit, SKIP } from 'unist-util-visit'
import rangeParser from 'parse-numeric-range'
import path from 'path'

let highlighter
let cache = new LRUCache({
  max: 1024 * 1024 * 32,
  length(value, key) {
    return JSON.stringify(value).length + (key ? key.length : 0)
  },
})

let base16Theme
async function loadBase16() {
  if (base16Theme) return base16Theme
  const base16Path = path.resolve('plugins/shiki/base16.json')
  return shiki.loadTheme(base16Path)
}

let remarkCodeBlocksShiki = () => {
  return async function transformer(tree) {
    let theme = await loadBase16()
    highlighter =
      highlighter ||
      (await shiki.getHighlighter({
        themes: [theme],
      }))
    let themeName = 'base16'
    visit(tree, 'code', node => {
      var _a, _b
      if (
        !node.lang ||
        !node.value ||
        node.lang === 'txt' ||
        node.lang === 'text'
      )
        return

      let meta = Array.isArray(node.meta) ? node.meta[0] : node.meta
      let metaParams = new URLSearchParams()
      if (meta) {
        let linesHighlightsMeta = meta.match(/^\[(.+)\]$/)
        if (linesHighlightsMeta) metaParams.set('lines', linesHighlightsMeta[1])
        else metaParams = new URLSearchParams(meta.split(/\s+/).join('&'))
      }
      let language = node.lang
      let addedLines = parseLineRange(metaParams.get('add'))
      let removedLines = parseLineRange(metaParams.get('remove'))
      let highlightLines = parseLineRange(metaParams.get('lines'))
      let numbers = !metaParams.has('nonumber')
      let cacheKey = JSON.stringify([
        language,
        highlightLines,
        addedLines,
        removedLines,
        node.value,
      ])
      let nodeValue = cache.get(cacheKey)
      if (!nodeValue) {
        let fgColor = convertFakeHexToCustomProp(
          highlighter.getForegroundColor(themeName) || '',
        )
        let bgColor = convertFakeHexToCustomProp(
          highlighter.getBackgroundColor(themeName) || '',
        )
        let tokens = highlighter.codeToThemedTokens(
          node.value,
          language,
          themeName,
        )
        let isDiff = addedLines.length > 0 || removedLines.length > 0
        let diffLineNumber = 0
        let children = tokens.map((lineTokens, zeroBasedLineNumber) => {
          let children = lineTokens.map(token => {
            let color = convertFakeHexToCustomProp(token.color || '')
            let content = {
              type: 'text',
              // Do not escape the _actual_ content
              value: token.content,
            }
            return color && color !== fgColor
              ? {
                  type: 'element',
                  tagName: 'span',
                  properties: {
                    style: `color: ${escapeGoat.htmlEscape(color)}`,
                  },
                  children: [content],
                }
              : content
          })
          children.push({
            type: 'text',
            value: '\n',
          })
          const lineNumber = zeroBasedLineNumber + 1
          const highlightLine = highlightLines.includes(lineNumber)
          const removeLine = removedLines.includes(lineNumber)
          const addLine = addedLines.includes(lineNumber)
          if (!removeLine) diffLineNumber++

          return {
            type: 'element',
            tagName: 'span',
            properties: {
              className: 'codeblock-line',
              dataHighlight: highlightLine ? 'true' : undefined,
              dataLineNumber: numbers ? lineNumber : undefined,
              dataAdd: isDiff ? addLine : undefined,
              dataRemove: isDiff ? removeLine : undefined,
              dataDiffLineNumber: isDiff ? diffLineNumber : undefined,
            },
            children,
          }
        })
        let metaProps = {}
        metaParams.forEach((val, key) => {
          if (key === 'lines') return
          metaProps[`data-${key}`] = val
        })
        nodeValue = {
          type: 'element',
          tagName: 'pre',
          properties: {
            ...metaProps,
            dataLineNumbers: numbers ? 'true' : 'false',
            dataLang: escapeGoat.htmlEscape(language),
            style: `color: ${escapeGoat.htmlEscape(
              fgColor,
            )};background-color: ${escapeGoat.htmlEscape(bgColor)}`,
          },
          children: [
            {
              type: 'element',
              tagName: 'code',
              children,
            },
          ],
        }
        cache.set(cacheKey, nodeValue)
      }
      let data =
        (_a = node.data) !== null && _a !== void 0 ? _a : (node.data = {})
      node.type = 'element'
      ;(_b = data.hProperties) !== null && _b !== void 0
        ? _b
        : (data.hProperties = {})
      data.hChildren = [nodeValue]
      return SKIP
    })
  }
}

let parseLineRange = param => {
  if (!param) return []
  return rangeParser(param)
}

function convertFakeHexToCustomProp(color) {
  return color.replace(/^#FFFF(.+)/, 'var(--base$1)')
}

export default remarkCodeBlocksShiki
