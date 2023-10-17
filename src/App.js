import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './HomePage';
import Messages from './Messages';
import DispatchBoard from './DispatchBoard';
import Game from './Game';
import './App.css';

import io from 'socket.io-client';
const socket = io('http://localhost:3001');

function App() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to the server');
    });
  
    socket.on('initialData', (data) => {
      setNotifications(data.notifications);
    });
  
    return () => {
      socket.off('connect');
      socket.off('initialData');
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar notifications={notifications} socket={socket} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dispatch-board" element={<DispatchBoard />} />
          <Route path="/messages" element={<Messages socket={socket} />} />
          <Route path="/game" element={<Game socket={socket} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
