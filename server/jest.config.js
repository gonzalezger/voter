// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    "node_modules",
    "tests",
  ],

  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    "global": {
      "branches": 90,
      "functions": 95,
      "lines": 95,
      "statements": 95
    }
  },

  // An array of file extensions your modules use
  moduleFileExtensions: [
    "js",
    "ts",
  ],

  // The test environment that will be used for testing
  testEnvironment: "node",

  // The regexp pattern or array of patterns that Jest uses to detect test files
  testRegex: "tests.*.test.(js|ts)?$",
};
