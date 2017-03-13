import { INPUT_GOAL, SELECT_AVATAR } from './../action_types.js';

export const inputGoal = input => {
  return {
    type: INPUT_GOAL,
    input: input,
  };
};

export const selectAvatar = avatar => {
  return {
    type: SELECT_AVATAR,
    avatar: avatar,
  }
};
