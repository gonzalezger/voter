'use strict';

const events = require('../common/events');
const roomService = require('../services/room');

module.exports = (io, { roomId, user, value }) => {
  const currentVotingState = roomService.getCurrentVotingState(roomId);

  const newUsersVotesState = Object.values(currentVotingState.votes).map((userState) => {
    return {
      ...userState,
      value: userState.label === user ? value : userState.value,
      hasVoted: userState.label === user || userState.hasVoted
    };
  });

  roomService.setCurrentVotingState(roomId, currentVotingState.topic, newUsersVotesState);

  const admin = roomService.getRoomConnectedClients(roomId).find((f) => f.isAdmin);

  const allHaveVoted = newUsersVotesState.every((e) => e.hasVoted);

  io.to(admin.id).emit(events.UPDATE_USERS_VOTE_STATE, {
    usersVoteState: newUsersVotesState,
    reveal: allHaveVoted
  });

  if (allHaveVoted) {
    io.in(roomId).emit(events.DISABLE_VOTING, true);
  }
};
