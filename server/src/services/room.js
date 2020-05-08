'use strict';

const shortid = require('shortid');

const db = require('../db/in-memory');

function getRoom(id) {
  if (!id) return Errors.EMPTY_PARAMETER_VALUE('id');

  return db.rooms[id] || Errors.ROOM_NOT_FOUND;
}

function createRoom(name) {
  if (!name) return Errors.EMPTY_PARAMETER_VALUE('name');

  const id = shortid.generate();

  db.rooms[id] = {
    id,
    name,
    connectedClients: {},
    voting: {
      current: {}
    }
  };

  return { id, name };
}

function deleteRoom(id) {
  if (!id) return Errors.EMPTY_PARAMETER_VALUE('id');

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

  if (!existRoom(id)) return Errors.ROOM_NOT_FOUND;

  return Object.values(db.rooms[id].connectedClients);
}

function addClient(roomId, { socketId, name, isAdmin } = {}) {
  if (!roomId) return Errors.EMPTY_PARAMETER_VALUE('roomId');

  if (!existRoom(roomId)) return Errors.ROOM_NOT_FOUND;

  if (!socketId) return Errors.EMPTY_PARAMETER_VALUE('socketId');

  if (!name) return Errors.EMPTY_PARAMETER_VALUE('name');

  if (existClient(roomId, socketId)) return Errors.CLIENT_FOUND;

  const room = db.rooms[roomId];

  room.connectedClients[socketId] = { id: socketId, name, isAdmin };

  return Object.values(room.connectedClients);
}

function deleteClient(roomId, socketId) {
  if (!roomId) return Errors.EMPTY_PARAMETER_VALUE('roomId');

  if (!existRoom(roomId)) return Errors.ROOM_NOT_FOUND;

  if (!socketId) return Errors.EMPTY_PARAMETER_VALUE('socketId');

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

function getCurrentVotingState(roomId) {
  return getRoom(roomId).voting.current;
}

function setCurrentVotingState(roomId, topic, usersVoteState) {
  const roomVoting = getRoom(roomId).voting;

  roomVoting.current = {
    topic,
    votes: usersVoteState.reduce(
      (acc, { label, value, hasVoted }) => ((acc[label] = { label, value, hasVoted }), acc),
      {}
    )
  };
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
  deleteClient,
  getCurrentVotingState,
  setCurrentVotingState
};
