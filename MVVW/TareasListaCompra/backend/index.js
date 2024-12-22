const express = require('express');
const app = express();
const port = 3000;
const dbclient = require('./db/dbclient');

app.get('/', (req, res) => {
    let sql;
    sql = `SELECT * FROM tasks`;
    dbclient.all(sql, [], (err, rows) => {
        if (err) throw err;
        console.log(rows);
    });
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })