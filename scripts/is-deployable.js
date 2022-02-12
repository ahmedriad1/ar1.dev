// try to keep this dep-free so we don't have to install deps
const { getChangedFiles } = require('./get-changed-files')
const request = require('./utils/request')
const [currentCommitSha] = process.argv.slice(2)

async function go() {
  const buildInfo = JSON.parse(
    await request.get({
      host: 'ar1.dev',
      path: '/build/info.json',
      protocol: 'https',
    }),
  )

  const compareCommitSha = buildInfo.commit.sha
  const changedFiles = await getChangedFiles(currentCommitSha, compareCommitSha)
  console.error('Determining whether the changed files are deployable', {
    currentCommitSha,
    compareCommitSha,
    changedFiles,
  })
  // deploy if:
  // - there was an error getting the changed files (null)
  // - there are no changed files
  // - there are changed files, but at least one of them is non-content
  const isDeployable =
    !changedFiles ||
    changedFiles.length === 0 ||
    changedFiles.some(
      ({ filename }) =>
        !filename.startsWith('content') && filename !== '_redirects',
    )

  console.error(
    isDeployable
      ? '🟢 There are deployable changes'
      : '🔴 No deployable changes',
    { isDeployable },
  )
  console.log(isDeployable)
}

go().catch(e => {
  console.error(e)
  console.log('true')
})
