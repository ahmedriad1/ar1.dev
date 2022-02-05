import remarkEmbedder from '@remark-embedder/core'
import oembedTransformer from '@remark-embedder/transformer-oembed'

function handleEmbedderHtml(html, info) {
  if (!html) return null

  const url = new URL(info.url)
  // matches youtu.be and youtube.com
  if (/youtu\.?be/.test(url.hostname)) return makeEmbed(html, 'youtube')

  if (url.hostname.includes('codesandbox.io'))
    return makeEmbed(html, 'codesandbox', '80%')

  return html
}

function handleEmbedderError({ url }) {
  return `<p>Error embedding <a href="${url}">${url}</a>.`
}

function makeEmbed(html, type, heightRatio = '56.25%') {
  return `
  <div class="embed" data-embed-type="${type}">
    <div style="padding-bottom: ${heightRatio}">
      ${html}
    </div>
  </div>
`
}

const embedPlugin = [
  remarkEmbedder,
  {
    handleError: handleEmbedderError,
    handleHTML: handleEmbedderHtml,
    transformers: [oembedTransformer],
  },
]

export default embedPlugin
