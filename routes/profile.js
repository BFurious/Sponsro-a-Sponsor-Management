const User=require("../models/user"),
    sponsData=require("../models/sponsData"),
    express = require("express"),
     router = express.Router(),
     middlewares = require("../middlewares/auth"),
     controller=require("../controllers/user")

router.get("/:profile",middlewares.isLoggedIn,function(req,res){
    var username=req.params.profile;
    res.render("profile",{
        ejsUsername:username
    });
})

router.get("/:profile/addSponsor",middlewares.isLoggedIn,function(req,res){
    var username=req.params.profile;
    res.render("addSponsor",{ 
        ejsUsername:username
    });
})
router.post("/:profile/addSponsor",middlewares.isLoggedIn,function(req,res){
    var username=req.params.profile;
    var sponsdata=new sponsData(req.body);
    sponsdata.save(function (err,user) {
            if (err) {
                console.log(err);
            }

            else {
            }
        });
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
                    res.redirect("/"+username);
                }
            })
        }
    })
});
router.get("/:profile/search",function(req,res){
    var username=req.params.profile;
    var query=req.query.searchText;
    let choice=req.query.choice;
    sponsData.find({$or: [{companyName:{$regex: query, $options: '$i'}},{sponsorType:{$regex: query, $options: '$i'}}]},function(err,data){  
        if(err){  
            console.log(err);  
        }
        else{  
            res.render("search",{data:data,ejsUsername:username});  
        }  
    });    
});
router.get("/:profile/:id/update",function(req,res){ 
    var username=req.params.profile;  
    sponsData.findById(req.params.id,function(err,data){
            if(err)
            {
                console.log("err");
            }
            else{
                    res.render("update.ejs",{data:data,ejsUsername:username});
            }
    })
})
router.put("/:profile/:id",(req, res) => {
    var username=req.params.profile;  
        sponsData.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
            if (err) {
                console.log("err");
            }
            else {
                res.redirect("/"+username);
            }
        });
    })
router.delete("/:profile/:id",(req, res) =>{   var username=req.params.profile;
        sponsData.findByIdAndRemove(req.params.id,function (err) {
            if (err) {
                console.log("err");
            }
            else {
              
            }
        });
    })
module.exports = router;