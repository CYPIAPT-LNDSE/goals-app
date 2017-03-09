const { Pool } = require('pg');
const url = require('url');

if(!process.env.GOALS_DB_URL) throw new Error('Environment variable GOALS_DB_URL must be set');

const params = url.parse(process.env.GOALS_DB_URL);
const [username, password] = params.auth.split(':');

const options = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  max: process.env.DB_MAX_CONNECTIONS || 2
};

if (username) options.user = username;
if(password) options.password = password;
options.ssl = (options.host !== 'localhost');

module.exports = new Pool(options);
