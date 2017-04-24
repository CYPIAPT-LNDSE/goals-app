import * as types from '../action_types.js';

export const onInputFeedback = input => ({
  type: types.INPUT_FEEDBACK,
  input: input,
});

export const saveRating = (time, id) => ({
  type: types.SAVE_RATING,
  time: time,
  id: id,
});
