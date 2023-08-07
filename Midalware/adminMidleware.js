const session =require('express-session')


exports.isLogin=(req,res,next)=>{
    if(req.session.loggedIn){
        // res.redirect("/")
        res.render("admin/adminHome", { admin: true, message: "Logged" });
    }else{
        next();
    }

}

exports.isLogout=(req,res,next)=>{
    if(req.session.loggedIn){
       next();
    }else{
        res.redirect("/User/login")
    }

}