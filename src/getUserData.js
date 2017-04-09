const socket = require('./server.js').socket;
const mockData = require('../database/mock.js');

module.exports = (id) => {
  console.log(socket);
  const goals = mockData.goals;
  console.log('get user data');
  //socket.emit('userdata', JSON.stringify(goals));
  return;
};
