import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import initialUserReducer from './initialUserSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';

const persistConfig = {
    key: 'root',
    storage,
  }

const rootReducer = combineReducers({
    users: userReducer,
    initialUser: initialUserReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store= configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
})

export const persistor = persistStore(store)

