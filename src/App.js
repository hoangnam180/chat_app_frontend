import { BrowserRouter as Router } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import { Provider } from 'react-redux';
import RouterComponent from './router/RouterComponent';
import store from './store';

const socket = io(`http://localhost:4000`);

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
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
  }, []);

  return (
    <Provider store={store}>
      {isConnected ? (
        <Router>
          <RouterComponent socket={socket} />;
        </Router>
      ) : (
        <div>Connecting...</div>
      )}
    </Provider>
  );
}
export default App;
