'use strict';

const { expect } = require('chai');
const sinon = require('sinon');

const db = require('../../../../src/db/db');
const roomService = require('../../../../src/services/roomService');
const Errors = require('../../../../src/common/Errors');

module.exports = () =>
  describe('Create room', () => {
    beforeEach(() => {
      sinon.stub(db, 'rooms').value({});
    });

    afterEach(() => {
      sinon.restore();
    });

    it('Should return id and name when the room is created', () => {
      // Arrange
      const name = 'Test room';
      const expectedName = 'Test room';

      // Act
      const result = roomService.createRoom(name);

      // Assert
      expect(result).to.have.property('id');
      expect(result.id).to.be.a('string');

      expect(result).to.have.property('name');
      expect(result.name).to.be.a('string');
      expect(result.name).to.be.equal(expectedName);
    });

    it('Should return INVALID_PARAMETER_TYPE custom error when the parameter is not a string', () => {
      // Arrange
      const name = 1;
      const expectedError = Errors.INVALID_PARAMETER_TYPE(typeof name, typeof 'string');

      // Act
      const result = roomService.createRoom(name);

      // Assert
      expect(result).to.be.a('string');
      expect(result).to.be.equal(expectedError);
    });

    it('Should return EMPTY_PARAMETER_VALUE custom error when the parameter is empty', () => {
      // Arrange
      const name = '';
      const expectedError = Errors.EMPTY_PARAMETER_VALUE('name');

      // Act
      const result = roomService.createRoom(name);

      // Assert
      expect(result).to.be.a('string');
      expect(result).to.be.equal(expectedError);
    });
  });
