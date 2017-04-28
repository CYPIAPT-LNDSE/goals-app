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

const onUpdateSyncFailure = (store, { id, }, action) => {
  return store.dispatch(action(id));
};

const syncGoal = (goal, store, socket) => {

  // set pending sync open to true
  store.dispatch(setPendingSyncOpen(goal));

  const onTimeout = () => {
    onUpdateSyncFailure(store, goal, updateSyncFailure);
  };

  const timer = window.setTimeout(onTimeout, 1000 * 20);

  // sends data to server
  socket.emit('goal', JSON.stringify(goal), (socketErr, socketResponse) => {

    window.clearTimeout(timer);

    if (socketErr) {
      console.log('error updating goal ' + goal.id + socketErr);
      onUpdateSyncFailure(store, goal, updateSyncFailure);
      return;
    }

    store.dispatch(updateSyncSuccess(socketResponse));
  });

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
          console.log('authentication error');
          return store.dispatch(authFailure());
        }
        return store.dispatch(authSuccess(user_id));
      });
    }

    // end if no network connection,
    // else iterate over goals, checking for updates
    // updated goals sent to server through socket
    // state updated with pending updates
    if (!window.navigator.onLine) return;
    const goals = store.getState().goals;
    goals.forEach((goal) => {
      checkGoalForUpdates(goal, store, socket);
    });

    return result;
  };
};

const socketStarter = (store) => {
  const socket = io();

  socket.on('userData', (data) => {
    store.dispatch(receiveDbData(data));
  });
  
  return socket;
};
