import sqlite3 from 'sqlite3';

// La ruta a tu archivo de base de datos. 
// Reemplaza 'nombre-de-tu-base.db' por el nombre de tu archivo.
const DB_PATH = './tareas.db';

class Database {
    db;
    constructor() {
        this.db = this.iniciar_base_de_datos();
    }

    iniciar_base_de_datos() {
        const bd = new sqlite3.Database(DB_PATH, (err) => {
            if (err) {
                console.error('Error al conectar con la base de datos SQLite:', err.message);
            } else {
                console.log('Conexión a la base de datos SQLite establecida.');
            }
        });

        return bd;
    }


    ejecutar_consulta(
        tabla, params = []) {
        return new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) {
                    // Si hay un error, rechaza la promesa
                    reject({
                        estado: false,
                        mensaje: 'Error en el servidor por favor intente mas tarde',
                        data: err
                    });
                } else {
                    // Si no hay error, resuelve la promesa con el resultado
                    // this.lastID y this.changes son muy útiles para INSERT/UPDATE/DELETE
                    resolve({
                        estado: true,
                        mensaje: 'Consulta ejecutada correctamente',
                        data: { id: this.lastID, cambios: this.changes }
                    });
                }
            });
        });
    }
}

export default Database;