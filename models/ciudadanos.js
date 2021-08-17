const Sequelize = require("sequelize");
const sequelizeCone = require("../util/database");

const ciudadanos = sequelizeCone.define("ciudadanos",{

    cedula:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
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
    estado:{
        type: Sequelize.BOOLEAN,
        allowNull: false, 
    },

});

module.exports = ciudadanos;