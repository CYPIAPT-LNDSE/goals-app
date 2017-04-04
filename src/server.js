const Hapi = require('hapi');
const Inert = require('inert');
const fs = require('fs');
const Request = require('request');
const cookieAuth = require('hapi-auth-cookie');
const Bell = require('bell');

require('env2')('./config.env');

const routes = require('./index.js');
const socket = require('./sockets.js');
const server = new Hapi.Server();

server.connection({
  address: process.env.IP || '0.0.0.0',
  port: process.env.PORT || 4000,
  tls: process.env.NODE_ENV !== 'production' && {
    key : fs.readFileSync('./key.pem'),
    cert : fs.readFileSync('./cert.pem'),
  },
});

const cookieOptions = {
  password: 'thi£siVVs&Rgro1ww$MjmakingthisLON7pkassword',
  cookie: 'grow-cookie',
  isSecure: process.env.NODE_ENV === 'PRODUCTION',
  ttl: 24 * 60 * 60 * 1000,
};

const fbOptions = {
  provider: 'facebook',
  password: 'cookie_encryption_password_secure',
  clientId: process.env.APP_FACEBOOK_ID,
  clientSecret: process.env.CLIENT_SECRET,
  isSecure: process.env.NODE_ENV === 'PRODUCTION',
};

server.register([ Bell, ], (err) => {
  if (err) { throw new Error (err); }

  server.auth.strategy('facebook', 'bell', fbOptions);
});

server.register([ Inert, cookieAuth,], (err) => {
  if (err) { throw new Error (err); }

  server.auth.strategy('session', 'cookie', 'optional', cookieOptions);
  server.route(routes);
});

socket(server.listener);

module.exports = server;
