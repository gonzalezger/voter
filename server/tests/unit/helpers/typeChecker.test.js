'use strict';

const { expect } = require('chai');
const sinon = require('sinon');

const db = require('../../../src/db/db');

const typeChecker = require('../../../src/helpers/type-checker');
const Errors = require('../../../src/common/Errors');

describe('Type checker', () => {
  describe('Is String', () => {
    it('Should return true when a string value is passed', () => {
      // Arrange
      const str = 'test';
      const str2 = 'another test';

      // Act
      const result = typeChecker.isString(str);
      const result2 = typeChecker.isString(str2);

      // Assert
      expect(result).to.be.a('boolean');
      expect(result).to.be.true;
      expect(result2).to.be.a('boolean');
      expect(result2).to.be.true;
    });

    it('Should return false when a non-string value is passed', () => {
      // Arrange
      const nonString = 1;
      const nonString2 = {};
      const nonString3 = [];

      // Act
      const result = typeChecker.isString(nonString);
      const result2 = typeChecker.isString(nonString2);
      const result3 = typeChecker.isString(nonString3);

      // Assert
      expect(result).to.be.a('boolean');
      expect(result).to.be.false;
      expect(result2).to.be.a('boolean');
      expect(result2).to.be.false;
      expect(result3).to.be.a('boolean');
      expect(result3).to.be.false;
    });
  });

  describe('Is Number', () => {
    it('Should return true when a number value is passed', () => {
      // Arrange
      const number = 1;
      const number2 = 200;

      // Act
      const result = typeChecker.isNumber(number);
      const result2 = typeChecker.isNumber(number2);

      // Assert
      expect(result).to.be.a('boolean');
      expect(result).to.be.true;
      expect(result2).to.be.a('boolean');
      expect(result2).to.be.true;
    });

    it('Should return false when a non-number value is passed', () => {
      // Arrange
      const nonNumber = '1';
      const nonNumber2 = {};
      const nonNumber3 = [];

      // Act
      const result = typeChecker.isNumber(nonNumber);
      const result2 = typeChecker.isNumber(nonNumber2);
      const result3 = typeChecker.isNumber(nonNumber3);

      // Assert
      expect(result).to.be.a('boolean');
      expect(result).to.be.false;
      expect(result2).to.be.a('boolean');
      expect(result2).to.be.false;
      expect(result3).to.be.a('boolean');
      expect(result3).to.be.false;
    });
  });
});
