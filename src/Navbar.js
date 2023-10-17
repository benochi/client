import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ notifications, socket }) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [socket]);

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/dispatch-board">Dispatch Board</Link>
      <Link to="/messages">Messages</Link>
      <Link to="/game">Game</Link>
      <div>
        Notifications <span>{notifications.length}</span>
      </div>
      <div style={{
        display: 'inline-block',
        marginLeft: '10px',
        width: '15px',
        height: '15px',
        borderRadius: '50%',
        backgroundColor: isConnected ? 'green' : 'red'
      }} title={isConnected ? 'Connected' : 'Disconnected'}>
      </div>
    </nav>
  );
}

export default Navbar;
