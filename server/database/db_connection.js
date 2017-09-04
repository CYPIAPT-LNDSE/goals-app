const pg = require('pg');
const Pool = pg.Pool;
const url = require('url');
require('env2')('./config.env');

pg.defaults.ssl = true;

let options = { max: process.env.DB_MAX_CONNECTIONS || 2, };

// used for heroku DB
if (process.env.GROW_DB_URL) {
  const params = url.parse(process.env.GROW_DB_URL);
  const [ username, password, ] = params.auth.split(':');
  options = Object.assign(options, {
    user: username,
    password: password,
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
  });
  // used for AWS RDS DB
} else if (process.env.RDS_DB_NAME) {
  options = Object.assign(options, {
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    database: process.env.RDS_DB_NAME,
  });
  // error case
} else {
  throw new Error('database credentials must be set');
}

module.exports = new Pool(options);
