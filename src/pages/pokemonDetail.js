import CatchingPokemon from '@mui/icons-material/CatchingPokemon';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { GET_POKEMON_LIST_URL } from '../constant/apiUrl';
import {
    Box, Fab, CircularProgress, Container, Grid, Card, CardContent, Typography, Toolbar
} from '@mui/material';
import { green, red } from '@mui/material/colors';
import SuccessDialog from '../components/dialog/successDialog';
import FailedDialog from '../components/dialog/failedDialog';
import { addtoPokedexAction } from '../action/accommodationAction';
import { useDispatch } from 'react-redux';
import whiteBg from '../media/normalbg.png';
import { getBgImage, getImage } from '../helper/helper';
import defaultImg from '../media/default.svg';

const PokemonDetail = () => {
    // ======== variable and state =======
    const params = useParams();
    const dispatch = useDispatch();
    const timer = useRef();
    const [pokeInfo, setPokeInfo] = useState({});
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
    const [openFailedDialog, setOpenFailedDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [bgImage, setBgImage] = useState(whiteBg);
    const [pokeImage, setPokeImage] = useState(defaultImg);

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
    // ========= function =======
    const fetchData = () => {
        axios.get(`${GET_POKEMON_LIST_URL}/${params.pokeid}`).then((res) => {
            setPokeInfo(res.data);
            setBgImage(getBgImage(res.data));
            setPokeImage(getImage(res.data));
        })
    }

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

    // ========= lifecycle ======
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);


    return (
        <Container>
            <Grid item xs={12}>
                <Card style={{ backgroundImage: `url(${bgImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                    <CardContent>
                        <Typography sx={{ flexGrow: 1, }} align='center'>
                            <img src={pokeImage} alt="" height={270} />
                        </Typography>
                    </CardContent>
                    <CardContent sx={{ backgroundColor: '#ffff', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                        <Toolbar disableGutters>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                            >

                                {pokeInfo.name && <div>{pokeInfo.name}</div>}

                            </Typography>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                            >
                                {pokeInfo.name && <div>{pokeInfo.name}</div>}
                            </Typography>
                            <Typography sx={{ flexGrow: 1, }} align='right'>

                                <Box sx={{ alignItems: 'center' }}>

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
                                                    color: red[500],
                                                    position: 'absolute',
                                                    top: -6,
                                                    right: -6,
                                                    zIndex: 1,
                                                }}
                                            />
                                        )}
                                    </Box>
                                </Box>
                            </Typography>
                        </Toolbar>
                    </CardContent>
                </Card>
            </Grid>

            <SuccessDialog open={openSuccessDialog} setOpen={setOpenSuccessDialog} onSubmit={addToPokedex} />
            <FailedDialog open={openFailedDialog} setOpen={setOpenFailedDialog} onCatchAgain={handleButtonClick} />
        </Container>
    )
}

export default PokemonDetail;