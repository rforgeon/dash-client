import React, { Component } from 'react';
var Auth = require('j-toker');
import { Link } from 'react-router';
var load = require('load-script')
import Tile from './Tile';
import GoogleTagManager from './GoogleTagManager'
import RecommendationTile from './RecommendationTile';
import './styles/Dashboard.css'

var html2canvas = require( 'html2canvas')

import intercom from 'simple-node-intercom-io';




import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';

class Dashboard extends Component{

  configJToker(){
    Auth.configure([
      {
      default: {
        apiUrl: 'https://flashdash-api.herokuapp.com/api',
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

  componentWillMount(){

    this.configJToker();

    //initDashboard
    this.setLyftToken();


  }

  componentDidMount(){
    //this.setupIntercomAnalytics();



  }


  // Set key & setup must be called first.
  setupIntercomAnalytics() {
      intercom.setKey('swc732mt');
      intercom.setup();
      //boot intercom
      // name, email, created timestamp, meta
      var time = Date.now()

        intercom.boot( {
            //customUserProperty: 'value'
        });

        intercom.update();

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

  }

  shareFacebook(){
    var tiles;
    var spots = document.getElementById('tiles');
    var body = document.getElementsByTagName('body')[0]
    if ( spots == null){
      tiles = body
    }
    else{
      tiles = spots
    }

    html2canvas(tiles, {
        onrendered: function(canvas) {
          var dt = canvas.toDataURL('image/jpeg');

          console.log('DT', dt.toString())

          return dt.toString()
        }
    });

  }

  shareClicked(){
    // Create Intercom event
    console.log('shareIntercomEvent')


  }

  lyftConnectClicked(){
    console.log('lyftConnectClicked')

  
  }

  connectLyftAndNotify(){
    this.lyftConnectClicked()
    this.connectLyft()
  }

  loadingLogic(){
    if (this.props.dashboard.loading){
      return(
        <div>
          <img className='loader' src='https://cldup.com/H26WtvXwOa.gif'/>
        </div>
      )
    }
  }


  btnLogic(){
    if (this.props.dashboard.lyftConnected){
      const { FacebookShareButton } = ShareButtons;
      const FacebookIcon = generateShareIcon('facebook');

      return(

        <div>

          <div id='facebookButton' className='facebookButtonContain' onClick={this.shareClicked.bind(this)}>

            <FacebookShareButton
              url={'http://mytopstop.com/?utm_source=facebookTopStopShare'}
              title={`My Top Lyft Destination is next to... ~${this.getBusiness(0)[0].name}~ and ~${this.getBusiness(0)[1].name}~......Where's Yours?`}
              picture={`https://maps.googleapis.com/maps/api/staticmap?center=${this.topSpotLat()},${this.topSpotLng()}&zoom=18&size=300x300&markers=color:blue%7Clabel:%7C${this.topSpotLat()},${this.topSpotLng()}&markers=size:tiny&key=AIzaSyBjETxoRSKZDcrG6oycitwJ1i_lJJN9EJI`}
              className='Demo__some-network__share-button'>

            <img className='facebookButtonImg' src='https://cldup.com/MEf998Gw6H.png'/>
            </FacebookShareButton>

          </div>
        </div>
      )
    }
    else{
      return(
        <div>
        <div>
          <div className='connectNotice'>Connect to explore and share your top destinations!</div>
          <div className='hand'>👇</div>
        </div>

        <div className='lyftButtonBack'>
          <div id='lyftButton' className='lyftButton'>
            <div  className='container' onClick={this.connectLyftAndNotify.bind(this)}>
              <div className='connectLyftText '>Connect</div>
              <div className='lyftImg'>
                <img src={'https://cldup.com/veoO3qrDey.png'}/>
              </div>
            </div>
          </div>
        </div>

        <div className='exampleGIF' ><img src ="https://cldup.com/52lKD4DvF8.gif" /></div>

        </div>
      )
    }
  }

  getBusiness(index){
      var yelp = this.props.yelp[index]
      var undefinedYelpArray = []
      if ( yelp == undefined){
        for (var i=0;i<3;i++){
        undefinedYelpArray.push( {
          name: "Loading...",
          neighborhoods:[
            "Loading..."
          ]
          ,
          rating_img_url: "https://cldup.com/VP7ZH34aTk.gif",
          url: "Loading...",
          image_url: "https://cldup.com/5MWrhS0oyJ.gif"
        })
       }
       return undefinedYelpArray
      }
      else{
        var closeYelps = this.props.yelp[index]
        var yelpArray = []
        for (var i=0;i<3;i++){
          var yelp = this.props.yelp[index].business[i]
          if(yelp === undefined){
            yelpArray.push( {name: "No Location", image_url: "https://cldup.com/UEDTkBu5rY.png", rating_img_url:"https://cldup.com/ccMVjfH3il.png"} )
          }
          else{
            yelpArray.push( yelp )
          }
        }
        return yelpArray
    }
  }

  getRec(index){
      var yelp = this.props.recommendations[index]
      var undefinedYelpArray = []
      if ( yelp == undefined){
        for (var i=0;i<3;i++){
        undefinedYelpArray.push( {
          name: "Loading...",
          neighborhoods:[
            "Loading..."
          ]
          ,
          rating_img_url: "https://cldup.com/VP7ZH34aTk.gif",
          url: "Loading...",
          image_url: "https://cldup.com/5MWrhS0oyJ.gif",
          snippet_image_url: "https://cldup.com/VP7ZH34aTk.gif",
          snippet_text: "Loading..."
        })
       }
       return undefinedYelpArray
      }
      else{
        var closeYelps = this.props.recommendations[index]
        var yelpArray = []
        for (var i=0;i<3;i++){
          var yelp = this.props.recommendations[index][i]
          if(yelp === undefined){
            yelpArray.push( {name: "No Location", image_url: "https://cldup.com/UEDTkBu5rY.png", rating_img_url:"https://cldup.com/ccMVjfH3il.png", snippet_text: "No Review"} )
          }
          else{
            yelpArray.push( yelp )
          }
        }
        return yelpArray
    }
  }

  setLyftToken(){
    if (this.props.currentUser.lyft_token == null){
        this.props.setLyftTokenParam()
    }
  }

  topSpotLat(){
    var picLat = this.props.sortedList[0]
    if(picLat==undefined){
      return 0
    }
    else if (picLat.lyft.destination == undefined){
      return 0
    }else{
      return picLat.lyft.destination.lat
    }
  }

  topSpotLng(){
    console.log("enter TOPSPOT LNG")
    var picLng = this.props.sortedList[0]
    if(picLng==undefined|| null){
      return '37.79984'
    }
    else if (picLng.lyft.destination == undefined){
      console.log("enter undefined Lng", picLng.lyft.destination )

      return '-122.44174'

    }else{
      console.log("enter correct Lng", picLng.lyft.destination.lng)
      return picLng.lyft.destination.lng
    }
  }

  loadParams(){

    function getAllUrlParams(url) {

    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {

      // stuff after # is not part of query string, so get rid of it
      queryString = queryString.split('#')[0];

      // split our query string into its component parts
      var arr = queryString.split('&');

      for (var i=0; i<arr.length; i++) {
        // separate the keys and the values
        var a = arr[i].split('=');

        // in case params look like: list[]=thing1&list[]=thing2
        var paramNum = undefined;
        var paramName = a[0].replace(/\[\d*\]/, function(v) {
          paramNum = v.slice(1,-1);
          return '';
        });

        // set parameter value (use 'true' if empty)
        var paramValue = typeof(a[1])==='undefined' ? true : a[1];

        // (optional) keep case consistent
        paramName = paramName.toLowerCase();
        paramValue = paramValue.toLowerCase();

        // if parameter name already exists
        if (obj[paramName]) {
          // convert value to array (if still string)
          if (typeof obj[paramName] === 'string') {
            obj[paramName] = [obj[paramName]];
          }
          // if no array index number specified...
          if (typeof paramNum === 'undefined') {
            // put the value on the end of the array
            obj[paramName].push(paramValue);
          }
          // if array index number specified...
          else {
            // put the value at that index number
            obj[paramName][paramNum] = paramValue;
          }
        }
        // if param name doesn't exist yet, set it
        else {
          obj[paramName] = paramValue;
        }
      }
    }

    return obj;
  }

  }

  render() {




    return(


      <div>

      <GoogleTagManager gtmId='GTM-KWMMHC4' />



      {this.btnLogic()}
      {this.loadingLogic()}


        <div>

        </div>



          <div id='tiles' className='container'>
            {this.props.sortedList.slice(0,3).map((tile, index) =>
              <Tile
                key={index}
                lat={tile.lyft.destination.lat}
                lng={tile.lyft.destination.lng}
                count={tile.count}
                yelp={this.getBusiness(index)}
                index={index}
                deleteSpot={this.props.deleteSpot}
                tile={tile}
              />
            )}
            </div>

            <div id='tiles' className='container'>
              {this.props.recommendations.slice(0,1).map((rec, index) =>
                <RecommendationTile
                  key={index}
                  yelp={this.getRec(index)}
                  index={index}
                  //deleteSpot={this.props.deleteSpot}
                  rec={rec}
                />
              )}
              </div>

              <div id='tiles' className='container'>
                {this.props.sortedList.slice(3,6).map((tile, index) =>
                  <Tile
                    key={index}
                    lat={tile.lyft.destination.lat}
                    lng={tile.lyft.destination.lng}
                    count={tile.count}
                    yelp={this.getBusiness(index+3)}
                    index={index+3}
                    deleteSpot={this.props.deleteSpot}
                    tile={tile}
                  />
                )}
                </div>

                <div id='tiles' className='container'>
                  {this.props.recommendations.slice(1,2).map((rec, index) =>
                    <RecommendationTile
                      key={index}
                      yelp={this.getRec(index+1)}
                      index={index+1}
                      //deleteSpot={this.props.deleteSpot}
                      rec={rec}
                    />
                  )}
                  </div>

              <div id='tiles' className='container'>
                {this.props.sortedList.slice(6,this.props.sortedList.length).map((tile, index) =>
                  <Tile
                    key={index}
                    lat={tile.lyft.destination.lat}
                    lng={tile.lyft.destination.lng}
                    count={tile.count}
                    yelp={this.getBusiness(index+6)}
                    index={index+6}
                    deleteSpot={this.props.deleteSpot}
                    tile={tile}
                  />
                )}
                </div>

                <div id='tiles' className='container'>
                  {this.props.recommendations.slice(2,3).map((rec, index) =>
                    <RecommendationTile
                      key={index}
                      yelp={this.getRec(index+2)}
                      index={index+2}
                      //deleteSpot={this.props.deleteSpot}
                      rec={rec}
                    />
                  )}
                  </div>




      </div>

    )
  }
};


export default Dashboard
