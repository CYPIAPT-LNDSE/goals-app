import * as types from './../action_types.js';

export const moveSlider = value => {
  return {
    type: types.MOVE_SLIDER,
    rating: value,
  };
};
