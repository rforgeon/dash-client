import React, { Component } from 'react';
//var PubSub = require('pubsub-js');
var Auth = require('j-toker');
//import { Link } from 'react-router';

class DeviseLogin extends Component{

  configJToker(){
    Auth.configure({apiUrl: 'http://localhost:3000',
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
    })
  }

  componentWillMount(){
    this.configJToker();
  }

  signUpEmail(){
    Auth.emailSignUp({
      email: 'rforgeon@gmail.com',
      password: 'password',
      password_confirmation: 'password'
    });
  }

  signIn(){
    Auth.emailSignIn({
      email: 'rforgeon@gmail.com',
      password: 'password'
    });
    console.log(Auth);
  }

  signOut(){
    Auth.signOut();
    console.log(Auth);
  }

  connectLyft(){
    Auth.oAuthSignIn({provider: 'lyft'});
  }

  getAuth(){
    console.log(Auth);
  }


  render() {
    return(
      <div>
        <h1>
          ⚡️ FlashDash
        </h1>
        <button onClick={this.signUpEmail}>
          Sign Up
        </button>
          <button onClick={this.signIn}>
            Sign In
          </button>
          <button onClick={this.signOut}>
            Sign Out
          </button>
          <button onClick={this.connectLyft}>
            Connect Lyft
          </button>
          <button onClick={this.getAuth}>
            Get Auth
          </button>
      </div>
    )
  }
};


export default DeviseLogin;
