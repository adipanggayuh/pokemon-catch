import React from 'react';
import logo from '../../media/logopoke.png';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Badge, IconButton } from '@mui/material';
import CatchingPokemon from '@mui/icons-material/CatchingPokemon';
import { useSelector } from 'react-redux';

const Header = () => {
    const navigate = useNavigate();
    const pokedex = useSelector(store => store.pokedex);
    const navigateHome = () => {
        navigate('/');
    }
    const navigatePokedex = () => {
        navigate('/pokedex');
    }
    return (

        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >

                        <img src={logo} alt='' height={70} width={145} onClick={navigateHome} />

                    </Typography>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        <img src={logo} alt='' height={70} width={145} />
                    </Typography>
                    <Typography sx={{ flexGrow: 1, }} align='right'>

                        <IconButton aria-label="pokedex" onClick={navigatePokedex}>
                            <Badge badgeContent={pokedex.length} color="secondary">
                                <CatchingPokemon sx={{ color: '#ffff', fontSize: 30 }} />
                            </Badge>
                        </IconButton>

                    </Typography>

                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Header;
