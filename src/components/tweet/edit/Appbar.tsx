
import React from 'react';
import UseTweetStore from '../../../stores/Tweet';

// MUI
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

interface AppbarProps {
    isContentValid : boolean;
    handleClose : () => void;
    handleSave : () => void;
    handleDelete: () => void;
}

const Appbar: React.FC<AppbarProps> = ({ isContentValid, handleClose, handleSave, handleDelete }) => {
    
    const { isProcessing: processing } = UseTweetStore();
    
    return (
        <AppBar position="sticky" color="inherit">
            <Toolbar sx={{ display: "flex" }}>
                <IconButton edge="end" color="inherit" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="body1" sx={{ ml: 3 }}>
                    ツイート編集
                </Typography>
                <LoadingButton color='error' disabled={!isContentValid} loading={processing} variant="outlined" sx={{ m: 1, ml: "auto", p: 2, py: 1 }} onClick={handleDelete}>
                    Delete
                </LoadingButton>
                <LoadingButton disabled={!isContentValid} loading={processing} variant="contained" sx={{ m: 1, p: 2, py: 1 }} onClick={handleSave}>
                    Save
                </LoadingButton>
            </Toolbar>
        </AppBar>
    );
}

export default Appbar;