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

export function getLyftToken(){
  return{
    type: types.FETCH_LYFT_TOKEN_REQUEST

  }
}

export function setLyftTokenParam(){
  return{
    type: types.FETCH_LYFT_TOKEN_REQUEST,
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

export function getRideHistory(){
  return{
      type: types.FETCH_METRICS_REQUEST
    }
}

export function getYelp(){
  return{
    type: types.FETCH_YELP_REQUEST
  }
}

export function getSortedList(){
  return{
    type: types.FETCH_SORT_REQUEST,
  }
}

export function getRecs(){
  return{
    type: types.FETCH_RECOMMENDATION_REQUEST
  }
}



export function deleteLyft(index){
  return{
    type: types.REMOVE_SPOT,
    index
  }
}

export function deleteYelp(index){
  return{
    type: types.REMOVE_YELP,
    index
  }
}

export function deleteSpot(index){
  return[
    deleteLyft(index),
    deleteYelp(index),
    getRecs()
  ]
}

export function setSortedList(spots){
  return{
    type: types.SET_SPOTS,
    spots
  }
}

export function initDashboard(){
  return[
    getRideHistory(),
    // getYelp(),
    // setSortedList()
  ]
}
