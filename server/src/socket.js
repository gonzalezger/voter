const events = require('./common/events');

const disconnectHandler = require('./handlers/disconnectHandler');
const joinRoomHandler = require('./handlers/joinRoomHandler');

module.exports = (io) => {
  io.on(events.CONNECTION, (socket) => {
    socket.on(events.DISCONNECT, () => {
      disconnectHandler(socket);
    });

    socket.on(events.JOIN_ROOM, (message) => {
      joinRoomHandler(socket, message);
    });
  });
};
