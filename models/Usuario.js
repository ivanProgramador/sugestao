const Sequelize  =  require("sequelize");
const connection = require("../database/database");

const Usuario = connection.define('usuario',{
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone:{
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco:{
        type: Sequelize.STRING,
        allowNull: false
    },
    login:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    senha:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Usuario.sync({force:false});

module.exports = Usuario;