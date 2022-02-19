import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducer/pokeReducer';

const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const middleware = compose(applyMiddleware(thunk));
const store = createStore(persistedReducer, middleware);
const persistor = persistStore(store);

export {
    store,
    persistor
}
