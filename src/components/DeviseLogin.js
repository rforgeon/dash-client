import React, { Component } from 'react';
var PubSub = require('pubsub-js');
var Auth = require('j-toker');
//import { Link } from 'react-router';

class DeviseLogin extends Component{

  configJToker(){
    Auth.configure(
      {
      default: {
        apiUrl: 'http://localhost:3000',
        tokenFormat: {
         "access-token": "{{ access-token }}",
         "token-type":   "Bearer",
         client:         "{{ client }}",
         expiry:         "{{ expiry }}",
         uid:            "{{ uid }}"
        },
        authProviderPaths: {
          Lyft:    '/users/auth/lyft',
        }
       }
      });
  }


  componentWillMount(){
    this.configJToker();

  }


  signUpEmail(){

    fetch('http://localhost:3000/users',{
      method: 'post',
      //mode: 'cors',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: {
          email: 'rforgeon@gmail.com',
          password: 'password',
          password_confirmation: 'password'
        }
      })

    })
      .then(function(response) {
        response.json().then(function(data) {
        console.log(data);
      });
    })
  }

  signIn(){
    fetch('http://localhost:3000/users/sign_in.json',{
      method: 'post',
      body: {
        'user':{
          'email': 'rforgeon@gmail.com',
          'password': 'password',
        }
      }

    })
      .then(function(response) {
        response.json().then(function(data) {
        console.log(data);
      });
    })
    PubSub.subscribe('auth.validation.success', function(ev) {
      alert('Welcome! (validation)');
    });
    PubSub.subscribe('auth.validation.error', function(ev, err) {
      alert('Validation failure.');
    });

  }

  signOutDevise(){
    fetch('http://localhost:3000/users/sign_out.json',{
      method: 'delete'

    })
      .then(function(response) {
        response.json().then(function(data) {
        console.log(data);
      });
    })
    console.log(Auth);
    PubSub.subscribe('auth.signOut.success', function(ev, msg) {
      alert('Goodbye!');
    });
    PubSub.subscribe('auth.signOut.success', function(ev, msg) {
      alert('There was a problem with your sign out attempt. Please try again!');
    });
  }

  connectLyft(){
    Auth.oAuthSignIn({provider: 'Lyft'});

    // fetch('http://localhost:3000/users/auth/lyft',{
    //   method: 'get',
    //   mode: 'no-cors',
    //
    // })


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

  getUserIDs(){
    fetch('http://localhost:3000/users/user_identities')
      .then(function(response) {
        response.json().then(function(data) {
        console.log(data);
      });
    })

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
          <button onClick={this.signOutDevise}>
            Sign Out
          </button>
          <button onClick={this.connectLyft}>
            Connect Lyft
          </button>
          <button onClick={this.getAuth}>
            Get Auth
          </button>
          <button onClick={this.getUserIDs}>
            Get User IDs
          </button>
      </div>
    )
  }
};


export default DeviseLogin;
