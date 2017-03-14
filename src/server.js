const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const Handlebars = require('handlebars');
const fs = require('fs');

const server = new Hapi.Server();

var tls = {
  key : fs.readFileSync('./key.pem'),
  cert : fs.readFileSync('./cert.pem')
};

server.connection({
  address: process.env.IP || '0.0.0.0',
  port: process.env.PORT || 4000,
  tls:tls
});

server.register([Inert], (err) => {
  if(err) throw err;

  server.route([{
    path: '/',
    method: 'GET',
    handler: (request, reply) => {
      reply.file('index.html');
    }
  },
  {
    path: '/bundle.js',
    method: 'GET',
    handler: (_, reply) => {
      reply.file('bundle.js');
    }
  },
  {
    path: '/app/public/fonts/{font}',
    method: 'GET',
    handler: {
      directory: {
        path: 'app/public/fonts/',
      }
    },
  },
  {
    path: '/{file*}',
    method: 'GET',
    handler: {
      directory: {
        path: 'app/public/',
      }
    }
  },

]);
});

module.exports = server;
