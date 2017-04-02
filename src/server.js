const Hapi = require('hapi');
const Inert = require('inert');
const fs = require('fs');
const socket = require('./sockets.js');
const Request = require('request');
const routes = require('./index.js');

require('env2')('./config.env');

const server = new Hapi.Server();

server.connection({
  address: process.env.IP || '0.0.0.0',
  port: process.env.PORT || 4000,
  tls: process.env.NODE_ENV !== 'production' && {
    key : fs.readFileSync('./key.pem'),
    cert : fs.readFileSync('./cert.pem'),
  },
});

server.register([Inert,], (err) => {
  if(err) throw err;

  server.state('userCookie', {
      ttl: 360000,
      isSecure: true,
      isHttpOnly: false,
      encoding: 'base64json',
      clearInvalid: true,
      strictHeader: true,
  });
  server.route(routes);
});

socket(server.listener);

module.exports = server;
