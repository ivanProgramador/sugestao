const Sequelize = require("sequelize");
const connection = require("../database/database");
const { Types } = require("mysql2");


const Investimento = connection.define('investimento',{

    valor:{
         type: Sequelize.DOUBLE,
         allowNull:false
    },
    
    descricao:{
        type: Sequelize.STRING,
        allowNull:false
   },

   forma_pg:{
    type: Sequelize.STRING,
    allowNull:false
   }
});

Investimento.sync({force:false});

module.exports = Investimento;