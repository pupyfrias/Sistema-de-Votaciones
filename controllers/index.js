const puestos = require('../models/puesto electivo');
const candidatos = require('../models/candidatos');
const partidos = require('../models/partidos');
const elecciones = require('../models/elecciones');
const ciudadanos = require('../models/ciudadanos');
const votos = require('../models/votos');
const {Op} = require('sequelize');
const nodemailer = require('nodemailer');


let puestoArray = null;
let hasEleccion = 0;
let ciudadanoData = null;
let hasvoted = null;
let nombreEleccion = null;
let fechaEleccion = null;
let enlaces = null;
let idEleccion = null;
let votosArray = [];



const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "phpitladiplomado@gmail.com",
      pass: "#Querty123",
    },
  });



//ELECCIÓN

//GET
exports.GetPresidente = (req, res, next)=>{
    puestos.findOne({where: {nombre:"Presidente"}}).then(result =>{
        const puestoId = result.dataValues.id
        candidatos.findAll({where: {puestoElectivoId:puestoId},
            include:[{model:puestos},{model:partidos}],
            order:[['nombre','ASC']]
        }).then(result =>{
            const candidatosArray = result.map(result=> result.dataValues)
            
            res.render("eleccion/candidatos",{
                pageTitle: "Elección Presidencial",
                activeHome: true,
                candidatos: candidatosArray,
                puestos: puestoArray,
                activePresidente: "Presidente",
                isVoting: true,
                csrfToken:req.csrfToken()  

            })
        
        }).catch(err=>{
            console.log(err)
        });
    }).catch(err=>{
        console.log(err)
    });
}
exports.GetSenador = (req, res, next)=>{
    puestos.findOne({where: {nombre: "Senador"}}).then(result =>{

        const puestoId = result.dataValues.id
        candidatos.findAll({include:[{model:puestos},{model:partidos}],
            where: {puestoElectivoId:puestoId},
            order:[['nombre','ASC']]}).then(result =>{
            const candidatosArray = result.map(result=> result.dataValues)
            
            res.render("eleccion/candidatos",{
                pageTitle: "Elección de Senadores",
                activeHome: true,
                candidatos: candidatosArray,
                puestos: puestoArray,
                activeSenador: "Senador",
                isVoting: true,
                csrfToken:req.csrfToken()  
            })
        
        }).catch(err=>{
            console.log(err)
        });
    }).catch(err=>{
        console.log(err)
    });
}

exports.GetDiputado = (req, res, next)=>{
    puestos.findOne({where: {nombre: "Diputado"}}).then(result =>{

        const puestoId = result.dataValues.id
        candidatos.findAll({where: {puestoElectivoId:puestoId,estado:true},
            include:[{model:puestos},{model:partidos}],
            order:[['nombre','ASC']]}).then(result =>{
            const candidatosArray = result.map(result=> result.dataValues)
            
            res.render("eleccion/candidatos",{
                pageTitle: "Elección de Diputados",
                activeHome: true,
                candidatos: candidatosArray,
                puestos: puestoArray,
                activeDiputado: "Diputado",
                isVoting: true,
                csrfToken:req.csrfToken()  

            })
        
        }).catch(err=>{
            console.log(err)
        });
    }).catch(err=>{
        console.log(err)
    });
}


exports.GetAlcalde = (req, res, next)=>{
    puestos.findOne({where: {nombre: "Alcalde"}}).then(result =>{

        const puestoId = result.dataValues.id
        candidatos.findAll({where: {puestoElectivoId:puestoId,estado:true},
            include:[{model:puestos},{model:partidos}],
            order:[['nombre','ASC']]}).then(result =>{
            const candidatosArray = result.map(result=> result.dataValues)
            
            res.render("eleccion/candidatos",{
                pageTitle: "Elección de Alcaldes",
                activeHome: true,
                candidatos: candidatosArray,
                puestos: puestoArray,
                activeAlcalde: "Alcalde",
                isVoting: true,
                csrfToken:req.csrfToken()  

            })
        
        }).catch(err=>{
            console.log(err)
        });
    }).catch(err=>{
        console.log(err)
    });
}



exports.GetRegidor = (req, res, next)=>{
    puestos.findOne({where: {nombre: "Regidor"}}).then(result =>{

        const puestoId = result.dataValues.id
        candidatos.findAll({where: {puestoElectivoId:puestoId, estado:true},
            include:[{model:puestos},{model:partidos}],
            order:[['nombre','ASC']]}).then(result =>{
            const candidatosArray = result.map(result=> result.dataValues)
            
            res.render("eleccion/candidatos",{
                pageTitle: "Elección de Regidores",
                activeHome: true,
                candidatos: candidatosArray,
                puestos: puestoArray,
                activeRegidor: "Regidor",
                isVoting: true,
                csrfToken:req.csrfToken()  
                
            })
        
        }).catch(err=>{
            console.log(err)
        });
    }).catch(err=>{
        console.log(err)
    });
}



exports.GetEleccion =(req,res,next)=>{
    
    
    req.flash(
        "errors",
        "No hay Elecciones"
      );
        res.render("eleccion/eleccion", {
            pageTitle: "Eleccion",
            activeHome: true,
            puestos: puestoArray[0],
            hasEleccion: hasEleccion,
            inabilited: ciudadanoData.estado,
            hasvoted: hasvoted,
            nombre: nombreEleccion,
            fecha: fechaEleccion,
            isVoting: true,
            csrfToken:req.csrfToken()  
        });
  
}


