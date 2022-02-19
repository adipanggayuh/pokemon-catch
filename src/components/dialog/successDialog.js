import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import successImage from '../../media/success.png';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

const SuccessDialog = ({ open, setOpen, onSubmit }) => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const pokedex = useSelector(store => store.pokedex);
    const validateName = () => {
        let isExist = pokedex.find(poke => poke.nickName === name);
        return !!isExist ? true : false;
    }


    const handleSubmit = () => {
        if (validateName()) {
            setError(true);
        } else {
            setError(false);
            setOpen(false);
            onSubmit(name);
        }

    };

    const handleClose = () => {
        setOpen(false);
    };

    return (

        <Dialog open={open} onClose={handleClose}>

            <DialogContent>
                <Typography component="div" align='center'>
                    <img src={successImage} alt="" height={200} width={200} />
                </Typography>
                <TextField
                    error={error}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Give me a name"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setName(e.target.value)}
                    helperText={error ? 'You have pokemon with this name' : ""}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Add To Pokedex</Button>
            </DialogActions>
        </Dialog>

    );
}

export default SuccessDialog;