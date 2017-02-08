import { SET_SPOTS } from '../constants/ActionTypes'

var defaultState = [
    {

          destination:
            {
              lat: 37.799959,
              lng: -122.409545
            }

    }
  ]


function sortedList(state = defaultState, action){

  switch(action.type){

    case SET_SPOTS:
      console.log('Enter SET_SPOTS')
      //return the new state with the new comment
      return action.spots


    default:
      return state;
  }
}

export default sortedList;
