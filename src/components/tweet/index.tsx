import React from 'react';
import { TweetInterface } from "../../interfaces/Tweet";
import Content from './Content';
import Link from './Link';

// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Stack from '@mui/material/Stack';
import AddCommentIcon from '@mui/icons-material/AddComment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

const DEFAULT_INITIAL_DATA = {
    time: new Date().getTime(),
    blocks: [
        {
            type: "header",
            data: {
                text: "Header...",
            },
        },
        {
            type: "paragraph",
            data: {
                text: "text...",
            },
        },
    ],
};

const Tweet: React.FC<{tweet: TweetInterface;}> = ({ tweet }) => {
    return (
        <Paper elevation={1} sx={{ my: 2 }}>
            <Stack>
                {/* Main Content */}
                <Stack direction="row">

                    {/* Profile */}
                    <Avatar sx={{ width: 64, height: 64 }}>
                        <PersonIcon />
                    </Avatar>

                    {/* Content */}
                    <Stack width="100%">

                        {/* Profile Info */}
                        <Stack direction="row" height={64}>
                            <Typography alignSelf="center" variant="body2">User A</Typography>
                            <Box display='flex' height={32} alignSelf='center' sx={{ ml: 2}}>
                                <Button variant="outlined">Follow</Button>
                            </Box>
                        </Stack>

                        <Box>
                            <Content data={DEFAULT_INITIAL_DATA}/>
                        </Box>
                    </Stack>

                    {/* Metadata */}
                    <Stack>
                        <Button sx={{ mt: 1 }}>
                            {tweet.bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                        </Button>

                        <Stack height="100%" justifyContent="space-around">
                            <Button>
                                <Stack>
                                    {tweet.liked ? <FavoriteIcon />: <FavoriteBorderIcon />} 
                                    <Typography variant="body2">4</Typography>
                                </Stack>
                            </Button>

                            <Button>
                                <Stack>
                                    <AddCommentIcon />
                                    <Typography variant="body2">4</Typography>
                                </Stack>
                            </Button>

                            <Button>
                                <Stack>
                                    <ImportExportIcon />
                                    <Typography variant="body2">4</Typography>
                                </Stack>
                            </Button>

                            <Button>
                                <Stack>
                                    <VisibilityIcon />
                                    <Typography variant="body2">4</Typography>
                                </Stack>
                            </Button>
                        </Stack>

                    </Stack>
                </Stack>

                {/* Links */}
                <Divider variant="fullWidth" />
                <Stack direction="row" width="100%">
                    <Link prev={true} />
                    <Divider orientation='vertical' variant="fullWidth" flexItem />
                    <Link prev={false} />
                </Stack>

            </Stack>
        </Paper>
    );
}

export default Tweet;