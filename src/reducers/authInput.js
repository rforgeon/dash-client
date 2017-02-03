import {AUTH_INPUT} from '../constants/ActionTypes'


var defaultState = {
  email: null,
  password: null,
  passwordConfirm: null
}

function authInput(state = defaultState, action){

  switch(action.type){

    case AUTH_INPUT :
      console.log("AUTH_INPUT")
      return {
        email: action.email,
        password: action.password,
        passwordConfirm: action.passwordConfirm
      }

    default:
      return state;
  }
}

export default authInput;
