import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { merchantReducer } from './merchant/reducer';

const appReducer = combineReducers({
    merchant: merchantReducer
})

export const store = configureStore({
    reducer: appReducer,
})
