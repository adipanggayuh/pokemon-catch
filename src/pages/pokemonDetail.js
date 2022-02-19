import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { GET_POKEMON_LIST_URL } from '../constant/apiUrl';
import {
    Container, Grid, Card, CardContent, Typography, Toolbar, Box,
    Tabs,
    Tab, Chip
} from '@mui/material';
import SuccessDialog from '../components/dialog/successDialog';
import FailedDialog from '../components/dialog/failedDialog';
import { addtoPokedexAction } from '../action/accommodationAction';
import { useDispatch } from 'react-redux';
import whiteBg from '../media/normalbg.png';
import { getBgImage, getImage } from '../helper/helper';
import defaultImg from '../media/default.svg';
import LeftTypography from '../components/typography/LeftTypography';
import RightTypography from '../components/typography/RightTypography';
import CatchButton from '../components/button/catchButton';
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component="div">{children}</Typography>
                </Box>
            )}
        </div>
    );
}
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
    const [tabVal, setTabVal] = useState(0);
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


    const handleChange = (event, newValue) => {
        setTabVal(newValue);
    };
    const getTypes = (poke) => {
        let types = poke.types ? extractValue(poke.types, 'type') : [];
        return types.join();
    }
    const getMoves = (poke) => {
        return poke.moves ? extractValue(poke.moves, 'move') : [];
    }
    const extractValue = (array, paramName) => {
        return array.reduce((acc, cur) => {
            acc.push(cur[paramName].name);
            return acc;
        }, []);
    }

    const getAbilities = (poke) => {
        let abilities = poke.abilities ? extractValue(poke.abilities, 'ability') : [];
        return abilities.join();
    }
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
                                {pokeInfo.name && <Chip label={pokeInfo.name} sx={{ fontSize: 20 }} />}
                            </LeftTypography>
                            <RightTypography>
                                <CatchButton
                                    success={success}
                                    onClick={handleButtonClick}
                                    loading={loading}
                                />
                            </RightTypography>
                        </Toolbar>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={tabVal} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="About" {...a11yProps(0)} />
                                    <Tab label="Moves" {...a11yProps(1)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={tabVal} index={0}>
                                <Grid container>
                                    <Grid item xs={3}>
                                        Types
                                    </Grid>
                                    <Grid item xs={9}>
                                        : {getTypes(pokeInfo)}
                                    </Grid>
                                    <Grid item xs={3}>
                                        Height
                                    </Grid>
                                    <Grid item xs={9}>
                                        : {pokeInfo.height}
                                    </Grid>
                                    <Grid item xs={3}>
                                        Wight
                                    </Grid>
                                    <Grid item xs={9}>
                                        : {pokeInfo.weight}
                                    </Grid>
                                    <Grid item xs={3}>
                                        Abilities
                                    </Grid>
                                    <Grid item xs={9}>
                                        : {getAbilities(pokeInfo)}
                                    </Grid>
                                </Grid>
                            </TabPanel>

                            <TabPanel value={tabVal} index={1}>
                                {moves.length > 0 && moves.map(move => {
                                    return <Chip key={move} label={move} />
                                })}
                            </TabPanel>
                        </Box>
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