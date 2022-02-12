const http = require('http')
const https = require('https')

const get = url => {
  const protocol = url.startsWith('https') ? https : http

  return new Promise((resolve, reject) => {
    protocol
      .get(url, res => {
        let data = ''
        res.on('data', d => {
          data += d
        })

        res.on('end', () => {
          try {
            resolve(data)
          } catch (error) {
            reject(error)
          }
        })
      })
      .on('error', e => {
        reject(e)
      })
  })
}

/**
 *
 * @param {string} url
 * @param {any} data
 * @param {object} extraOptions
 * @returns {Promise<string>}
 */
const post = (url, data, extraOptions = {}) => {
  const reqUrl = new URL(url)
  const protocol = reqUrl.protocol.startsWith('https') ? https : http

  const options = {
    method: 'POST',
    hostname: reqUrl.hostname,
    path: reqUrl.pathname,
    ...extraOptions,
  }

  const isLocal = url.hostname === 'localhost' || url.hostname === '127.0.0.1'
  if (isLocal) options.port = url.port

  return new Promise((resolve, reject) => {
    const req = protocol
      .request(options, res => {
        let recivedData = ''
        res.on('data', d => {
          recivedData += d
        })

        res.on('end', () => {
          try {
            resolve(recivedData)
          } catch (error) {
            reject(error)
          }
        })
      })
      .on('error', e => {
        reject(e)
      })

    req.write(data)
    req.end()
  })
}

module.exports = { get, post }
