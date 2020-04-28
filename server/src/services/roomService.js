'use strict';

const shortid = require('shortid');
const Errors = require('../common/Errors');
const typeChecker = require('../common/typeChecker');

const db = require('../db/db');

function getRoom(id) {
  if (!id) return Errors.EMPTY_PARAMETER_VALUE('id');

  if (!typeChecker.isString(id)) return Errors.INVALID_PARAMETER_TYPE(typeof id, 'string');

  return db.rooms[id] || Errors.ROOM_NOT_FOUND;
}

function createRoom(name) {
  if (!name) return Errors.EMPTY_PARAMETER_VALUE('name');

  if (!typeChecker.isString(name)) return Errors.INVALID_PARAMETER_TYPE(typeof name, 'string');

  const id = shortid.generate();

  db.rooms[id] = {
    id,
    name,
    connectedClients: {}
  };

  return { id, name };
}

function deleteRoom(id) {
  if (!id) return Errors.EMPTY_PARAMETER_VALUE('id');

  if (!typeChecker.isString(id)) return Errors.INVALID_PARAMETER_TYPE(typeof id, 'string');

  if (!existRoom(id)) return Errors.ROOM_NOT_FOUND;

  try {
    delete db.rooms[id];

    return true;
  } catch (error) {
    // log error
    return false;
  }
}

function getRoomConnectedClients(id) {
  if (!id) return Errors.EMPTY_PARAMETER_VALUE('id');

  if (!typeChecker.isString(id)) return Errors.INVALID_PARAMETER_TYPE(typeof id, 'string');

  if (!existRoom(id)) return Errors.ROOM_NOT_FOUND;

  return Object.values(db.rooms[id].connectedClients);
}

function addClient(roomId, { socketId, name, isAdmin } = {}) {
  // TODO: Wrap this logic into a separate npm package
  // validate({
  //  roomId: {
  //    value: roomId,
  //    validations: ['string', 'not_empty'],
  //    funValidations: [cb1, cb2]
  // }
  //})

  if (!roomId) return Errors.EMPTY_PARAMETER_VALUE('roomId');

  if (!typeChecker.isString(roomId)) return Errors.INVALID_PARAMETER_TYPE(typeof roomId, 'string');

  if (!existRoom(roomId)) return Errors.ROOM_NOT_FOUND;

  if (!socketId) return Errors.EMPTY_PARAMETER_VALUE('socketId');

  if (!typeChecker.isString(socketId))
    return Errors.INVALID_PARAMETER_TYPE(typeof socketId, 'string');

  if (!name) return Errors.EMPTY_PARAMETER_VALUE('name');

  if (!typeChecker.isString(name)) return Errors.INVALID_PARAMETER_TYPE(typeof name, 'string');

  if (existClient(roomId, socketId)) return Errors.CLIENT_FOUND;

  const room = db.rooms[roomId];

  room.connectedClients[socketId] = { id: socketId, name, isAdmin };

  return Object.values(room.connectedClients);
}

function deleteClient(roomId, socketId) {
  if (!roomId) return Errors.EMPTY_PARAMETER_VALUE('roomId');

  if (!typeChecker.isString(roomId)) return Errors.INVALID_PARAMETER_TYPE(typeof roomId, 'string');

  if (!existRoom(roomId)) return Errors.ROOM_NOT_FOUND;

  if (!socketId) return Errors.EMPTY_PARAMETER_VALUE('socketId');

  if (!typeChecker.isString(socketId))
    return Errors.INVALID_PARAMETER_TYPE(typeof socketId, 'string');

  if (!existClient(roomId, socketId)) return Errors.CLIENT_NOT_FOUND;

  const room = db.rooms[roomId];

  delete room.connectedClients[socketId];

  const connectedClients = getRoomConnectedClients(roomId);
  if (Array.isArray(connectedClients) && !connectedClients.length) {
    deleteRoom(roomId);

    return 'Deleted client and room';
  }

  return Object.values(room.connectedClients);
}

function existRoom(id) {
  return id in db.rooms;
}

function existClient(roomId, socketId) {
  return socketId in db.rooms[roomId].connectedClients;
}

module.exports = {
  getRoom,
  createRoom,
  deleteRoom,
  getRoomConnectedClients,
  addClient,
  deleteClient
};
