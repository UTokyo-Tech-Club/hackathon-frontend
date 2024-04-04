import React from 'react';
import BookmarkButton from '../profile/services/Bookmark';
import LikeButton from '../profile/services/Like';

// MUI
import AddCommentIcon from '@mui/icons-material/AddComment';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';

const Metadata: React.FC<{ tweetUID: string }> = ({ tweetUID }) => {

    return (
        <Stack>
            <BookmarkButton tweetUID={tweetUID} />

            <Stack height="100%" justifyContent="space-around">
                <LikeButton tweetUID={tweetUID} />

                <LoadingButton>
                    <Stack>
                        <AddCommentIcon />
                        <Typography variant="body2">4</Typography>
                    </Stack>
                </LoadingButton>

                <LoadingButton>
                    <Stack>
                        <ImportExportIcon />
                        <Typography variant="body2">4</Typography>
                    </Stack>
                </LoadingButton>

                <LoadingButton>
                    <Stack>
                        <VisibilityIcon />
                        <Typography variant="body2">4</Typography>
                    </Stack>
                </LoadingButton>
            </Stack>

        </Stack>
    );
}

export default Metadata