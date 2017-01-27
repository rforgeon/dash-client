import { FETCH_SIGN_UP_REQUEST, FETCH_SIGN_UP_FAILURE, FETCH_SIGN_UP_SUCCESS, FETCH_SIGN_OUT_REQUEST, FETCH_SIGN_OUT_FAILURE, FETCH_SIGN_OUT_SUCCESS, SET_FETCHED_ALREADY } from '../constants/ActionTypes'

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

    case SET_FETCHED_ALREADY:
      return Object.assign({}, state, { fetchedAleady: action.count });
    default:
      return state;
  }
}
