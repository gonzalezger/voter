/**
 * Migrate to TS as soon as possible
 * I can't live without types :(
 */

'use strict';

function isString(str) {
  return typeof str === typeof 'string';
}

function isNumber(n) {
  return n === parseFloat(n, 10);
}

module.exports = {
  isString,
  isNumber
};
