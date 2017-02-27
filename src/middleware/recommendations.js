import fetch from 'isomorphic-fetch';
import React, { Component } from 'react'
import { connect } from 'react-redux'

const fetchResultsRequest = (store, action) => {
  var currentState = store.getState();
  var list = currentState.yelp
  var i = 0
  var array = []

  getNextYelp(i)

  function getNextYelp(i) {

    if(list[i].business[0]!=undefined){

      var ride_id = list[i].ride_id
      var location_val = list[i].business[0].location.city;
      var category_val = list[i].business[0].categories[0][0];


      const url = 'https://flashdash-api.herokuapp.com/api/yelp/search_recs';


      fetch(url,{
        method: 'post',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({
            location: location_val,
            category: category_val,
        })

      })
        .then(function(response) {
          response.json().then(function(object) {
            console.log(object.businesses);
            var business = object.businesses;

            array.push(business);
            console.log('ARRAY', array)

            i++
            if (i < 3){
              getNextYelp(i);
            }
            else{
              console.log('ARRAY in ELSE', array)
              store.dispatch({ type: 'SET_RECOMMENDATIONS', array: array})
              console.log('SET_RECOMMENDATIONS IN DEFINED')
              store.dispatch({ type: 'FETCH_RECOMMENDATION_SUCCESS' });
              console.log('FETCH_RECOMMENDATION_SUCCESS')
            }
          })
        });
  }//if !=undefined
  else if (i < 3){
      i++
      getNextYelp(i);
      }
    else{
      store.dispatch({ type: 'SET_RECOMMENDATIONS', array: array})
      console.log('SET_RECOMMENDATIONS IN undefined')
      store.dispatch({ type: 'FETCH_RECOMMENDATION_SUCCESS' });
      console.log('FETCH_RECOMMENDATION_SUCCESS')
    }
 }//function loop
}


  const recommendationMiddleware = store => next => action => {

    if (action.type === 'FETCH_RECOMMENDATION_REQUEST' || action.type === 'FETCH_YELP_SUCCESS') {
      if(!store.getState().fetcher.isFetchingRecommendations) {
        fetchResultsRequest(store, action);
      }
    }
    next(action);
    return action;
  }

  export default recommendationMiddleware
