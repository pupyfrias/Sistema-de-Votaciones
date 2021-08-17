const Sequelize = require("sequelize");
const sequelizeCone = require("../util/database");

const usuarios = sequelizeCone.define("usuarios",{

    nombre:{
        type: Sequelize.STRING,
        allowNull: false, 
    },
    apellido:{
        type: Sequelize.STRING,
        allowNull: false, 
    },
     email:{
        type: Sequelize.STRING,
        allowNull: false, 
    },
    nombreUsuario:{
        type: Sequelize.STRING,
        allowNull: false, 
    }, 
    password:{
        type: Sequelize.STRING,
        allowNull: false, 
    },
    estado:{
        type: Sequelize.BOOLEAN,
        allowNull: false, 
    },

});

module.exports = usuarios;