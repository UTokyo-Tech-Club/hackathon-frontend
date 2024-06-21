import React from 'react';
import BookmarkButton from '../profile/services/Bookmark';
import LikeButton from '../profile/services/Like';

// MUI
import CommentIcon from '@mui/icons-material/Comment';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import { TweetInterface } from '../../interfaces/Tweet';

const Metadata: React.FC<{ tweet: TweetInterface, onAction: (action: string) => void }> = ({ tweet, onAction }) => {

    const handleButtonClick = (action: string) => {
        onAction(action);
    };

    return (
        <Stack>
            <BookmarkButton tweetUID={tweet.uid} />

            <Stack height="100%" justifyContent="space-around">
                <LikeButton tweetUID={tweet.uid} />

                <LoadingButton onClick={() => handleButtonClick('comment')}>
                    <Stack>
                        <CommentIcon />
                        <Typography variant="body2">{tweet.comments ? tweet.comments.length : 0}</Typography>
                    </Stack>
                </LoadingButton>

                <LoadingButton onClick={() => handleButtonClick('link')}>
                    <Stack>
                        <ImportExportIcon />
                        <Typography variant="body2">-</Typography>
                    </Stack>
                </LoadingButton>

                <LoadingButton onClick={() => handleButtonClick('views')}>
                    <Stack>
                        <VisibilityIcon />
                        <Typography variant="body2">-</Typography>
                    </Stack>
                </LoadingButton>
            </Stack>

        </Stack>
    );
}

export default Metadata