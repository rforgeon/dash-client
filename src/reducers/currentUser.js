import {SET_PROFILE, SET_LYFT_TOKEN, ADD_SOURCE, REMOVE_SOURCE} from '../constants/ActionTypes'


var defaultState = {
  token: null,
  client: null,
  uid: null,
  id_num: null,
  lyft_token: null,
  lyft_refresh_token: null,
  lyft_expires_at: null
}

function currentUser(state = defaultState, action){

  switch(action.type){


    case SET_PROFILE :
      console.log("enter SET_PROFILE")
      return {
        token: action.token,
        client: action.client,
        uid: action.uid,
        id_num: action.id_num,
        lyft_token: action.lyft_token,
        lyft_refresh_token: action.lyft_refresh_token,
        lyft_expires_at: action.lyft_expires_at
      }

    case SET_LYFT_TOKEN :
      console.log("Enter SET_LYFT_TOKEN")
      return {
        token: state.token,
        client: state.client,
        uid: state.uid,
        id_num: state.id_num,
        lyft_token: action.lyft_token,
        lyft_refresh_token: state.lyft_refresh_token,
        lyft_expires_at: state.lyft_expires_at
      }

    default:
      return state;
  }
}

export default currentUser;
