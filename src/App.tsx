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
import { PushResponse } from "./websocket/model";

// MUI
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { Stack } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function App() {

  log.setLevel(log.levels.DEBUG);

  const { currentContent, openNewTweet, isSnackOpen, snackMessage, snakcSeverity, openSnack, closeSnack} = UseAppStore();
  const { signIn } = UseUserStore();

  const wsCtx = useContext(WebSocketContext);
  if (!wsCtx) {
    throw new Error('Context not found');
  }
  const { sendWS } = wsCtx;

  useEffect(() => {
    const unsubscribe = authApp.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const result = await sendWS(
              JSON.stringify({ 
                type: 'user', 
                action: "auth", 
                data: 
                JSON.stringify({ token: await getToken() })}), null) as unknown as PushResponse;
            if (result.error !== "null") return
          } catch (error) {
            log.error("Error sending to backend: ", error);
          }

          signIn(user as any);
          log.info("Front & backend signed in as ", user.uid);
          openSnack("Wellcome " + user.displayName, "success");
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

      {/* Snackbar */}
      <Snackbar open={isSnackOpen} autoHideDuration={3000} onClose={closeSnack}>
        <Alert onClose={closeSnack} severity={snakcSeverity}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

