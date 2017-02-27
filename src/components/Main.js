import React from 'react';
import { Link } from 'react-router';
import './styles/Dashboard.css'

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

            <div className='titleBar'>
              <div className='titleBarText'>
                <span className='titleCars'>🚗🚕🚙 </span>
                My Top Stop
                <span className='titleCars'> 🚙🚕🚗</span>
              </div>
            </div>
          {React.cloneElement(this.props.children, this.props)}
        </div>
      </div>
    )
  }
});


export default Main;
