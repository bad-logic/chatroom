


"use strict";

const {dotenv} = require("../modules");

dotenv.config();


module.exports = Object.freeze({
    name:process.env.DB_NAME || "chatApp",
    mongo_uri: process.env.MONGO_URI || "mongodb://localhost:27017",
    options:{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
});