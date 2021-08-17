const Sequelize = require("sequelize");
const sequelizeCone = require("../util/database");

const elecciones = sequelizeCone.define("elecciones",{

    nombre:{
        type: Sequelize.STRING,
        allowNull: false, 
    },
    fecha:{
        type: Sequelize.STRING,
        allowNull: false, 
    },
    estado:{
        type: Sequelize.BOOLEAN,
        allowNull: false, 
    }

});

module.exports = elecciones;