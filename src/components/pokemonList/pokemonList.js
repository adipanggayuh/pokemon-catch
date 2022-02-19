import React from 'react';
import { Grid, Card, CardContent } from '@mui/material';
import bgImage from '../../media/bgimage.png';
const PokemonList = ({ data, onDetail }) => {
    return (
        <>
            {
                data.length > 0 && data.map((poke) => {
                    return (
                        <Grid item xs={6} key={poke.name}>
                            <Card onClick={() => onDetail(poke.url)} style={{ backgroundImage: `url(${bgImage})` }}>
                                <CardContent>
                                    {poke.name}
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })
            }
        </>
    )
}

export default PokemonList;