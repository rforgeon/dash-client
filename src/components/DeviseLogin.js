import React, { Component } from 'react';
var Auth = require('j-toker');
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import PasswordMask from 'react-password-mask';



class DeviseLogin extends Component{

  configJToker(){
    Auth.configure([
      {
      default: {
        apiUrl: 'https://flashdash-api.herokuapp.com/api',
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
  }


  componentWillMount(){
    this.configJToker();

  }

  signIn(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var passwordConfirm = document.getElementById("passwordConfirm").value;

    this.props.setAuthInput(email,password,passwordConfirm);
    this.props.signInProfile();
    this.props.setAuthInput('','','');

    document.getElementById("email").value = '';
    document.getElementById("password").value= '';
    document.getElementById("passwordConfirm").value= '';


  }

  signUp(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var passwordConfirm = document.getElementById("passwordConfirm").value;

    this.props.setAuthInput(email,password,passwordConfirm);
    this.props.signUpProfile();
    this.props.setAuthInput('','','');

    document.getElementById("email").value = '';
    document.getElementById("password").value= '';
    document.getElementById("passwordConfirm").value= '';

    this.redirectToDash();
  }

  signOut(){
    this.props.signOutProfile();
  }

  redirectToDash(){

      browserHistory.push('/dashboard');

  }



  render() {
    return(
      <div>
        <div style={{margin:20+'px'}}>
          <div>
            Email: <input type="text" id="email"/>
            Password: <PasswordMask
                        id="password"
                        name="password"
                        placeholder="Enter password"
                      />
            Confirm Password: <PasswordMask
                                id="passwordConfirm"
                                name="password"
                                placeholder="Re-Enter password"
                              />
          </div>




          <button onClick={this.signUp.bind(this)}>
            Sign Up
          </button>
        </div>

        <div>
          <h3>Current User: {this.props.currentUser.uid}</h3>
        </div>

        <button onClick={this.signIn.bind(this)}>
          Sign In
        </button>
        <button onClick={this.signOut.bind(this)}>
          Sign Out
        </button>

        <Link to='/'>Dashboard</Link>

      </div>
    )
  }
};


export default DeviseLogin;
