// try to keep this dep-free so we don't have to install deps
const { getChangedFiles, fetchJson } = require('./get-changed-files')
const [currentCommitSha] = process.argv.slice(2)
async function go() {
  const buildInfo = await fetchJson('https://ar1.dev/build/info.json')
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
