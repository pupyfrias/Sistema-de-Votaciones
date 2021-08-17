const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");

router.get("/",auth.GetIndex);
router.get("/admin/iniciar-sesion",auth.GetAdmin);

router.post("/admin/logout",auth.PostLogout);

module.exports = router;