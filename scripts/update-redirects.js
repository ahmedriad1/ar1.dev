const fs = require('fs')
const path = require('path')
const request = require('./utils/request')

const apiKey = process.env.POST_API_KEY
const apiUrl = process.env.API_URL

const redirectsFile = fs.readFileSync(path.resolve('_redirects'), 'utf8')

async function updateRedirects() {
  return JSON.parse(
    await request.post(
      `${apiUrl}/update-redirects`,
      JSON.stringify({ redirects: redirectsFile }),
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      },
    ),
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
