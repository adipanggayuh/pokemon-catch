import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import failedImage from '../../media/catchmeagain.png';
import { Typography } from '@mui/material';

const FailedDialog = ({ open, setOpen, onCatchAgain }) => {
    const onTryAgain = () => {
        onCatchAgain();
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (

        <Dialog open={open} onClose={handleClose} >
            <DialogContent>
                <Typography align='center'>
                    <img src={failedImage} alt="" height={200} />
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={onTryAgain}>Catch me again</Button>
            </DialogActions>
        </Dialog>

    );
}

export default FailedDialog;