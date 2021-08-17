const express = require("express");
const app =  express();
const handlebars = require("express-handlebars");
const path = require("path");
const multer =require('multer');
const {v4:uuidv4} = require("uuid");
const comparar =  require("./util/helpers/comparar");
const session = require('express-session');
const flash = require("connect-flash");

//MODELS
const sequelize =  require("./util/database");
const candidatos = require("./models/candidatos");
const ciudadanos = require("./models/ciudadanos");
const elecciones = require("./models/elecciones");
const puestos = require("./models/puesto electivo");
const usuarios = require("./models/usuarios");
const partidos = require("./models/partidos");
const votos = require("./models/votos");
const participantes =require('./models/participantes')


//ROUTES
const auth =require("./routers/auth");
const index =require("./routers/index");
const page404 = require("./routers/404");
const admin = require("./routers/admin");





//HANDLEBARS
app.engine("hbs",handlebars(
    {layoutsDir:"views",
    defaultLayout:"layout/main-layout",
    extname: "hbs",
    helpers:{comparar: comparar.comparar}  
}
));
app.set("view engine","hbs");
app.set("views","views")

//SETTINGS
const fileStorage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,"images");
    },
    filename: (req, file, cb)=>{
        cb(null,uuidv4()+"_"+ file.originalname)
    }
});

app.use(session({secret:'anythings',resave: true, saveUninitialized: false}))
app.use(express.urlencoded({extended:false}))
app.use(multer({storage: fileStorage}).single("logo"));
app.use(express.static(path.join(__dirname,"public")))
app.use("/images",express.static(path.join(__dirname,"images")))
app.use(flash());

//MIDLEWARE

// app.use((req,res,next)=>{
//     res.locals.isAuthenticated = req.session.isLoggedIn;
    
//     const errors = req.flash("errors");  
//     res.locals.errorMessages = errors;
//     res.locals.hasErrorMessages = errors.length > 0;
//     next()
// });

app.use((req, res, next) => {
    const errors = req.flash("errors");  
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.errorMessages = errors;
    res.locals.hasErrorMessages = errors.length > 0;
   
    next();
  });


app.use(auth)
app.use(index);
app.use("/admin",admin);


app.use(page404);

//SEQUELIZE
candidatos.belongsTo(partidos,{constraint: true,onUpdate:'CASCADE'});
partidos.hasMany(candidatos);
candidatos.belongsTo(puestos,{constraint: true,onUpdate:'CASCADE'});
puestos.hasMany(candidatos);

votos.belongsTo(elecciones,{constraint: true,onUpdate:'CASCADE'});
elecciones.hasMany(votos);
votos.belongsTo(ciudadanos,{constraint: true,onUpdate:'CASCADE'});
ciudadanos.hasMany(votos);
votos.belongsTo(candidatos,{constraint: true,onUpdate:'CASCADE'});
candidatos.hasMany(votos);
votos.belongsTo(partidos,{constraint: true,onUpdate:'CASCADE'});
partidos.hasMany(votos);
votos.belongsTo(puestos,{constraint: true,onUpdate:'CASCADE'});
puestos.hasMany(votos);

participantes.belongsTo(elecciones,{constraint: true, onUpdate:'CASCADE'});
elecciones.hasMany(participantes)
participantes.belongsTo(candidatos,{constraint: true, onUpdate:'CASCADE'});
candidatos.hasMany(participantes)

sequelize.sync().then(result=>{
    app.listen(5001);
}).catch(err=>{
    console.log(err)
});

