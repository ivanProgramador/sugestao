app.post("/form",(req,res)=>{
  
    var {email,nome,pontos} = req.body;
    /*
      é importante que cada teste tenha o seu proprio if
      assim os dados vão seguindo um fuxo de teste 
      para que o  retorno seja decidido no final 
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
 