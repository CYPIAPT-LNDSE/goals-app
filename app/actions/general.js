import * as types from './../action_types.js';

export const receiveDbData = data => ({
  type: types.RECEIVE_DB_DATA,
  goals: JSON.parse(data),
});

export const setPendingSyncOpen = goal => ({
  type: types.SET_PENDING_SYNC_OPEN,
  id: goal.id,
});

export const updateSyncSuccess = goalId => ({
  type: types.UPDATE_SYNC_SUCCESS,
  id: goalId,
});
