const server = require(`../src/server.js`);
const tape = require('tape');
const fs = require('fs');
const path = require('path');

tape('Is the server running', (t) => {
  server.start( (err) => {
    if (err) { t.error('failed test', err);
    } else {
      t.pass();
    }
    server.stop( () => { t.end() } );
  });
});

tape('Check the / route', (t) => {
  var options = {
    method: 'GET',
    url: '/'
  }
  server.inject(options, (response) => {
    t.equals(response.statusCode, 200, 'status code is 200');
    var servedFile = response.result.toString();
    var file = fs.readFileSync(path.join(__dirname, '../public/html/landing-page.html')).toString();
    t.equal(servedFile, file, 'payload contains no content');
    t.end();
  });
});
