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
        console.log(token);
        console.log(client);
        console.log(uid);

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
                        state: "aXzWa_RQca-ncPtGjKsbZA"
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

  getAuth(){
    console.log(Auth);
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

      </div>
    )
  }
};


export default DeviseLogin;
