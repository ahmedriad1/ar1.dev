// try to keep this dep-free so we don't have to install deps
const { getChangedFiles } = require('./get-changed-files')
const request = require('./utils/request')
const [currentCommitSha] = process.argv.slice(2)

async function go() {
  const buildInfo = JSON.parse(
    await request.get('https://ar1.dev/build/info.json'),
  )
  const compareCommitSha = buildInfo.commit.sha
  const changedFiles = await getChangedFiles(currentCommitSha, compareCommitSha)
  console.error('Determining whether redirects are changed', {
    currentCommitSha,
    compareCommitSha,
    changedFiles,
  })

  const isChanged =
    changedFiles &&
    changedFiles.length > 0 &&
    changedFiles.some(({ filename }) => filename === '_redirects')

  console.error(
    isChanged ? '🟢 Redirects are changed' : '🔴 Redirects are not changed',
    { isChanged },
  )
  console.log(isChanged)
}

go().catch(e => {
  console.error(e)
  console.log('false')
})
