const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const dbclient = require('./db/dbclient');

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

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
app.post('/tasklist/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { titulo, descripcion, completada } = req.body;
    const fecha = new Date().toISOString().split('T')[0]; // Fecha en formato ISO

    // Validar datos de entrada
    if (!titulo || !descripcion) {
        return res.status(400).json({ error: 'Nombre de la tarea y descripción son obligatorios' });
    }

    // Consultas SQL
    const insertTareaQuery = `
        INSERT INTO tareas (titulo, descripcion, completada, fecha_creacion) 
        VALUES (?, ?, ?, ?);
    `;
    const insertListaTareaQuery = `
        INSERT INTO listas_tareas (id_lista, id_tarea) 
        VALUES (?, LAST_INSERT_ROWID());
    `;

    // Manejar la transacción
    dbclient.serialize(() => {
        dbclient.run('BEGIN TRANSACTION;', (err) => {
            if (err) {
                console.error('Error al iniciar la transacción:', err);
                return res.status(500).json({ error: 'Error al iniciar la transacción' });
            }
        });

        // Insertar tarea
        dbclient.run(insertTareaQuery, [titulo, descripcion, completada || false, fecha], function (err) {
            if (err) {
                console.error('Error al insertar tarea:', err);
                dbclient.run('ROLLBACK;'); // Cancelar la transacción
                return res.status(500).json({ error: 'Error al insertar la tarea' });
            }

            // Insertar relación en listas_tareas
            dbclient.run(insertListaTareaQuery, [id], (err) => {
                if (err) {
                    console.error('Error al insertar en listas_tareas:', err);
                    dbclient.run('ROLLBACK;'); // Cancelar la transacción
                    return res.status(500).json({ error: 'Error al insertar en listas_tareas' });
                }

                // Confirmar la transacción
                dbclient.run('COMMIT;', (err) => {
                    if (err) {
                        console.error('Error al confirmar la transacción:', err);
                        return res.status(500).json({ error: 'Error al confirmar la transacción' });
                    }

                    return res.status(201).json({ message: `Tarea "${titulo}" creada.` });
                });
            });
        });
    });
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