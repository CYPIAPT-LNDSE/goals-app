import * as types from './../action_types.js';

export const onInputEditGoal = (input, goal) => {
  return {
    type: types.INPUT_EDIT_GOAL,
    goal: goal,
    input: input,
  };
};

export const onSaveEditGoal = () => {
  return {
    type: types.SAVE_EDIT_GOAL,
  };
};
