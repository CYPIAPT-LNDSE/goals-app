const socketManager = (socket, message) => {
  const event = JSON.parse(message);
  switch(event.type) {
  default:
    console.log(message);
    return;
  }
};

module.exports = socketManager;
