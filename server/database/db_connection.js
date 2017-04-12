const pg = require('pg');
const Pool = pg.Pool;
const url = require('url');

require('env2')('./config.env');

pg.defaults.ssl = true;

if(!process.env.GROW_DB_URL) throw new Error('Environment variable GROW_DB_URL\
 must be set');

var client = new pg.Client(process.env.GROW_DB_URL);

const params = url.parse(process.env.GROW_DB_URL);
const [username, password] = params.auth.split(':');

const options = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  max: process.env.DB_MAX_CONNECTIONS || 2
};

options.username = username;
options.password = password;
options.ssl = (options.host !== 'localhost');

module.exports = {
  client: client,
  pool: new Pool(options),
};
