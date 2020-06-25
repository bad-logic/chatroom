



"use strict";


const {user} = require("../../models");
const {Joi} = require("../../modules");

const userQuery = require("./user.query")({userModel:user});

const userController = require("./user.controller")({userQuery:userQuery,Joi});

const authController = require('./auth.controller')({userQuery:userQuery,Joi});



module.exports = Object.freeze({
    userQuery,userController,authController
});