const hapi = require('hapi');
const inert = require('inert');
const fs = require('fs');
const cookieAuth = require('hapi-auth-cookie');
const bell = require('bell');

require('env2')('./config.env');

const routes = require('./index.js');
const createSocket = require('./sockets.js');
const server = new hapi.Server();

server.connection({
  address: process.env.IP || '0.0.0.0',
  port: process.env.PORT || 4000,
  tls: process.env.NODE_ENV !== 'production' && {
    key : fs.readFileSync('./key.pem'),
    cert : fs.readFileSync('./cert.pem'),
  },
});

const cookieOptions = {
  password: process.env.COOKIE_PASSWORD,
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

server.register([ bell, ], (err) => {
  if (err) { throw new Error (err); }

  server.auth.strategy('facebook', 'bell', fbOptions);
});

server.register([ inert, cookieAuth,], (err) => {
  if (err) { throw new Error (err); }

  server.auth.strategy('session', 'cookie', 'required', cookieOptions);
  server.route(routes);

});

const socket = createSocket(server.listener);

module.exports = {
  server: server,
  //socket: socket,
};
