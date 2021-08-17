const express = require("express");
const router = express.Router();
const admin = require("../controllers/admin");
const auth = require("../controllers/auth")


//GET
router.get("/home",admin.GetHome)
router.get("/puestos-electivos",admin.GetPuesto);
router.get("/agrgar-puestos-electivos",admin.GetAgregarPuesto);
router.get("/editar-puestos-electivos/:idPuesto",admin.GetEditarPuesto);
router.get("/ciudadanos",admin.GetCiudadanos);
router.get("/agregar-ciudadanos",admin.GetAgregarCiudadanos);
router.get("/editar-ciudadanos/:idPuesto",admin.GetEditarCiudadanos);
router.get("/partidos",admin.GetPartidos);
router.get("/agregar-partidos",admin.GetAgregarPartidos);
router.get("/editar-partidos/:idPuesto",admin.GetEditarPartidos);
router.get("/elecciones",admin.GetElecciones);
router.get("/agregar-elecciones",admin.GetAgregarElecciones);
router.get("/candidatos",admin.GetCandidatos);
router.get("/agregar-candidatos",admin.GetAgregarCandidatos);
router.get("/editar-candidatos/:idPuesto",admin.GetEditarCandidatos);
router.get("/resultado-elecciones/:idEleccion",admin.GetResultado);





//POST
router.post("/home",auth.PostAdminAuth);
router.post("/guardar-puestos-electivos",admin.PostGuardarPuesto);
router.post("/actualizar-puestos-electivos",admin.PostActualizarPuesto);
router.post("/eliminar-puestos-electivos",admin.PostEliminarPuesto);
router.post("/guardar-ciudadanos",admin.PostGuardarCiudadanos);
router.post("/actualizar-ciudadanos",admin.PostActualizarCiudadanos);
router.post("/eliminar-ciudadanos",admin.PostEliminarCiudadanos);
router.post("/guardar-partidos",admin.PostGuardarPartidos);
router.post("/actualizar-partidos",admin.PostActualizarPartidos);
router.post("/eliminar-partidos",admin.PostEliminarPartidos);
router.post("/guardar-elecciones",admin.PostGuardarElecciones);
router.post("/actualizar-elecciones",admin.PostActualizarElecciones);
router.post("/eliminar-elecciones",admin.PostEliminarElecciones);
router.post("/guardar-candidatos",admin.PostGuardarCandidatos);
router.post("/actualizar-candidatos",admin.PostActualizarCandidatos);
router.post("/eliminar-candidatos",admin.PostEliminarCandidatos);





module.exports = router;