



"use strict";


const {mongoose} = require("../modules");

const chatRoomSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:[true,'name of the chatroom is required']
    }
},{timestamps:true});



module.exports = chatRoomSchema;