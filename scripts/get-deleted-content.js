const fs = require('fs')
const path = require('path')
const { getChangedFiles } = require('./get-changed-files')
const request = require('./utils/request')

const [currentCommitSha] = process.argv.slice(2)

async function go() {
  const buildInfo = JSON.parse(
    await request.get('https://ar1.dev/api/get-content-sha'),
  )
  const compareCommitSha = buildInfo.commit.sha
  let changedFiles = []
  if (compareCommitSha) {
    changedFiles =
      (await getChangedFiles(currentCommitSha, compareCommitSha)) ?? []
    console.error('Determining whether the changed files are content', {
      currentCommitSha,
      compareCommitSha,
      changedFiles,
    })
  }

  const contentFiles = changedFiles
    .filter(
      ({ filename, changeType }) =>
        filename.startsWith('content/') && changeType === 'deleted',
    )
    .map(({ filename }) => {
      const parts = filename.split('/')

      if (parts.length < 3) return null
      if (filename.endsWith('/_series.mdx')) return null
      if (!filename.endsWith('.mdx') || filename.endsWith('/index.mdx'))
        return parts.slice(0, parts.length - 1).join('/')

      return filename
    })
  console.log(Array.from(new Set(contentFiles)).filter(Boolean).join(' '))
}

go().catch(e => {
  console.error(e)
  console.log('')
})
