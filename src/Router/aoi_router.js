import { Router } from "express";

const router_api = Router();

router_api.post('/api/agregar_tarea', (req, res) => {
    console.log("Llegó un post a /tasks");
    console.log(req.body);
    res.status(200).json({
        estado: true,
        mensaje: "Tarea recibida",
        data: req.body
    });
});

export default router_api;