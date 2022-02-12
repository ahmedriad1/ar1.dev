const http = require('http')
const https = require('https')

/**
 *
 * @param {string | http.ClientRequestArgs & {data: any}} options
 * @param {'GET' | 'POST'} method
 * @returns {Promise<string>}
 */
const base = (options, method = 'GET') => {
  const reqUrl = typeof options === 'string' ? new URL(options) : options

  const protocol = reqUrl.protocol.startsWith('https') ? https : http

  const reqOptions = { ...reqUrl, method }

  return new Promise((resolve, reject) => {
    const req = protocol
      .request(reqOptions, res => {
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

    if (method === 'POST' && options?.data) {
      req.write(options.data)
      req.end()
    }
  })
}

/**
 *
 * @param {string | http.ClientRequestArgs} options
 * @returns {Promise<string>}
 */
const get = options => base(options, 'GET')

/**
 *
 * @param {string | http.ClientRequestArgs & {data: any}} options
 * @returns {Promise<string>}
 */
const post = options => base(options, 'POST')

module.exports = { get, post }
