import { useEffect, useContext } from "react";
import './App.css'
import { authApp } from './firebase/config'
import { getToken } from './firebase/auth'
import log from 'loglevel';
import Feed from './components/feed';
import UseAppStore from './stores/App';
import Profile from './components/profile';
import UseUserStore from './stores/User';
import Post from "./components/post";
import { WebSocketContext } from './websocket/websocket';

// MUI
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';

export default function App() {

  log.setLevel(log.levels.DEBUG);

  const { currentContent, openNewTweet} = UseAppStore();
  const { signIn } = UseUserStore();

  const wsCtx = useContext(WebSocketContext);
  if (!wsCtx) {
    throw new Error('Context not found');
  }
  const { sendMessage } = wsCtx;

  useEffect(() => {
    const unsubscribe = authApp.onAuthStateChanged(async (user) => {
        if (user) {
          signIn(user as any);

          log.info("Frontend signed in as ", user.uid);
          sendMessage(JSON.stringify({ type: 'user', action: "auth", data: JSON.stringify({ token: await getToken() }) }));
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
        <Fab color="secondary" sx={{ alignSelf: "flex-end" }} onClick={openNewTweet}>
          <EditIcon />
        </Fab>
      </div>
      <Post />

      {/* Footer */}
    </div>
  )
}

