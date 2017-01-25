import React, { Component } from 'react';
var PubSub = require('pubsub-js');
var Auth = require('j-toker');
//import { Link } from 'react-router';

class DeviseLogin extends Component{

  configJToker(){
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
      },
        {
        identity: {
          apiUrl:                  '//devise-token-auth.dev',
          signOutUrl:              '/identity_auth/sign_out',
          emailSignInPath:         '/identity_auth/sign_in',
          emailRegistrationPath:   '/identity_auth',
          accountUpdatePath:       '/identity_auth',
          accountDeletePath:       '/identity_auth',
          passwordResetPath:       '/identity_auth/password',
          passwordUpdatePath:      '/identity_auth/password',
          tokenValidationPath:     '/identity_auth/validate_token',
          authProviderPaths: {
            github:    '/identity_user_auth/github',
            facebook:  '/identity_user_auth/facebook',
            google:    '/identity_user_auth/google_oauth2'
          }
        }
      }

    ]);
  }


  componentWillMount(){
    this.configJToker();

  }


  signUpEmail(){

  fetch('http://localhost:3000/api/auth',{
    method: 'post',
    //mode: 'cors',
    headers: {'Content-Type': 'application/json' },
    body: JSON.stringify({
        email: 'rforgeon@gmail.com',
        password: 'password',
        password_confirmation: 'password'
    })

  })
    .then(function(response) {
      this.props.signInProfile(response.headers.get('access-token'));
      response.json().then(function(data) {
      console.log(data);
      //this.props.signInProfile(data.email)
    });
  })
}

  signIn(){
    fetch('http://localhost:3000/api/auth/sign_in',{
      method: 'post',
      //mode: 'cors',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify({

          email: 'rforgeon@gmail.com',
          password: 'password',

      })

    })
      .then(function(response) {
        const token = response.headers.get('access-token');
        const client = response.headers.get('client');
        const uid = response.headers.get('uid');

        //this.props.signInProfile(token);
        console.log("token: ",token);
        console.log("client: ",client);
        console.log("uid: ",uid);

        response.json().then(function(data) {
        console.log(data);
      });
    })

  }

  signOut(){
    Auth.signOut();
    console.log(Auth);
    PubSub.subscribe('auth.signOut.success', function(ev, msg) {
      alert('Goodbye!');
    });
    PubSub.subscribe('auth.signOut.success', function(ev, msg) {
      alert('There was a problem with your sign out attempt. Please try again!');
    });
  }

  connectLyft(){
    Auth.oAuthSignIn({provider: 'lyft',
                      params: {
                        client: "g5RepUAtNYLRx6kfvPZjLg",
                        id: 3
                            }
                    });


    PubSub.subscribe('auth.validation.success', function(ev) {
      alert('Welcome!');
    });
    PubSub.subscribe('auth.validation.error', function(ev, err) {
      alert('Validation failure.');
    });
    PubSub.subscribe('auth.oAuthSignIn.success', function(ev, msg) {
      alert('Welcome! (OAuth2)');
    });
    PubSub.subscribe('auth.oAuthSignIn.error', function(ev, msg) {
      alert('There was an error authenticating your account! (OAuth)');
    });
  }

  getRideHistory(){
    const access_token = ""
    fetch('https://api.lyft.com/v1/rides?start_time=2016-01-01T21:04:22Z&limit=50',{
      method: 'get',
      headers: {'Authorization': 'Bearer gAAAAABYiMhsudMhO40W4spwW7IKceip9PYkZLaXBKLtqnVzqtPS22Sdp5rJwUTQ8Zreh2cuAcfqMwYpDpoLXYxlvwOUv0LhU1giJUsh5TyOawclnehxOuf5Tsann6dZBcFSGl832R_KjRMgXVBtSAbE4ybUyKyc0cyetFwUL-tIhYh5mKzhIWsEBiSTMUxtB9rr3wIgwM9C9ELMh8uzlhHKdWYX8TVBX4TpBEUCrQzqb8xas8mV-vbWd7gY4buOXjQRt60T61ztfnbf6LNNhseoV3KKfZfFnViRDxH1JsGSsSShJifzH5k=' }
    })
      .then(function(response) {
        response.json().then(function(data) {
        console.log(data);
      });
    })
  }

  initSandbox(){
    //const access_token = ""
    fetch('https://api.lyft.com/v1/rides/',{
      method: 'POST',
      headers: {'Authorization': 'Bearer SANDBOX-gAAAAABYiObHMfQ4C7TxYP6s_qVUZPdwELvCq_-p-EbBqjpt9yCM-6eBhbKBlkO7QvOeqTw4s3W6ZoZ1x9rDIk3FaCyEWLV5ykjy2jk6JPTMZ9DHd3QdsuhpZc0kC5hjhhiPcpV6oRbUvCgyq4PAPHUhGHA_1hNaftOqHVRpVUhp5kaCeJ9WJuI8HOFl4bEPjlFCajR2b02hFTY-qdFlWTU_UkbJtQGYvpFoHDI6_RTnnWK56m1faOeIY66l-LKmDxiECsRE5Q1TFupQLr_jeejWA4Nn9fkAsj47mmU5v2zT7nh0HvjxjGyoB9bkO5_BO9u2GX2VBTrInb7qtZZcj77EwChrOLWwRQ=='}

    })
      .then(function(response) {
        response.json().then(function(data) {
        console.log(data);
      });
    })
  }

  runSandbox(){
    const access_token = ""
    fetch('https://api.lyft.com/v1/rides/187234782346423842737647234',{
      method: 'get',
      //mode: 'cors',
      headers: {'Authorization': 'Bearer SANDBOX-gAAAAABYiObHMfQ4C7TxYP6s_qVUZPdwELvCq_-p-EbBqjpt9yCM-6eBhbKBlkO7QvOeqTw4s3W6ZoZ1x9rDIk3FaCyEWLV5ykjy2jk6JPTMZ9DHd3QdsuhpZc0kC5hjhhiPcpV6oRbUvCgyq4PAPHUhGHA_1hNaftOqHVRpVUhp5kaCeJ9WJuI8HOFl4bEPjlFCajR2b02hFTY-qdFlWTU_UkbJtQGYvpFoHDI6_RTnnWK56m1faOeIY66l-LKmDxiECsRE5Q1TFupQLr_jeejWA4Nn9fkAsj47mmU5v2zT7nh0HvjxjGyoB9bkO5_BO9u2GX2VBTrInb7qtZZcj77EwChrOLWwRQ==' },
      data: {"status":"pickedUp"}
    })
      .then(function(response) {
        response.json().then(function(data) {
        console.log(data);
      });
    })
  }


  render() {
    return(
      <div>

        <button onClick={this.signUpEmail.bind(this)}>
          Sign Up
        </button>
        <button onClick={this.signIn.bind(this)}>
          Sign In
        </button>
        <button onClick={this.signOut.bind(this)}>
          Sign Out
        </button>
        <button onClick={this.connectLyft.bind(this)}>
          Connect Lyft
        </button>

        <button onClick={this.getRideHistory.bind(this)}>
          Get Ride History
        </button>

        <button onClick={this.initSandbox.bind(this)}>
          Init Sandbox
        </button>

        <button onClick={this.runSandbox.bind(this)}>
          Run Sandbox
        </button>

      </div>
    )
  }
};


export default DeviseLogin;
