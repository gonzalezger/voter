'use strict';

const mongoose = require('mongoose');
const serviceLocator = require('../service-locator');
const logger = serviceLocator.get('logger');

class Mongo {
  constructor(port, host, name) {
    this.connect(port, host, name);
  }

  connect(port, host, name) {
    mongoose.connect(`mongodb://${host}:${port}/${name}`);
    const { connection } = mongoose;

    connection.on('connected', () => logger.info('Database Connection was Successful'));

    connection.on('error', (err) => logger.info('Database Connection Failed' + err));

    connection.on('disconnected', () => logger.info('Database Connection Disconnected'));

    process.on('SIGINT', () => {
      connection.close();
      logger.info('Database connection closed due to Node process termination');
      process.exit(0);
    });

    require('../models/user');
  }
}

module.exports = Mongo;
