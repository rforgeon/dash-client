import fetch from 'isomorphic-fetch';
import React, { Component } from 'react'
import { connect } from 'react-redux'

const fetchResultsRequest = (store, action) => {
  var currentState = store.getState();
  var rides = currentState.sortedList
  var i = 0

  getNextYelp(i)

  function getNextYelp(i) {

    var ride_id = rides[i].lyft.ride_id
    console.log("RIDE_ID",ride_id)

    var lat_value = rides[i].lyft.destination.lat;
    var lng_value = rides[i].lyft.destination.lng;


    const url = 'https://flashdash-api.herokuapp.com/api/yelp/search';


    fetch(url,{
      method: 'post',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify({
          lat: lat_value,
          lng: lng_value,
      })

    })
      .then(function(response) {
        response.json().then(function(object) {
          console.log(object.businesses);
          var business = object.businesses;

          store.dispatch({ type: 'SET_YELP', business: business, ride_id: ride_id})

          if (i < rides.length-1){
            i++
            getNextYelp(i);
          }
          else{
            store.dispatch({ type: 'FETCH_YELP_SUCCESS' });
            console.log('FETCH_YELP_SUCCESS')
          }
        })
      });
  }//function loop
}


  const yelpMiddleware = store => next => action => {

    if (action.type === 'FETCH_SORT_SUCCESS') {
      if(!store.getState().fetcher.isFetchingYelp) {
        fetchResultsRequest(store, action);
      }
    }
    next(action);
    return action;
  }

  export default yelpMiddleware
