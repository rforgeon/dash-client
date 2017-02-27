import { SET_YELP, REMOVE_YELP } from '../constants/ActionTypes'

var defaultState = []

function yelp(state = defaultState, action){

  switch(action.type){

    case SET_YELP:
      console.log('Enter SET_YELP')
      return [...state,{
        ride_id: action.ride_id,
        business: action.business
      }]

    case REMOVE_YELP:
      console.log('After REMOVE_YELP')
      return [
        ...state.slice(0,action.index),
        ...state.slice(action.index+1)
      ]


    default:
      return state;
  }
}

export default yelp;
