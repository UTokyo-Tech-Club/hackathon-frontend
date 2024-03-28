import { useEffect } from "react";
import './App.css'
import useWebSocket from 'react-use-websocket';
import { authApp } from './firebase/config'
import { getToken } from './firebase/auth'
import log from 'loglevel';
import Feed from './components/feed';
import UseAppStore from './stores/App';
import Profile from './components/profile';
import UseUserStore from './stores/User';
import Post from "./components/post";

// MUI
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';

export default function App() {

  const { currentContent, openNewTweet} = UseAppStore();
  const { signIn } = UseUserStore();

  var WS_URL = import.meta.env.VITE_WS_URI;

  const { sendMessage } = useWebSocket(WS_URL, {
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
    const unsubscribe = authApp.onAuthStateChanged(async (user) => {
        if (user) {
          signIn(user as any);

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
    <div className='wrapper'>
      <div className='sidebar'>
        {/* Sidebar */}
        <Profile />
      </div>  


      {/* Main Content */}
      <div className='main-content'>
        <Container maxWidth="sm">
            { currentContent === 'feed' && <Feed /> }
        </Container>
      </div>

      {/* New Tweet */}
      <div className='sidebar'>
        {/* Floating Button */}
        <Fab color="secondary" onClick={openNewTweet}>
          <EditIcon />
        </Fab>
      </div>
      <Post />

      {/* Footer */}
    </div>
  )
}

