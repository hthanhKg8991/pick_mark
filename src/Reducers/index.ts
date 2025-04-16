import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './App';

const rootReducers = combineReducers({
    app: appReducer,
});

export default rootReducers;
