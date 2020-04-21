'use strict';

const roomService = require('./../../../src/services/roomService');
const errors = require('./../../../src/common/errors');

describe('Get room', () => {
  it("Should return 'Room not found' custom error when the room does not exist", () => {
    // Arrange
    const roomId = 1;

    // Act
    const result = roomService.getRoom(roomId);

    // Assert
    expect(result).toBe(errors.ROOM_NOT_FOUND);
  });
});