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

server.connection({address: '0.0.0.0', port: process.env.PORT || 4000});

server.register([Inert, Vision], (err) => {
  if(err) throw err;

  server.route({
    path: '/{param*}',
    method: 'GET',
    handler: {
      directory: {
        path: 'public'
      }
    }
  });
});

server.views({
  engines: {
    html: Handlebars
  },
  path: 'public/html',

});

server.route({
  path: '/',
  method: 'GET',
  handler: (request, reply) => {
    reply.view('landing-page');
  }
});

module.exports = server;
