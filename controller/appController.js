'use strict';

var Task = require('../model/appModel.js');

exports.list_all_tasks = function(req, res) {
  //console.log('session')
  //console.log(req.session)
  //var sess=req.session;
  /*
  * Here we have assign the 'session' to 'sess'.
  * Now we can create any number of session variable we want.
  * in PHP we do as $_SESSION['var name'].
  * Here we do like this.
  */

  req.session.vistos = req.session.vistos ? req.session.vistos + 1 : 1;

 // console.log('session')
  console.log('llamaste ' + req.session.vistos)

  

  Task.getAllTask(function(err, task) {
    

    console.log('controller')
    if (err)
      res.send(err);
     // console.log('res', task);
    res.send(task);
  });
};


exports.list_all_opciones = function(req, res) {
  //console.log('session')

  //console.log(req.body)
  Task.opcionesPorPerfil(req.body, function(err, task) {
    

    console.log('sesion')
    if (err)
      res.send(err);
     // console.log('res', task);

    // req.session.vistos = req.session.vistos ? req.session.vistos + 1 : 1;
   
    //console.log(task.length)
    var subsistema = {
     // sess:  req.session.vistos,
      csub_sis_cod: '',
      csub_sis: '',
      modulos: [],
    }    
    
    var dimension = task.length;
		for(var i = 0; i < dimension; i++) {
			if(task[i].cmod_cod=="0") { //la raiz
				subsistema.csub_sis_cod = task[i].citem_cod;
				subsistema.csub_sis = task[i].citem;
				var modulos=[];
				
				for (var j = i+1; j < dimension; j++) {
					if(task[j].cmod_cod=="1.1") {
						var opciones=[];
            var mod={
              cmod_cod : task[j].citem_cod,
              cmod : task[j].citem,
              opciones : []  
            }
            
						for (var k = j; k < dimension; k++) {
							if(task[k].cmod_cod==(mod.cmod_cod)) {
								var op= {
                  copc_cod : task[k].citem_cod,
                  copc : task[k].citem,
                  carc : task[k].carchivo,
                  cico : task[k].cicono,
                }
                //new Opcion(opcionessegunperfil.get(k).getCitem_cod(), opcionessegunperfil.get(k).getCitem(), opcionessegunperfil.get(k).getCarchivo(), opcionessegunperfil.get(k).getCicono());
								opciones.push(op);
							}
						}
						mod.opciones = opciones;
						subsistema.modulos.push(mod);
					}
				}
			}
		}

    res.send(subsistema);
  });
};


exports.validar_login = function(req, res) {
  //console.log('session')

 

  //console.log(req.body)
  Task.validarLogin(req.body, function(err, resp) {
    

    console.log('controller login')
    if (err)
      res.send(err);
     // console.log('res', task);

     

    var usuario = {
      respuesta: {
        berror: resp.berror==1,
        cmensaje: resp.cmensaje,
        ccodigo: ''
      },
      perfil: {
        nper_cod: resp.nper_cod,
        cper: resp.cper,
        csub_sis_cod: ''
      },
      cusu_cod: resp.cusu_cod,
      cclave: resp.cclave ,
      cnombres: resp.cnombres ,
      capellidos: resp.capellidos ,
      ncons_val_sexo: resp.ncons_val_sexo,
      dfecha_nac: resp.dfecha_nac ,
      cemail: resp.cemail ,
      ccelular: resp.ccelular ,
      dfecha: resp.dfecha ,
    }
    

    if(!usuario.respuesta.berror) {
      req.session.usuario = usuario;
      console.log("SE GUARDO LA SESION")
    }
    
    
    res.send(usuario);
  });
};


exports.recuperar_sesion = function(req, res) {

    console.log('controller recuperar session')
    
     // console.log('res', task);

    var usuario = null;

    //inicialir un usuario para produccon
   /* SPRespuesta resultado = new SPRespuesta(true, "No existe usuario en session!", "");
    usuario = new Usuario();
    usuario.setRespuesta(resultado);
    usuario.setCusu_cod("43530710");
    usuario.setCclave("1234");
    usuario = (Usuario)postValidarLogin(usuario, session).getBody();*/


    if(req.session.usuario) {
      usuario = req.session.usuario;
    } else {
      usuario = {
        respuesta: {
          berror: true,
          cmensaje: 'No existe usuario en session!',
          ccodigo: ''
        }
      }
    } 
   
    
    
    res.send(usuario);
  
};


exports.cerrar_sesion = function(req, res) {

  console.log('controller cerrar session')
  
   // console.log('res', task);

  //req.session.usuario = null;

  req.session.destroy();

  var respuesta = {
    berror: false,
    cmensaje: 'Session cerrada correctamente!',
    ccodigo: ''
  }
  
  res.send(respuesta);

};



exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);

  //handles null error 
   if(!new_task.task || !new_task.status){

            res.status(400).send({ error:true, message: 'Please provide task/status' });

        }
else{
  
  Task.createTask(new_task, function(err, task) {
    
    if (err)
      res.send(err);
    res.json({id: task, message: 'Task successfully created'});
  });
}
};


exports.read_a_task = function(req, res) {
  Task.getTaskById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  console.log(req.body)
  Task.updateById(req.params.taskId, new Task(req.body), function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully updated' });
  });
};


exports.delete_a_task = function(req, res) {


  Task.remove( req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};