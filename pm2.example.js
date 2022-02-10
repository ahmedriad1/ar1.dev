const npmPath = 'PATH_TO_NPM_CLI'

module.exports = {
  apps: [
    {
      name: 'Tailwind CSS',
      script: npmPath,
      args: 'run dev:css',
      autorestart: false,
      ignore_watch: ['.'],
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'Remix',
      script: 'npm run dev:remix',
      script: npmPath,
      args: 'run dev:remix',
      autorestart: false,
      ignore_watch: ['.'],
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'Miniflare',
      script: npmPath,
      args: 'run start',
      autorestart: false,
      ignore_watch: ['.'],
      watch_options: {
        followSymlinks: false,
      },
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
}
