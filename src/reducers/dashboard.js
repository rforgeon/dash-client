import { SET_METRICS, DISCONNECT_LYFT, LOADING_METRICS } from '../constants/ActionTypes'


var defaultState = {
  lyftConnected: false
}

function dashboard(state = defaultState, action){

  switch(action.type){

    case SET_METRICS:
      console.log("SET_METRICS")
      return{
        lyftConnected: true,
        loading: false,
        lyft: {
          rides: action.rides
        }

      }

    case LOADING_METRICS:
      console.log("SET_METRICS")
      return{
        lyftConnected: true,
        loading: true,
        lyft: {
          rides: state.rides
        }

      }

    case DISCONNECT_LYFT:
      console.log("DISCONNECT_LYFT Reducer")
      return{
        lyftConnected: false,
        loading: false,
        lyft: {
          rides: state.rides
        }

      }

    default:
      return state;
  }
}

export default dashboard;
