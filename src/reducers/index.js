import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import currentUser from './currentUser';
import fetcher from './fetcher';
import authInput from './authInput';
import dashboard from './dashboard';
import yelp from './yelp';
import sortedList from './sortedList';
import recommendations from './recommendations'

import * as storage from 'redux-storage'


const rootReducer = storage.reducer(combineReducers({fetcher, yelp, currentUser, authInput, dashboard, sortedList, recommendations, routing: routerReducer}));

export default rootReducer