//POST
exports.PostEleccion = (req, res, next) => {

   
    const cedula = req.body.cedulaIndex
    ciudadanos.findOne({where:{cedula: cedula}})
    .then(result=>{

        if(result){

            ciudadanoData = result.dataValues;
            candidatos.findAll({where:{estado:true}}).then(result =>{
                const candidatosArray = result.map(result=> result.dataValues);
                let puesto1=0;
                let puesto2=0;
                let puesto3=0;
                let puesto4=0;
                let puesto5=0;
                let lista = [];
        
                for(let i =0; i<candidatosArray.length; i++){
                   switch(candidatosArray[i].puestoElectivoId ) {
        
                    case 1:
                        puesto1 ++;
                        break
                    case 2:
                        puesto2 ++;
                        break
                    case 3:
                        puesto3 ++;
                        break
                    case 4:
                        puesto4 ++;
                        break
                    case 5:
                        puesto5 ++;
                        break
                    
        
                   }
                }
        
                if(puesto1>=2){lista.push(1)}  
                if(puesto2>=2){lista.push(2)}  
                if(puesto3>=2){lista.push(3)}  
                if(puesto4>=2){lista.push(4)}  
                if(puesto5>=2){lista.push(5)}   
        
                elecciones.findOne({where:{estado:true}}).then(result =>{
                   
                    if(result){

                        idEleccion = result.dataValues.id
                        hasEleccion = idEleccion ;
                        nombreEleccion = result.dataValues.nombre;
                        fechaEleccion = result.dataValues.fecha;
                    }
                    
                    puestos.findAll({where:{[Op.or]:[{id:lista}]}  }).then(result =>{
                        puestoArray = result.map(result=> result.dataValues);
                        
                        votos.findOne({where:{ciudadanoId:ciudadanoData.id,
                            eleccioneId: hasEleccion

                        }}).then(result=>{
                           
                            hasvoted = result? true: false;
                            hasEleccion = hasEleccion== 0? false:true;

                            let canVoted= false;
                            if(hasvoted == false && ciudadanoData.estado && hasEleccion){

                                req.session.userId = ciudadanoData.id;
                                canVoted = true;

                            }
                                                         
                            
                            if(hasEleccion==false){


                                req.flash(
                                    "errors",
                                    "No hay Elecciones"
                                  );
                                  return res.redirect("/");
                            }
                            else if(hasvoted){

                                req.flash(
                                    "errors",
                                    "Ya has participado en estas elecciones"
                                  );
                                  return res.redirect("/");

                            }
                            else if(ciudadanoData.estado ==false){

                                req.flash(
                                    "errors",
                                    "Estás inhabilitado"
                                  );
                                  return res.redirect("/");
                            }
                            else{

                                res.render("eleccion/eleccion", {
                                    pageTitle: "Eleccion",
                                    activeHome: true,
                                    puestos: puestoArray[0],
                                    nombre: nombreEleccion,
                                    fecha: fechaEleccion,
                                    csrfToken:req.csrfToken(),

                                })
                            }
                               
                            
                            

                        }).catch(err=>{
                            console.log(err)
                        });
 
                    }).catch(err=>{
                        console.log(err)
                    })    
                }).catch(err=>{
                    console.log(err)
                })                     
            }).catch(err=>{
                console.log(err)
            })

        }

        else{

            req.flash(
                "errors",
                "Cédula incorrecta"
              );
              return res.redirect("/");
        }
    }).catch(err=>{
        console.log(err)
    })  
};

exports.PostElegido = (req, res, next)=> {

    const userId = req.session.userId;
    let info = "";
    
    votosArray.push((`${idEleccion},${userId },`+req.body.datosCandidato).split(','))
    if(enlaces === null){

        enlaces = req.body.enlaces.split(',')
        enlaces.pop()
        enlaces.shift()
    }
  
    if(enlaces.length ===0){


        votosArray.forEach(element =>{

            votos.create({eleccioneId:element[0],
                ciudadanoId: element[1],
                candidatoId:element[2]	,
                partidoId:element[3],
                puestoElectivoId:element[4]}).then(result=>{
   
                }).catch(err=>{
                    console.log(err)
                });

            candidatos.findOne({where:{id:element[2]},
                include:[{model:partidos},{model:puestos}]}).then(result=>{

                    result = result.dataValues;

                    const candidato = result.nombre+" "+result.apellido;
                    const puesto = result.puesto_electivo.dataValues.nombre;
                    const partido = result.partido.dataValues.nombre;
                    
                    info +=`<h3>Para ${puesto}</h3>
                    <p>${candidato} del partido ${partido}</p>` 

                }).catch(err=>{
                    console.log(err)
                });

        })

        ciudadanos.findOne({where:{id: userId}}).then(result=>{

            result = result.dataValues
            const correo = result.email;
            const nombre = result.nombre+" "+result.apellido;
  
            
            transporter.sendMail({
                from: "phpitladiplomado@gmail.com",
                to: `${correo}`,
                subject: `Elección ${nombre}`,
                html: info,
                })

            }).catch(err=>{
                console.log(err)
            });
            
            
            
                

        enlaces = null;
        idEleccion = null;
        votosArray = []
        
            const text = "Proceso ejecutado con perfección. En breve recibirás un correo electrónico"+
            " con tu elección"
        
          
           req.session.destroy(err=>{
            console.log(err);
            
            res.render("auth/index",{
                pageTitle: "Sistema de Elecciones",
                activeHome: true,
                activeE: true,
                hasInfo: true,
                info: text,
                csrfToken:req.csrfToken(),
     
            });
            
        })
       
    }else{
        
        res.redirect(`/eleccion/${enlaces.shift()}`);
    }
    
}