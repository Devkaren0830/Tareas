import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from './database/database.js';
import router from './Router/router.js';
import router_api from './Router/aoi_router.js';
const BD = new Database();

// Path es para trabajar con rutas de archivos y directorios.
// Permite crear rutas absolutas y relativas de manera segura y compatible con diferentes sistemas operativos
// fileURLToPath:
// función que convierte una URL de archivo (file://) a una
// ruta normal del sistema (por ejemplo, C:\Practitas\node\...).

// Aquí lo que hace es:

// import.meta.url → obtiene la URL del archivo actual
// (file:///C:/Practitas/node/Proyecto_Tareas/server.js).

// fileURLToPath(...) → convierte esa URL en una
//  ruta normal (C:\Practitas\node\Proyecto_Tareas\server.js).
const __filename = fileURLToPath(import.meta.url)

// path.dirname(ruta) → obtiene la carpeta que contiene ese archivo.

// Si __filename es C:\Practitas\node\Proyecto_Tareas\server.js
// entonces __dirname será C:\Practitas\node\Proyecto_Tareas.
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router_api);

// Configura el motor de plantillas EJS para que se use en la aplicación Express.
app.set('view engine', 'ejs');
// Configura la carpeta donde se encuentran las vistas (archivos EJS).
// Aquí se especifica que las vistas están en la carpeta 'views' dentro del directorio
app.use(
    express.static(path.join(__dirname, 'public'))
);
app.set('views',
    path.join(__dirname, 'views')
);

app.use(router);

// app.
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
