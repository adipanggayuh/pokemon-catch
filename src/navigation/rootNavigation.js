import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import PokemonDetail from '../pages/pokemonDetail';
import Pokedex from '../pages/pokedex';


const RootNavigation = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pokemon/:pokeid" element={<PokemonDetail />} />
                <Route path="/pokedex" element={<Pokedex />} />
            </Routes>
        </>
    )
}

export default RootNavigation;