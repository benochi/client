import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './HomePage';
import Messages from './Messages';
import DispatchBoard from './DispatchBoard';
import './App.css';

import io from 'socket.io-client';
const socket = io('http://localhost:3001');

function App() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    socket.on('notifications', (data) => {
      setNotifications(data);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar notifications={notifications} socket={socket} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dispatch-board" element={<DispatchBoard />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
