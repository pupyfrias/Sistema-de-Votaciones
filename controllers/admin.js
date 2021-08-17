const puestos = require("../models/puesto electivo");
const ciudadanos = require("../models/ciudadanos");
const partidos = require("../models/partidos");
const elecciones = require("../models/elecciones");
const candidatos = require("../models/candidatos");
const participantes = require("../models/participantes");
const { Op } = require("sequelize");
const votos = require("../models/votos");
const Sequelize = require('sequelize')

//////////////////////////////////// GET ///////////////////////////////////////////////

exports.GetHome = (req, res, next) => {
  
    res.render("admin/home", {
        pageTitle: "Admin Home",
        activeAdmin: true,

    })
};


//PUESTOS

exports.GetPuesto = (req, res, next) => {

    puestos.findAll({ order: [["estado", "DESC"], ["nombre", "ASC"]] }).then(result => {
        const puestosArray = result.map(result => result.dataValues)

        elecciones.findOne({ where: { estado: true } }).then(result => {
            eleccion = result == null ? false : true;

            if(puestosArray.length > 0){
                
                res.render("admin/puestos electivos/puestos electivos", {
                    pageTitle: "Puestos Electivos",
                    activePuesto: true,
                    puestos: puestosArray,
                    hiddenNav: true,
                    eleccion: eleccion,
    
                });
                
            }
            else{

                req.flash('erros','No Hay puesto disponible');
                return res.redirect('/admin/partidos')
            }
            

        }).catch(err => {
            console.log(err)
        });

    }).catch(err => {
        console.log(err)
    });

};

exports.GetAgregarPuesto = (req, res, next) => {

    res.render("admin/puestos electivos/guardar", {
        pageTitle: "Agregar Puesto",
        activePuesto: true,
        hiddenNav: true,

    })
};

exports.GetEditarPuesto = (req, res, next) => {

    if (!req.query.edit) {
        redirect("admin/puestos-electivos")
    } const id = req.params.idPuesto;
    puestos.findOne({ where: { id: id } }).then(result => {
        const puestoData = result.dataValues;
        res.render("admin/puestos electivos/guardar", {
            pageTitle: "Editar Puesto",
            activePuesto: true,
            editMode: true,
            puesto: puestoData,
            hiddenNav: true,

        })
    }).catch(errs => {
        console.log(err);
    })

};

//CIUDADANOS

exports.GetCiudadanos = (req, res, next) => {

    ciudadanos.findAll({ order: [["estado", "DESC"], ["nombre", "ASC"]] }).then(result => {
        const ciudadanosArray = result.map(result => result.dataValues)

        elecciones.findOne({ where: { estado: true } }).then(result => {
            eleccion = result == null ? false : true;

            if(ciudadanosArray.length > 0){
                res.render("admin/ciudadanos/ciudadanos", {
                    pageTitle: "Ciudadanos",
                    activeCiudadanos: true,
                    ciudadanos: ciudadanosArray,
                    hiddenNav: true,
                    eleccion: eleccion,
                });
            }
            else{

                req.flash('erros','No Hay Ciudadanos Disponibles');
                return res.redirect('/admin/ciudadanos');
            }
            

        }).catch(err => {
            console.log(err)
        });

    }).catch(err => {
        console.log(err)
    });
};


exports.GetAgregarCiudadanos = (req, res, next) => {

    res.render("admin/ciudadanos/guardar", {
        pageTitle: "Agregar Ciudadanos",
        activeCiudadanos: true,
        hiddenNav: true,

    });
};

exports.GetEditarCiudadanos = (req, res, next) => {

    if (!req.query.edit) {
        redirect("admin/ciudadanos")
    } const id = req.params.idPuesto;
    ciudadanos.findOne({ where: { id: id } }).then(result => {
        const ciudadanosData = result.dataValues;
        res.render("admin/ciudadanos/guardar", {
            pageTitle: "Editar Ciudadanos",
            activeCiudadanos: true,
            editMode: true,
            ciudadanos: ciudadanosData,
            hiddenNav: true,

        })
    }).catch(errs => {
        console.log(err);
    })
};

//PARTIDOS

