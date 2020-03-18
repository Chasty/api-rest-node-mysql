'user strict';
var sql = require('./db.js');


var Opcion = function(opc) {
    this.copc_cod = opc.copc_cod;
    this.copc = opc.copc;
    this.carc = opc.carc;
    this.cico = opc.cico;
}

var Modulo = function(mod) {
    this.cmod_cod = mod.cmod_cod;
    this.cmod = mod.cmod;
    this.opciones = mod.opciones;  
}

var Subsistema = function(subs) {
    this.csub_sis_cod = subs.csub_sis_cod;
    this.csub_sis =  subs.csub_sis;
    this.modulos = subs.modulos;
}

//Task object constructor
var Task = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};
Task.createTask = function createUser(newTask, result) {    
        sql.query("INSERT INTO tasks set ?", newTask, function (err, res) {
                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });           
};
Task.getTaskById = function createUser(taskId, result) {
        sql.query("Select task from tasks where id = ? ", taskId, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};
Task.getAllTask = function getAllTask(result) {

    let sqlSchema = `CALL get_all_tasks(?,?)`;
        sql.query(sqlSchema, ['Find bugs', 1], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                 // console.log('tasks : ', res);  

                 result(null, res[0]);
                }
            });   
};

Task.opcionesPorPerfil = function opcionesPorPerfil(data,result) {

    let sqlSchema = `CALL bc_sp_recuperar_opciones_segun_perfil(?,?)`;
        sql.query(sqlSchema, [data.nper_cod, data.csub_sis_cod], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                 // console.log('tasks : ', res);  

                 result(null, res[0]);
                }
            });   
};

Task.validarLogin = function validarLogin(data,result) {

    let sqlSchema = `CALL bc_sp_validar_login(?,?)`;
        sql.query(sqlSchema, [data.cusu_cod, data.cclave], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                 // console.log('tasks : ', res);  

                 result(null, res[0][0]);
                }
            });   
};

Task.updateById = function(id, task, result){
    
 //console.log(id, task.task)
  sql.query("UPDATE tasks SET task = ?, status = ? WHERE id = ?", [task.task, task.status, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};
Task.remove = function(id, result){
     sql.query("DELETE FROM tasks WHERE id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
               
                 result(null, res);
                }
            }); 
};

module.exports= Task;