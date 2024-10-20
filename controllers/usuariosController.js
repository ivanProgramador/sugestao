const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");

router.get("/usuarios",(req,res)=>{
    Usuario.findAll().then(usuarios=>{
       
        res.render('usuarios/index',{usuarios:usuarios});
    })
 });

 
 router.post("/usuarios/cadastrar",(req,res)=>{

     const{nome,telefone,endereco,login,senha} =req.body;

     Usuario.create({
        nome:nome,
        telefone:telefone,
        endereco:endereco,
        login:login,
        senha:senha
     }).then(()=>{
         res.redirect("/usuarios");
     })

 });
 
 router.get("/usuarios/edicao/:id",(req,res)=>{
    const id = req.params.id;
   
 Usuario.findOne({where:{id:id}}).then(usuario=>{
     res.render("usuarios/edit",{usuario:usuario});
 })
 
   
 });
 
 router.post("/usuarios/atualizar",(req,res)=>{
 
    const{nome,telefone,endereco,login,senha} =req.body;
 
     Usuario.update({nome:nome,telefone:telefone,endereco:endereco,login:login,senha:senha},{where:{id:id}}).then(()=>{
         res.redirect("/usuarios");
     })
 });
 
 router.post("/usuario/deletar",(req,res)=>{
     const id = req.body.id;
     Usuario.destroy({where:{id:id}}).then(()=>{
         res.redirect("/usuarios")
     });
 });

module.exports = router;