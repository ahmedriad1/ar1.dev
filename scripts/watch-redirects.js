const chokidar = require('chokidar')
const path = require('path')
const exec = require('util').promisify(require('child_process').exec)

;(async function () {
  await main()
})()

async function main() {
  console.log('🔍 Now watching _redirects...')

  try {
    chokidar
      .watch(path.join(__dirname, '../_redirects'), { cwd: '.' })
      .on('all', async event => {
        const results = await doCompile()
        console.log(results)
      })
  } catch (e) {
    console.error(e)
  }
}

async function doCompile() {
  console.log(`🔃 Compiling _redirects...`)
  const command = `node -r dotenv/config ./scripts/update-redirects.js`

  let out = await exec(command).catch(e => {
    console.error(e)
  })

  return out.stdout
}
