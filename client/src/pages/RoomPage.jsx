import React, { useState, useEffect } from 'react';
import SendTopic from '../components/SendTopic';
import VoteCardList from '../components/VoteCardList';

import { FcApprove, FcDecision } from "react-icons/fc";

export default function RoomPage({ socket, room, user, usersConnected }) {
  const [users, setUsers] = useState(usersConnected || []);
  const [voteTopic, setVoteTopic] = useState();
  const [voteValues, setVoteValues] = useState([]);
  const [usersVoteState, setUsersVoteState] = useState([]);

  useEffect(() => {
    socket.on('update_users_connected', (message) => {
      setUsers(message.usersConnected);
    });

    socket.on('set_vote_topic', (message) => {
      setVoteTopic(message.topic);
      setVoteValues(message.voteValues);
    });

    socket.on('update_users_vote_state', (message) => {
      const values = message.usersVoteState.map(voteState => {
        return {
          label: voteState.label,
          value: voteState.hasVoted ? <FcApprove /> : <FcDecision />
        }
      });

      setUsersVoteState(values);
    });
  }, []);

  const handleSendTopic = (topic, adminCanVote, voteType) => {
    if (!topic || !voteType) {
      alert("Invalid topic");
      return;
    }

    socket.emit('init_vote_topic', { roomId: room.id, topic, voteType, adminCanVote });
  };

  const handleCardSelected = (card) => {
    console.log('Card selected:', card);
    socket.emit('send_vote', { roomId: room.id, user: user.name, value: card });
  }

  return (
    <div>
      <p>Your name: {user.name}</p>
      <p>Admin: {user.isAdmin.toString()}</p>
      <p>Room id: {room.id}</p>
      <p>Room name: {room.name}</p>
      <ul>
        {users && users.map(user => <li key={user}>{user}</li>)}
      </ul>

      {user.isAdmin && <SendTopic onSend={handleSendTopic} />}

      {voteValues && (
        <>
          {voteTopic && <h2>Topic: {voteTopic}</h2>}
          <VoteCardList selectable={true} onCardSelected={handleCardSelected} values={voteValues} />
        </>
      )}

      <br />

      {usersVoteState && <VoteCardList onCardSelected={e => e} values={usersVoteState} />}
    </div>
  );
}