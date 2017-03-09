import React from 'react';
import { connect } from 'react-redux'

/* components */
import GoalsList from './../components/goals-list/goals-list.jsx';

let MainContent = props => {
  return (
    <div
      className="MainContent"
    >
      {/* show different views here depending on flow */}
      <GoalsList goals = { props.goals } />
    </div>
  );
}

const mapStateToProps = state => ({ goals: state.goals });

export default connect(mapStateToProps)(MainContent);
