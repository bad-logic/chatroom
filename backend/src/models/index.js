



"use strict";


const {mongoose} = require("../modules");


const userSchema = require("./user.model");
const chatRoomSchema  = require("./chatroom.model");
const messageSchema = require("./message.model");

module.exports = Object.freeze({
    user:mongoose.model('user',userSchema),
    chatroom:mongoose.model('chatroom',chatRoomSchema),
    message:mongoose.model('message',messageSchema),
});