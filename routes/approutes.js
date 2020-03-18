const express = require('express');
const router = express.Router();
var todoList = require('../controller/appController');
  
    // todoList Routes
router.route('/tasks')
.get(todoList.list_all_tasks)
.post(todoList.create_a_task);

router.route('/tasks/:taskId')
.get(todoList.read_a_task)
.put(todoList.update_a_task)
.delete(todoList.delete_a_task);

router.route('/pepito')
.get((req,res) => {
    req.session.vistos = req.session.vistos ? req.session.vistos + 1 : 1;
    res.json({result: req.session.vistos})
});


router.route('/pepasa')
.get((req,res) => {
    req.session.vistos = req.session.vistos ? req.session.vistos + 1 : 1;
    res.json({result: req.session.vistos, xd:'xdxd'})
});

router.route('/opciones')
.post(todoList.list_all_opciones);

router.route('/login')
.post(todoList.validar_login);

router.route('/recuperar_sesion')
.get(todoList.recuperar_sesion);

router.route('/cerrar_sesion')
.get(todoList.cerrar_sesion);




module.exports = router;
      
