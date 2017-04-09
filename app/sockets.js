import io from 'socket.io-client';

const socket = io();

export default socket;

// module.exports = (id) => {
//   socket.emit('newGoals', { id: id, });
// };
