const fs = require('fs');

const client = require('./db_connection');

const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();


client.query(sql, (err, result) => {
  if(err) throw(err);
  console.log('Built database with result: ', result);
});
