const Sequelize = require("sequelize");
const sequelizeCone = require("../util/database");

const partidos = sequelizeCone.define("partidos",{

    nombre:{
        type: Sequelize.STRING,
        allowNull: false, 
    },
    descripcion:{
        type: Sequelize.STRING,
        allowNull: false, 
    },
     logo:{
        type: Sequelize.STRING,
        allowNull: true, 
    },
    estado:{
        type: Sequelize.BOOLEAN,
        allowNull: false, 
    }

});

module.exports = partidos;