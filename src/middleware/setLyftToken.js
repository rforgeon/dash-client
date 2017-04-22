import fetch from 'isomorphic-fetch';

const fetchResultsRequest = (store, action) => {
  //set dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'userID': 'ralphster',
    'brandID': 'mytopstop'
  });

  const currentState = store.getState();
  const lyft_token = currentState.routing.locationBeforeTransitions.query.token;


  store.dispatch({ type: 'SET_LYFT_TOKEN', lyft_token: lyft_token})
  store.dispatch({ type: 'FETCH_LYFT_TOKEN_SUCCESS' });


  }


  const setLyftTokenMiddleware = store => next => action => {

    if (action.type === 'FETCH_LYFT_TOKEN_REQUEST') {
      if(!store.getState().fetcher.isFetchingLyftToken) {
        fetchResultsRequest(store, action);
      }
    }
    next(action);
    return action;
  }

  export default setLyftTokenMiddleware
