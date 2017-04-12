const env = require('env2');
const fs = require('fs');

env('./config.env');

const { client } = require('./db_connection');

const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();

client.connect((err) => {
  if (err) throw err;
  client.query(sql, (err, result) => {
    if (err) throw err;
    
    // disconnect the client
    client.end((err) => {
      if (err) throw err;
      console.log("YAAAs tables were created with result: ", result);
    });
  });
});
