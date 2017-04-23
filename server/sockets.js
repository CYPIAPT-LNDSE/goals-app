const socketio = require('socket.io');
const socketManager = require('./socket-manager.js');

const createSocket = (listener) => {
  const io = socketio.listen(listener);

  io.use((socket, next) => {
    if(socket.request.headers.cookie){
      next();
    }
    next(new Error('Authentication error'));
  });

  io.on('connection', socketManager);
};

module.exports = {
  createSocket: createSocket,
};
