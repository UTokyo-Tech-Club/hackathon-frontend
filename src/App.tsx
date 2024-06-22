import { useEffect, useContext, useState } from "react";
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
import GradientBackground from "./components/decorations/background/GradientBackground";
import EditTweet from "./components/tweet/edit";
import CloseIcon from '@mui/icons-material/Close';

// MUI
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import UsePostStore from "./stores/Post";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('up');

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      setScrollDirection(direction);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      // }
    };

    window.addEventListener('scroll', updateScrollDirection);
    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, [scrollDirection]);

  return scrollDirection;
}

export default function App() {

  log.setLevel(log.levels.DEBUG);

  const wsCtx = useContext(WebSocketContext);
  if (!wsCtx) {
    throw new Error('Context not found');
  }
  const { sendWS } = wsCtx;

  const { currentContent, openNewTweet, isSnackOpen, snackMessage, snackSeverity: snakcSeverity, openSnack, closeSnack } = UseAppStore();
  const { signIn, setIsLoadingProfile, setFollowingUsers, setBookmarkedTweets, setLikedTweets, isSignedIn } = UseUserStore();
  const { setLinkUid } = UsePostStore();

  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isBannerOpen, setIsBannerOpen] = useState(true);

  const scrollDirection = useScrollDirection();

  const pullMetadata = () => {
    setTimeout(() => {
      sendWS<{ followingUsers: string[], likedTweets: string[], bookmarkedTweets: string[], error: string }>({
        type: "user",
        action: "pull_metadata",
      })
        .then((r) => {
          console.log(r)
          if (r.error !== "null" || r.followingUsers === undefined) throw new Error(r.error);
          if (r.followingUsers) setFollowingUsers(r.followingUsers);
          if (r.bookmarkedTweets) setBookmarkedTweets(r.bookmarkedTweets);
          if (r.likedTweets) setLikedTweets(r.likedTweets);
        })
        .catch((error) => {
          log.error("Error pulling metadata: ", error);
        })
        .finally(() => {
        });
    }, 200); // Delay is need to wait for connection to settle
  }

  useEffect(() => {
    const unsubscribe = authApp.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoadingProfile(true);

        const timeoutId = setTimeout(() => {
          const error = new Error("Authentication response timeout");
          log.error("Error sending auth to backend: ", error);
          openSnack("ログインエラー", "error");
          setIsLoadingProfile(false);

        }, 1000);

        sendWS<{ error: string }>({
          type: "user",
          action: "auth",
          data: {
            token: await getToken(),
          }
        })
          .then((r) => {
            clearTimeout(timeoutId);
            if (r.error !== "null") throw new Error(r.error);
            signIn(user as any);
            log.info("Front & backend signed in as ", user.uid);
            openSnack("ようこそ " + user.displayName + "!", "success");
          })
          .catch((error) => {
            log.error("Error sending auth to backend: ", error);
            openSnack("ログインエラー", "error");
          })
          .finally(() => {
            pullMetadata();
            setIsLoadingProfile(false);
          });
      } else {
        setIsLoadingProfile(false);
        log.warn("No user is signed in");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const pingWS = () => {
      if (!authApp.currentUser) return;

      sendWS<{ data: string, error: string }>({
        type: "sys",
        action: "ping"
      })
        .then((r) => {
          if (r.error !== "null" || r.data === undefined) throw new Error(r.error);
          if (r.data !== "pong") throw new Error("Invalid response");
        })
        .catch((error) => {
          log.error("Error sending ping to backend: ", error);
          openSnack("サーバーが切断されました...", "error");
        });
    };
    const intervalId = setInterval(pingWS, 20000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarVisible(false);
      } else {
        setIsSidebarVisible(true);
      }
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call the function to set the initial state
    handleResize();

    // Cleanup function to remove the event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <GradientBackground>
      {isBannerOpen &&
        <Box sx={{ width: '100%', bgcolor: 'primary.main', p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button variant="outlined" style={{ color: 'white', borderColor: 'white' }} onClick={() => window.open('https://hackathon-web-eight.vercel.app/', '_blank')}>
            <IconButton onClick={() => window.open('https://hackathon-web-eight.vercel.app/', '_blank')} color="inherit">
              <ArrowBackIcon style={{ color: 'white' }} />
            </IconButton>
            <Typography variant="h6">LPへ戻る</Typography>
          </Button>
          <IconButton onClick={() => setIsBannerOpen(false)} color="inherit">
            <CloseIcon style={{ color: 'white' }} />
          </IconButton>
        </Box>
      }
      <Stack direction="row" justifyContent="center">
        {/* Sidebar */}
        {isSidebarVisible ?
          <>
            {/* Desktop */}
            <div className='sidebar'>
              <Profile />
            </div>
          </>
          :
          <>
            {/* Mobile */}
            {scrollDirection !== 'down' &&
              <Container style={{ position: 'fixed', bottom: 16, left: 8 }}>
                <Profile />
              </Container>
            }
          </>
        }

        {/* Main Content */}
        <Container maxWidth="sm" sx={{ mx: 0 }}>
          {currentContent === 'feed' && <Feed />}
        </Container>

        {/* Sidebar */}
        {isSidebarVisible ?
          <>
            {/* Desktop */}
            <div className='sidebar'>
              {/* New Tweet Button */}
              <Fab color="primary" sx={{ alignSelf: "flex-end" }} onClick={() => {
                if (!isSignedIn) {
                  openSnack("ログインしてください", "warning");
                  return;
                }
                setLinkUid('');
                openNewTweet();
              }}>
                <EditIcon />
              </Fab>
            </div>
          </>
          :
          <>
            {/* Mobile */}
            {scrollDirection !== 'down' &&
              <Fab color="primary" style={{ position: 'fixed', bottom: 16, right: 16 }} onClick={() => {
                if (!isSignedIn) {
                  openSnack("ログインしてください", "warning");
                  return;
                }
                setLinkUid('');
                openNewTweet();
              }}>
                <EditIcon />
              </Fab>
            }
          </>
        }


      </Stack>

      {/* New Tweet Dialog */}
      <Post />

      {/* Edit Tweet Dialog */}
      <EditTweet />

      {/* Footer */}
      {isSidebarVisible &&
        <Copyright />
      }

      {/* Snackbar */}
      <Snackbar open={isSnackOpen} autoHideDuration={2000} onClose={closeSnack}>
        <Alert onClose={closeSnack} severity={snakcSeverity}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </GradientBackground>
  )
}

