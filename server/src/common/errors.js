'use strict';

module.exports = Object.freeze({
  ROOM_NOT_FOUND: 'No room found',

  CLIENT_FOUND: 'A client with the same name already exist',
  CLIENT_NOT_FOUND: 'Client not found',

  EMPTY_PARAMETER_VALUE: (str) => `The parameter ${str} cannot be empty`,

  INVALID_PARAMETER_TYPE: (actual, expected) =>
    `The parameter type must be ${expected}. Got ${actual}`
});
