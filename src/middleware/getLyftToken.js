import fetch from 'isomorphic-fetch';

const fetchResultsRequest = (store, action) => {
  const currentState = store.getState();
  const id_num = currentState.currentUser.id_num;
  const uid = currentState.currentUser.uid;
  const client = currentState.currentUser.client;
  const token = currentState.currentUser.token;
  const lyft_refresh_token = currentState.currentUser.lyft_refresh_token;
  const lyft_expires_at = currentState.currentUser.lyft_expires_at;


  const url = 'http://localhost:3000/api/lyft/'+id_num;

  fetch(url,{
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'uid': uid,
      'client': client,
      'access-token': token
    },

  })
    .then(function(response) {

      response.json().then(function(object) {
        const lyft_token = object['access-token']

        store.dispatch({ type: 'SET_PROFILE', token: token,
                                              client: client,
                                              uid: uid,
                                              id_num: id_num,
                                              lyft_token: lyft_token,
                                              lyft_refresh_token: lyft_refresh_token,
                                              lyft_expires_at: lyft_expires_at})
        store.dispatch({ type: 'FETCH_LYFT_TOKEN_SUCCESS' });
      })
    });

  }


  const getLyftTokenMiddleware = store => next => action => {

    if (action.type === 'FETCH_LYFT_TOKEN_REQUEST') {
      if(!store.getState().fetcher.isFetching) {
        fetchResultsRequest(store, action);
      }
    }
    next(action);
    return action;
  }

  export default getLyftTokenMiddleware
