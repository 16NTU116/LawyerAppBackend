const winston = require('winston');
const express = require('express');
const app = express();
const socketio = require("socket.io");

const server = require("http").createServer(app);
const io = socketio(server).sockets;

require('./startup/routes')(app);
require('./startup/mongodb')();
require('./startup/logging')();
require('./startup/configuration')();
require('./startup/validation')();
require('./startup/websocket')(io);
require('./startup/prod')(app);


const port = process.env.PORT || 3000;
server.listen(port, () => winston.info(`Listening on port ${port}...`));