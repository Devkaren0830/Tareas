import { Router } from "express";
import BD from "../server.js";

const router_api = Router();

router_api.post('/api/agregar_tarea', (req, res) => {
    console.log("Llegó un post a /tasks");
    console.log(req.body);
    let prioridad = parseInt(req.body.prioridad);
    BD.ejecutar_consulta(
        `INSERT INTO Tareas (Titulo, Descripcion, FechaCreacion, FechaVencimiento, Prioridad)
         VALUES (?, ?, ?, ?, ?)`,
        [
            req.body.title,
            req.body.description,
            Date.now(),
            new Date(req.body.fecha_venvimiento).getTime(),
            prioridad
        ]
    );

    res.status(200).json({
        estado: true,
        mensaje: "Tarea recibida",
        data: req.body
    });
});

router_api.get('/api/listar_tareas', async (req, res) => {
    console.log("Llegó un get a /api/listar_tareas");
    try {
        const resultado = await BD.ejecutar_consulta(
            `SELECT * FROM Tareas WHERE Estado = ? ORDER BY FechaCreacion DESC`,
            [0]
        );
        console.log(resultado);
        resultado.data.rows.forEach(tarea => {
            tarea.FechaCreacion = new Date(tarea.FechaCreacion).toLocaleString();
            tarea.FechaVencimiento = new Date(tarea.FechaVencimiento).toLocaleString();
        });

        res.status(200).json({
            estado: true,
            mensaje: "Tareas obtenidas",
            data: resultado.data
        });
    } catch (error) {
        res.status(500).json({
            estado: false,
            mensaje: "Error al obtener las tareas",
            error: error.message
        });
    }
});

export default router_api;