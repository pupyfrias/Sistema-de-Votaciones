const Sequelize = require("sequelize");
const sequelizeCone = require("../util/database");

const puesto = sequelizeCone.define("puesto_electivo",{

    nombre:{
        type: Sequelize.STRING,
        allowNull: false, 
    },
    descripcion:{
        type: Sequelize.STRING,
        allowNull: false, 
    },
    estado:{
        type: Sequelize.BOOLEAN,
        allowNull: false, 
    }

});

module.exports = puesto;