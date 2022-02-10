const esbuild = require('esbuild')

const main = async () => {
  const isDev = process.env.NODE_ENV === 'development'

  console.log('🔃 Building worker...')
  const startDate = new Date()
  await esbuild.build({
    entryPoints: ['./worker'],
    define: {
      'process.env.NODE_ENV': isDev ? '"development"' : '"production"',
    },
    bundle: true,
    sourcemap: true,
    outdir: './dist',
    minify: !isDev,
  })
  const endTime = Math.round((new Date() - startDate) / 10)
  console.log(`✅ Build complete (${endTime}s).`)
}

main().catch(console.error)
