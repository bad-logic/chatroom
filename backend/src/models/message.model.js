







"use strict";


const {mongoose} = require("../modules");

const messageSchema = new mongoose.Schema({
    chatroom:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'chatroom',
        required:[true,'chatroom is required']
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:[true,'user is required']
    },
    message:{
        type:String,
        required:[true, 'message is required']
    }
},{timestamps:true});



module.exports = messageSchema;