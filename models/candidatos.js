const Sequelize = require("sequelize");
const sequelizeCone = require("../util/database");

const candidatos = sequelizeCone.define("candidatos",{

    nombre:{
        type: Sequelize.STRING,
        allowNull: false, 
    },
    apellido:{
        type: Sequelize.STRING,
        allowNull: false, 
    },
    estado:{
        type: Sequelize.BOOLEAN,
        allowNull: false, 
    },
    foto:{
        type: Sequelize.STRING,
        allowNull: true, 
    }

});

module.exports = candidatos;