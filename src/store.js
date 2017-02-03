import { createStore, applyMiddleware, compose} from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import * as storage from 'redux-storage'


//import the root reducer
import rootReducer from './reducers/index';
//import middlewares
import signUpMiddleware from './middleware/userSignUp';
import signOutMiddleware from './middleware/userSignOut';
import signInMiddleware from './middleware/userSignIn';
import getLyftTokenMiddleware from './middleware/getLyftToken';
import metricsMiddleware from './middleware/metrics';
import yelpMiddleware from './middleware/yelp';



import createEngine from 'redux-storage-engine-localstorage';
const engine = createEngine('my-save-key');

const persistedState = storage.createMiddleware(engine);

const middlewares = [
  signUpMiddleware,
  signOutMiddleware,
  signInMiddleware,
  getLyftTokenMiddleware,
  metricsMiddleware,
  yelpMiddleware,
  persistedState
]


const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(rootReducer);

const load = storage.createLoader(engine);
load(store);



export const history = syncHistoryWithStore(browserHistory, store);

// if (module.hot){
//   module.hot.accept('./reducers/',() => {
//     const nextRootReducer = require('./reducers/index').default;
//     store.replaceReducer(nextRootReducer);
//   });
// }

export default store;
