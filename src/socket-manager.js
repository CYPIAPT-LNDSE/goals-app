const mockData = require('../database/mock.js');

const goals = mockData.goals;
const socketManager = (socket) => {
  socket.emit('userdata', JSON.stringify(goals));
  // const event = JSON.parse(message);
  // switch(event.type) {
  // default:
  //   console.log(message);
  //   return;
  // }
};

module.exports = socketManager;
