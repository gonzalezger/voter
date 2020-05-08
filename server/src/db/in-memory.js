/**
 * Kind of in-memory database
 * This way we can mock the require statement in services, allowing us to fill the db for testing
 */

const db = {
  rooms: {}
};

module.exports = db;
