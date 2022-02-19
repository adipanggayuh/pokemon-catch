import React from 'react';
import { Grid, Card, CardContent, Chip } from '@mui/material';
import bgImage from '../../media/bgimage.png';
import { useSelector } from 'react-redux';
import { capitalizeFirstChar } from '../../helper/helper';
const PokemonList = ({ data, onDetail }) => {
    const pokedex = useSelector(store => store.pokedex);
    const getOwned = (data, poke) => {
        return data.filter(item => item.name === poke.name).length;
    }
    return (
        <>
            {
                data.length > 0 && data.map((poke) => {
                    return (
                        <Grid item xs={6} key={poke.name}>
                            <Card onClick={() => onDetail(poke.url)} style={{ backgroundImage: `url(${bgImage})` }}>
                                <CardContent>
                                    <span style={{ fontSize: 18, margin: 5 }}>{capitalizeFirstChar(poke.name)}</span>
                                    <p style={{ margin: 0 }}><Chip label={`owned: ${getOwned(pokedex, poke)}`} /></p>
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