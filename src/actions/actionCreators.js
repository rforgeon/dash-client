import * as types from '../constants/ActionTypes';
import { CALL_API } from 'redux-api-middleware';
import { normalize, schema } from 'normalizr';


export function signUpProfile(){
  return{
    type: types.FETCH_SIGN_UP_REQUEST

  }
}

export function signOutProfile(){
  return{
    type: types.FETCH_SIGN_OUT_REQUEST

  }
}

export function signInProfile(){
  return{
    type: types.FETCH_SIGN_IN_REQUEST

  }
}

export function setAuthInput(email, password, passwordConfirm){
  return{
    type: types.AUTH_INPUT,
    email,
    password,
    passwordConfirm
  }
}



//addMetricResults
//addSource
//removeSource
