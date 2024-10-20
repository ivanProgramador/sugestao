const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

connection.authenticate().catch(err=>{
    console.log(err);
})

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));

//models 
const Investimento = require("./models/Investimento"); 
//controllers
const investimentoController = require("./controllers/InvestimentoController");

app.use("/",investimentoController);
app.use("/",(req,res)=>{
     res.render("index");
});
app.listen(8080,()=>{
    console.log('online');
})