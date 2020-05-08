'use strict';

const events = require('./common/events');

const disconnectHandler = require('./handlers/disconnect');
const joinRoomHandler = require('./handlers/join_room');
const initVoteTopicHandler = require('./handlers/init_vote_topic');
const sendVoteHandler = require('./handlers/send_vote');

const roomService = require('./services/room');

const { initVoteTopicSchema, joinRoomSchema, sendVoteSchema } = require('./validations/sockets');

module.exports = (io) => {
  io.on(events.CONNECTION, (socket) => {
    socket.on(events.DISCONNECT, () => {
      disconnectHandler(io, socket);
    });

    socket.on(events.JOIN_ROOM, (message) => {
      const { error } = joinRoomSchema.validate(message);

      if (error) {
        console.log(error);
        return;
      }

      joinRoomHandler(socket, message);
    });

    socket.on(events.INIT_VOTE_TOPIC, (message) => {
      const { error } = initVoteTopicSchema.validate(message);

      if (error) {
        console.log(error);
        return;
      }

      initVoteTopicHandler(io, socket, message);
    });

    socket.on(events.SEND_VOTE, (message) => {
      const { error } = sendVoteSchema.validate(message);

      if (error) {
        console.log(error);
        return;
      }

      sendVoteHandler(io, message);
    });
  });
};
