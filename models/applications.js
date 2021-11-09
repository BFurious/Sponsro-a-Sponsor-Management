var mongoose = require("mongoose");

var sponsSchema=new mongoose.Schema({
    
    companyName: String,
    sponsorType: String,
    durationNo: Number,
    durationMon:String,
    contactNo: String,
    contactEmail: String
});

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    category: String,
    sponsordata:[sponsSchema]
    });

module.exports = mongoose.model("application",UserSchema);