exports.GetPartidos = (req, res, next) => {
    partidos.findAll({ order: [["estado", "DESC"], ["nombre", "ASC"]] }).then(result => {
        const partidosArray = result.map(result => result.dataValues)

        elecciones.findOne({ where: { estado: true } }).then(result => {
            eleccion = result == null ? false : true;


            if(partidosArray.length > 0){
                res.render("admin/partidos/partidos", {
                    pageTitle: "partidos",
                    activePartidos: true,
                    partidos: partidosArray,
                    hiddenNav: true,
                    eleccion: eleccion,
                });
            }
            else{
                req.flash('erros','No Hay Partidos Disponibles');
                return res.redirect('/admin/partidos');
            }
           

        }).catch(err => {
            console.log(err)
        });

    }).catch(err => {
        console.log(err)
    });
};


exports.GetAgregarPartidos = (req, res, next) => {
    res.render("admin/partidos/guardar", {
        pageTitle: "Agregar partidos",
        activePartidos: true,
        hiddenNav: true,

    });
};

exports.GetEditarPartidos = (req, res, next) => {

    if (!req.query.edit) {
        redirect("admin/partidos")
    } const id = req.params.idPuesto;
    partidos.findOne({ where: { id: id } }).then(result => {
        const partidosData = result.dataValues;
        res.render("admin/partidos/guardar", {
            pageTitle: "Editar partidos",
            activePartidos: true,
            editMode: true,
            partidos: partidosData,
            hiddenNav: true,

        })
    }).catch(errs => {
        console.log(err);
    })
};

//ELECCIONES

exports.GetElecciones = (req, res, next) => {
    elecciones.findAll({ order: [["estado", "DESC"], ["updatedAt", "DESC"]] }).then(result => {

        const eleccionesArray = result.map(result => result.dataValues)
        let activeAdd = true;
        

        ciudadanos.findAll({where:{estado:true}}).then(result=>{

            const hasCiudadanos = result.length==0? false:true;
            activeAdd = hasCiudadanos? true: false

            eleccionesArray.forEach(element=>{

                if (element.estado) {
                    activeAdd = false;
                }
            })

            if(eleccionesArray.length > 0 && hasCiudadanos){

                res.render("admin/elecciones/elecciones", {
                    pageTitle: "Elecciones",
                    activeElecciones: true,
                    elecciones: eleccionesArray,
                    hiddenNav: true,
                    activeAdd: activeAdd,    
                });
            }
            else if (hasCiudadanos == false){

                req.flash('erros','No hoy ciudadonos registrado');
                return res.redirect('/admin/eleccion')
            }
            else if (eleccionesArray.length > 0  == false){

                req.flash('erros','No hoy elecciones realizado');
                return res.redirect('/admin/eleccion')
            }
            else{

                req.flash('erros','No hoy ciudadonos registrado');
                req.flash('erros','No hoy elecciones realizado');
                return res.redirect('/admin/eleccion')
            }
            

        }).catch(err => {
        console.log(err)
    });
        
    }).catch(err => {
        console.log(err)
    })

};


