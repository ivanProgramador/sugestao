const express = require("express");
const router = express.Router();
const Investimento = require("../models/Investimento");
const { where } = require("sequelize");



router.get("/invest",(req,res)=>{
   Investimento.findAll().then(investimentos=>{
      
       res.render('invest/index',{investimentos:investimentos});
   })
});

router.post("/invest/cadastrar",(req,res)=>{
    const{valor,descricao,forma_pg} =req.body;
    Investimento.create({valor:valor,descricao:descricao,forma_pg:forma_pg}).then(()=>{
        res.redirect("/invest");
    })
});

router.get("/invest/edicao/:id",(req,res)=>{
   const id = req.params.id;
  
Investimento.findOne({where:{id:id}}).then(investimento=>{
    res.render("invest/edit",{investimento:investimento});
     
})

  
});

router.post("/invest/atualizar",(req,res)=>{

    const{id,valor,descricao,forma_pg} =req.body;

    Investimento.update({valor:valor,descricao:descricao,forma_pg:forma_pg},{where:{id:id}}).then(()=>{
        res.redirect("/");
    })
});

router.post("/invest/deletar",(req,res)=>{
    const id = req.body.id;
    Investimento.destroy({where:{id:id}}).then(()=>{
        res.redirect("/invest")
    });
});



module.exports = router;