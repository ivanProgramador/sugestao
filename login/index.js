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
    
    //recebendo as flash sessions na rota index 

    var emailError = req.flash("emailError");
    var pontosError = req.flash("pontosError");
    var nomeError = req.flash("nomeError");

    


    //caso o cliente tenha acertado tudo e as flashes fiquem vazias
    
    emailError =(emailError == undefined || emailError.length === 0)? undefined: emailError;
    pontosError =(pontosError == undefined || pontosError.length === 0)? undefined: pontosError;
    nomeError =(nomeError == undefined || nomeError.length === 0)? undefined: nomeError;
    

   
       

    //enviando as flashes atráves da rota 
    res.render("index",{emailError,pontosError,nomeError});
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


        /*
          flash sessions são sessões que só duram uma requisição
          nesse caso eu estou usando isso para enviar uma mensagem 
          ao usuário para que ele saiba qual foi erro  que ele 
          cometeu ao tentar entrar  
        */ 

        req.flash("emailError",emailError);
        req.flash("pontosError",pontosError);
        req.flash("nomeError",nomeError);
          
        res.redirect("/")

    }else{
        res.send("formulario completado")

      
         
    }

   

  
   
   
})


app.listen(1122,()=>{
    console.log('Rodando')
});