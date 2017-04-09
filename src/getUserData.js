const socket = require('./socket-manager.js');
const mockData = require('../database/mock.js');

module.exports = (id) => {
  const goals = mockData.goals;
  console.log('get user data');
  //socket.emit('userdata', JSON.stringify(goals));
  return;
};
