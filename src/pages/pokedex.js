
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, Container, Grid } from '@mui/material';
import { removeFromPokedexAction } from '../action/accommodationAction';

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
                            <Grid item xs={6} key={i}>
                                <Card>
                                    {poke.nickName + poke.name}
                                    <Button onClick={() => onRelease(i)}>Release</Button>
                                </Card>
                            </Grid>
                        )
                    })
                }
            </Grid>

        </Container>
    )
}

export default Pokedex;