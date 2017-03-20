import * as types from '../action_types.js';

export const inputFeedback = input => {
  return {
    type: types.INPUT_FEEDBACK,
    input: input,
  };
};
