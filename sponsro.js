
const express=require("express"), 
    mongoose=require("mongoose"),
    bodyParser = require("body-parser"),
    LocalStrategy           = require("passport-local"),
    flash                   = require("connect-flash"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    User                    = require("./models/user"),
    Admin                   = require("./models/admin.js"),
    methodOverride          = require("method-override"),
    app                     = express(),
    passport                = require("passport"),
    home                    = require("./routes/home"),
    signup                  = require("./routes/authenticate"),
    profile                 = require("./routes/profile")

    mongoose.connect("mongodb+srv://BFurious:Kumar146@cluster0.jaeg9.mongodb.net/SponsroAdmin?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true });
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(require("express-session")({
    secret:"No secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
   res.locals.ejsid=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});


app.use(signup);
app.use(home);
app.use(profile);
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("started");
});