var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var flash = require("express-flash")
const session = require('express-session');
var cookieParser = require("cookie-parser");

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cookieParser('dsihdsjkadhsda'))

app.use(session({
    secret:'Keyboard cat',
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:60000}
}));
app.use(flash());

app.get("/",(req,res)=>{
    res.render("index")
});

app.post("/form",(req,res)=>{
  
   var {email,nome,pontos} = req.body;
   /*
     é importante que cada teste tenha o seu proprio if
     assim os dados vão seguindo um fuxo de teste 
     para que o retorno seja decidido no final
      
   */
   
    var emailError;
    var pontosError;
    var nomeError;

    if(email == undefined || email ==""){
        emailError = "O e-mail não pode ser vazio";
    }

    if(pontos == undefined || pontos < 20){
        pontosError = "Você não pode ter menos de 20 pontos"
    }

    if(nome == undefined || nome == ""){
        nomeError = "O nome não pode ser vazio"
    }

    if(nome.length < 4){
        nomeError  = "O nome é muito pequeno"
    }

     
     
    if(emailError != undefined || pontosError != undefined || nomeError != undefined){



        //se todas as variaveis chegaram aqui sem nenhum valor significa que não aconteceram erros
          
        res.redirect("/")

    }else{
        res.send("formulario completado")

      
         
    }

   

  
   
   
})


app.listen(1122,()=>{
    console.log('Rodando')
});