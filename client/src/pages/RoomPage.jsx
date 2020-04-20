import React, { useState, useEffect } from 'react';
import TopicMessage from '../components/TopicMessage';

export default function RoomPage({ socket, room, user, usersConnected }) {
  const [users, setUsers] = useState(usersConnected || []);

  useEffect(() => {
    socket.on('update_users_connected', ({ usersConnected }) => {
      console.log('usersConnected', usersConnected);
      setUsers(usersConnected);
    });
  }, []);

  return (
    <div>
      <p>Your name: {user.name}</p>
      <p>Admin: {user.isAdmin.toString()}</p>
      <p>Room id: {room.id}</p>
      <p>Room name: {room.name}</p>
      <ul>
        {users && users.map(user => <li key={user}>{user}</li>)}
      </ul>

      {user.isAdmin && (
        <>
          <TopicMessage />
          <button onClick={() => socket.emit('test', { room, message: 'test' })}>Emit</button>
        </>
      )}
    </div>
  );
}