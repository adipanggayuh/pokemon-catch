import React from 'react';
import { Grid } from '@mui/material';
import pokedexImg from '../../media/pokedex.jpg';
import { useSelector } from 'react-redux';

const PokedexInfo = () => {
    const pokedex = useSelector(store => store.pokedex);
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ paddingTop: 2, paddingLeft: 2 }}
        >
            <img src={pokedexImg} alt='' height={40} style={{ marginRight: '10px' }} />
            <text>you have {pokedex.length} pokemon</text>
        </Grid >
    )
}

export default PokedexInfo;