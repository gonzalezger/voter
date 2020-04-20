'use strict'

const server = require('http').createServer()
const io = require('socket.io')(server);
const fs = require('fs');
const socketHandler = require('./socketHandlers');
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

socketHandler(io);