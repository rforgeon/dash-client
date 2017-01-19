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
    })
  }

  componentWillMount(){
    this.configJToker();
  }

  signIn(){
    Auth.emailSignIn({
      email: 'rforgeon@gmail.com',
      password: 'password'
    });
    console.log(Auth);
    console.log(Auth.user.signedIn)
  }

  signOut(){
    Auth.signOut();
    console.log(Auth);
    console.log(Auth.user.signedIn)
  }


  render() {
    return(
      <div>
        <h1>
          ⚡️ FlashDash
        </h1>
          <button onClick={this.signIn}>
            Sign In
          </button>
          <button onClick={this.signOut}>
            Sign Out
          </button>
          {Auth.user.signedIn}
      </div>
    )
  }
};


export default DeviseLogin;
