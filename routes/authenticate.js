var express = require("express"),
 router = express.Router(),
 passport = require("passport"),
 middlewares = require("../middlewares/auth"),
 User = require("../models/user.js"),
 Admin=require("../models/admin.js"),
 sponsData=require("../models/sponsData")

 
router.get("/register",middlewares.isLogged,function(req, res){
    res.render('signup');
})

router.get("/login",middlewares.isLogged,function(req, res){
    res.render('login');
})

router.post("/register", function(req, res){
    var type=req.body.option;
    var data={
        username:req.body.username,
        category: type
    }
    if(type==="1"){
        User.register(data,req.body.password, function(err, user){
            if(err){
                req.flash("error", err.toString());
                return res.redirect("/register");
            } 
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "User Registered successfully!!!");
                res.redirect("/"+req.user.username+"/"+type);
            }); 
        });
    }
    else if(type==="0")
    {
        User.register(data,req.body.password, function(err, user){
            if(err){
                req.flash("error", err.toString());
                return res.redirect("/register")
            } 
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Admin Registered successfully!!!");
                res.redirect("/"+req.user.username+"/"+type);
            }); 
        });
    }

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
        res.redirect("/"+req.user.username+"/"+req.user.category);
    })
    
    })(req, res, next);
});
router.get("/:profile/:type/search",middlewares.isLoggedIn,function(req,res){
    var username=req.params.profile;
    var query=req.query.searchText;
    let choice=req.query.choice;
    sponsData.find({$or: [{companyName:{$regex: query, $options: '$i'}},{sponsorType:{$regex: query, $options: '$i'}}]},function(err,data){  
        if(err){  
            req.flash("error",err.tostring()); 
        }
        else{ 
            if(req.params.type==="0") 
            {res.render("search",{data:data, ejsUsername:username});  
            }
            else
            {res.render("usersearch",{data:data, ejsUsername:username});  

            }
        }  
    })   
})
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged You Out")
    res.redirect("/login");
});

module.exports = router;
