'use strict';

const roomService = require('../services/room');
const events = require('../common/events');

module.exports = (socket, { roomId, username, isAdmin, isCreating }) => {
  const room = isCreating ? roomService.createRoom(roomId).id : roomId;

  socket.join(room, (err) => {
    if (err) {
      console.log(err);
      return;
    }

    const result = roomService.addClient(room, { socketId: socket.id, name: username, isAdmin });

    const { name: roomName } = roomService.getRoom(room);

    if (Array.isArray(result)) {
      socket.emit(events.ENTER_ROOM, {
        room: { id: room, name: roomName },
        usersConnected: result.map((m) => m.name),
        user: { name: username, isAdmin }
      });

      socket.to(room).emit(events.UPDATE_USERS_CONNECTED, {
        usersConnected: result.map((m) => m.name)
      });
    }
  });
};
