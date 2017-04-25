import io from 'socket.io-client';

import {
  receiveDbData,
  setPendingSyncOpen,
  updateSyncSuccess,
  updateSyncFailure,
  resetUpdateCount,
  authSuccess,
  authFailure,
} from './actions/general.js';

import * as types from './action_types.js';

const syncGoal = (goal, store, socket) => {

  // sends data to server
  socket.emit('goal', JSON.stringify(goal), (socketErr, socketResponse) => {
    if (socketErr) {
      return store.dispatch(updateSyncFailure(goal.id));
    }

    store.dispatch(updateSyncSuccess(socketResponse.goal_id));
  });

  // set pending sync open to true
  store.dispatch(setPendingSyncOpen(goal));
};

const checkGoalForUpdates = (goal, store, socket) => {
  if (goal.pendingSync && goal.pendingSync.open) return;
  if (goal.updateCount > 0 && goal.updateCount === goal.syncDBCount) {
    return store.dispatch(resetUpdateCount(goal.id));
  }
  if (goal.updateCount === goal.syncDBCount) return;
  syncGoal(goal, store, socket);
};

export const socketsMiddleware = store => next => {
  const socket = socketStarter(store);
  return action => {
    const result = next(action);

    if (action.type === types.SET_AUTH_PENDING) {
      socket.emit('authenticate', null, (socketErr, user_id) => {
        if (socketErr) {
          return store.dispatch(authFailure());
        }
        return store.dispatch(authSuccess(user_id));
      });
    }

    const goals = store.getState().goals;

    if (!window.navigator.onLine) return;

    goals.forEach((goal) => {
      checkGoalForUpdates(goal, store, socket);
    });

    return result;
  };
};

const socketStarter = (store) => {
  const socket = io();
  socket.on('userdata', (data) => {
    store.dispatch(receiveDbData(data));
  });
  return socket;
};
