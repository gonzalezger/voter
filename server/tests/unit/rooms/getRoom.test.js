'use strict';

const roomService = require('./../../../src/services/roomService');
const errors = require('./../../../src/common/errors');

jest.mock('../../../src/db/db', () => {
  return {
    rooms: {
      '1': {
        id: '1',
        name: 'Test room',
        connectedClients: {}
      }
    }
  }
});

describe('Get room', () => {
  it('Should return a single room when the room exist', () => {
    // Arrange
    const roomId = '1';
    const expectedRoomId = '1';
    const expectedName = 'Test room';

    // Act
    const result = roomService.getRoom(roomId);

    // Assert
    expect(result).not.toBe(undefined);
    expect(result).not.toBe(null);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('connectedClients');
    expect(result.id).toBe(expectedRoomId);
    expect(result.name).toMatch(expectedName);
  });

  it('Should return ROOM_NOT_FOUND custom error when the room does not exist', () => {
    // Arrange
    const roomId = "2";

    // Act
    const result = roomService.getRoom(roomId);

    // Assert
    expect(result).not.toBe(undefined);
    expect(result).not.toBe(null);
    expect(typeof result).toBe(typeof 'string');
    expect(result).toBe(errors.ROOM_NOT_FOUND);

  });

  it('Should return BAD_PARAMETER_TYPE custom error when the parameter is not a string', () => {
    // Arrange
    const roomId = 1;
    const expectedError = errors.BAD_PARAMETER_TYPE(typeof roomId, typeof 'string');

    // Act
    const result = roomService.getRoom(roomId);

    // Assert
    expect(result).not.toBe(undefined);
    expect(result).not.toBe(null);
    expect(result).toMatch(expectedError);
    expect(typeof result).toBe(typeof 'string');
  });

  it('Should return EMPTY_PARAMETER_VALUE custom error when the parameter is empty', () => {
    // Arrange
    const roomId = '';
    const expectedError = errors.EMPTY_PARAMETER_VALUE('id');

    // Act
    const result = roomService.getRoom(roomId);

    // Assert
    expect(result).toMatch(expectedError);
    expect(result).not.toBe(undefined);
    expect(result).not.toBe(null);
    expect(typeof result).toBe(typeof 'string');
  });
});