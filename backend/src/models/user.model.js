



"use strict";


const {mongoose} = require("../modules");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'username is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required']
    }
},{timestamps:true});



module.exports = userSchema;