import UseAppStore from '../../stores/App';
import Editor from './Editor';

// MUI
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Post: React.FC = () => {
    const { isNewTweetOpen, closeNewTweet } = UseAppStore();

    const handPublish = () => {
        closeNewTweet();
    }

    return (
        <Dialog open={isNewTweetOpen} fullWidth>
            <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="end" color="inherit" onClick={closeNewTweet}>
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            <Stack>

                {/* Header */}
                

                {/* Editor */}
                <Stack direction='row' sx={{ m: 1, border: 1}}>
                    <Avatar sx={{ width: 32, height: 32, m: 1}}>
                        <PersonIcon />
                    </Avatar>
                    <Editor />
                </Stack>

                <Button onClick={handPublish}>
                    Publish
                    <ArrowForwardIcon />
                </Button>

            </Stack>
        </Dialog>   
    );
}

export default Post;