exports.GetResultado = (req, res, next) => {

    let votosLista = {};
    let candidato_lista = [];
    let participantes_lista = [];
    let puesto_lista = [];
    let idEleccion =  req.params.idEleccion;

    votos.findAll({
        where: { eleccioneId:idEleccion},
        include: [{ model: puestos }, { model: partidos },
        { model: candidatos },{ model: ciudadanos }]
    }).then(result => {

        result.forEach(element => {
            
            
            let candidato_Id = element.candidatoId;
            let puesto = element.puesto_electivo.dataValues.nombre;
            let nombre = element.candidato.dataValues.nombre;
            let apellido = element.candidato.dataValues.apellido;
            let foto = element.candidato.dataValues.foto;
            let logo = element.partido.dataValues.logo;
            let partido = element.partido.dataValues.nombre;
            let idCiudano = element.ciudadanoId;

           

            if (votosLista.hasOwnProperty(puesto) === false) {
                votosLista[puesto] = [];
                puesto_lista.push(element.puesto_electivo.dataValues.id);
               
            }

            if (votosLista[puesto].length === 0) {
                votosLista[puesto].push([ 1, candidato_Id, nombre, apellido, foto, logo, partido])
                
            }
            else {

                votosLista[puesto].forEach(element => {
                   
                    if (element[1] === candidato_Id ) {
                        let voto = element[0]
                        element[0] = voto + 1
                        
                        const i = votosLista[puesto].indexOf(element)
                        const nuevo = votosLista[puesto][i]
                        
                        delete votosLista[puesto][i]
                        votosLista[puesto].unshift(nuevo)
                        
                    }
                    else {
    
                        let notExits = true;
                        votosLista[puesto].forEach(element=>{

                            if (element[1] === candidato_Id){
                                notExits = false;
                            } 
                        })

                        if(notExits){
                            votosLista[puesto].push([ 1, candidato_Id,nombre, apellido, foto, logo, partido])
                        }
                           
                    }
                })
            }
            
        });
       
        
        participantes.findAll({where:{eleccioneId: idEleccion}}).then(result=>{

            const data = result.map(result=>result.dataValues)
            data.forEach(element=>{

                participantes_lista.push(element.candidatoId)
                
            });


            for (let x in votosLista) {
                let total = 0
                votosLista[x].forEach(element => {
                    total += element[0]
                })
    
                votosLista[x].forEach(element => {
                    let votos = element[0]
                    candidato_lista.push(element[1]);
                    element.push(((votos / total) * 100).toFixed(2))
                })
    
    
            }
    
            candidatos.findAll({
                where: { [Op.not]: [{ id: candidato_lista }], [Op.and]:[{ id: participantes_lista },{puestoElectivoId:puesto_lista}]},
                include: [{ model: partidos }, { model: puestos }]
            }).
                then(result => {
                    
                   
                    result.forEach(element => {
    
    
                        let candidato_Id = element.id;
                        let puesto = element.puesto_electivo.dataValues.nombre;
                        let nombre = element.nombre;
                        let apellido = element.apellido;
                        let foto = element.foto;
                        let logo = element.partido.dataValues.logo;
                        let partido = element.partido.dataValues.nombre;
                        votosLista[puesto].push([ 0,candidato_Id, nombre, apellido, foto, logo, partido, 0])

                    })

                    res.render("admin/elecciones/resultado", {
                        pageTitle: "Resultado de la Elección",
                        activeElecciones: true,
                        hiddenNav: true,
                        datos: votosLista,
    
                    });
                }).catch(err => [
                    console.log(err)
                ]);     

           
        }).catch(err=>{
            console.log(err)
        });

    }).catch(err => {
        console.log(err)
    })





}

exports.GetAgregarElecciones = (req, res, next) => {
    candidatos.findAll({ where: { estado: true } }).then(result => {
        const candidatosArray = result.map(result => result.dataValues);
        let allowEleccion = false;

        let puesto1 = 0;
        let puesto2 = 0;
        let puesto3 = 0;
        let puesto4 = 0;
        let puesto5 = 0;
        let puesto6 = 0;

        for (let i = 0; i < candidatosArray.length; i++) {

            switch (candidatosArray[i].puestoElectivoId) {

                case 1:
                    puesto1++;
                    break
                case 2:
                    puesto2++;
                    break
                case 3:
                    puesto3++;
                    break
                case 4:
                    puesto4++;
                    break
                case 5:
                    puesto5++;
                    break

            }
        }

        if (puesto1 >= 2) { allowEleccion = true }
        if (puesto2 >= 2) { allowEleccion = true }
        if (puesto3 >= 2) { allowEleccion = true }
        if (puesto4 >= 2) { allowEleccion = true }
        if (puesto5 >= 2) { allowEleccion = true }
        if (puesto6 >= 2) { allowEleccion = true }

        if(allowEleccion){
    
            res.render("admin/elecciones/guardar", {
                pageTitle: "Agregar Elecciones",
                activeElecciones: true,
                hiddenNav: true,
            });
        }
        else{

            req.flash('erros','Para iniciar una Elección deben de haber al menos 2 Candidatos activos');
            return res.redirect('/admin/eleccion')
        }

      

    }).catch(err => {
        console.log(err)
    });


};


//CANDITADOS

