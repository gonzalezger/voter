'use strict';

const { expect } = require('chai');
const sinon = require('sinon');

const db = require('../../../../src/db/db');
const roomService = require('../../../../src/services/roomService');
const Errors = require('../../../../src/common/Errors');

module.exports = () =>
  describe('Get room connected clients', () => {
    beforeEach(() => {
      sinon.stub(db, 'rooms').value({
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
          name: 'Test room 2',
          connectedClients: {}
        }
      });
    });

    afterEach(() => {
      sinon.restore();
    });

    it('Should return empty array when no clients are connected', () => {
      // Arrange
      const roomId = '2';

      // Act
      const result = roomService.getRoomConnectedClients(roomId);

      // Assert
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(0);
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
      expect(result).to.be.an('array');
      expect(result).to.be.lengthOf(1);

      expect(result[0]).to.have.property('id');
      expect(result[0].id).to.be.a('string');
      expect(result[0].id).to.be.equal(expectedClientConnectedId);

      expect(result[0]).to.have.property('name');
      expect(result[0].name).to.be.a('string');
      expect(result[0].name).to.be.equal(expectedClientConnectedName);

      expect(result[0]).to.have.property('isAdmin');
      expect(result[0].isAdmin).to.be.a('boolean');
      expect(result[0].isAdmin).to.be.equal(expectedIsAdmin);
    });

    it('Should return ROOM_NOT_FOUND custom error when the room does not exist', () => {
      // Arrange
      const roomId = '3';
      const expectedError = Errors.ROOM_NOT_FOUND;

      // Act
      const result = roomService.getRoomConnectedClients(roomId);

      // Assert
      expect(result).to.be.a('string');
      expect(result).to.be.equal(expectedError);
    });

    it('Should return INVALID_PARAMETER_TYPE custom error when the parameter is not a string', () => {
      // Arrange
      const roomId = 1;
      const expectedError = Errors.INVALID_PARAMETER_TYPE(typeof roomId, typeof 'string');

      // Act
      const result = roomService.getRoomConnectedClients(roomId);

      // Assert
      expect(result).to.be.a('string');
      expect(result).to.be.equal(expectedError);
    });

    it('Should return EMPTY_PARAMETER_VALUE custom error when the parameter is empty', () => {
      // Arrange
      const roomId = '';
      const expectedError = Errors.EMPTY_PARAMETER_VALUE('id');

      // Act
      const result = roomService.getRoomConnectedClients(roomId);

      // Assert
      expect(result).to.be.a('string');
      expect(result).to.be.equal(expectedError);
    });
  });
