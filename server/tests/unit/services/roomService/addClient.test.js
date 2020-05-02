'use strict';

const { expect } = require('chai');
const sinon = require('sinon');

const db = require('../../../../src/db/db');

const roomService = require('../../../../src/services/roomService');
const Errors = require('../../../../src/common/Errors');

module.exports = () =>
  describe('Add client', () => {
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
            }
          }
        }
      });
    });

    afterEach(() => {
      sinon.restore();
    });

    it('Should return connected clients array when a client is added', () => {
      // Arrange
      const roomId = '1';
      const client = {
        socketId: '2',
        name: 'Test client 2',
        isAdmin: false
      };

      const expectedClients = [
        {
          id: '1',
          name: 'Test client 1',
          isAdmin: true
        },
        {
          id: '2',
          name: 'Test client 2',
          isAdmin: false
        }
      ];

      const expectedClientLength = 2;

      // Act
      const result = roomService.addClient(roomId, client);

      // Assert
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(expectedClientLength);
      expect(result).to.have.deep.members(expectedClients);
    });

    it('Should return INVALID_PARAMETER_TYPE custom error when the parameter roomId is not a string', () => {
      // Arrange
      const roomId = 1;
      const expectedError = Errors.INVALID_PARAMETER_TYPE(typeof roomId, typeof 'string');

      // Act
      const result = roomService.addClient(roomId);

      // Assert
      expect(result).to.be.a('string');
      expect(result).to.be.equal(expectedError);
    });

    it('Should return EMPTY_PARAMETER_VALUE custom error when the parameter roomId is empty', () => {
      // Arrange
      const roomId = '';
      const expectedError = Errors.EMPTY_PARAMETER_VALUE('roomId');

      // Act
      const result = roomService.addClient(roomId);

      // Assert
      expect(result).to.be.a('string');
      expect(result).to.be.equal(expectedError);
    });

    it('Should return ROOM_NOT_FOUND custom error when the room does not exist', () => {
      // Arrange
      const roomId = '2';
      const expectedError = Errors.ROOM_NOT_FOUND;

      // Act
      const result = roomService.addClient(roomId);

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
      const result = roomService.addClient(roomId, { socketId });

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
      const result = roomService.addClient(roomId, { socketId });

      // Assert
      expect(result).to.be.a('string');
      expect(result).to.be.equal(expectedError);
    });

    it('Should return INVALID_PARAMETER_TYPE custom error when the parameter name is not a string', () => {
      // Arrange
      const roomId = '1';
      const socketId = '1';
      const name = 1;
      const expectedError = Errors.INVALID_PARAMETER_TYPE(typeof name, typeof 'string');

      // Act
      const result = roomService.addClient(roomId, { socketId, name });

      // Assert
      expect(result).to.be.a('string');
      expect(result).to.be.equal(expectedError);
    });

    it('Should return EMPTY_PARAMETER_VALUE custom error when the parameter socketId is empty', () => {
      // Arrange
      const roomId = '1';
      const socketId = '1';
      const name = '';
      const expectedError = Errors.EMPTY_PARAMETER_VALUE('name');

      // Act
      const result = roomService.addClient(roomId, { socketId, name });

      // Assert
      expect(result).to.be.a('string');
      expect(result).to.be.equal(expectedError);
    });

    it('Should return CLIENT_FLOUND custom error when the parameter client already exist', () => {
      // Arrange
      const roomId = '1';
      const client = {
        socketId: '1',
        name: 'Test client',
        isAdmin: true
      };

      const expectedError = Errors.CLIENT_FOUND;

      // Act
      const result = roomService.addClient(roomId, client);

      // Assert
      expect(result).to.be.an('string');
      expect(result).to.be.equal(expectedError);
    });
  });
