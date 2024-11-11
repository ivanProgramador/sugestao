const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuarios");
const session = require('express-session');
const flash = require("express-flash");
const { Sequelize } = require("sequelize");


router.use(flash());
router.use(session({
    secret:'Keyboard cat',
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:60000}
}));






router.get("/login",(req,res)=>{

    var emailError = req.flash("emailError");
    var senhaError = req.flash("senhaError");
    var erroUsu = req.flash("erroUsuario");

    res.render("login/index",{emailError,senhaError,erroUsu});
});



router.post("/entrar",(req,res)=>{

    var{email,senha} = req.body;
    
    var emailError;
    var senhaError;

    if(email == undefined || email == ""){
       emailError = "O email não pode ser vazio";
    }
    if(senha == undefined || senha == ""){
        senhaError = "A senha não pode ser vazia";
    }

    if(emailError != undefined || senhaError != undefined){

        
        req.flash("emailError",emailError);
        req.flash("senhaError",senhaError);

        res.redirect("/login")

       
   
   
    }else{

        Usuario.findOne({where:{senha:senha,email:email}}).then(usuario=>{

         if(usuario == null){

            res.redirect("/login")
        }else{

            if(usuario.email == email){
                var emailok = true;
            }else{
                emailok = false;
            }
            if(usuario.senha == senha){
               var senhaok = true;
            }else{
               senhaok = false;
            }


            if(senhaok == true && emailok == true){

             

               res.render("index")
            }
            if(senhaok == false || emailok == false){

                res.redirect("/login");
            }




        }
            

            


        })


    }

});

module.exports = router;