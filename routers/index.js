const express = require("express");
const router = express.Router();
const index = require("../controllers/index");
const isAuth =require('../middleware/is-auth')

router.get("/eleccion",isAuth,index.GetEleccion);
router.get("/eleccion/Presidente",isAuth,index.GetPresidente);
router.get("/eleccion/Senador",isAuth,index.GetSenador);
router.get("/eleccion/Diputado",isAuth,index.GetDiputado);
router.get("/eleccion/Alcalde",isAuth,index.GetAlcalde);
router.get("/eleccion/Regidor",isAuth,index.GetRegidor);



router.post("/eleccion",index.PostEleccion);
router.post("/elegido",isAuth,index.PostElegido);


module.exports = router;