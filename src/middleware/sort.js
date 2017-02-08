import fetch from 'isomorphic-fetch';

const fetchResultsRequest = (store, action) => {
  //provide a unique sorted list with a count of each repeated location
  var currentState = store.getState();

  var ridesLatLng = []
  var ridesArray = currentState.dashboard.lyft.rides;

  // // //grab only lat and lng of each location
  // // for (var i = 0; i < ridesArray.length; i++){
  // //   ridesLatLng.push({lat:ridesArray[i].destination.lat,lng:ridesArray[i].destination.lng})
  // // }
  //
  //get unique locations and count duplicates
  // var arr = ridesArray
  //
  // function unique(arr) {
  //     var a = [], b = [], prev_lat, prev_lng;
  //
  //     arr.sort();
  //     console.log("sorted:",arr.sort())
  //     for ( var i = 0; i < arr.length; i++ ) {
  //         if ( arr[i].destination.lat == prev_lat && arr[i].destination.lng == prev_lng  ) {
  //           b[b.length-1]++;
  //         } else {
  //           a.push(arr[i]);
  //           b.push(1);
  //         }
  //         prev_lat = arr[i].destination.lat;
  //         prev_lng = arr[i].destination.lng;
  //     }
  //
  //     return [a, b];
  // }
  //
  // var result = unique(arr);
  //
  // //map two seperate arrays (unique location and count) to a single array of objects
  // var countedUnique = [];
  // for (var i = 0; i < result[0].length; i++){
  //   countedUnique.push({lyft: result[0][i],count: result[1][i]})
  // }
  // console.log("countedUnique",countedUnique)
  //
  // //sort unique spots by count
  // var countedUniqueSorted = countedUnique.sort(function(a, b){
  //     return b.count-a.count;
  // })
  // console.log("countedUniqueSorted",countedUniqueSorted);
  //
  // var spots = countedUniqueSorted

  function removeDuplicates(originalArray) {
       var newArray = [];
       var lookupObject  = {};

       for(var i in originalArray) {
            console.log("lookupObject[originalArray[i].destination.lat]",lookupObject[originalArray[i].destination.lat])
            lookupObject[originalArray[i].destination.lat] = originalArray[i]
          }

          console.log("lookupObject",lookupObject)
       for(i in lookupObject) {
           newArray.push(lookupObject[i]);
       }
        return newArray;
   }

  var uniqueArray = removeDuplicates(ridesArray);
  var spots = uniqueArray
  // function uniqueLatCount(arr){
  //   var lat = {val:{}},e;
  //     for (var i = 0,l=arr.length; i < l; i++) {
  //         e = arr[i].destination.lat;
  //         lat.val[e] = (lat.val[e] || 0) + 1;
  //     }
  //   return lat;
  // }
  // var uniqueArray = uniqueLatCount(ridesArray)
  // console.log('uniqueArray',uniqueArray)

  // function bruteUnique(array){
  //   var theSpots = []
  //   var spotCounts = []
  //   var spots = []
  //   for (var i in array){
  //     for (var j in array){
  //       if(array[i].destination.lat == array[j].destination.lat && array[i].destination.lng == array[j].destination.lng){
  //         console.log("lat lng Match", array[j])
  //         theSpots.push(array[j]);
  //         var rideMatchLat = array[j].destination.lat
  //         var rideMatchLng = array[j].destination.lng
  //         for(var p in theSpots){
  //           if(rideMatchLat == theSpots[p].destination.lat && rideMatchLng == theSpots[p].destination.lng ){
  //             console.log("Add a count")
  //             spotCounts[p] += 1;
  //           }
  //           else{
  //             spotCounts[p] = 1;
  //           }
  //         }
  //       }
  //     }
  //   }
  //   console.log("theSpots",theSpots)
  //   console.log("counts", spotCounts)
  //   for (var n in theSpots){
  //     spots.push({lyft:theSpots[n],count:spotCounts[n]})
  //   }
  //   return spots
  // }

  //var spots = bruteUnique(ridesArray)

  //var spots = createUniqueList(uniqueArray, ridesArray);
  //


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
