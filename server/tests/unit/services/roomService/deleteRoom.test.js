'use strict';

const { expect } = require('chai');
const sinon = require('sinon');

const db = require('../../../../src/db/db');

const roomService = require('../../../../src/services/roomService');
const Errors = require('../../../../src/common/Errors');

module.exports = () =>
  describe('Delete room', () => {
    beforeEach(() => {
      sinon.stub(db, 'rooms').value({
        '1': {
          id: '1',
          name: 'Test room',
          connectedClients: {}
        }
      });
    });

    afterEach(() => {
      sinon.restore();
    });

    it('Should return true when the room is deleted', () => {
      // Arrange
      const id = '1';

      // Act
      const result = roomService.deleteRoom(id);

      // Assert
      expect(result).to.be.a('boolean');
      expect(result).to.be.true;
    });

    it('Should return INVALID_PARAMETER_TYPE custom error when the parameter is not a string', () => {
      // Arrange
      const id = 1;
      const expectedError = Errors.INVALID_PARAMETER_TYPE(typeof id, typeof 'string');

      // Act
      const result = roomService.deleteRoom(id);

      // Assert
      expect(result).to.be.a('string');
      expect(result).to.be.equal(expectedError);
    });

    it('Should return EMPTY_PARAMETER_VALUE custom error when the parameter is empty', () => {
      // Arrange
      const id = '';
      const expectedError = Errors.EMPTY_PARAMETER_VALUE('id');

      // Act
      const result = roomService.deleteRoom(id);

      // Assert
      expect(result).to.be.a('string');
      expect(result).to.be.equal(expectedError);
    });

    it('Should return ROOM_NOT_FOUND custom error when the room does not exist', () => {
      // Arrange
      const roomId = '2';
      const expectedError = Errors.ROOM_NOT_FOUND;

      // Act
      const result = roomService.deleteRoom(roomId);

      // Assert
      expect(result).to.be.a('string');
      expect(result).to.be.equal(expectedError);
    });
  });
