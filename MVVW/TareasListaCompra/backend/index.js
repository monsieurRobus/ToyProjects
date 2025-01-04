const express = require('express');
const app = express();
const port = 3001;
const dbclient = require('./db/dbclient');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.post('/tasklist', (req, res) => {

    const {nombre_lista, descripcion} = req.body;
    const fecha = new Date().toDateString();

    if(!nombre_lista || !descripcion) {
        return res.status(400).json({ error: 'Nombre de la lista y descripción son obligatorios' });    
    }

    const query = 'INSERT INTO listas (nombre_lista, descripcion, fecha_creacion) VALUES (?, ?, ?)';
    dbclient.run(query, [nombre_lista, descripcion, fecha|| ''], function (err) {
      if (err) {
        console.error('Error al crear la tarea:', err);
        return res.status(500).json({ error: 'Error al crear la tarea' });
      }});

    return res.status(201).json({ message: `Lista ${nombre_lista} creada.` });
    
});


// return res.status(200).json({ message: `Nombre lista: ${nombre_lista}` });
// let sql = `BEGIN TRANSACTION;

//         INSERT INTO tareas (titulo, descripcion, fecha_vencimiento)
//         VALUES ('Nueva tarea', 'Descripción de la tarea', '2024-12-31');

//         SELECT LAST_INSERT_ROWID() AS id_tarea;

//         INSERT INTO listas_tareas (id_lista, id_tarea)
//         VALUES (1, LAST_INSERT_ROWID());

//         COMMIT;`
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })