const socketio = require('socket.io');

const mockData = [
  {
    id: 0,
    name: 'my new goal',
    avatar: 'cactus',
    ratings: [],
  },
];

const createSocket = (listener) => {
  const io = socketio.listen(listener);
  io.on('connection', (socket) => {
    // replace mock data with function to get actual user's data from DB
    socket.emit('userdata', JSON.stringify(mockData));
    socket.on('message', (message) => {
      socketManager(socket, message);
    });
  });
};


module.exports = createSocket;

const socketManager = (socket, message) => {
  const event = JSON.parse(message);
  switch(event.type) {
  default:
    console.log(message);
    return;
  }
};
