const mockData = require('./mock.js');

const goals = mockData.goals;
const socketManager = (socket) => {
  socket.on('newuser', (id) => {
    socket.emit('userdata', JSON.stringify(goals));
  });
};

module.exports = socketManager;
