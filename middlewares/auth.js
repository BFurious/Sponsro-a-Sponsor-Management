var middlewares = {};

middlewares.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Need to Register or Login");
    res.redirect("/register");
}

middlewares.isLogged = function(req, res, next){
    if(req.isAuthenticated()){
        req.flash("error","Already Logged in");
       res.redirect("/"+req.user.username+"/0");
    }
    return next();
}

module.exports = middlewares;