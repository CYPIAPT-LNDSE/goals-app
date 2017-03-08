import React from 'react';

/* components */
import GoalsList from './../components/goals-list/goals-list.jsx';

const main = props => {
  return (
    <div className="main">
      {/* show different views here depending on flow */}
      <GoalsList />
    </div>
  );
}

export default main;
