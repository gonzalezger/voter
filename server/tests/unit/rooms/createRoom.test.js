'use strict';

const roomService = require('./../../../src/services/roomService');
const errors = require('./../../../src/common/errors');

jest.mock('../../../src/db/db', () => {
  return {
    rooms: {}
  }
});

describe('Create room', () => {
  it('Should return id and name when the room is created', () => {
    // Arrange
    const name = 'Test room';
    const expectedName = 'Test room';

    // Act
    const result = roomService.createRoom(name);

    // Assert
    expect(result).not.toBe(undefined);
    expect(result).not.toBe(null);

    expect(result).toHaveProperty('id');
    expect(typeof result.id).toBe(typeof 'string');

    expect(result).toHaveProperty('name');
    expect(typeof result.name).toBe(typeof 'string');
    expect(result.name).toBe(expectedName);
  });

  it('Should return BAD_PARAMETER_TYPE custom error when the parameter is not a string', () => {
    // Arrange
    const name = 1;
    const expectedError = errors.BAD_PARAMETER_TYPE(typeof name, typeof 'string');

    // Act
    const result = roomService.createRoom(name);

    // Assert
    expect(result).not.toBe(undefined);
    expect(result).not.toBe(null);
    expect(result).toMatch(expectedError);
    expect(typeof result).toBe(typeof 'string');
  });

  it('Should return EMPTY_PARAMETER_VALUE custom error when the parameter is empty', () => {
    // Arrange
    const name = '';
    const expectedError = errors.EMPTY_PARAMETER_VALUE('name');

    // Act
    const result = roomService.createRoom(name);

    // Assert
    expect(result).toMatch(expectedError);
    expect(result).not.toBe(undefined);
    expect(result).not.toBe(null);
    expect(typeof result).toBe(typeof 'string');
  });
});