import fetch from 'isomorphic-fetch';

const fetchResultsRequest = (store, action) => {
  var currentState = store.getState();
  var email = currentState.authInput.email;
  var password = currentState.authInput.password;


  const url = 'https://flashdash-api.herokuapp.com/api/auth/sign_in';

  fetch(url,{
    method: 'post',
    headers: {'Content-Type': 'application/json' },
    body: JSON.stringify({
        email: email,
        password: password,
    })

  })
    .then(function(response) {
      var results = [];
      var token = response.headers.get('access-token')
      var client = response.headers.get('client')
      var uid = response.headers.get('uid')
      response.json().then(function(object) {
        const id_num = object.data.id
        const lyft_token = object.data.lyft_token
        const lyft_refresh_token = object.data.lyft_refresh_token
        const lyft_expires_at = object.data.lyft_expires_at

        store.dispatch({ type: 'SET_PROFILE', token: token,
                                              client: client,
                                              uid: uid,
                                              id_num: id_num,
                                              lyft_token: lyft_token,
                                              lyft_refresh_token: lyft_refresh_token,
                                              lyft_expires_at: lyft_expires_at})
        store.dispatch({ type: 'FETCH_SIGN_IN_SUCCESS' });

      })
    });

  }


  const signInMiddleware = store => next => action => {

    if (action.type === 'FETCH_SIGN_IN_REQUEST') {
      if(!store.getState().fetcher.isFetchingSignIn) {
        fetchResultsRequest(store, action);
      }
    }
    next(action);
    return action;
  }

  export default signInMiddleware
