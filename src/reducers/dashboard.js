import { SET_METRICS } from '../constants/ActionTypes'


var defaultState = {
  lyft: {
    rides:
      [
        {
        ride_id: 1,
        destination:{
          lat: 37.799959,
          lng: -122.409545
        }
      }
    ]
  }
}

function dashboard(state = defaultState, action){

  switch(action.type){

    case SET_METRICS:
      console.log("SET_METRICS")
      return{
        lyft: {
          rides: action.rides
        }

      }

    default:
      return state;
  }
}

export default dashboard;
