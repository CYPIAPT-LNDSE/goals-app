import { createAction } from 'redux-actions';

const inputGoal = input => {
  return {
    type: 'INPUT_GOAL',
    input: input,
  };
}

export default inputGoal;
