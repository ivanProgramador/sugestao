const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuarios")
const session = require("express-session")
const bcrypt = require("bcrypt");

router.use(session({
    secret:"chavedeseguranca",
    resave: false,
    saveUninitialized: true
}));


router.get('/entrada',(req,res)=>{
    res.render("login/index");
})


router.post('/login', async(req,res)=>{
     
    const user = await Usuario.findOne({where:{login:req.body.login}});
    if(user && await bcrypt.compare(req.body.senha, user.senha)){
        req.session.userId = user.id;
        res.redirect("http://localhost:8070/");
    }else{
        res.redirect('/login');
    }

})

module.exports = router;