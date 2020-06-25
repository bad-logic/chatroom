



"use strict";

const {chatroom} = require("../../models");

const {Joi}= require("../../modules");

const chatroomQuery = require("./chatroom.query")({chatroomModel:chatroom});

const chatroomController = require("./chatroom.controller")({chatroomQuery,Joi});


module.exports = Object.freeze({
    chatroomController,chatroomQuery
});