const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

let players = [];

io.on('connection', (socket) => {
  console.log('New client connected');

  const playerId = players.length + 1;
  const playerName = `Player ${playerId}`;

  players.push({ id: playerId, name: playerName });

  socket.emit('playerId', playerId);
  io.emit('players', players);

  socket.on('joinGame', () => {
    console.log(`Player ${playerId} joined the game`);
    io.emit('players', players); // Emit updated players list to all sockets
  });

  socket.on('disconnect', () => {
    console.log(`Client ${socket.id} disconnected`);
    players = players.filter((player) => player.id !== playerId);
    io.emit('players', players);
  });
});

const connectPort = 3000;
const port = 3001;

server.listen(connectPort, () => {
  console.log(`Server connected to port ${connectPort}`);
});

server.on('listening', () => {
  console.log(`Server listening on port ${port}`);
});
