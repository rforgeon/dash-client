import fetch from 'isomorphic-fetch';

const fetchResultsRequest = (store, action) => {
  var currentState = store.getState();
  var email = currentState.authInput.email;
  var password = currentState.authInput.password;
  var passwordConfirm = currentState.authInput.passwordConfirm;

  const url = 'http://localhost:3000/api/auth';

  fetch(url,{
    method: 'post',
    headers: {'Content-Type': 'application/json' },
    body: JSON.stringify({
        email: email,
        password: password,
        password_confirmation: passwordConfirm
    })

  })
    .then(function(response) {
      var token = response.headers.get('access-token')
      var client = response.headers.get('client')
      var uid = response.headers.get('uid')

      store.dispatch({ type: 'SIGN_UP_PROFILE', token: token, client: client, uid: uid})
      store.dispatch({ type: 'FETCH_SIGN_UP_SUCCESS' });

      response.json().then(function(data) {
        console.log(data);

      })
    });
  }


  const signUpMiddleware = store => next => action => {

    if (action.type === 'FETCH_SIGN_UP_REQUEST') {
      if(!store.getState().fetcher.isFetching) {
        fetchResultsRequest(store, action);
      }
    }
    next(action);
    return action;
  }

  export default signUpMiddleware
