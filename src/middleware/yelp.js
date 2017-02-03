import fetch from 'isomorphic-fetch';
import React, { Component } from 'react'
import { connect } from 'react-redux'

const fetchResultsRequest = (store, action) => {
  var currentState = store.getState();
  var rides = currentState.dashboard.lyft.rides
  var businesses = {};

  for(var i = 0; i<rides.length; i++){

    var ride_id = rides[i].ride_id;
    var lat_value = rides[i].destination.lat;
    var lng_value = rides[i].destination.lng;


    const url = 'http://localhost:3000/api/yelp/search';

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


          store.dispatch({ type: 'SET_LYFT', business: business})

        })
      });
    }

    store.dispatch({ type: 'FETCH_YELP_SUCCESS' });

  }


  const yelpMiddleware = store => next => action => {

    if (action.type === 'FETCH_YELP_REQUEST') {
      if(!store.getState().fetcher.isFetching) {
        fetchResultsRequest(store, action);
      }
    }
    next(action);
    return action;
  }

  export default yelpMiddleware