exports.GetCandidatos = (req, res, next) => {


    candidatos.findAll({ order: [["estado", "DESC"], ["nombre", "ASC"]], include: [{ model: puestos }, { model: partidos }] }).then(result => {

        const candidatosArray = result.map(result => result.dataValues)
        elecciones.findOne({ where: { estado: true } }).then(result => {
            const eleccion = result == null ? false : true;

            if(candidatosArray.length > 0){
                res.render("admin/candidatos/candidatos", {
                    pageTitle: "Candidatos",
                    activeCandidatos: true,
                    candidatos: candidatosArray,
                    hiddenNav: true,
                    eleccion: true,
                    eleccion: eleccion,
                });
            }else{

                req.flash('erros','No hoy candidatos disponible');
                return res.redirect('/admin/candidatos');
            }
           
        }).catch(err => {
            console.log(err)
        });

    }).catch(err => {
        console.log(err)
    })
};


exports.GetAgregarCandidatos = (req, res, next) => {
    partidos.findAll({ order: [["nombre", "ASC"]], where: { estado: true } }).then(result => {
        const partidosArray = result.map(result => result.dataValues)

        puestos.findAll({ order: [["nombre", "ASC"]], where: { estado: true } }).then(result => {
            const puestosArray = result.map(result => result.dataValues)

            if(partidosArray == "" && puestosArray == ""){

                req.flash('errors','No hay partidos disponible');
                req.flash('errors','No hay puestos disponible');
                return res.redirect('/admin/candidatos');

            }
            else if(partidosArray == "" ){

                req.flash('errors','No hay partidos disponible');
                return res.redirect('/admin/candidatos');
            }
            else if(puestosArray == ""){

                req.flash('errors','No hay puestos disponible');
                return res.redirect('/admin/candidatos');
            }
            else{
                res.render("admin/candidatos/guardar", {
                    pageTitle: "Agregar Candidatos",
                    activeCandidatos: true,
                    puestos: puestosArray,
                    partidos: partidosArray,
                    hiddenNav: true,
                    normal: true,
                });
        }

        }).catch(err => {
            console.log(err)
        });

    }).catch(err => {
        console.log(err)
    });
};

exports.GetEditarCandidatos = (req, res, next) => {

    if (!req.query.edit) {
        redirect("admin/candidatos")
    }
    const id = req.params.idPuesto;
    let disabledPartido = false;
    let disabledPuesto = false;

    candidatos.findOne({ where: { id: id } }).then(result => {
        const candidatosData = result.dataValues;

        partidos.findAll({ order: [["nombre", "ASC"]], where: { [Op.or]: [{ estado: true }, { id: candidatosData.partidoId }] } }).then(result => {
            const partidosArray = result.map(result => result.dataValues)

            for (let i = 0; i < partidosArray.length; i++) {
                if (partidosArray[i].id === candidatosData.partidoId) {

                    if (partidosArray[i].estado == false) {
                        disabledPartido = true;
                    }

                }
            }

            puestos.findAll({ order: [["nombre", "ASC"]], where: { [Op.or]: [{ estado: true }, { id: candidatosData.puestoElectivoId }] } })
                .then(result => {
                    const puestosArray = result.map(result => result.dataValues)

                    for (let i = 0; i < puestosArray.length; i++) {
                        if (puestosArray[i].id === candidatosData.puestoElectivoId) {

                            if (puestosArray[i].estado == false) {
                                disabledPuesto = true;
                            }
                        }
                    }

                    elecciones.findOne({ where: { estado: true } }).then(result => {
                        const eleccion = result == null ? false : true;

                      

                            res.render("admin/candidatos/guardar", {
                                pageTitle: "Editar candidatos",
                                activeCandidatos: true,
                                editMode: true,
                                candidatos: candidatosData,
                                puestos: puestosArray,
                                partidos: partidosArray,
                                hiddenNav: true,
                                notPartidos: partidosArray == "",
                                notPuestos: puestosArray == "",
                                eleccion: eleccion,
                                disabledPartido: disabledPartido,
                                disabledPuesto: disabledPuesto,
                            })



                      
                    }).catch(err => {
                        console.log(err)
                    });
                }).catch(err => {
                    console.log(err)
                });
        }).catch(err => {
            console.log(err)
        });
    }).catch(errs => {
        console.log(err);
    })
};

