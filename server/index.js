module.exports = [].concat(
  require('./routes/main.js'),
  require('./routes/static.js'),
  require('./routes/auth.js'),
  require('./routes/hello.js'),
  require('./routes/logout.js')
);
