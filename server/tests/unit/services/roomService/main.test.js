'use strict';

const getRoomTests = require('./getRoom.test');
const createRoomTests = require('./createRoom.test');
const deleteRoomTests = require('./deleteRoom.test');
const getConnectedClientsTests = require('./getConnectedClients.test');
const addClientTests = require('./addClient.test');
const deleteClientTests = require('./deleteClient.test');

describe('Room service', () => {
  getRoomTests();
  createRoomTests();
  deleteRoomTests();
  getConnectedClientsTests();
  addClientTests();
  deleteClientTests();
});
