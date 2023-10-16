
import React, { useState, useEffect } from 'react';

function Messages({ socket }) {
  const [msgs, setMsgs] = useState([]);
  
  useEffect(() => {
    socket.emit('requestMessages');
    socket.on('messages', (data) => {
      setMsgs(data);
    });

    return () => {
      socket.off('messages');
    };
  }, [socket]);

  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {msgs.map((message, index) => (
          <li key={index}>
            From {message.from} to {message.to}: {message.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Messages;

