module.exports = {
  apps: [
    {
      name: 'luverano',
      cwd: process.env.PM2_CWD || '.',
      script: '.next/standalone/server.js',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || '3000',
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '400M',
      error_file: process.env.PM2_LOG_ERR || './logs/error.log',
      out_file: process.env.PM2_LOG_OUT || './logs/out.log',
      time: true,
    },
  ],
};


