import * as steps from './steps.js';
import React from 'react';

/* components */
import GoalsList from './components/goals-list/goals-list.jsx';
import AddGoal from './components/add-new-goal/add-new-goal.jsx';
import ViewGoal from './components/view-goal/view-goal.jsx';

const router = (props) => {

  let view;

  const newGoalId = (props.goals.map(g => g.id).sort((a, b) => b - a)[0] + 1 || 0);

  switch (props.step) {
    case steps.ADD_GOAL:
      view = <AddGoal
        newGoal = { props.newGoal }
        onInputGoal={ props.onInputGoal }
        onSelectAvatar={ props.onSelectAvatar }
        saveNewGoal= { props.saveNewGoal }
        newGoalId= { newGoalId }
      />
      break;
    case steps.VIEW_GOAL:
      view = <ViewGoal />
      break;
    default:
      view = <GoalsList
        goals={ props.goals }
        stepAddGoal={ props.stepAddGoal }
        onSelectGoal={ props.onSelectGoal }
      />
  }
  return view;
}

export default router;
