import { INPUT_GOAL } from './../action_types.js';

const inputGoal = input => {
  return {
    type: INPUT_GOAL,
    input: input,
  };
}

export default inputGoal;
