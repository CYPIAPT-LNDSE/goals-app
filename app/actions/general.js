import * as types from './../action_types.js';

export const receiveDbData = data => {
  return {
    type: types.RECEIVE_DB_DATA,
    goals: JSON.parse(data),
  };
};