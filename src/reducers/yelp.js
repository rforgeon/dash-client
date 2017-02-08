import { SET_YELP } from '../constants/ActionTypes'

var defaultState = [
  {
    business : [{
      name: "Cafe Roma"
    }]
  }
]

function yelp(state = defaultState, action){

  switch(action.type){

    case SET_YELP:
      console.log('Enter SET_YELP')
      //return the new state with the new comment
      return [...state,{
        ride_id: action.ride_id,
        business: action.business
      }]


    default:
      return state;
  }
}

export default yelp;
