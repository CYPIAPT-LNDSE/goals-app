import * as types from './../action_types.js';
import avatars from './../avatars.js';

export const inputGoal = input => {
  return {
    type: types.INPUT_GOAL,
    input: input,
  };
};

export const selectAvatar = avatar => {
  return {
    type: types.SELECT_AVATAR,
    avatar: avatar,
  }
};

export const saveNewGoal = (goal) => {
  return {
    type: types.SAVE_NEW_GOAL,
    goal: {
      id: goal.id,
      name: goal.name,
      created: new Date(),
      avatar: (goal.avatar || avatars[0]),
      currentRating: null,
      ratings: [],
    },
  }
}
