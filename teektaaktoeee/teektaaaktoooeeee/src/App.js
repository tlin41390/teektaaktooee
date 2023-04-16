import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:3000');
function App() {
  const [playerId, setPlayerId] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });
    socket.on('playerId', (id) => {
      setPlayerId(id);
    });
    socket.on('players', (players) => {
      setPlayers(players);
    });
   }, []);

    const handleJoinGame = () => {
      console.log('Join game button clicked');
      socket.emit('joinGame');
    };
    return (
      <div>
        <h1>Multiplayer Game</h1>
        <p>Player ID: {playerId}</p>
        <button onClick={handleJoinGame}>Join Game</button>
        <ul>
          {players.map((player) => (
            <li key={player.id}>{player.name}</li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default App;
  