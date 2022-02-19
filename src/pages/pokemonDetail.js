import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { GET_POKEMON_LIST_URL } from '../constant/apiUrl';
import {
    Container, Grid, Card, CardContent, Typography, Toolbar, Chip
} from '@mui/material';
import SuccessDialog from '../components/dialog/successDialog';
import FailedDialog from '../components/dialog/failedDialog';
import { addtoPokedexAction } from '../action/accommodationAction';
import { useDispatch } from 'react-redux';
import whiteBg from '../media/normalbg.png';
import { capitalizeFirstChar, getBgImage, getImage } from '../helper/helper';
import defaultImg from '../media/default.svg';
import LeftTypography from '../components/typography/LeftTypography';
import RightTypography from '../components/typography/RightTypography';
import CatchButton from '../components/button/catchButton';
import PokeTabs from '../components/pokeDetail/pokeTabs';
import { extractValue } from '../helper/helper';

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
    const [moves, setMoves] = useState([]);

    // ========= function =======
    const fetchData = () => {
        axios.get(`${GET_POKEMON_LIST_URL}/${params.pokeid}`).then((res) => {
            setPokeInfo(res.data);
            setBgImage(getBgImage(res.data));
            setPokeImage(getImage(res.data));
            setMoves(getMoves(res.data));
        })
    }
    const getMoves = (poke) => {
        return poke.moves ? extractValue(poke.moves, 'move') : [];
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
                <Card
                    style={{
                        backgroundImage: `url(${bgImage})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        marginBottom: 20
                    }}
                >
                    <CardContent>
                        <Typography component="div" sx={{ flexGrow: 1, }} align='center'>
                            <img src={pokeImage} alt="" height={270} />
                        </Typography>
                    </CardContent>
                    <CardContent
                        sx={{
                            backgroundImage: `url(${whiteBg})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10
                        }}
                    >
                        <Toolbar disableGutters>
                            <LeftTypography>
                                {pokeInfo.name && <Chip label={capitalizeFirstChar(pokeInfo.name)} sx={{ fontSize: 20 }} />}
                            </LeftTypography>
                            <RightTypography>
                                <CatchButton
                                    success={success}
                                    onClick={handleButtonClick}
                                    loading={loading}
                                />
                            </RightTypography>
                        </Toolbar>
                        <PokeTabs pokeInfo={pokeInfo} moves={moves} />
                    </CardContent>
                </Card>
            </Grid>

            <SuccessDialog
                open={openSuccessDialog}
                setOpen={setOpenSuccessDialog}
                onSubmit={addToPokedex}
            />
            <FailedDialog
                open={openFailedDialog}
                setOpen={setOpenFailedDialog}
                onCatchAgain={handleButtonClick}
            />
        </Container>
    )
}

export default PokemonDetail;