const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuarios");

// const{id,nome,login,senha,detalhes,nivel} = req.body;


router.get('/usuarios',(req,res)=>{
     Usuario.findAll().then(usuarios=>{
         res.render('usuarios/index',{usuarios:usuarios});
     })   
});
router.get('/usuario/edicao/:id',(req,res)=>{
    const id = req.params.id;
    Usuario.findOne({where:{id:id}}).then(usuario=>{
        res.render('usuarios/edit',{usuario:usuario})
    })
});
router.post('/usuario/atualizar',(req,res)=>{
    const{id,nome,login,senha,detalhes,nivel} = req.body;
    Usuario.update({nome:nome,login:login,senha:senha,detalhes:detalhes,nivel:nivel},{where:{id:id}}).then(()=>{
        res.redirect('/usuarios')
    });

});
router.post('/usuario/cadastrar',(req,res)=>{
    const{nome,login,senha,detalhes,nivel} = req.body;
    Usuario.create({nome:nome,login:login,senha:senha,detalhes:detalhes,nivel:nivel}).then(()=>{
        res.redirect('/usuarios')
    })

});

module.exports = router;