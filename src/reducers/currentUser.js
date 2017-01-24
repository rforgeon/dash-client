import {SIGN_IN_PROFILE, SIGN_OUT_PROFILE, ADD_SOURCE, REMOVE_SOURCE} from '../constants/ActionTypes'


var defaultState = {
  currentUser: null,
  identity: [
    {lyft:
      {
        token: null,
        tokenRefresh: null,
        uid: null,
        index: 1
      }
    }
  ]
}

function currentUser(state = defaultState, action){

  switch(action.type){


    case SIGN_IN_PROFILE :

      return {
        currentUser: action.user,
        identity:
        [
          ...state
        ]
      }

    case SIGN_OUT_PROFILE :

      return {
        currentUser: null,
        identity: []
      }

    case ADD_SOURCE :

      return {
        currentUser: action.user,
        identity: [
          ...state,
          {[action.sourceName]:
            {
              token: action.token,
              tokenRefresh: action.refreshToken,
              uid: action.uid,
              index: 2
            }
          }
        ]
      }

    case REMOVE_SOURCE :

      return {
        currentUser: null,
        identity:
        [
          ...state.slice(0,action.index),
          ...state.slice(action.index+1)
        ]
      }

    default:
      return state;
  }
}

export default currentUser;
