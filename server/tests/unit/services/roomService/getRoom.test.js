'use strict';

const { expect } = require('chai');
const sinon = require('sinon');

const db = require('../../../../src/db/db');
const roomService = require('../../../../src/services/roomService');
const Errors = require('../../../../src/common/Errors');

module.exports = () =>
  describe('Get room', () => {
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

    it('Should return a single room when the room exist', () => {
      // Arrange
      const roomId = '1';
      const expectedRoomId = '1';
      const expectedName = 'Test room';

      // Act
      const result = roomService.getRoom(roomId);

      // Assert
      expect(result).to.have.property('id');
      expect(result.id).to.be.a('string');
      expect(result.id).to.be.equal(expectedRoomId);

      expect(result).to.have.property('name');
      expect(result.name).to.be.a('string');
      expect(result.name).to.be.equal(expectedName);

      expect(result).to.have.property('connectedClients');
      expect(result.connectedClients).to.be.a('object');
    });

    it('Should return ROOM_NOT_FOUND custom error when the room does not exist', () => {
      // Arrange
      const roomId = '2';
      const expectedError = Errors.ROOM_NOT_FOUND;

      // Act
      const result = roomService.getRoom(roomId);

      // Assert
      expect(result).to.be.a('string');
      expect(result).to.be.equal(expectedError);
    });

    it('Should return INVALID_PARAMETER_TYPE custom error when the parameter is not a string', () => {
      // Arrange
      const roomId = 1;
      const expectedError = Errors.INVALID_PARAMETER_TYPE(typeof roomId, typeof 'string');

      // Act
      const result = roomService.getRoom(roomId);

      // Assert
      expect(result).to.be.a('string');
      expect(result).to.be.equal(expectedError);
    });

    it('Should return EMPTY_PARAMETER_VALUE custom error when the parameter is empty', () => {
      // Arrange
      const roomId = '';
      const expectedError = Errors.EMPTY_PARAMETER_VALUE('id');

      // Act
      const result = roomService.getRoom(roomId);

      // Assert
      expect(result).to.be.a('string');
      expect(result).to.be.equals(expectedError);
    });
  });
