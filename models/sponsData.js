var mongoose = require("mongoose");
var sponsorSchema=new mongoose.Schema({
    
    companyName: String,
    sponsorType: String,
    durationNo: Number,
    durationMon:String,
    contactNo: String,
    contactEmail: String,
    logo:String
});
module.exports = mongoose.model("sponsData",sponsorSchema);