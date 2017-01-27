import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import currentUser from './currentUser';
import fetcher from './fetcher';
import authInput from './authInput';
// import dashboard from './dashboard';
import * as storage from 'redux-storage'


const rootReducer = storage.reducer(combineReducers({currentUser, authInput, fetcher , routing: routerReducer}));

export default rootReducer
