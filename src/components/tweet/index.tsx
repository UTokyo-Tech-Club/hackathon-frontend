import React from 'react';
import { TweetInterface } from "../../interfaces/Tweet";
import Content from './Content';
import Link from './link';
import Metadata from './Metadata';

// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

const Tweet: React.FC<{ tweet: TweetInterface }> = ({ tweet }) => {
    return (
        <Paper elevation={1} sx={{ my: 2 }}>
            <Stack>
                {/* Main Content */}
                <Stack direction="row">

                    {/* Profile */}
                    <Avatar sx={{ width: 64, height: 64 }}>
                        <img src={tweet.ownerPhotoURL} alt={tweet.ownerUsername} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </Avatar>

                    {/* Content */}
                    <Stack width="100%">

                        {/* Profile Info */}
                        <Stack direction="row" height={64}>
                            <Typography alignSelf="center" variant="body2">{tweet.ownerUsername}</Typography>
                            <Box display='flex' height={32} alignSelf='center' sx={{ ml: 2}}>
                                <Button variant="outlined">Follow</Button>
                            </Box>
                        </Stack>

                        {/* Editor.js */}
                        <Box>
                            <Content data={tweet.content}/>
                        </Box>
                    </Stack>

                    {/* Metadata */}
                    <Metadata />
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