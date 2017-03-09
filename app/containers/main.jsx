import React from 'react';
import { connect } from 'react-redux'

/* components */
import GoalsList from './../components/goals-list/goals-list.jsx';

let main = () => {
  return (
    <div
      className="main"
    >
      {/* show different views here depending on flow */}
      <GoalsList />
    </div>
  );
}

main = connect()(main);

export default main;
