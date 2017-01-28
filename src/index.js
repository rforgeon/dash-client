import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';


//Import react router deps
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

//Import Components
import App from './components/App';
import DeviseLogin from './components/DeviseLogin';
// import Dashboard from './components/Dashboard';
// import sourceList from './components/SourceList';


const router = (
  <Provider store={store}>
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={DeviseLogin}></IndexRoute>
    </Route>
  </Router>
  </Provider>

)


ReactDOM.render(
  router,
  document.getElementById('root')
);
