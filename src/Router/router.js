import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/new_tasks', (req, res) => {
    res.render('tasks/new');
});


export default router;