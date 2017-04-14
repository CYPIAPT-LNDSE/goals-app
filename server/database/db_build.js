const fs = require('fs');

const client = require('./db_connection');

const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();

client.connect((err) => {
  if (err) throw err;
  client.query(sql, (err, result) => {
    if (err) throw err;

    // disconnect the client
    client.end((err) => {
      if (err) throw err;
      console.log('users, goals and ratings tables were created with result: ',
      result);
    });
  });
});
