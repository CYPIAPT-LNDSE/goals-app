import { createAction, } from 'redux-actions';

// action types
import * as types from '../action_types.js';

export const stepAddGoal = createAction(types.STEP_ADD_GOAL);

export const onSelectGoal = goal => {
  return {
    type: types.SELECT_GOAL,
    goal: goal,
  };
};

export const onBorderClick = goal => {
  return {
    type: types.BORDER_GOAL_CLICK,
    goal: goal,
  };
};
export const onDeleteGoal = goal => {
  return {
    type: types.DELETE_GOAL,
    goal: goal,
  };
};
