const socketio = require('socket.io');

const mockData = [
  {
    id: 0,
    name: 'my new goal',
    avatar: 'pepper',
    ratings: [],
  },
];

module.exports =  (listener) => {
  const io = socketio.listen(listener);
  io.on('connection', (socket) => {
    console.log('new connection detected');
    // replace mock data with function to get actual user's data from DB
    socket.emit('userdata', JSON.stringify(mockData));

    socket.on('hello', () => {
      console.log('hello');
    });
  });
};
