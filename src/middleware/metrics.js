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

    var pullCount;

    var ridesArray = [];

    if(access_token == null){
      store.dispatch({ type: 'FETCH_METRICS_FAILURE' });
      console.log('FETCH_METRICS_FAILURE')
    }
    else{
      fetchMetrics();
    }

    function fetchMetrics(){

        store.dispatch({ type: 'LOADING_METRICS'})
        console.log('LOADING_METRICS')

        fetch('https://api.lyft.com/v1/rides?start_time='+date+'&limit=50',{
          method: 'get',
          headers: {'Authorization': 'Bearer '+access_token}
        })
        .then(function(response) {
          if(!response){
            store.dispatch({ type: 'FETCH_METRICS_FAILURE' });
            console.log('FETCH_METRICS_FAILURE')
          }
          response.json().then(function(object) {

            var results = object.ride_history


            ridesArray.push(...results)

            pullCount = results.length
            date = results[results.length-1].requested_at
            var newDate = new Date(date)
            date = newDate.toISOString()

            console.log('pullCount',pullCount);
            console.log('ridesArray', ridesArray)

            if(pullCount == 50){
              fetchMetrics();
            }
            else{

              console.log("before SET_METRICS")
              store.dispatch({ type: 'SET_METRICS', rides: ridesArray})
              console.log("after SET_METRICS")

              //return lyft connect button after 60 minutes (lyft token expires after 60 mins)
              setTimeout(function(){ store.dispatch({ type: 'DISCONNECT_LYFT'}) }, 1000 * 60 * 60);

              store.dispatch({ type: 'FETCH_METRICS_SUCCESS' });
              console.log("after FETCH_METRICS SUCCESS")

          }


          });

        })

    }
  }


  const metricsMiddleware = store => next => action => {
    if (action.type === 'FETCH_LYFT_TOKEN_SUCCESS') {
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
