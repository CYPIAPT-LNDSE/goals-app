const hapi = require('hapi');
const inert = require('inert');
const fs = require('fs');
const auth = require('hapi-auth-cookie');

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

server.register([ inert, auth, ], (err) => {
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

socket(server.listener);

module.exports = server;
