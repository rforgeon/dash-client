import fetch from 'isomorphic-fetch';

const fetchResultsRequest = (store, action) => {

  //get last 2 months of rides
    var d = new Date();
    var m = d.getMonth();
    d.setMonth(d.getMonth() - 12);

    // If still in same month, set date to last day of
    // previous month
    if (d.getMonth() == m) d.setDate(0);
    d.setHours(0,0,0)

    // Get the time value in ISO
    var date = d.toISOString();

    const currentState = store.getState();
    const access_token = currentState.currentUser.lyft_token
    fetch('https://api.lyft.com/v1/rides?start_time='+date+'&limit=50',{
      method: 'get',
      headers: {'Authorization': 'Bearer '+access_token}
    })
    .then(function(response) {
      response.json().then(function(object) {

        var results = object.ride_history

        console.log("before SET_METRICS")

        store.dispatch({ type: 'SET_METRICS', rides: results})
        console.log("after SET_METRICS")
        store.dispatch({ type: 'FETCH_METRICS_SUCCESS' });
        console.log("after FETCH_METRICS)SUCCESS")

      });

    })

  }


  const metricsMiddleware = store => next => action => {
    if (action.type === 'FETCH_METRICS_REQUEST') {
      console.log('enter fetch_metrics_request')
      if(!store.getState().fetcher.isFetchingMetrics) { 
        console.log('enter fetch_metrics_request false')
        fetchResultsRequest(store, action);
      }
    }
    next(action);
    return action;
  }

  export default metricsMiddleware
