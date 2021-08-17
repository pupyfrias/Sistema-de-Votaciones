const puestos = require('../models/puesto electivo');
const candidatos = require('../models/candidatos');
const partidos = require('../models/partidos');
const elecciones = require('../models/elecciones');
const ciudadanos = require('../models/ciudadanos');
const votos = require('../models/votos');
const {Op} = require('sequelize');

let puestoArray = null;
let hasEleccion = 0;
let ciudadanoData = null;
let hasvoted = null;
let nombreEleccion = null;
let fechaEleccion = null;
let enlaces = null;
let idEleccion = null;
let votosArray = [];

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
                isVoting: true

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
                isVoting: true
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
                isVoting: true

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
                isVoting: true

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
                isVoting: true
                
            })
        
        }).catch(err=>{
            console.log(err)
        });
    }).catch(err=>{
        console.log(err)
    });
}



exports.GetEleccion =(req,res,next)=>{

        res.render("eleccion/eleccion", {
            pageTitle: "Eleccion",
            activeHome: true,
            puestos: puestoArray[0],
            hasEleccion: hasEleccion,
            inabilited: ciudadanoData.estado,
            hasvoted: hasvoted,
            nombre: nombreEleccion,
            fecha: fechaEleccion,
            isVoting: true
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
                                                         
                                
                            res.render("eleccion/eleccion", {
                                pageTitle: "Eleccion",
                                activeHome: true,
                                puestos: puestoArray[0],
                                hasEleccion: hasEleccion,
                                inabilited: ciudadanoData.estado,
                                hasvoted: hasvoted,
                                nombre: nombreEleccion,
                                fecha: fechaEleccion,
                                isVoting: canVoted

                            })

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

            res.render("auth/index",{
                pageTitle: "Sistema de Elecciones",
                activeHome: true,
                activeE: true,
                error: true,
                cedula:cedula        
            }) 
        }
    }).catch(err=>{
        console.log(err)
    })  
};

exports.PostElegido = (req, res, next)=> {

    
    votosArray.push((`${idEleccion},${ req.session.userId},`+req.body.datosCandidato).split(','))
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

        })

          

        enlaces = null;
        idEleccion = null;
        votosArray = []

        req.session.destroy(err=>{
            console.log(err);
            res.redirect('/');
        })
       
    }else{
        
        res.redirect(`/eleccion/${enlaces.shift()}`);
    }
    
}