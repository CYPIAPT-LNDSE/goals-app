import React from 'react';

import * as steps from './steps.js';

/* components */
import GoalsList from './components/goals-list/goals-list.jsx';
import AddGoal from './components/add-new-goal/add-new-goal.jsx';
import ViewGoal from './components/view-goal/view-goal.jsx';
import RateGoal from './components/rate-goal/rate-goal.jsx';

export default (props) => {

  switch (props.step) {
    case steps.ADD_GOAL:
      const newGoalId = (props.goals.map(g => g.id).sort((a, b) => b - a)[0] + 1 || 0);
      return <AddGoal
        newGoal = { props.newGoal }
        onInputGoal={ props.onInputGoal }
        onSelectAvatar={ props.onSelectAvatar }
        saveNewGoal= { props.saveNewGoal }
        newGoalId= { newGoalId }
      />
      break;
    case steps.VIEW_GOAL:
      return <ViewGoal
        currentGoal = { props.currentGoal }
        rateGoal = { props.stepRateGoal }
      />
      break;
    case steps.RATE_GOAL:
      return <RateGoal />
      break;
    default:
      return <GoalsList
        goals={ props.goals }
        stepAddGoal={ props.stepAddGoal }
        onSelectGoal={ props.onSelectGoal }
      />
  }
};
