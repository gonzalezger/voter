'use strict';

const roomService = require('./../../../src/services/roomService');
const Errors = require('./../../../src/common/Errors');

jest.mock('../../../src/db/db', () => {
  return {
    rooms: {
      '1': {
        id: '1',
        name: 'Test room',
        connectedClients: {}
      }
    }
  };
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
    expect(result).toHaveProperty('id');
    expect(result.id).toBe(expectedRoomId);

    expect(result).toHaveProperty('name');
    expect(result.name).toBe(expectedName);

    expect(result).toHaveProperty('connectedClients');
  });

  it('Should return ROOM_NOT_FOUND custom error when the room does not exist', () => {
    // Arrange
    const roomId = '2';

    // Act
    const result = roomService.getRoom(roomId);

    // Assert
    expect(result).toBe(Errors.ROOM_NOT_FOUND);
  });

  it('Should return INVALID_PARAMETER_TYPE custom error when the parameter is not a string', () => {
    // Arrange
    const roomId = 1;
    const expectedError = Errors.INVALID_PARAMETER_TYPE(typeof roomId, typeof 'string');

    // Act
    const result = roomService.getRoom(roomId);

    // Assert
    expect(result).toBe(expectedError);
  });

  it('Should return EMPTY_PARAMETER_VALUE custom error when the parameter is empty', () => {
    // Arrange
    const roomId = '';
    const expectedError = Errors.EMPTY_PARAMETER_VALUE('id');

    // Act
    const result = roomService.getRoom(roomId);

    // Assert
    expect(result).toBe(expectedError);
  });
});
