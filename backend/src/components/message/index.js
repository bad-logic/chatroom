


"use strict";

const {message} = require("../../models");

const messageQuery = require("./message.query")({messageModel:message});




module.exports = Object.freeze({messageQuery});