import { useEffect, useContext } from "react";
import './App.css'
import { authApp } from './firebase/config'
import { getToken } from './firebase/auth'
import log from 'loglevel';
import Feed from './components/feed';
import UseAppStore from './stores/App';
import Profile from './components/profile';
import UseUserStore from './stores/User';
import Post from "./components/tweet/post";
import { WebSocketContext } from './websocket/websocket';
import Copyright from "./components/decorations/copyright";

// MUI
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { Stack } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function App() {

  log.setLevel(log.levels.DEBUG);

  const wsCtx = useContext(WebSocketContext);
  if (!wsCtx) {
      throw new Error('Context not found');
  }
  const { sendWS } = wsCtx;

  const { currentContent, openNewTweet, isSnackOpen, snackMessage, snakcSeverity, openSnack, closeSnack} = UseAppStore();
  const { signIn } = UseUserStore();


  useEffect(() => {
    const unsubscribe = authApp.onAuthStateChanged(async (user) => {
        if (user) {
          sendWS<{ error: string }>({ 
            type: "user", 
            action: "auth",
            data: { 
              token: await getToken(),
            }
          })
            .then((result) => {
              if (result.error !== "null") throw new Error(result.error);
              signIn(user as any);
              log.info("Front & backend signed in as ", user.uid);
              openSnack("Wellcome " + user.displayName + "!", "success");
            })
            .catch((error) => {
              log.error("Error sending auth to backend: ", error);
              openSnack("Failed to Sign In", "error");
            });
        } else {
            log.warn("No user is signed in")
        }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const pingWS = () => {
      if (!authApp.currentUser) return;

      sendWS<{ data: string, error: string }>({ 
          type: "sys", 
          action: "ping"
      })
        .then((result) => {
          if (result.error !== "null") throw new Error(result.error);
          if (result.data !== "pong") throw new Error("Invalid response");
        })
        .catch((error) => {
          log.error("Error sending ping to backend: ", error);
          openSnack("Server Disconnected...", "error");
        });
    };
    const intervalId = setInterval(pingWS, 20000);
    return () => clearInterval(intervalId);
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

