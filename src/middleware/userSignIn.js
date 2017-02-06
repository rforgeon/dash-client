import fetch from 'isomorphic-fetch';
var Auth = require('j-toker');

const fetchResultsRequest = (store, action) => {
  var currentState = store.getState();
  var email = currentState.authInput.email;
  var password = currentState.authInput.password;


    Auth.configure([
      {
      default: {
        apiUrl: 'http://localhost:3000/api',
        tokenFormat: {
         "access-token": "{{ access-token }}",
         "token-type":   "Bearer",
         client:         "{{ client }}",
         expiry:         "{{ expiry }}",
         uid:            "{{ uid }}"
        },
        authProviderPaths: {
          lyft:    '/auth/lyft',
        }
       }
      }

    ]);

    Auth.oAuthSignIn({provider: 'lyft'});

    console.log(this.props.params)

    var lyft_token = ''

  // const url = 'http://localhost:3000/api/auth/sign_in';
  //
  // fetch(url,{
  //   method: 'post',
  //   headers: {'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //       email: email,
  //       password: password,
  //   })
  //
  // })
  //   .then(function(response) {
  //     var results = [];
  //     var token = response.headers.get('access-token')
  //     var client = response.headers.get('client')
  //     var uid = response.headers.get('uid')
  //     response.json().then(function(object) {
  //       const id_num = object.data.id
  //       const lyft_token = object.data.lyft_token
  //       const lyft_refresh_token = object.data.lyft_refresh_token
  //       const lyft_expires_at = object.data.lyft_expires_at



        store.dispatch({ type: 'SET_PROFILE',
                                              lyft_token: lyft_token,
                                            })
        store.dispatch({ type: 'FETCH_SIGN_IN_SUCCESS' });

  }


  const signInMiddleware = store => next => action => {

    if (action.type === 'FETCH_SIGN_IN_REQUEST') {
      if(!store.getState().fetcher.isFetching) {
        fetchResultsRequest(store, action);
      }
    }
    next(action);
    return action;
  }

  export default signInMiddleware
