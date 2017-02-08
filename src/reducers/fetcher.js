import { FETCH_SIGN_UP_REQUEST, FETCH_SIGN_UP_FAILURE, FETCH_SIGN_UP_SUCCESS, FETCH_SIGN_OUT_REQUEST, FETCH_SIGN_OUT_FAILURE, FETCH_SIGN_OUT_SUCCESS, SET_FETCHED_ALREADY, FETCH_LYFT_TOKEN_REQUEST, FETCH_LYFT_TOKEN_SUCCESS, FETCH_LYFT_TOKEN_FAILURE, FETCH_SIGN_IN_REQUEST, FETCH_SIGN_IN_SUCCESS, FETCH_SIGN_IN_FAILURE,FETCH_METRICS_REQUEST,FETCH_METRICS_SUCCESS, FETCH_METRICS_FAILURE,FETCH_YELP_REQUEST, FETCH_YELP_SUCCESS, FETCH_YELP_FAILURE,FETCH_SORT_REQUEST, FETCH_SORT_SUCCESS, FETCH_SORT_FAILURE } from '../constants/ActionTypes'

const initialState = {
  isFetchingSignUp: false,
  isFetchingSignOut: false,
  isFetchingSignIn: false,
  isFetchingLyftToken: false,
  isFetchingMetrics: false,
  isFetchingYelp: false,
  fetchedAlready: 0
}

export default function fetcher(state = initialState, action) {
  switch(action.type) {
    case FETCH_SIGN_UP_REQUEST:
      return Object.assign({}, state, { isFetchingSignUp: true });
    case FETCH_SIGN_UP_SUCCESS:
      return Object.assign({}, state, { isFetchingSignUp: false });
    case FETCH_SIGN_UP_FAILURE:
      return Object.assign({}, state, { isFetchingSignUp: false });

    case FETCH_SIGN_OUT_REQUEST:
      return Object.assign({}, state, { isFetchingSignOut: true });
    case FETCH_SIGN_OUT_SUCCESS:
      return Object.assign({}, state, { isFetchingSignOut: false });
    case FETCH_SIGN_OUT_FAILURE:
      return Object.assign({}, state, { isFetchingSignOut: false });

    case FETCH_SIGN_IN_REQUEST:
      return Object.assign({}, state, { isFetchingSignIn: true });
    case FETCH_SIGN_IN_SUCCESS:
      return Object.assign({}, state, { isFetchingSignIn: false });
    case FETCH_SIGN_IN_FAILURE:
      return Object.assign({}, state, { isFetchingSignIn: false });

    case FETCH_LYFT_TOKEN_REQUEST:
      return Object.assign({}, state, { isFetchingLyftToken: true });
    case FETCH_LYFT_TOKEN_SUCCESS:
      return Object.assign({}, state, { isFetchingLyftToken: false });
    case FETCH_LYFT_TOKEN_FAILURE:
      return Object.assign({}, state, { isFetchingLyftToken: false });

    case FETCH_METRICS_REQUEST:
      return Object.assign({}, state, { isFetchingMetrics: true });
    case FETCH_METRICS_SUCCESS:
      return Object.assign({}, state, { isFetchingMetrics: false });
    case FETCH_METRICS_FAILURE:
      return Object.assign({}, state, { isFetchingMetrics: false });

    case FETCH_YELP_REQUEST:
      return Object.assign({}, state, { isFetchingYelp: true });
    case FETCH_YELP_SUCCESS:
      return Object.assign({}, state, { isFetchingYelp: false });
    case FETCH_YELP_FAILURE:
      return Object.assign({}, state, { isFetchingYelp: false });

    case FETCH_SORT_REQUEST:
      return Object.assign({}, state, { isFetchingSort: true });
    case FETCH_SORT_SUCCESS:
      return Object.assign({}, state, { isFetchingSort: false });
    case FETCH_SORT_FAILURE:
      return Object.assign({}, state, { isFetchingSort: false });

    case SET_FETCHED_ALREADY:
      return Object.assign({}, state, { fetchedAleady: action.count });
    default:
      return state;
  }
}
