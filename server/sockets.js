const socketio = require('socket.io');

module.exports =  (listener) => {
  const io = socketio.listen(listener);
  io.on('connection', (socket) => {
    console.log("new connection");

    socket.on('newGoals', (data) => {
      console.log(data);
    });
  });
};
