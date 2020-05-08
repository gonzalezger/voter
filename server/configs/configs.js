'use strict';

module.exports = () => ({
  app: {
    name: process.env.APP_NAME,
    port: process.env.APP_PORT || 8000,
    environment: process.env.APP_ENV,
    logpath: process.env.LOG_PATH
  },
  mongo: {
    port: process.env.MONGO_PORT,
    host: process.env.MONGO_HOST,
    name: process.env.MONGO_NAME
  },
  application_logging: {
    file: process.env.LOG_PATH,
    level: process.env.LOG_LEVEL || 'info',
    console: process.env.LOG_ENABLE_CONSOLE || true
  }
});
