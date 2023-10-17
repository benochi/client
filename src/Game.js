// Game.js
import React, { useState, useEffect } from 'react';

function Game({ socket }) {
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    socket.emit('requestGameData', 1); // Assuming Alice (userId: 1) for now

    socket.on('gameData', data => {
      setGameData(data);
    });

    return () => {
      socket.off('gameData');
    };
  }, [socket]);

  if (!gameData) return <p>Loading...</p>;
  console.log(gameData)
  return (
    <div>
      <h2>Game Dashboard for User: {gameData.userId}</h2>
      <p>Score: {gameData.score}</p>
      <h3>Achievements:</h3>
      <ul>
        {gameData.achievements.map((achievement, index) => (
          <li key={index}>{achievement}</li>
        ))}
      </ul>
    </div>
  );
}

export default Game;
