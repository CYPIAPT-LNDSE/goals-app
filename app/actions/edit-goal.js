import * as types from './../action_types.js';

export const onInputGoal = input => {
  return {
    type: types.INPUT_GOAL,
    input: input,
  };
};

export const editGoal = goal => {
  return {
    type: types.SAVE_EDIT_GOAL,
    goal: goal,
  };
};
