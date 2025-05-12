const mongoose = require("mongoose"); 

const Genders = {
    Male:1,
    Female:2,
    Other:3
}

const UserSchema = new mongoose.Schema({
    Username:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        // required:true
    },
    PhoneNo:{
        type:Number,
        // required:true
    },
    Gender:{
        type: Number,
        enum : [Genders.Male,Genders.Female,Genders.Other],
        // required:true
    },
    Address:{
        type:String,
        // required:true
    },
})
const UserData = mongoose.model("Users",UserSchema);
module.exports = {UserData , Genders};