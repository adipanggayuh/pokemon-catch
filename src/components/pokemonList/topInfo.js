import React from 'react';
import { Grid, Typography, } from '@mui/material';
import PokedexInfo from './pokedexInfo';
import Navigation from './navigation';
const TopInfo = ({ onNext, onPrev }) => {
    return (
        <Grid container sx={{ marginTop: 2 }}>
            <Typography component="div" >
                <PokedexInfo />
            </Typography>
            <Typography component="div" variant="h5" sx={{ display: 'flex', flex: 1 }}>
                <Navigation onNextData={onNext} onPrevData={onPrev} />
            </Typography>
        </Grid >
    )
}

export default TopInfo;