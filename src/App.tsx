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
import Copyright from "./components/decorations/copyright";

// MUI
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { Stack } from "@mui/material";

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
        } else {
            log.warn("No user is signed in")
        }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Stack direction="row" justifyContent="center">
        {/* Sidebar */}
        <div className='sidebar'>
          <Profile />
        </div>  

        {/* Main Content */}
        <Container maxWidth="sm" sx={{ mx: 0 }}>
            { currentContent === 'feed' && <Feed /> }
        </Container>

        {/* Sidebar */}
        <div className='sidebar'>
          {/* New Tweet Button */}
          <Fab color="secondary" sx={{ alignSelf: "flex-end" }} onClick={openNewTweet}>
            <EditIcon />
          </Fab>
        </div>
        {/* New Tweet Dialog */}
        <Post />
      </Stack>

      {/* Footer */}
      <Copyright />
    </>
  )
}

