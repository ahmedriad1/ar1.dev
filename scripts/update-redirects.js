const fs = require('fs')
const path = require('path')
const request = require('./utils/request')

const apiKey = process.env.POST_API_KEY
const apiUrl = process.env.API_URL

const isDev = process.env.NODE_ENV === 'development'

const redirectsFile = fs.readFileSync(
  isDev ? path.resolve('_redirects') : '../_redirects',
  'utf8',
)

function updateRedirects() {
  const url = new URL(`${apiUrl}/update-redirects`)
  return JSON.parse(
    await request.post({
      host: url.host,
      path: url.pathname,
      protocol: url.protocol,
      data: JSON.stringify({ redirects: redirectsFile }),
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }),
  )
}

async function go() {
  const response = await updateRedirects()

  if (!response.ok) {
    console.log('Not authorized to update redirects')
    process.exit(1)
  }

  console.log('redirects updated')
  process.exit(0)
}
go()
