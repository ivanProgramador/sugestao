const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
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


connection.authenticate().catch(err=>{
    console.log(err);
})

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//models 
const Usuario = require("./models/usuarios");
const Item = require("./models/item");

//controllers
const itensController = require("./controllers/itemController");





app.use("/",itensController);



app.use("/",(req,res)=>{
     res.render("index");
});





app.listen(8070,()=>{
    console.log('online');
})