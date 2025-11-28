const fs = require('fs');
const dotenvFlow = require('dotenv-flow');

const env =
  dotenvFlow.listDotenvFiles(process.cwd(), { node_env: process.env.NODE_ENV })
    .filter(filename => fs.existsSync(filename))
    .reduce((prev, curr) => {
      return {
        ...prev,
        ...dotenvFlow.parse(curr)
      }
    }, {});

// console.log("env", env);

module.exports = {
  apps: [{
    name: 'calcify-backend',
    "script": "NODE_ENV=production npm run server",
    // "args": "start",
    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    // args: 'one two',
    instances: 1,
    autorestart: true,
    watch: true,
    // max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      ...env
    },
    env_production: {
      NODE_ENV: 'production',
      ...env
    },
    ignore_watch: [
      ".git",
      "logs",
      "node_modules",
      "uploads",
      "dist-server"
    ]
  }]
};
