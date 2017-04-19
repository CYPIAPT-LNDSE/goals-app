import * as types from './../action_types.js';
import avatarTypes from './../avatars.js';
import { createAction, } from 'redux-actions';

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
  };
};

export const saveNewGoal = (goal) => {
  const newGoal = {
    type: types.SAVE_NEW_GOAL,
    goal: {
      id: goal.id,
      name: goal.name,
      created: new Date(),
      avatar: (goal.avatar || avatarTypes[0].avatar),
      ratings: [],
      updateCount: 1,
      syncDBCount: 0,
      pendingSync: {
        open: false,
      },
    },
  };
  return newGoal;
};

export const triggerConfirmation = createAction(types.TRIGGER_CONFIRMATION);
