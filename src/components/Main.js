import React from 'react';
import { Link } from 'react-router';

const Main = React.createClass({
  render() {
    return(
      <div >
        <div >
          <h1>
            ⚡️  
            <Link to="/">FlashDash</Link>
          </h1>
          {React.cloneElement(this.props.children, this.props)}
        </div>
      </div>
    )
  }
});


export default Main;
