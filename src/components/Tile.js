import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Tile extends Component {


  render() {
    return(
      <div>
        <li className='tile'>
          <div>
            <img src={`https://maps.googleapis.com/maps/api/streetview?size=300x150&location=${this.props.lat},${this.props.lng}&heading=151.78&pitch=-5&key=AIzaSyBjETxoRSKZDcrG6oycitwJ1i_lJJN9EJI`} alt="" />
            <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.props.lat},${this.props.lng}&zoom=18&size=300x150&markers=color:blue%7Clabel:%7C${this.props.lat},${this.props.lng}&markers=size:tiny&key=AIzaSyBjETxoRSKZDcrG6oycitwJ1i_lJJN9EJI`}/>
            </div>

        </li>
      </div>
   )
  }
}
