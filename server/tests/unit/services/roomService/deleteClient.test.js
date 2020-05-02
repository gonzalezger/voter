'use strict';

const { expect } = require('chai');
const sinon = require('sinon');

const db = require('../../../../src/db/db');

const roomService = require('../../../../src/services/roomService');
const Errors = require('../../../../src/common/Errors');

module.exports = () =>
  describe('Delete client', () => {
    beforeEach(() => {
      sinon.stub(db, 'rooms').value({
        '1': {
          id: '1',
          name: 'Test room',
          connectedClients: {
            '1': {
              id: '1',
              name: 'Test client 1',
              isAdmin: true
            },
            '2': {
              id: '2',
              name: 'Test client 2',
              isAdmin: false
            }
          }
        }
      });
    });

    afterEach(() => {
      sinon.restore();
    });

    it('Should return remaining connectedClients array when the client is deleted', () => {
      // Arrange
      const roomId = '1';
      const clientId = '2';

      const expectedConnectedClientsLength = 1;
      const expectedConnectedClients = [
        {
          id: '1',
          name: 'Test client 1',
          isAdmin: true
        }
      ];

      // Act
      const result = roomService.deleteClient(roomId, clientId);

      // Assert
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(1);
      expect(result).to.deep.members(expectedConnectedClients);
    });

    it('Should return remaining connectedClients array when the client is deleted', () => {
      // Arrange
      const roomId = '1';
      const clientId = '2';

      const expectedConnectedClientsLength = 1;
      const expectedConnectedClients = [
        {
          id: '1',
          name: 'Test client 1',
          isAdmin: true
        }
      ];

      // Act
      const result = roomService.deleteClient(roomId, clientId);

      // Assert
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(1);
      expect(result).to.deep.members(expectedConnectedClients);
    });

    it("Should return 'Deleted client and room' when the last client is deleted", () => {
      // Arrange
      const roomId = '1';
      const clientId = '1';
      const clientId2 = '2';

      const expectedConnectedClientsLength = 1;
      const expectedConnectedClients = [
        {
          id: '2',
          name: 'Test client 2',
          isAdmin: false
        }
      ];
      const expectResultMessage = 'Deleted client and room';

      // Act
      const result = roomService.deleteClient(roomId, clientId);
      const result2 = roomService.deleteClient(roomId, clientId2);

      // Assert
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(expectedConnectedClientsLength);
      expect(result).to.deep.members(expectedConnectedClients);
      expect(result2).to.be.a('string');
      expect(result2).to.equal(expectResultMessage);
    });

    it('Should return ROOM_NOT_FOUND after get room when the last client is deleted', () => {
      // Arrange
      const roomId = '1';
      const clientId = '1';
      const clientId2 = '2';

      const expectResultMessage = Errors.ROOM_NOT_FOUND;

      // Act
      roomService.deleteClient(roomId, clientId);
      roomService.deleteClient(roomId, clientId2);
      const result = roomService.getRoom(roomId);

      // Assert
      expect(result).to.be.a('string');
      expect(result).to.equal(expectResultMessage);
    });

    it('Should return INVALID_PARAMETER_TYPE custom error when the parameter roomId is not a string', () => {
      // Arrange
      const roomId = 1;
      const expectedError = Errors.INVALID_PARAMETER_TYPE(typeof roomId, typeof 'string');

      // Act
      const result = roomService.deleteClient(roomId);

      // Assert
      expect(result).to.be.a('string');
      expect(result).to.be.equal(expectedError);
    });

    it('Should return EMPTY_PARAMETER_VALUE custom error when the parameter roomId is empty', () => {
      // Arrange
      const roomId = '';
      const expectedError = Errors.EMPTY_PARAMETER_VALUE('roomId');

      // Act
      const result = roomService.deleteClient(roomId);

      // Assert
      expect(result).to.be.a('string');
      expect(result).to.be.equal(expectedError);
    });

    it('Should return ROOM_NOT_FOUND custom error when the room does not exist', () => {
      // Arrange
      const roomId = '2';
      const expectedError = Errors.ROOM_NOT_FOUND;

      // Act
      const result = roomService.deleteClient(roomId);

      // Assert
      expect(result).to.be.a('string');
      expect(result).to.be.equal(expectedError);
    });

    it('Should return INVALID_PARAMETER_TYPE custom error when the parameter socketId is not a string', () => {
      // Arrange
      const roomId = '1';
      const socketId = 1;
      const expectedError = Errors.INVALID_PARAMETER_TYPE(typeof socketId, typeof 'string');

      // Act
      const result = roomService.deleteClient(roomId, socketId);

      // Assert
      expect(result).to.be.a('string');
      expect(result).to.be.equal(expectedError);
    });

    it('Should return EMPTY_PARAMETER_VALUE custom error when the parameter socketId is empty', () => {
      // Arrange
      const roomId = '1';
      const socketId = '';
      const expectedError = Errors.EMPTY_PARAMETER_VALUE('socketId');

      // Act
      const result = roomService.deleteClient(roomId, socketId);

      // Assert
      expect(result).to.be.a('string');
      expect(result).to.be.equal(expectedError);
    });

    it('Should return CLIENT_NOT_FOUND custom error when the client does not exist', () => {
      // Arrange
      const roomId = '1';
      const clientId = '3';
      const expectedError = Errors.CLIENT_NOT_FOUND;

      // Act
      const result = roomService.deleteClient(roomId, clientId);

      // Assert
      expect(result).to.be.a('string');
      expect(result).to.be.equal(expectedError);
    });
  });
