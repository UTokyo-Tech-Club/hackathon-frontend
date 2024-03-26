import UseAppStore from '../../stores/App';
import Editor from './Editor';

// MUI
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';

const Post: React.FC = () => {
    const { isNewTweetOpen, closeNewTweet } = UseAppStore();

    return (
        <Dialog open={isNewTweetOpen} fullWidth>
            <Stack>

                {/* Header */}
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={closeNewTweet}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                {/* Editor */}
                <Stack direction='row' width='100%' sx={{border:1}}>
                    <Editor />
                </Stack>

            </Stack>
        </Dialog>   
    );
}

export default Post;