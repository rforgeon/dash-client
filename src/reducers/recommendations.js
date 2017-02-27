import { SET_RECOMMENDATIONS } from '../constants/ActionTypes'

var defaultState = []

function recommendations(state = defaultState, action){

  switch(action.type){

    case SET_RECOMMENDATIONS:
      console.log('Enter SET_RECOMMENDATIONS')
      return action.array



    default:
      return state;
  }
}

export default recommendations;
