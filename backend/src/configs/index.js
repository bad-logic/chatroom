

"use strict";


const db = require("./db.config");
const server = require("./server.config");
const jwt = require("./jwt.config");

module.exports = Object.freeze({
    db,server,jwt
});