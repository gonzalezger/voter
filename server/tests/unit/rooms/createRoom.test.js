'use strict';

const roomService = require('./../../../src/services/roomService');
const Errors = require('./../../../src/common/Errors');

jest.mock('../../../src/db/db', () => {
  return {
    rooms: {}
  };
});

describe('Create room', () => {
  it('Should return id and name when the room is created', () => {
    // Arrange
    const name = 'Test room';
    const expectedName = 'Test room';

    // Act
    const result = roomService.createRoom(name);

    // Assert
    expect(result).toHaveProperty('id');
    expect(typeof result.id).toBe(typeof 'string');

    expect(result).toHaveProperty('name');
    expect(result.name).toBe(expectedName);
  });

  it('Should return INVALID_PARAMETER_TYPE custom error when the parameter is not a string', () => {
    // Arrange
    const name = 1;
    const expectedError = Errors.INVALID_PARAMETER_TYPE(typeof name, typeof 'string');

    // Act
    const result = roomService.createRoom(name);

    // Assert
    expect(result).toBe(expectedError);
  });

  it('Should return EMPTY_PARAMETER_VALUE custom error when the parameter is empty', () => {
    // Arrange
    const name = '';
    const expectedError = Errors.EMPTY_PARAMETER_VALUE('name');

    // Act
    const result = roomService.createRoom(name);

    // Assert
    expect(result).toBe(expectedError);
  });
});
