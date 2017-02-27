import { SET_SPOTS, REMOVE_SPOT } from '../constants/ActionTypes'

var defaultState = [
    {
      lyft:{
          destination:
            {
              lat: 37.799959,
              lng: -122.409545
            }
        },
        count:0
    }
  ]


function sortedList(state = [], action){

  switch(action.type){

    case SET_SPOTS:
      console.log('Enter SET_SPOTS')
      //return the new state with the new comment
      return action.spots

    case REMOVE_SPOT:
      console.log('After REMOVE_SPOT')
      return [
        ...state.slice(0,action.index),
        ...state.slice(action.index+1)
      ]

    default:
      return state;
  }
}

export default sortedList;
