import { createAction, } from 'redux-actions';

// action types
import * as types from '../action_types.js';

export const stepAddGoal = createAction(types.STEP_ADD_GOAL);

export const selectGoal = goal => {
  return {
    type: types.SELECT_GOAL,
    goal: goal,
  };
};
