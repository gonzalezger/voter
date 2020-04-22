'use strict';

const shortid = require('shortid');
const errors = require('../common/errors');
const typeChecker = require('../common/typeChecker');

const db = require('../db/db');

function getRoom(id) {
  if (!id) return errors.EMPTY_PARAMETER_VALUE('id');

  if (!typeChecker.isString(id)) return errors.INVALID_PARAMETER_TYPE(typeof id, 'string');

  return db.rooms[id] || errors.ROOM_NOT_FOUND;
}

function createRoom(name) {
  if (!name) return errors.EMPTY_PARAMETER_VALUE('name');

  if (!typeChecker.isString(name)) return errors.INVALID_PARAMETER_TYPE(typeof name, 'string');

  const id = shortid.generate();

  db.rooms[id] = {
    id,
    name,
    connectedClients: {}
  };

  return { id, name };
}

function deleteRoom(id) {
  if (!id) return errors.EMPTY_PARAMETER_VALUE('id');

  if (!typeChecker.isString(id)) return errors.INVALID_PARAMETER_TYPE(typeof id, 'string');

  if (!existRoom(id)) return errors.ROOM_NOT_FOUND;

  try {
    delete db.rooms[id];

    return true;
  } catch (error) {
    // log error
    return false;
  }
}

function getRoomConnectedClients(id) {
  if (!id) return errors.EMPTY_PARAMETER_VALUE('id');

  if (!existRoom(id)) return errors.ROOM_NOT_FOUND;

  return Object.values(db.rooms[id].connectedClients);
}

function addClient(roomId, { socket, name, isAdmin }) {
  if (!roomId) return errors.EMPTY_PARAMETER_VALUE('roomId');

  if (!existRoom(roomId)) return errors.ROOM_NOT_FOUND;

  if (existClient(roomId, socket.id)) return errors.CLIENT_FOUND;

  const room = db.rooms[roomId];

  room.connectedClients[socket.id] = { name, isAdmin };

  return Object.values(room.connectedClients);
}

function deleteClient(roomId, { socket }) {
  if (!existRoom(roomId)) return errors.ROOM_NOT_FOUND;

  if (!existClient(roomId, socket.id)) return errors.CLIENT_NOT_FOUND;

  const room = db.rooms[roomId];

  delete room.connectedClients[socket.id];

  const connectedClients = getRoomConnectedClients(roomId);
  if (Array.isArray(connectedClients) && connectedClients.length) {
    deleteRoom(roomId);
  }

  return Object.values(room.connectedClients);
}

function existRoom(id) {
  return !!db.rooms[id];
}

function existClient(roomId, socketId) {
  return !!db.rooms[roomId].connectedClients[socketId];
}

module.exports = {
  getRoom,
  createRoom,
  deleteRoom,
  getRoomConnectedClients,
  addClient,
  deleteClient
};
