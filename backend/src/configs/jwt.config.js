




"use strict";

const {dotenv} = require("../modules");

dotenv.config();


module.exports = Object.freeze({
    auth_secret: process.env.AUTH_SECRET,
    link_secret:process.env.LINK_SECRET
});