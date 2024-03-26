import React from 'react';
import TweetInterface from "../../interfaces/Tweet";
import Content from './Content';
import Link from './Link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';

// MUI

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import { grey, green } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Stack from '@mui/material/Stack';
import AddCommentIcon from '@mui/icons-material/AddComment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import VisibilityIcon from '@mui/icons-material/Visibility';

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
        <Stack>
            {/* Main Content */}
            <Stack direction="row" sx={{ border: 1 }}>

                {/* Profile */}
                <Stack>
                    <Avatar sx={{ width: 64, height: 64 }}>
                        <PersonIcon />
                    </Avatar>
                </Stack>

                {/* Content */}
                <Stack width="100%">

                    {/* Profile Info */}
                    <Stack direction="row" height={64}>
                        <Typography alignSelf="center" variant="body2">User A</Typography>
                        <Button>Follow</Button>
                    </Stack>

                    <Box>
                        <Content data={DEFAULT_INITIAL_DATA}/>
                    </Box>
                </Stack>

                {/* Metadata */}
                <Stack>
                    <Button sx={{ mt: 1 }}>
                        <BookmarkIcon />
                    </Button>

                    <Stack height="100%" justifyContent="space-around">
                        <Button>
                            <Stack>
                                <FavoriteIcon />
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
            <Stack direction="row" width="100%">
                <Link />
                <Link />
            </Stack>

        </Stack>

        // <div className='tweet'>
        //     <div className='profile'>
        //         <FontAwesomeIcon className='icon' icon={faUser} />
        //         <p>Profile</p>
        //         <Button className='bookmark'>
        //             <FontAwesomeIcon icon={faBookmark} />
        //         </Button>
        //     </div>

        //     <div className='content'>
        //         <Content data={DEFAULT_INITIAL_DATA}/>
        //     </div>

        //     <div className='meta'>
        //         <button>
        //             <FontAwesomeIcon className='icon' icon={faComment} />
        //             <p>4</p>
        //         </button>

        //         <button>
        //             <FontAwesomeIcon className='icon' icon={faHeart} />
        //             <p>4</p>
        //         </button>

        //         <button>
        //             <FontAwesomeIcon className='icon' icon={faArrowRightArrowLeft} />
        //             <p>4</p>
        //         </button>

        //         <button>
        //             <FontAwesomeIcon className='icon' icon={faEye} />
        //             <p>4</p>
        //         </button>
        //     </div>


        // </div>
    );
}

export default Tweet;