import React from 'react';
import { connect } from 'react-redux'

/* components */
import GoalsList from './../components/goals-list/goals-list.jsx';

// use caps for component names (even if pure)
// Pls find a better name than main
let Main = props => { // props passed from map state to props come in here
  console.log(props);
  console.log(props.dispatch);
  return (
    <div
      className="main"
    >
      {/* show different views here depending on flow */}
      <GoalsList goals = { props.goals } />{/*Need to data on to components*/}
    </div>
  );
}


// Each container should have a mapStateToProps
// This get the part of the state relevent to the container.
// It may also transform the state into a form that is more manageable for the
//   view to consume
// I get this is kinda redundent atm but should do it like this
const mapStateToProps = state => ({ goals: state.goals });

export default connect(mapStateToProps)(Main);
