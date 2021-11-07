var express = require("express");
var router = express.Router();
var passport = require("passport");
var middlewares = require("../middlewares/auth");
var User = require("../models/user.js");
var Admin=require("../models/admin.js");

router.get("/register",middlewares.isLogged,function(req, res){
    res.render('signup');
})

router.get("/login",middlewares.isLogged,function(req, res){
    res.render('login');
})

router.post("/register", function(req, res){
    var type=req.body.radio;
    var data={
        username:req.body.username,
        category: type
    }
        User.register(data,req.body.password, function(err, user){
            if(err){
                console.log(err.toString()); 
                req.flash("error", err.toString());
                return res.redirect("/register")
            } 
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Registered successfully!!!");
                res.redirect(`/${req.user.username}`);
            }); 
        });

});

router.post("/login",function(req,res,next){
    passport.authenticate("local",function(err, user, info){
    if(err)
    {  
        req.flash("error",err.toString()); 
    }
    if(!user){
        req.flash("error",info.toString());
        res.redirect("/login");
    }
    req.logIn(user,function(err){
        if (err) 
        { 
            req.flash("error",err.toString()); 
        }
        req.flash("success","Log In sucessfully!!!");
        res.redirect("/"+user.username);
    })
    
    })(req, res, next);
});

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged You Out")
    res.redirect("/login");
});

module.exports = router;
