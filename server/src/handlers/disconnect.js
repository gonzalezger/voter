'use strict';

const roomService = require('../services/room');
const events = require('../common/events');

module.exports = (io, socket) => {
  try {
    Object.keys(socket.adapter.rooms).forEach((room) => {
      const result = roomService.deleteClient(room, socket.id);

      if (Array.isArray(result)) {
        io.in(room).emit(events.UPDATE_USERS_CONNECTED, {
          usersConnected: result.map((m) => m.name)
        });
      }
    });
  } catch (error) {
    return 'error';
  }
};
