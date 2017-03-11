const server = require('./server.js');

server.start((err) => {
    if(err) throw err;
    console.log(`Magic happens on ${server.info.uri}`);
});
