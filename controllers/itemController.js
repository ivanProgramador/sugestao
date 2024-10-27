const express = require("express");
const router = express.Router();
const Item = require("../models/item");




router.get("/itens",(req,res)=>{
  Item.findAll().then(itens=>{
      res.render("itens/index",{itens:itens});
  })
})

router.post("/itens/cadastrar",(req,res)=>{

    let{codigo,nome,detalhes,preco} = req.body;

    
    Item.create({
        codigo:codigo,
        nome:nome,
        detalhes:detalhes,
        preco:preco
    }).then(()=>{

        res.redirect("/itens")
 })
})

router.get("/itens/edicao/:id",(req,res)=>{
    let id = req.params.id;

    Item.findOne({where:{id:id}}).then(item=>{
        res.render('itens/edit',{item:item})
    })
})

router.post("/itens/atualizar",(req,res)=>{
    let{id,codigo,nome,detalhes,preco}= req.body; 

    Item.update(
        {codigo:codigo,nome:codigo,detalhes:codigo,preco:preco},
        {where:{id:id}}
    ).then(()=>{
        res.redirect("/itens")
    })
})

router.post("/itens/apagar",(req,res)=>{
    let id = req.body.id;

    Item.destroy({where:{id:id}}).then(()=>{
      
        res.redirect("/itens")
        
    });
})




module.exports = router;
