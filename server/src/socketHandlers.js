const shortid = require('shortid');
const socketEvents = require('./../../common/socketEvents');

const rooms = {};

module.exports = (io) => {
  io.on(socketEvents.CONNECTION, socket => {
    socket.on(socketEvents.DISCONNECT, () => {
      leaveRoom(socket);
    });

    socket.on(socketEvents.JOIN_ROOM, async ({ roomId, userName, isCreating }) => {
      const room = isCreating ? createRoom(roomId) : roomId;

      const result = await joinRoomAsync(socket, { room, userName, isAdmin: isCreating });

      if (result) {
        socket.to(room).emit(socketEvents.UPDATE_USERS_CONNECTED, {
          usersConnected: Object.values(rooms[room].connectedClients).map(m => m.user.name)
        });

        console.table(rooms);
      }
    });
  });
}

function createRoom(name) {
  const id = shortid.generate();

  rooms[id] = {
    id,
    name,
    connectedClients: {}
  };

  return id;
}

function joinRoomAsync(socket, { room, userName, isAdmin }) {
  if (rooms[room] && rooms[room].connectedClients && Object.values(rooms[room].connectedClients).find(f => f.user.name.toLowerCase() === userName.toLowerCase())) {
    socket.emit(socketEvents.ALREADY_EXIST, { message: 'There is already a user with the same name in the room.' })
    return;
  }

  if (!rooms[room]) {
    socket.emit('no room found', { message: 'No room found.' });
    return;
  }

  return new Promise((resolve, reject) => {
    socket.join(room, err => {
      if (err) console.log(err);

      rooms[room].connectedClients[socket.id] = { user: { name: userName, isAdmin } };

      socket.emit(socketEvents.ENTER_ROOM, {
        room: rooms[room],
        usersConnected: Object.values(rooms[room].connectedClients).map(m => m.user.name),
        user: { name: userName, isAdmin }
      });

      resolve(true);
    });
  });
}

function leaveRoom(socket) {
  Object.values(rooms).forEach(room => {
    delete room.connectedClients[socket.id];

    socket.to(room.id).emit(socketEvents.UPDATE_USERS_CONNECTED, {
      usersConnected: Object.values(room.connectedClients).map(m => m.user.name)
    });
  });
}