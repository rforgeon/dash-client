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

    //this.props.getRideHistory();

    

  }

  reloadPage(){
        var executed = false;
        return function () {
            if (!executed) {
                executed = true;
                location.reload();
            }
        };
  }

  callHistory(){
    this.props.getRideHistory();
  }


  connectLyft(){

    Auth.oAuthSignIn({provider: 'lyft',
                      // params: {
                      //   client: this.props.currentUser.client,
                      //   id: this.props.currentUser.id_num
                      //       }
                    });

    //after connecting, refresh client side token
    //this.props.getLyftToken();

  }



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

        <button onClick={this.props.getYelp.bind(this)}>
          Yelp!
        </button>

        <h2>{this.props.params.spotId}</h2>


        <ol>
          <div>

            {this.props.dashboard.lyft.rides.map((tile, index) =>
              <Tile
                key={index}
                lat={tile.destination.lat}
                lng={tile.destination.lng}
                //getYelp={this.props.getYelp}
                tile={tile}
              />
            )}

          </div>
        </ol>

      </div>

    )
  }
};


export default Dashboard
