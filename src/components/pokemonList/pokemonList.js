import React from 'react';
import { Grid, Card } from '@mui/material';

const PokemonList = ({ data, onDetail }) => {
    return (
        <>
            {
                data.length > 0 && data.map((poke) => {
                    return (
                        <Grid item xs={6} key={poke.name}>
                            <Card onClick={() => onDetail(poke.url)}>{poke.name}</Card>
                        </Grid>
                    )
                })
            }
        </>
    )
}

export default PokemonList;