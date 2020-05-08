'use strict';

require('dotenv').config();
const config = require('./configs/configs')();
const server = require('http').createServer();
const io = require('socket.io')(server);
const socket = require('./src/socket');

server.listen(config.app.port, () => {
  console.log(`${config.app.name} is running on port - ${config.app.port}`);
});

socket(io);
