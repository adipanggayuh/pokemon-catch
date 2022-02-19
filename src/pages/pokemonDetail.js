import CatchingPokemon from '@mui/icons-material/CatchingPokemon';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { GET_POKEMON_LIST_URL } from '../constant/apiUrl';
import {
    Box, Fab, CircularProgress, Container, Grid, Card
} from '@mui/material';
import { green, red } from '@mui/material/colors';
import SuccessDialog from '../components/dialog/successDialog';
import FailedDialog from '../components/dialog/failedDialog';
import { addtoPokedexAction } from '../action/accommodationAction';
import { useDispatch } from 'react-redux';


const PokemonDetail = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const [pokeInfo, setPokeInfo] = useState({});
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
    const [openFailedDialog, setOpenFailedDialog] = useState(false);
    const fetchData = () => {
        axios.get(`${GET_POKEMON_LIST_URL}/${params.pokeid}`).then((res) => {
            setPokeInfo(res.data);
        })
    }
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const timer = useRef();

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

    useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handleButtonClick = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = window.setTimeout(() => {
                let catched = Math.random() < 0.5;
                setSuccess(catched);
                if (catched) {
                    setOpenSuccessDialog(true);
                } else {
                    setOpenFailedDialog(true);
                }
                setLoading(false);
            }, 1000);
        }
    };

    const addToPokedex = (name) => {
        let _poke = { ...pokeInfo };
        _poke['nickName'] = name;
        dispatch(addtoPokedexAction(_poke));
    }


    return (
        <Container>
            <Grid item xs={12}>
                <Card>
                    {
                        pokeInfo.name && <div>{pokeInfo.name}</div>
                    }
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Fab
                                aria-label="save"
                                color="primary"
                                sx={buttonSx}
                                onClick={handleButtonClick}
                            >
                                <CatchingPokemon />
                            </Fab>
                            {loading && (
                                <CircularProgress
                                    size={68}
                                    sx={{
                                        color: green[500],
                                        position: 'absolute',
                                        top: -6,
                                        left: -6,
                                        zIndex: 1,
                                    }}
                                />
                            )}
                        </Box>
                    </Box>
                </Card>
            </Grid>

            <SuccessDialog open={openSuccessDialog} setOpen={setOpenSuccessDialog} onSubmit={addToPokedex} />
            <FailedDialog open={openFailedDialog} setOpen={setOpenFailedDialog} onCatchAgain={handleButtonClick} />
        </Container>
    )
}

export default PokemonDetail;