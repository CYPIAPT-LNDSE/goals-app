import uuidV1 from 'uuid/v1';

import * as types from '../action_types.js';

export const onInputFeedback = input => ({
  type: types.INPUT_FEEDBACK,
  input: input,
});

export const saveRating = () => ({
  type: types.SAVE_RATING,
  time: new Date(),
  id: uuidV1(),
});
