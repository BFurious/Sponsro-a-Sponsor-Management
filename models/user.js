var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var sponsSchema=new mongoose.Schema({
    
    companyName: String,
    sponsorType: String,
    durationNo: Number,
    durationMon:String,
    contactNo: String,
    contactEmail: String,
    logo:String
});

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    category: String,
    sponsordata:[sponsSchema]
    });
    

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",UserSchema);