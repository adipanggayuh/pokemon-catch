import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useSelector } from 'react-redux';
import LeftTypography from '../typography/LeftTypography';
import RightTypography from '../typography/RightTypography';
import logo from '../../media/logopoke.webp';
import BadgeButton from './badgeButton';

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
        <AppBar position="static" sx={{ marginBottom: 2 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <LeftTypography>
                        <img src={logo} alt='' height={70} width={145} onClick={navigateHome} />
                    </LeftTypography>
                    <RightTypography sx={{ flexGrow: 1, }} align='right'>
                        <BadgeButton badgeContent={pokedex.length} onClick={navigatePokedex} />
                    </RightTypography>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Header;
