import React from 'react';
import { Badge, IconButton } from '@mui/material';
import CatchingPokemon from '@mui/icons-material/CatchingPokemon';

const BadgeButton = ({ badgeContent, onClick }) => {
    return (
        <IconButton title='pokedex' onClick={onClick}>
            <Badge badgeContent={badgeContent} color="secondary">
                <CatchingPokemon sx={{ color: '#ffff', fontSize: 30 }} />
            </Badge>
        </IconButton>
    );
};
export default BadgeButton;
