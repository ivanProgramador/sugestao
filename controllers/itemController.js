const express = require("express");
const router = express.Router();
const Item = require("../models/item");
const { Sequelize } = require("sequelize");

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/');
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname));
    }
});

const upload = multer({storage:storage});




router.get("/itens",(req,res)=>{
  Item.findAll().then(itens=>{
      res.render("itens/index",{itens:itens});
  })
})

router.post("/itens/cadastrar",upload.single('imagem'), async(req,res)=>{

    let{codigo,nome,detalhes,preco} = req.body;

    const imagemPath = req.file ? req.file.path.replace(/\\/g, '/') : null;
  
     await Item.create({
        codigo:codigo,
        nome:nome,
        detalhes:detalhes,
        preco:preco,
        imagem:imagemPath
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

router.post("/itens/atualizar",upload.single('imagem'),async(req,res)=>{


    let{id,codigo,nome,detalhes,preco}= req.body; 
    const imagemPath = req.file ? req.file.path: null;

    Item.update(
        {codigo:codigo,nome:nome,detalhes:detalhes,imagem:imagemPath,preco:preco},
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

//rota de busca de itens

router.get('/search', async (req, res) => {
    const query = req.query.query || '';
    try {
        const items = await Item.findAll({
            where: {
                nome: {
                    [Sequelize.Op.like]: `%${query}%` // Altere 'name' para a propriedade correta
                }
            },
            limit: 10 // Limite de resultados, ajuste conforme necessário
        });
        res.json(items);
        console.log(items)
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar itens');
    }
});

router.get('/detalhes/:id',(req,res)=>{

    const id = req.params.id;

    Item.findOne({where:{id:id}}).then(item=>{
         res.render('itens/detalhes',{item:item});
    })

     
})




module.exports = router;

