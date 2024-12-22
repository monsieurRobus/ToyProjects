const express = require('express');
const app = express();
const port = 3001;
const dbclient = require('./db/dbclient');

app.get('/tasklist',  (req, res) => {
    let sql;
    sql = `SELECT * FROM listas`;
    let response;
    dbclient.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

app.get('/tasklist/:id', (req, res) => {

    const {id } = req.params;
    let sql;
    sql = `SELECT t.id_tarea, t.titulo, t.descripcion, t.completada, t.fecha_creacion, t.fecha_vencimiento
            FROM listas_tareas lt
            JOIN tareas t ON lt.id_tarea = t.id_tarea
            WHERE lt.id_lista = ${id}`;
    dbclient.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })