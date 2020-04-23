'use strict';

const roomService = require('./../../../src/services/roomService');
const Errors = require('./../../../src/common/Errors');

jest.mock('../../../src/db/db', () => {
  return {
    rooms: {
      '1': {
        id: '1',
        name: 'Test room',
        connectedClients: {
          '1': {
            id: '1',
            name: 'Test client',
            isAdmin: true
          }
        }
      },
      '2': {
        id: '2',
        name: 'Test room',
        connectedClients: {}
      }
    }
  };
});

describe('Get room connected clients', () => {
  it('Should return empty array when no clients are connected', () => {
    // Arrange
    const roomId = '2';

    // Act
    const result = roomService.getRoomConnectedClients(roomId);

    // Assert
    expect(result.length).toBe(0);
  });

  it('Should return a single client when a single client is connected', () => {
    // Arrange
    const roomId = '1';
    const expectedClientConnectedId = '1';
    const expectedClientConnectedName = 'Test client';
    const expectedIsAdmin = true;

    // Act
    const result = roomService.getRoomConnectedClients(roomId);

    // Asert
    expect(result.length).toBe(1);

    expect(result[0]).toHaveProperty('id');
    expect(result[0].id).toBe(expectedClientConnectedId);

    expect(result[0]).toHaveProperty('name');
    expect(result[0].name).toBe(expectedClientConnectedName);

    expect(result[0]).toHaveProperty('isAdmin');
    expect(result[0].isAdmin).toBe(expectedIsAdmin);
  });

  it('Should return ROOM_NOT_FOUND custom error when the room does not exist', () => {
    // Arrange
    const roomId = '3';

    // Act
    const result = roomService.getRoomConnectedClients(roomId);

    // Assert
    expect(result).toBe(Errors.ROOM_NOT_FOUND);
  });

  it('Should return INVALID_PARAMETER_TYPE custom error when the parameter is not a string', () => {
    // Arrange
    const roomId = 1;
    const expectedError = Errors.INVALID_PARAMETER_TYPE(typeof roomId, typeof 'string');

    // Act
    const result = roomService.getRoomConnectedClients(roomId);

    // Assert
    expect(result).toBe(expectedError);
  });

  it('Should return EMPTY_PARAMETER_VALUE custom error when the parameter is empty', () => {
    // Arrange
    const roomId = '';
    const expectedError = Errors.EMPTY_PARAMETER_VALUE('id');

    // Act
    const result = roomService.getRoomConnectedClients(roomId);

    // Assert
    expect(result).toBe(expectedError);
  });
});
