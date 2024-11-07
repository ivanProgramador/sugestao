var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var flash = require("express-flash")
const session = require('express-session');

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(session({
    secret:'Keyboard cat',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:true}
}));
app.use(flash());

app.get("/",(req,res)=>{
    res.render("index")
});

app.post("/form",(req,res)=>{
  
    var {email,nome,pontos} = req.body;

  
   
    res.send(email);
})


app.listen(1122,()=>{
    console.log('Rodando')
});