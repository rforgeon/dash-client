import * as types from '../constants/ActionTypes';

export function signInProfile(user){
  return{
    type: types.SIGN_IN_PROFILE,
    user
  }
}

export function signOutProfile(){
  return{
    type: types.SIGN_OUT_PROFILE,
  }
}


//addMetricResults
//addSource
//removeSource

//setFetchedAlready
