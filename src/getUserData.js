// const socketManager = require('./socket-manager.js');
const mockData = require('../database/mock.js');
//
// module.exports = (id) => {
//   const goals = mockData.goals;
//   console.log('get user data');
//   socketManager('userdata', JSON.stringify(goals));
//   return;
// };

module.exports = (id) => {
  const goals = mockData.goals;
}