///////////////////////////////////////   POST   /////////////////////////////////////////

//PUESTOS

exports.PostGuardarPuesto = (req, res, next) => {
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;

    puestos.create({
        nombre: nombre,
        descripcion: descripcion,
        estado: true
    }).then(result => {
        res.redirect("/admin/puestos-electivos")
    }).catch(err => {
        console.log(err);
    });
};

exports.PostActualizarPuesto = (req, res, next) => {

    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const estado = req.body.estado == "true" ? true : false;
    const id = req.body.id;


    if (estado == false) {
        candidatos.update({ estado: false }, { where: { puestoElectivoId: id } })
            .then(result => {
                console.log(id)
            }).catch(err => {
                console.log(err)
            })
    }

    puestos.update({
        nombre: nombre,
        descripcion: descripcion,
        estado: estado
    },
        {
            where: {
                id: id
            }
        }).then(result => {
            res.redirect("/admin/puestos-electivos")
        }).catch(err => {
            console.log(err);
        });

};

exports.PostEliminarPuesto = (req, res, next) => {

    const id = req.body.id;
    puestos.destroy({
        where: { id: id }
    }).then(result => {
        res.redirect("/admin/puestos-electivos")
    }).catch(err => {
        console.log(err);
    });
};

//CIUDADANOS

exports.PostGuardarCiudadanos = (req, res, next) => {
    const cedula = req.body.cedula;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const correo = req.body.correo;

    ciudadanos.findOne({where:{email:correo}}).then(result=>{

        const datoEmail = result? true: false;
        ciudadanos.findOne({where:{cedula:cedula}}).then(result=>{
         
            const datocedula = result? true: false;


            if(datoEmail && datocedula){

                return res.render("admin/ciudadanos/guardar", {
                    pageTitle: "Editar Ciudadanos",
                    activeCiudadanos: true,
                    error: true,
                    errorEmail: true,
                    errorCedula: true,
                    hiddenNav: true,
                    cedula : cedula, 
                    nombre : nombre ,
                    apellido: apellido,
                    correo : correo, 
                })   
            }
            else if(datoEmail){

                return res.render("admin/ciudadanos/guardar", {
                    pageTitle: "Editar Ciudadanos",
                    activeCiudadanos: true,
                    error: true,
                    errorEmail: true,
                    hiddenNav: true,
                    cedula : cedula, 
                    nombre : nombre ,
                    apellido: apellido,
                    correo : correo, 
                })   
            }
            else if(datocedula){

                return res.render("admin/ciudadanos/guardar", {
                    pageTitle: "Editar Ciudadanos",
                    activeCiudadanos: true,
                    error: true,
                    errorCedula: true,
                    hiddenNav: true,
                    cedula : cedula, 
                    nombre : nombre ,
                    apellido: apellido,
                    correo : correo, 
                })
            }

            else{
    
                ciudadanos.create({
                    cedula: cedula,
                    nombre: nombre,
                    apellido: apellido,
                    email: correo,
                    estado: true
                }).then(result => {
                    res.redirect("/admin/ciudadanos")
                }).catch(err => {
                    console.log(err);
                });
            }

        }).catch(err=>{
            console.log(err)
        })

    }).catch(err=>{
        console.log(err)
    })
};

exports.PostActualizarCiudadanos = (req, res, next) => {

    const cedula = req.body.cedula;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const correo = req.body.correo;
    const estado = req.body.estado == "true" ? true : false;
    const id = req.body.id;

    ciudadanos.update({
        cedula: cedula,
        nombre: nombre,
        apellido: apellido,
        email: correo,
        estado: estado
    },
        {
            where: {
                id: id
            }
        }).then(result => {
            res.redirect("/admin/ciudadanos")
        }).catch(err => {
            console.log(err);
        });
};

exports.PostEliminarCiudadanos = (req, res, next) => {

    const id = req.body.id;
    ciudadanos.destroy({
        where: { id: id }
    }).then(result => {
        res.redirect("/admin/ciudadanos")
    }).catch(err => {
        console.log(err);
    });
};

//PARTIDOS


