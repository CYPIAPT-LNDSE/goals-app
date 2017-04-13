const socketio = require('socket.io');
const socketManager = require('./socket-manager.js');

const createSocket = (listener) => {
  const io = socketio.listen(listener);
  io.on('connection', socketManager);
};

module.exports = {
  createSocket: createSocket,
};
