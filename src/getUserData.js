const socket = require('./sockets.js');

module.exports = (id) => {
  return socket.emit('newUser', {data: data});
};
