const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuarios");
const { Sequelize } = require("sequelize");

//formulario de cadastro 



router.get("/usuario",(req,res)=>{
    res.render("usuarios/index");
});

router.post("/usuario/cadastrar",(req,res)=>{
    const {email,senha} = req.body;
    Usuario.create({email:email,senha:senha}).then(()=>{
        res.redirect("/usuario");
    });
});

router.get("/criarInicial",(req,res)=>{

    Usuario.create({email:'admin@teste.com',senha:'1010'}).then(()=>{
        res.redirect('/login');
    })

});



module.exports = router;