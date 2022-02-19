
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid } from '@mui/material';
import { removeFromPokedexAction } from '../action/pokeAction';
import PokedexCard from '../components/pokedex/pokeCard';

const Pokedex = () => {
    const dispatch = useDispatch();
    const pokedex = useSelector(store => store.pokedex);
    const onRelease = (index) => {
        dispatch(removeFromPokedexAction(index))
    }
    return (
        <Container>
            <Grid container rowSpacing={2} columnSpacing={2}>
                {
                    pokedex.length > 0 && pokedex.map((poke, i) => {
                        return (
                            <PokedexCard key={i} poke={poke} index={i} onRelease={onRelease} />
                        )
                    })
                }
            </Grid>

        </Container>
    )
}

export default Pokedex;