const https = require('https')
const http = require('http')
const fs = require('fs')
const path = require('path')

const apiKey = process.env.POST_API_KEY
const apiUrl = process.env.API_URL

const isDev = process.env.NODE_ENV === 'development'

const redirectsFile = fs.readFileSync(
  isDev ? path.resolve('_redirects') : '../_redirects',
  'utf8',
)

function updateRedirects() {
  const url = new URL(`${apiUrl}/update-redirects`)

  const options = {
    method: 'POST',
    hostname: url.hostname,
    path: url.pathname,
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  }

  const isLocal = url.hostname === 'localhost' || url.hostname === '127.0.0.1'
  if (isLocal) options.port = url.port

  const fetch = isLocal ? http : https

  return new Promise((resolve, reject) => {
    const req = fetch
      .request(options, res => {
        let data = ''
        res.on('data', d => {
          data += d
        })

        res.on('end', () => {
          try {
            resolve(JSON.parse(data))
          } catch (error) {
            reject(error)
          }
        })
      })
      .on('error', e => {
        reject(e)
      })
    req.write(JSON.stringify({ redirects: redirectsFile }))
    req.end()
  })
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

/*
eslint
  consistent-return: "off",
*/
