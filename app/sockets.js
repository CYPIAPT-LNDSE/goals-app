import io from 'socket.io-client';

import * as types from './action_types.js';
import { receiveDbData, } from './actions/general.js';

let socket;

export const socketsMiddleware = (store) =>
  next =>
    action => {
      const result = next(action);
      // handlers for dealing with new goals go here
      return result;
    };

export default (store) => {
  socket = io();

  socket.on('userdata', (data) => {
    store.dispatch(receiveDbData(data));
  });
};
