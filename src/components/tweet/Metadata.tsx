
// MUI
import AddCommentIcon from '@mui/icons-material/AddComment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Metadata = () => {

    return (
        <Stack>
            <Button sx={{ mt: 1 }}>
                {false ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </Button>

            <Stack height="100%" justifyContent="space-around">
                <Button>
                    <Stack>
                        {false ? <FavoriteIcon />: <FavoriteBorderIcon />} 
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
    );
}

export default Metadata