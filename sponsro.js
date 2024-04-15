
import { ENV_VARIABLES } from "./config/envVariables";
import { DATABASE } from "./config/database.js";
let envVariables = new ENV_VARIABLES();
let database = new DATABASE();
import express from "express";
import bodyParser from "body-parser";
import LocalStrategy from "passport-local";
import flash from "connect-flash"
import User from "./models/user";
import methodOverride from "method-override";
import passport from "passport";
import home from "./routes/home";
import signup from "./routes/authenticate";
import profile from "./routes/profile";

let app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(require("express-session")({
    secret: "No secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function (req, res, next) {
    res.locals.ejsid = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


app.use(signup);
app.use(home);
app.use(profile);
app.listen(process.env.PORT, process.env.IP, function () {
    console.log(`Server Started at ${envVariables.PORT}`);
});