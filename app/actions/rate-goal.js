import { createAction } from 'redux-actions';

// action types
import * as types from '../action_types.js'

export const stepFeedback = createAction(types.STEP_FEEDBACK);

export const moveSlider = value => {
  return {
    type: types.MOVE_SLIDER,
    rating: value,
  };
};
