import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import currentUser from './currentUser';
// import fetcher from './fetcher';
// import sourceList from './sourceList';
// import dashboard from './dashboard';



const rootReducer = combineReducers({currentUser, routing: routerReducer});

export default rootReducer
