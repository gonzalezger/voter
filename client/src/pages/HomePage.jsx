import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import RoomPage from './RoomPage';

const socket = io('http://127.0.0.1:4000');

export default function HomePage() {
  const [userName, setUserName] = useState('');
  const [room, setRoom] = useState('');

  const [user, setUser] = useState({});
  const [roomJoined, setRoomJoined] = useState({});
  const [usersConnected, setUsersConnected] = useState([]);

  useEffect(() => {
    socket.on('already_exist', message => console.log(message));

    socket.on('enter_room', ({ room, user, usersConnected }) => {
      console.log(usersConnected);
      setUser(user);
      setUsersConnected(usersConnected);
      setRoomJoined(room);
    });
  }, []);

  const handleJoinRoom = (e, isCreating) => {
    e.preventDefault();
    if (!userName) {
      return alert("Name can't be empty");
    }

    socket.emit("join_room", { roomId: room, userName, isCreating });
  };

  return roomJoined && roomJoined.id ? (
    <RoomPage socket={socket} room={roomJoined} user={user} usersConnected={usersConnected} />
  ) : (
      <div style={{ textAlign: 'center', margin: '30vh auto', width: '70%' }}>
        <input id="userName" onChange={e => setUserName(e.target.value.trim())} required placeholder="Your name .." /><br />
        <input id="room" onChange={e => setRoom(e.target.value.trim())} placeholder="Room name" /><br />
        <button onClick={e => handleJoinRoom(e, true)}>Create Room</button>
        <button onClick={e => handleJoinRoom(e, false)}>Join Room</button>
      </div>
    )
};