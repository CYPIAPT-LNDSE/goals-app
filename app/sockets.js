import io from 'socket.io-client';

import * as types from './action_types.js';
import { receiveDbData, } from './actions/general.js';

let socket;

export const socketsMiddleware = (store) =>
  next =>
    action => {
      const result = next(action);
      if (socket) {
        const goals = store.getState().goals;
        if (!window.navigator.onLine) return;
        goals.forEach((goal) => {
          if (goal.pendingSync && goal.pendingSync.open) return;
          if (goal.updateCount === goal.syncDBCount) return;
          console.log('needs to sync ' + goal.name);
        });
      }
      return result;
    };

export default (store) => {
  socket = io();

  socket.on('userdata', (data) => {
    store.dispatch(receiveDbData(data));
  });
};
