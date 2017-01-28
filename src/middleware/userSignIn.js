import fetch from 'isomorphic-fetch';

const fetchResultsRequest = (store, action) => {
  var currentState = store.getState();
  var email = currentState.authInput.email;
  var password = currentState.authInput.password;


  const url = 'http://localhost:3000/api/auth/sign_in';

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
      response.json().then( json => {
        // var id_num = data.id;
        // console.log(data);
        // console.log(data.id);
        var result = Array.from(json.data, (v,i) => {
          var id = {}
          id.num = v.id;
          return id;
        })
        console.log(result);

        store.dispatch({ type: 'SET_PROFILE', token: token, client: client, uid: uid})
        store.dispatch({ type: 'FETCH_SIGN_IN_SUCCESS' });

      })
    });

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
