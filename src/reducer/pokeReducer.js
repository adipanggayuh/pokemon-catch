import * as types from '../constant/actionTypes';

const initialState = {
  pokedex: [],
};

const pokeReducer = (state = initialState, action) => {
  switch (action.type) {
    //---------------------------------
    // ADD_TO_POKEDEX
    //---------------------------------
    case types.ADD_TO_POKEDEX: {
      return {
        ...state,
        pokedex: [...state.pokedex, ...[action.payload]],
      };
    }
    //---------------------------------
    // REMOVE_FROM_POKEDEX
    //---------------------------------
    case types.REMOVE_FROM_POKEDEX: {
      let _pokedex = [...state.pokedex].filter((poke, index) => index !== action.payload);
      return {
        ...state,
        pokedex: _pokedex,
      };
    }
    default:
      return state;
  }
};

export default pokeReducer;
