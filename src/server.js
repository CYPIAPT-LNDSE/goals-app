const Hapi = require('hapi');
const Inert = require('inert');
const fs = require('fs');
const path = require('path');
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

server.register([ Inert, ], (err) => {
  if(err) throw err;

  server.route([
    {
      path: '/{param*}',
      method: 'GET',
      handler: {
        directory: {
          path: path.join(__dirname, '../public'),
          index: true,
          defaultExtension: 'html',
        },
      },
    },
  // {
  //   path: '/login',
  //   method: 'GET',
  //   handler: (request,reply) => { reply.file('public/login.html'); },
  // },
    // {
    //   path: '/{file*}',
    //   method: 'GET',
    //   handler: {
    //     directory: { path: path.join(__dirname, '../public'), },
    //   },
    // },
  ]);
});

socket(server.listener);

module.exports = server;
