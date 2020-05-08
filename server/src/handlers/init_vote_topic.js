'use strict';

const events = require('../common/events');
const roomService = require('../services/room');

const voteValuesBuilder = require('../services/vote_values_builder');

module.exports = (io, socket, { roomId, topic, voteType, adminCanVote }) => {
  const values = voteValuesBuilder(voteType);

  // use socket or io whether the admin can vote or not
  if (adminCanVote) {
    io.in(roomId).emit(events.SET_VOTE_TOPIC, { topic, voteValues: values });
  } else {
    socket.to(roomId).emit(events.SET_VOTE_TOPIC, { topic, voteValues: values });
  }

  const connectedClients = roomService.getRoomConnectedClients(roomId);

  const usersVoteState = connectedClients.reduce((acc, curr) => {
    // skip if admin can't vote and the current value of the iteration is admin
    if (!adminCanVote && curr.isAdmin) return acc;

    acc.push({ label: curr.name, value: null, hasVoted: false });
    return acc;
  }, []);

  roomService.setCurrentVotingState(roomId, topic, usersVoteState);

  socket.emit(events.UPDATE_USERS_VOTE_STATE, { usersVoteState });
};
