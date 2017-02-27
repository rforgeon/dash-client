import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Main from './Main';
import DeviseLogin from './DeviseLogin';

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    authInput: state.authInput,
    dashboard: state.dashboard,
    yelp: state.yelp,
    sortedList: state.sortedList,
    recommendations: state.recommendations
  }
}

function mapDispachToProps(dispatch){
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispachToProps)(Main);


export default App;
