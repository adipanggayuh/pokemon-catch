import React from 'react';
import { Box, Fab, CircularProgress, } from '@mui/material';
import CatchingPokemon from '@mui/icons-material/CatchingPokemon';
import { green, red } from '@mui/material/colors';

const CatchButton = ({ success, loading, onClick }) => {
    const buttonSx = {
        ...(success ? {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        } : {
            bgcolor: red[500],
            '&:hover': {
                bgcolor: red[700],
            },
        }),
    };
    return (
        <Box sx={{ alignItems: 'center' }}>
            <Box sx={{ m: 1, position: 'relative' }}>
                <Fab
                    aria-label="save"
                    color="primary"
                    sx={buttonSx}
                    onClick={onClick}
                >
                    <CatchingPokemon />
                </Fab>
                {loading && (
                    <CircularProgress
                        size={68}
                        sx={{
                            color: red[500],
                            position: 'absolute',
                            top: -6,
                            right: -6,
                            zIndex: 1,
                        }}
                    />
                )}
            </Box>
        </Box>
    );
};
export default CatchButton;
