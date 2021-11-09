const User=require("../models/user"),
    sponsData=require("../models/sponsData"),
    express = require("express"),
     router = express.Router(),
     middlewares = require("../middlewares/auth"),
     controller=require("../controllers/user")

     /*--------------------------DASHBOARD--------------------------*/

router.get("/:profile/:type",middlewares.isLoggedIn,function(req,res){
    var type=req.params.type;
    var username=req.params.profile;
    if(type==="0"){
        res.render("profile",{
            ejsUsername:username
        });
    }
    else if(type==="1")
    {
        res.render("userprofile",{
            ejsUsername:username
        });
    }
})

/*-------------------------USER DATA---------------------------*/

router.get("/:profile/:type/userdata",middlewares.isLoggedIn,function(req,res){
    User.findOne({username:req.params.profile},function(err,user){
        if(err)
        {
            req.flash("error",err.toString());
        }
        else
        {    res.render("userdata",{userdata:user});
        }
    })
   
})

/*-------------------------ADD SPONSOR----------------------------*/

router.get("/:profile/:type/addSponsor",middlewares.isLoggedIn,function(req,res){    console.log("entered");
    var username=req.params.profile;
    res.render("addSponsor",{ejsUsername:username});
})

router.post("/:profile/:type/addSponsor",function(req,res){
    var username=req.params.profile;
    var sponsdata=new sponsData(req.body);
    sponsdata.save(function (err,user) {
            if (err) {
                req.flash("error",err.toString());
            }
    })

    User.findOne({username:req.params.profile},function(err,user){
        if(err)
        {
            req.flash("error",err.toString());
        }
        else
        {
            user.sponsordata.push(req.body);
            user.save(function(err,user){
                if(err)
                {
                    req.flash("error",err.toString());
                }
                else
                {
                    req.flash("success","Post Successfully added");
                    res.redirect("/"+username+"/0");
                }
            })
        }
    })
})

/*--------------------------ADMIN-POSTS----------------------------*/
router.get("/:profile/:type/posts",middlewares.isLoggedIn,function(req,res){
    var username=req.params.profile;
    
    User.findOne({username:req.params.profile},function(err,user){
        if(err)
        {
            req.flash("error",err.toString());
        }
        else
        {
            res.render("adminposts",{data:user.sponsordata,ejsUsername:username});
        }
    })
})

/*------------------------SPONSOR-APPLY---------------------------*/

router.post("/:profile/:type/apply",function(req,res){
    var username=req.params.profile;

    User.findOne({username:req.params.profile},function(err,user){
        if(err)
        {
            req.flash("error",err.toString());
        }
        else
        {
            user.sponsordata.push(req.body);
            user.save(function(err,user){
                if(err)
                {
                    req.flash("error",err.toString());
                }
                else
                {
                    req.flash("success","Applied Successfully");
                    res.redirect("/"+username+"/1/applications");
                }
            })
        }
    })
})

/*--------------------------USER APPLICATIONS----------------------------*/

router.get("/:profile/:type/applications",middlewares.isLoggedIn,function(req,res){
    var username=req.params.profile;
    User.findOne({username:req.params.profile},function(err,user){
        if(err)
        {
            req.flash("error",err.toString());
        }
        else
        {
            res.render("userApp",{data:user.sponsordata,ejsUsername:username});
        }
    })
})

/*--------------------------UPDATE----------------------------*/

router.get("/:profile/:type/:id/update",middlewares.isLoggedIn,function(req,res){ 
    var username=req.params.profile;  
    sponsData.findById(req.params.id,function(err,data){
            if(err)
            {
                req.flash("error",err.toString());
            }
            else{
               
                    res.render("update.ejs",{data:data,ejsUsername:username});
            }
    })
})

router.put("/:profile/:type/:id",(req, res) => {
    var username=req.params.profile;  
        sponsData.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
            if (err) {
                req.flash("error",err.toString());
            }
            else {
                req.flash("success","Updated Successfully");
                res.redirect("/"+username+"/0");
            }
        })
    })

    /*--------------------------DELETE----------------------------*/

router.delete("/:profile/:type/:id",(req, res) =>{   
    var username=req.params.profile;
        sponsData.findByIdAndRemove(req.params.id,function (err) {
            if (err) {
                req.flash("error",err.toString());
            }
            else {
                req.flash("success","Deleted Successfully");
                res.redirect("/"+username+"/0");
            }
        })
    })
module.exports = router;