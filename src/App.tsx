import { useEffect, useState } from 'react'
import './App.css'
import useWebSocket from 'react-use-websocket';
import { auth } from './firebase/config'
import { getToken } from './firebase/auth'
import log from 'loglevel';
import Feed from './components/feed';
import NavBar from './components/navbar';
import UseAppStore from './stores/App';
import Copyright from './components/decorations/copyright';

// MUI
import Container from '@mui/material/Container';

export default function App() {

  const { currentDisplay, setDisplay } = UseAppStore();

  const WS_URL = 'ws://localhost:8080/ws';

  const { sendMessage, lastMessage } = useWebSocket(WS_URL, {
    onOpen: () => {
      log.info("WebSocket connection established.");
    },
    // Optionally add other event handlers, such as onClose, onError, etc.
    onMessage: (event) => {
      log.info('Server:', event.data);
    },
    onError: (event) => {
      log.error('WebSocket error:', event);
    },
    onClose: () => {
      log.warn('WebSocket connection closed.')
    }
  });

  log.setLevel(log.levels.DEBUG);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
            log.info("Frontend signed in as ", user.uid);
            sendMessage(JSON.stringify({ type: 'auth', data: await getToken() }));
            // Perform any additional actions after successful sign-in
        } else {
            log.warn("No user is signed in")
        }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Container maxWidth="sm">
      {/* <NavBar />
      <Copyright /> */}

      { currentDisplay === 'feed' && <Feed /> }
    </Container>
  )
}

