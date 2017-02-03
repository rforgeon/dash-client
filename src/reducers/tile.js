import { SET_YELP } from '../constants/ActionTypes'



function tile(state = [], action){

  switch(action.type){

    case SET_YELP:
      console.log('Enter SET_YELP')
      //return the new state with the new comment
      return [...state,{
        business: action.business
      }]


    default:
      return state;
  }
}

export default tile;
