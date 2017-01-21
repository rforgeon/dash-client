import React, { Component } from 'react';
var PubSub = require('pubsub-js');
var Auth = require('j-toker');
//import { Link } from 'react-router';

class DeviseLogin extends Component{

  configJToker(){
    Auth.configure([
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
    Auth.emailSignUp({
      email: 'rforgeon@gmail.com',
      password: 'password',
      password_confirmation: 'password',
      //config: 'identity'
    });
    PubSub.subscribe('auth.emailRegistration.success', function(ev, msg) {
      alert('Check your email!');
    });
    PubSub.subscribe('auth.emailRegistration.error', function(ev, msg) {
      alert('There was a error submitting your request. Please try again!');
    });
  }

  signIn(){
    Auth.emailSignIn({
      email: 'rforgeon@gmail.com',
      password: 'password',
      //config: 'identity'
    });
    console.log(Auth);
    PubSub.subscribe('auth.validation.success', function(ev) {
      alert('Welcome! (validation)');
    });
    PubSub.subscribe('auth.validation.error', function(ev, err) {
      alert('Validation failure.');
    });

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
    Auth.oAuthSignIn({provider: 'lyft'});
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
          <button onClick={this.signOut}>
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
