import React, { Component } from 'react';

export default class Spot extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.params.spotId}</h2>
      </div>
    )
  }
}
