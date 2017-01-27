import {SIGN_IN_PROFILE, SIGN_UP_PROFILE, SIGN_OUT_PROFILE, ADD_SOURCE, REMOVE_SOURCE} from '../constants/ActionTypes'


var defaultState = {
  token: null,
  client: null,
  uid: null,
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


    case SIGN_UP_PROFILE :

      return {
        token: action.token,
        client: action.client,
        uid: action.uid,
        identity:
        [
          ...state
        ]
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
              index: state.index+1
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
