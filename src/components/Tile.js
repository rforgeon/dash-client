import React, { Component } from 'react';
import { Link } from 'react-router';
import './styles/Tile.css';
import './styles/Dashboard.css'


export default class Tile extends Component {

  pluralizeVisit(count){
    if (count>1){
      return 'visits'
    }
    else{
      return 'visit'
    }
  }

  setImgUrl(imgUrl,replacementUrl){
    if (imgUrl == undefined){
      return replacementUrl
    }
    else{
      return imgUrl
    }
  }

  removeSpot = e => {
    this.props.deleteSpot( this.props.index );
  }

  applyTopStopBorder(index){
    if (index==0){
      return 'topStop'
    }
    else{
      return
    }
  }

  applyTopStopTitle(index){
    if (index==0){
      return (  <div className='topStopTitle'>Your Top Stop</div> )
    }
    else{
      return
    }
  }





  render() {
    return(
        <div className='tile column'>

          <div className={this.applyTopStopBorder(this.props.index)}>

          {this.applyTopStopTitle(this.props.index)}

          <div className='background'>

            <div className='fullHeader'>

              <div className='headerColor'>
                <p id='delete' className='delete' onClick={this.removeSpot}>X</p>
                  <div className='countOval'>
                    <p className='count'>
                      {this.props.count}
                    </p>
                    <p className='visits'>
                      {this.pluralizeVisit(this.props.count)}
                    </p>
                  </div>
              </div>

              <div className='subHeaderColor'></div>

            </div>

            <div className='streetView'>
              <img src={`https://maps.googleapis.com/maps/api/streetview?size=300x150&location=${this.props.lat},${this.props.lng}&heading=151.78&pitch=-5&key=AIzaSyBjETxoRSKZDcrG6oycitwJ1i_lJJN9EJI`} alt="" />
            </div>

            <div className='googleMap'>
              <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.props.lat},${this.props.lng}&zoom=18&size=300x150&markers=color:blue%7Clabel:%7C${this.props.lat},${this.props.lng}&markers=size:tiny&key=AIzaSyBjETxoRSKZDcrG6oycitwJ1i_lJJN9EJI`}/>
            </div>


            <div className='yelpSection'>
              <p className='nearByTitle'>What&rsquo;s Here? </p>
              <div className='yelpColumn'>
                <div className= 'yelpTile'>
                  <a target="_blank" href={this.props.yelp[0].url}>
                    <img className='yelpImg' src={this.setImgUrl(this.props.yelp[0].image_url,"https://cldup.com/UEDTkBu5rY.png")}/>
                    <img className='ratingImg' src={this.props.yelp[0].rating_img_url}/>
                    <p className='yelpName'>{this.props.yelp[0].name}</p>
                  </a>
                </div>
              </div>

              <div className='yelpColumn'>
                <div className= 'yelpTile'>
                  <a target="_blank" href={this.props.yelp[1].url}>
                    <img className='yelpImg' src={this.setImgUrl(this.props.yelp[1].image_url,"https://cldup.com/UEDTkBu5rY.png")}/>
                    <img className='ratingImg' src={this.props.yelp[1].rating_img_url}/>
                    <p className='yelpName'>{this.props.yelp[1].name}</p>
                  </a>
                </div>
              </div>

              <div className='yelpColumn'>
                <div className= 'yelpTile'>
                  <a target="_blank" href={this.props.yelp[2].url}>
                    <img className='yelpImg' src={this.setImgUrl(this.props.yelp[2].image_url,"https://cldup.com/UEDTkBu5rY.png")}/>
                    <img className='ratingImg' src={this.props.yelp[2].rating_img_url}/>
                    <p className='yelpName'>{this.props.yelp[2].name}</p>
                  </a>
                </div>
              </div>



            </div>
            </div>


        </div>
      </div>
   )
  }
}
