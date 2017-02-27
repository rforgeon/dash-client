import fetch from 'isomorphic-fetch';

const fetchResultsRequest = (store, action) => {
  var currentState = store.getState();
  var uid = currentState.currentUser.uid;
  var client = currentState.currentUser.client;
  var token = currentState.currentUser.token;

  const url = 'https://flashdash-api.herokuapp.com/api/auth/sign_out';

  fetch(url,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'uid': uid,
      'client': client,
      'access-token': token
    }
  })
    .then(function(response) {
      store.dispatch({ type: 'SET_PROFILE', token: '', client: '', uid: ''});
      store.dispatch({ type: 'FETCH_SIGN_OUT_SUCCESS' });

      response.json().then(function(data) {
      console.log(data);

    })
  })
}


  const signOutMiddleware = store => next => action => {

    if (action.type === 'FETCH_SIGN_OUT_REQUEST') {
      if(!store.getState().fetcher.isFetchingSignOut) {
        fetchResultsRequest(store, action);
      }
    }
    next(action);
    return action;
  }

  export default signOutMiddleware
