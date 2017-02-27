import fetch from 'isomorphic-fetch';

const fetchResultsRequest = (store, action) => {
  //provide a unique sorted list with a count of each repeated location
  var currentState = store.getState();
  var ridesArray = currentState.dashboard.lyft.rides;

  var mySpots = []

  function isEqual(element){
      return element.lyft.destination.lat == ridesArray[i].destination.lat && element.lyft.destination.lng == ridesArray[i].destination.lng ;
  }

  for (var i in ridesArray){
    var index = mySpots.findIndex(isEqual)
    if (index==-1){

      mySpots.push({lyft:ridesArray[i],count:1})
    }
    else{
      mySpots[index].count +=1
    }
  }

  mySpots.sort(function(a, b) {
    return parseFloat(b.count) - parseFloat(a.count);
  });

  var spots = mySpots


  console.log("Spots", spots)

    store.dispatch({ type: 'SET_SPOTS', spots: spots})
    store.dispatch({ type: 'FETCH_SORT_SUCCESS' });


  }


  const sortMiddleware = store => next => action => {

    if (action.type === 'FETCH_METRICS_SUCCESS') {
      console.log("enter sorted list")
      if(!store.getState().fetcher.isFetchingSort) {
        console.log("start sorted list middleware")
        fetchResultsRequest(store, action);
      }
    }
    next(action);
    return action;
  }

  export default sortMiddleware
