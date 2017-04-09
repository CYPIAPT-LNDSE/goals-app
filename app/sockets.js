import io from 'socket.io-client';

const socket = io();

module.exports = (id) => {
  socket.emit('newGoals', {id: id});
};
