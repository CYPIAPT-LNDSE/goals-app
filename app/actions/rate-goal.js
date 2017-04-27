import { createAction, } from 'redux-actions';

// action types
import * as types from '../action_types.js';

export const stepFeedback = createAction(types.STEP_FEEDBACK);

export const onMoveSlider = value => {
  return {
    type: types.MOVE_SLIDER,
    rating: value,
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

export const onEditGoal = goal => {
  return {
    type: types.EDIT_GOAL,
    goal: goal,
  };
};

export const setPreviousScore = createAction(types.SET_PREVIOUS_SCORE);
