const pg = require('pg');
const Pool = pg.Pool;
const url = require('url');
<<<<<<< HEAD
require('env2')('./config.env');

require('env2')('./config.env');
=======
>>>>>>> 07e361d... fixes lots of linting errors, related #307

pg.defaults.ssl = true;

if (!process.env.GROW_DB_URL) throw new Error('Environment variable GROW_DB_URL\
must be set');

const params = url.parse(process.env.GROW_DB_URL);
const [ username, password, ] = params.auth.split(':');

const options = {
  user: username,
  password: password,
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  max: process.env.DB_MAX_CONNECTIONS || 2,
};

module.exports = new Pool(options);
