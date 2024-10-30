const Sequelize = require("sequelize");
const connection = require("../database/database");

const Item = connection.define('item',{
    codigo:{
         type: Sequelize.INTEGER,
         allowNull:false
    },
    nome:{
        type: Sequelize.STRING,
        allowNull:false
    },
    detalhes:{
        type: Sequelize.STRING,
        allowNull:false
    },
    preco:{
        type: Sequelize.DOUBLE,
        allowNull:false
    },
    imagem: {
        type: Sequelize.STRING,
        allowNull: true
    }
    
});

Item.sync({force:false})
module.exports = Item;