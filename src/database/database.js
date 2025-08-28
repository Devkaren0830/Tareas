import sqlite3 from 'sqlite3';

// La ruta a tu archivo de base de datos. 
// Reemplaza 'nombre-de-tu-base.db' por el nombre de tu archivo.
const DB_PATH = './tareas.db';

class Database {
    db;
    constructor() {
        this.db = this.iniciar_base_de_datos();
        this.tablas();
    }

    tablas() {
        this.crearTabla(
            `
                CREATE TABLE IF NOT EXISTS Tareas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                Titulo TEXT NOT NULL,
                Descripcion TEXT,
                FechaCreacion Double NOT NULL,
                FechaVencimiento Double,
                Prioridad INTEGER NOT NULL
            )
        `,
            this.db
        );
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


    async ejecutar_consulta(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err) {
                    reject(
                        new Error(`Error al ejecutar la consulta: ${err.message}`)
                    )
                } else {
                    resolve({
                        estado: true,
                        mensaje: 'Consulta ejecutada correctamente',
                        data: { id: this.lastID, cambios: this.changes }
                    });
                }
            });
        });
    }



    async crearTabla(sql) {

        try {
            // Usamos await para esperar a que el comando se complete
            const resultado = await this.ejecutar_consulta(sql);
            console.log("¡Tabla 'usuarios' creada con éxito!");
            return resultado;
        } catch (error) {
            // Si la tabla ya existe, el error podría ser "SQLITE_ERROR", 
            // pero el comando "CREATE TABLE IF NOT EXISTS" lo maneja.
            console.error("Error al crear la tabla:", error.message);

            // Aquí en lugar de 'throw error' devolvemos un objeto controlado
            return {
                estado: false,
                mensaje: "No se pudo crear la tabla",
                data: error
            };
        }
    }
}

export default Database;