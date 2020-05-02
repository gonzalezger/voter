'use strict';

const roomService = require('../services/roomService');

module.exports = (socket) => {
  try {
    for (const key in Object.keys(socket.adapter.rooms)) {
      const result = roomService.deleteClient(key, socket.id);

      if (Array.isArray(result)) {
        socket.to(room.id).emit(events.UPDATE_USERS_CONNECTED, {
          usersConnected: result.map((m) => m.user.name)
        });
      }
    }
  } catch (error) {
    return 'error';
  }
};
