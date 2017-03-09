import React from 'react';
import { connect } from 'react-redux'

/* components */
import GoalsList from './../components/goals-list/goals-list.jsx';

// use caps for component names (even if pure)
// Pls find a better name than main
let Main = goals => { // props passed from map state to props come in here
  return (
    <div
      className="main"
    >
      {/* show different views here depending on flow */}
      <GoalsList goals = { goals } {/*Need to data on to components*/}/>
    </div>
  );
}


// Each container should have a mapStateToProps
// This get the part of the state relevent to the container.
// It may also transform the state into a form that is more manageable for the
//   view to consume
const mapStateToProps = state => state.goals;

main = connect(mapStateToProps)(main);

export default main;
