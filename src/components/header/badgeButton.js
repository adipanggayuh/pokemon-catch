import React from 'react';
import { Badge, IconButton } from '@mui/material';
import CatchingPokemon from '@mui/icons-material/CatchingPokemon';

const BadgeButton = ({ badgeContent, onClick }) => {
    return (
        <IconButton title='pokedex' onClick={onClick}>
            <Badge badgeContent={badgeContent} color="error">
                <CatchingPokemon sx={{ fontSize: 30 }} color='primary' />
            </Badge>
        </IconButton>
    );
};
export default BadgeButton;
