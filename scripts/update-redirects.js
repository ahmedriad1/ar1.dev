const https = require('https')
const fs = require('fs')

const apiKey = process.env.POST_API_KEY
const apiUrl = process.env.API_URL

const redirectsFile = fs.readFileSync('../_redirects', 'utf8')

function updateRedirects() {
  const url = new URL(`${apiUrl}/update-redirects`)

  return new Promise((resolve, reject) => {
    const req = https
      .request(
        {
          method: 'POST',
          hostname: url.hostname,
          path: url.pathname,
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        },
        res => {
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
        },
      )
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
