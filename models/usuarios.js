const Sequelize = require("sequelize");
const connection = require("../database/database");
const bcrypt = require('bcrypt');



const Usuario = connection.define('Usuario', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});



Usuario.sync({force:false});

module.exports = Usuario;