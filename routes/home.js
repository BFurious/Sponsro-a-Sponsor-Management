var express = require("express");
var router = express.Router();
const middlewares = require("../middlewares/auth");
const userController = require("../controllers/user");

router.get("/", function(req, res){
    res.render("home")
})
router.get("/about",function(req,res){
    res.render("about");
})
router.get("/guide",function(req,res){
    res.render("guide");
})


module.exports = router;