import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import currentUser from './currentUser';
import fetcher from './fetcher';
import authInput from './authInput';
import dashboard from './dashboard';
import tile from './tile';


import * as storage from 'redux-storage'


const rootReducer = storage.reducer(combineReducers({fetcher, tile, currentUser, authInput, dashboard, routing: routerReducer}));

// const rootReducer = combineReducers({fetcher, tile, currentUser, authInput, dashboard, routing: routerReducer});

export default rootReducer