exports.PostGuardarPartidos = (req, res, next) => {

    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const logo = "/" + req.file.path;

    partidos.create({

        nombre: nombre,
        descripcion: descripcion,
        logo: logo,
        estado: true
    }).then(result => {
        res.redirect("/admin/partidos")
    }).catch(err => {
        console.log(err);
    });
};

exports.PostActualizarPartidos = (req, res, next) => {

    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const logo = req.file;
    const estado = req.body.estado == "true" ? true : false;
    const id = req.body.id;

    partidos.findOne({ where: { id: id } }).then(result => {

        const pathLogo = logo ? "/" + logo.path : result.dataValues.logo;

        if (estado == false) {
            candidatos.update({ estado: false }, { where: { partidoId: id } })
                .then(result => { }).catch(err => {
                    console.log(err)
                })
        }

        partidos.update({
            nombre: nombre,
            descripcion: descripcion,
            logo: pathLogo,
            estado: estado
        }, {
            where: { id: id }
        }).then(result => {
            res.redirect("/admin/partidos")
        }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        console.log(err);
    });


};

exports.PostEliminarPartidos = (req, res, next) => {

    const id = req.body.id;
    partidos.destroy({
        where: { id: id }
    }).then(result => {
        res.redirect("/admin/partidos")
    }).catch(err => {
        console.log(err);
    });
};

//ELECCIONES


exports.PostGuardarElecciones = (req, res, next) => {

    const nombre = req.body.nombre;
    const fecha = req.body.fecha;
    let id = 0;
    
    elecciones.create({
        nombre: nombre,
        fecha: fecha,
        estado: true
    }).then(result => {
        res.redirect("/admin/elecciones")
     }).
        catch(err => {
            console.log(err);
        });

        elecciones.findAndCountAll().then(result=>{

            id = result.count+1

            candidatos.findAll({ where: { estado: true } }).then(result => {

                const data = result.map(result => result.dataValues)
                data.forEach(element => {
                    participantes.create({ eleccioneId: id, candidatoId: element.id })
                        .then(result => {
                           
                        }).catch(err => {
                            console.log(err);
                        });
                })
                
            }).catch(err => {
                console.log(err);
            })





        }).
            catch(err => {
                console.log(err);
            });
    
}

exports.PostActualizarElecciones = (req, res, next) => {

    const id = req.body.id;

    elecciones.update({ estado: false },
        {
            where: { id: id }
        }).then(result => {
            res.redirect("/admin/elecciones/")
        }).catch(err => {
            console.log(err);
        });
};

exports.PostEliminarElecciones = (req, res, next) => {

    const id = req.body.id;
    elecciones.destroy({
        where: { id: id }
    }).then(result => {
        res.redirect("/admin/elecciones")
    }).catch(err => {
        console.log(err);
    });
};


//CANDIDATOS


exports.PostGuardarCandidatos = (req, res, next) => {

    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const partido = req.body.partido;
    const puesto = req.body.puesto;
    const foto = "/" + req.file.path;

    candidatos.create({

        nombre: nombre,
        apellido: apellido,
        foto: foto,
        partidoId: partido,
        puestoElectivoId: puesto,
        estado: true
    }).then(result => {
        res.redirect("/admin/candidatos")
    }).catch(err => {
        console.log(err);
    });
};

exports.PostActualizarCandidatos = (req, res, next) => {

    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const foto = req.file;
    const partido = req.body.partido;
    const puesto = req.body.puesto;
    const estado = req.body.estado == "true" ? true : false;
    const id = req.body.id;

    candidatos.findOne({ where: { id: id } }).then(result => {

        const pathFoto = foto ? "/" + foto.path : result.dataValues.foto;
        candidatos.update({
            nombre: nombre,
            apellido: apellido,
            foto: pathFoto,
            partidoId: partido,
            puestoElectivoId: puesto,
            estado: estado
        }, {
            where: { id: id }
        }).then(result => {
            res.redirect("/admin/candidatos")
        }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        console.log(err);
    });


};

exports.PostEliminarCandidatos = (req, res, next) => {

    const id = req.body.id;
    candidatos.destroy({
        where: { id: id }
    }).then(result => {
        res.redirect("/admin/candidatos")
    }).catch(err => {
        console.log(err);
    });
};

