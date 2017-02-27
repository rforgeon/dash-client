import React, { Component } from 'react';
import { Link } from 'react-router';
import './styles/RecommendationTile.css';


export default class RecommendationTile extends Component {

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



  render() {
    return(
        <div className='recColumn'>
          <div className='recBackground'>

            <div className='recFullHeader'>

              <div className='recHeaderColor'>
                <div className='recTitle'>You might also like...</div>
              </div>

              <div className='recSubHeaderColor'></div>

            </div>


            <div className='recYelpSection'>
              <div className='yelpColumn'>

                <div className= 'recYelpTile'>
                  <a target="_blank" href={this.props.yelp[0].url}>
                    <img className='recYelpImg' src={this.setImgUrl(this.props.yelp[0].image_url,"https://cldup.com/UEDTkBu5rY.png")}/>
                    <img className='recRatingImg' src={this.props.yelp[0].rating_img_url}/>
                    <p className='recYelpName'>{this.props.yelp[0].name}</p>
                    <div className='reviewContainer'>
                      <img className="recYelpReviewImg" src={this.props.yelp[0].snippet_image_url}/>
                      <p className='recYelpReview'>&quot;{this.props.yelp[0].snippet_text}&quot;</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className='yelpColumn'>
                <div className= 'recYelpTile'>
                  <a target="_blank" href={this.props.yelp[1].url}>
                    <img className='recYelpImg' src={this.setImgUrl(this.props.yelp[1].image_url,"https://cldup.com/UEDTkBu5rY.png")}/>
                    <img className='recRatingImg' src={this.props.yelp[1].rating_img_url}/>
                    <p className='recYelpName'>{this.props.yelp[1].name}</p>
                    <div className='reviewContainer'>
                      <img className="recYelpReviewImg" src={this.props.yelp[1].snippet_image_url}/>
                      <p className='recYelpReview'>&quot;{this.props.yelp[1].snippet_text}&quot;</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className='yelpColumn'>
                <div className= 'recYelpTile'>
                  <a target="_blank" href={this.props.yelp[2].url}>
                    <img className='recYelpImg' src={this.setImgUrl(this.props.yelp[2].image_url,"https://cldup.com/UEDTkBu5rY.png")}/>
                    <img className='recRatingImg' src={this.props.yelp[2].rating_img_url}/>
                    <p className='recYelpName'>{this.props.yelp[2].name}</p>
                    <div className='reviewContainer'>
                      <img className="recYelpReviewImg" src={this.props.yelp[2].snippet_image_url}/>
                      <p className='recYelpReview'>&quot;{this.props.yelp[2].snippet_text}&quot;</p>
                    </div>
                  </a>
                </div>
              </div>


            </div>


        </div>
      </div>
   )
  }
}
