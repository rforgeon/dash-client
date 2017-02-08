import React, { Component } from 'react';
var Auth = require('j-toker');
import { Link } from 'react-router';
var load = require('load-script')
import Tile from './Tile';


class Dashboard extends Component{

  configJToker(){
    Auth.configure([
      {
      default: {
        apiUrl: 'http://localhost:3000/api',
        tokenFormat: {
         "access-token": "{{ access-token }}",
         "token-type":   "Bearer",
         client:         "{{ client }}",
         expiry:         "{{ expiry }}",
         uid:            "{{ uid }}"
        },
        authProviderPaths: {
          lyft:    '/auth/lyft',
        }
       }
      }

    ]);
  }

  componentDidMount(){
    this.configJToker();

    this.props.initDashboard();
  }

  callHistory(){
    this.props.getRideHistory();
  }


  connectLyft(){

    Auth.oAuthSignIn({provider: 'lyft',
                      params: {
                        client: this.props.currentUser.client,
                        id: this.props.currentUser.id_num
                            }
                    });

    //after connecting, refresh client side token
    //this.props.getLyftToken();

  }

  getBusiness(index){
    var yelp = this.props.yelp[index].business[0];
    if(yelp === undefined){
      return {name: "No Location"}
    }
    else{
      return yelp
    }
  }

  rankSpots(){
    //provide a unique sorted list with a count of each repeated location

    var ridesLatLng = []
    var ridesArray = this.props.dashboard.lyft.rides;

    // //grab only lat and lng of each location
    // for (var i = 0; i < ridesArray.length; i++){
    //   ridesLatLng.push({lat:ridesArray[i].destination.lat,lng:ridesArray[i].destination.lng})
    // }

    //get unique locations and count duplicates
    var arr = ridesArray

    function unique(arr) {
        var a = [], b = [], prev_lat, prev_lng;

        arr.sort();
        console.log("sorted:",arr.sort())
        for ( var i = 0; i < arr.length; i++ ) {
            if ( arr[i].destination.lat == prev_lat && arr[i].destination.lng == prev_lng  ) {
              b[b.length-1]++;
            } else {
              a.push(arr[i]);
              b.push(1);
            }
            prev_lat = arr[i].destination.lat;
            prev_lng = arr[i].destination.lng;
        }

        return [a, b];
    }

    var result = unique(arr);

    // function removeDuplicates(originalArray) {
    //      var newArray = [];
    //      var lookupObject  = {};
    //
    //      for(var i in originalArray) {
    //         lookupObject[originalArray[i].destination.lat] = originalArray[i];
    //      }
    //
    //      for(i in lookupObject) {
    //          newArray.push(lookupObject[i]);
    //      }
    //       return newArray;
    //  }

    // var uniqueArray = removeDuplicates(ridesArray);
    // console.log("uniqueArray is: ",uniqueArray);

    //map two seperate arrays (unique location and count) to a single array of objects
    var countedUnique = [];
    for (var i = 0; i < result[0].length; i++){
      countedUnique.push({lyft: result[0][i],count: result[1][i]})
    }
    console.log("countedUnique",countedUnique)

    //sort unique spots by count
    var countedUniqueSorted = countedUnique.sort(function(a, b){
        return b.count-a.count;
    })
    console.log("countedUniqueSorted",countedUniqueSorted);

    this.props.setSortedList(countedUniqueSorted);
  };



  render() {
    return(


      <div>
        <div>
          <h1>Dashboard</h1>
        </div>

        <div>
          <h3>Current User: {this.props.currentUser.uid}</h3>
        </div>

        <button onClick={this.connectLyft.bind(this)}>
          Connect Lyft
        </button>

        <button onClick={this.callHistory.bind(this)}>
          Get Ride History
        </button>

        <button onClick={this.props.getLyftToken.bind(this)}>
          Refresh Token
        </button>

        <button onClick={this.rankSpots.bind(this)}>
          Rank Spots
        </button>



        <ol>
          <div>

      

          </div>
        </ol>

      </div>

    )
  }
};


export default Dashboard
