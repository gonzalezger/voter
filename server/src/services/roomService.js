'use strict';

const shortid = require('shortid');
const errors = require('../common/errors');

const db = require('../db/db');

function getRoom(id) {
  console.log(db);
  return db.rooms[id] || errors.ROOM_NOT_FOUND;
}

function createRoom(name) {
  if (!name) return errors.EMPTY_PARAMETER_VALUE('name');

  const id = shortid.generate();

  rooms[id] = {
    id,
    name,
    connectedClients: {}
  };

  return id;
}

function deleteRoom(id) {
  if (!existRoom(id)) return errors.ROOM_NOT_FOUND;

  delete db.rooms[id];

  return rooms;
}

function getRoomConnectedClients(id) {
  if (!existRoom(id)) return errors.ROOM_NOT_FOUND;

  return Object.values(room.connectedClients);
}

function addClient(roomId, { socket, name, isAdmin }) {
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

  if (!!getRoomConnectedClients(roomId).length) {
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
}