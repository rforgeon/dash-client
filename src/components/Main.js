import React from 'react';
import { Link } from 'react-router';

const Main = React.createClass({

  setTitleLink(){
    if(this.props.currentUser.uid === '' || this.props.currentUser.uid === null){
      return '/'
    }
    else{
      return '/dashboard'
    }
  },

  render() {
    return(
      <div >
        <div >
          <h1>
            ⚡️
            <Link to='/'>FlashDash</Link>
          </h1>
          {React.cloneElement(this.props.children, this.props)}
        </div>
      </div>
    )
  }
});


export default Main;
