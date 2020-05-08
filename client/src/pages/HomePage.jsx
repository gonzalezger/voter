import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import RoomPage from './RoomPage';

const socket = io('https://voter-server.herokuapp.com:4000');

export default function HomePage() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  const [user, setUser] = useState({});
  const [roomJoined, setRoomJoined] = useState({});
  const [usersConnected, setUsersConnected] = useState([]);

  useEffect(() => {
    socket.on('already_exist', message => console.log(message));

    socket.on('enter_room', ({ room, user, usersConnected }) => {
      setUser(user);
      setUsersConnected(usersConnected);
      setRoomJoined(room);
    });
  }, []);

  const handleJoinRoom = (e, isCreating) => {
    e.preventDefault();
    if (!username) {
      return alert("Name can't be empty");
    }

    socket.emit("join_room", { roomId: room, username, isAdmin: isCreating, isCreating });
  };

  return roomJoined && roomJoined.id ? (
    <RoomPage socket={socket} room={roomJoined} user={user} usersConnected={usersConnected} />
  ) : (
      <div style={{ textAlign: 'center', margin: '30vh auto', width: '70%' }}>
        <input onChange={e => setUsername(e.target.value.trim())} placeholder="Your name .." /><br />
        <input onChange={e => setRoom(e.target.value.trim())} placeholder="Room name" /><br />
        <button onClick={e => handleJoinRoom(e, true)}>Create Room</button>
        <button onClick={e => handleJoinRoom(e, false)}>Join Room</button>
      </div>
    )
};