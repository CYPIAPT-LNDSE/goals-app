const pg = require('pg');
const Pool = pg.Pool;
const url = require('url');

require('env2')('./config.env');

pg.defaults.ssl = true;

if(!process.env.GROW_DB_URL) throw new Error('Environment variable GROW_DB_URL\
 must be set');

const client = new pg.Client(process.env.GROW_DB_URL);

module.exports = client;
