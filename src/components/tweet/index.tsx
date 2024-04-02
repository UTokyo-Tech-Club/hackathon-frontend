import React, { useContext } from 'react';
import { TweetInterface } from "../../interfaces/Tweet";
import Content from './Content';
import Link from './link';
import Metadata from './Metadata';
import handleFollow from '../profile/services/Follow';
import { WebSocketContext } from '../../websocket/websocket';

// MUI
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import UseUserStore from '../../stores/User';

const Tweet: React.FC<{ tweet: TweetInterface }> = ({ tweet }) => {

    const { uid } = UseUserStore();
    
    const isUserOwner = tweet.ownerUID === uid;

    const wsCtx = useContext(WebSocketContext);

    return (
        <Paper elevation={1} sx={{ my: 2 }}>
            <Stack>
                {/* Main Content */}
                <Stack direction="row">

                    {/* Profile */}
                    <Avatar sx={{ width: 40, height: 40, m: 2 }} src={tweet.ownerPhotoURL} alt={tweet.ownerUsername} />

                    {/* Content */}
                    <Stack width="100%">

                        {/* Profile Info */}
                        <Stack direction="row" height={64}>
                            <Typography alignSelf="center" variant="body2">{tweet.ownerUsername}</Typography>
                            <Box display='flex' height={32} alignSelf='center' sx={{ ml: 2}}>
                                {!isUserOwner && <Button variant="contained" onClick={() => handleFollow(wsCtx, tweet.ownerUID)}>Follow</Button>}
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