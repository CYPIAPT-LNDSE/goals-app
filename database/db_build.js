const env = require('env2');
const fs = require('fs');

env('./config.env');

const dbConnection = require('./db_connection');

const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();

dbConnection.query(sql, (err, result) => {
  if(err) throw(err);
  console.log('Built database with result: ', result);
});
