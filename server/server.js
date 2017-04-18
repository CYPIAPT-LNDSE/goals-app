const hapi = require('hapi');
const inert = require('inert');
const fs = require('fs');
const cookieAuth = require('hapi-auth-cookie');
const { createSocket, } = require('./sockets.js');

require('env2')('./config.env');

const routes = require('./index.js');
const server = new hapi.Server();

server.connection({
  address: process.env.IP || '0.0.0.0',
  port: process.env.PORT || 4000,
  tls: process.env.NODE_ENV !== 'production' && {
    key : fs.readFileSync('./key.pem'),
    cert : fs.readFileSync('./cert.pem'),
  },
});

server.state('new-user', {
  ttl: 30 * 24 * 60 * 60 * 1000,
  isSecure: process.env.NODE_ENV === 'PRODUCTION',
  isHttpOnly: false,
  encoding: 'none',
  clearInvalid: false,
  strictHeader: true,
});

server.register([ inert, cookieAuth,], (err) => {
  if (err) { throw new Error (err); }

  server.auth.strategy('session', 'cookie', true, {
    password: process.env.COOKIE_PASSWORD,
    cookie: 'grow-user',
    isSecure: process.env.NODE_ENV === 'PRODUCTION',
    ttl: 30 * 24 * 60 * 60 * 1000,
    redirectTo: '/login',
    isSameSite: false,
  });

  server.route(routes);

});

createSocket(server.listener);

module.exports = {
  server: server,
};
