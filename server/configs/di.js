'use strict';

const serviceLocator = require('../src/service-locator');
const config = require('./configs')();

serviceLocator.register('logger', () => {
  return require('../src/common/logger').create(config.application_logging);
});

module.exports = serviceLocator;
