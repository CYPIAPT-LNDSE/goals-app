const hapi = require('hapi');
const inert = require('inert');
const fs = require('fs');

require('env2')('./config.env');

const routes = require('./index.js');
const socket = require('./sockets.js');
const server = new hapi.Server();

server.connection({
  address: process.env.IP || '0.0.0.0',
  port: process.env.PORT || 4000,
  tls: process.env.NODE_ENV !== 'production' && {
    key : fs.readFileSync('./key.pem'),
    cert : fs.readFileSync('./cert.pem'),
  },
});

server.register([ inert,], (err) => {
  if (err) { throw new Error (err); }

  server.route(routes);
});

socket(server.listener);

module.exports = server;
