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

describe('Delete room', () => {
  it('Should return true when the room is deleted', () => {
    // Arrange
    const id = '1';

    // Act
    const result = roomService.deleteRoom(id);

    // Assert
    expect(result).toBe(true);
  });

  it('Should return INVALID_PARAMETER_TYPE custom error when the parameter is not a string', () => {
    // Arrange
    const id = 1;
    const expectedError = errors.INVALID_PARAMETER_TYPE(typeof id, typeof 'string');

    // Act
    const result = roomService.deleteRoom(id);

    // Assert
    expect(result).toMatch(expectedError);
  });

  it('Should return EMPTY_PARAMETER_VALUE custom error when the parameter is empty', () => {
    // Arrange
    const id = '';
    const expectedError = errors.EMPTY_PARAMETER_VALUE('id');

    // Act
    const result = roomService.deleteRoom(id);

    // Assert
    expect(result).toMatch(expectedError);
  });

  it('Should return ROOM_NOT_FOUND custom error when the room does not exist', () => {
    // Arrange
    const roomId = "2";

    // Act
    const result = roomService.deleteRoom(roomId);

    // Assert
    expect(result).toBe(errors.ROOM_NOT_FOUND);
  });
});