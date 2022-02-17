/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: 'app',
  assetsBuildDirectory: 'public/build',
  publicPath: '/build/',
  server: './worker/index.ts',
  // serverBuildPath: 'build',
  serverBuildTarget: 'cloudflare-workers',
  devServerBroadcastDelay: 1000,
}
