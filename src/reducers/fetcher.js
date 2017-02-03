import { FETCH_SIGN_UP_REQUEST, FETCH_SIGN_UP_FAILURE, FETCH_SIGN_UP_SUCCESS, FETCH_SIGN_OUT_REQUEST, FETCH_SIGN_OUT_FAILURE, FETCH_SIGN_OUT_SUCCESS, SET_FETCHED_ALREADY, FETCH_LYFT_TOKEN_REQUEST, FETCH_LYFT_TOKEN_SUCCESS, FETCH_LYFT_TOKEN_FAILURE, FETCH_SIGN_IN_REQUEST, FETCH_SIGN_IN_SUCCESS, FETCH_SIGN_IN_FAILURE,FETCH_METRICS_REQUEST,FETCH_METRICS_SUCCESS, FETCH_METRICS_FAILURE,FETCH_YELP_REQUEST, FETCH_YELP_SUCCESS, FETCH_YELP_FAILURE } from '../constants/ActionTypes'

const initialState = {
  isFetching: false,
  fetchedAlready: 0
}

export default function fetcher(state = initialState, action) {
  switch(action.type) {
    case FETCH_SIGN_UP_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case FETCH_SIGN_UP_SUCCESS:
      return Object.assign({}, state, { isFetching: false });
    case FETCH_SIGN_UP_FAILURE:
      return Object.assign({}, state, { isFetching: false });

    case FETCH_SIGN_OUT_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case FETCH_SIGN_OUT_SUCCESS:
      return Object.assign({}, state, { isFetching: false });
    case FETCH_SIGN_OUT_FAILURE:
      return Object.assign({}, state, { isFetching: false });

    case FETCH_SIGN_IN_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case FETCH_SIGN_IN_SUCCESS:
      return Object.assign({}, state, { isFetching: false });
    case FETCH_SIGN_IN_FAILURE:
      return Object.assign({}, state, { isFetching: false });

    case FETCH_LYFT_TOKEN_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case FETCH_LYFT_TOKEN_SUCCESS:
      return Object.assign({}, state, { isFetching: false });
    case FETCH_LYFT_TOKEN_FAILURE:
      return Object.assign({}, state, { isFetching: false });

    case FETCH_METRICS_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case FETCH_METRICS_SUCCESS:
      return Object.assign({}, state, { isFetching: false });
    case FETCH_METRICS_FAILURE:
      return Object.assign({}, state, { isFetching: false });

    case FETCH_YELP_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case FETCH_YELP_SUCCESS:
      return Object.assign({}, state, { isFetching: false });
    case FETCH_YELP_FAILURE:
      return Object.assign({}, state, { isFetching: false });

    case SET_FETCHED_ALREADY:
      return Object.assign({}, state, { fetchedAleady: action.count });
    default:
      return state;
  }
}
