import {
  ADD_TO_POKEDEX,
  REMOVE_FROM_POKEDEX
} from '../constant/actionTypes';

const addtoPokedexAction = (data) => {
  return dispatch => {
    return dispatch({
      type: ADD_TO_POKEDEX,
      payload: data,
    });
  };
};

const removeFromPokedexAction = (index) => {
  return dispatch => {
    return dispatch({
      type: REMOVE_FROM_POKEDEX,
      payload: index,
    });
  };
};

export {
  addtoPokedexAction,
  removeFromPokedexAction
};
