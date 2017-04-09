const socketio = require('socket.io');
const socketManager = require('./socket-manager.js');

const createSocket = (listener) => {
  const io = socketio.listen(listener);
  io.on('connection', (socket) => {
    // replace mock data with function to get actual user's data from DB
    //socket.emit('userdata', JSON.stringify(mockData.goals));
    console.log('new connection');
    socket.on('message', (message) => {
      socketManager(socket, message);
    });
  });
};


module.exports = createSocket;
