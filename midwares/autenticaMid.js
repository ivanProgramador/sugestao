const autenticaMid = (req,res,next)=>{

    if(req.session.user.id){
        next();
    }else{
        res.redirect("/entrada")
    }

}

module.exports = autenticaMid;