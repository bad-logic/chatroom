







"use strict";

const {dotenv} = require('../modules');

dotenv.config();


module.exports = Object.freeze({
    port:process.env.SERVER_PORT || 8000,
    host:process.env.SERVER_HOST || "localhost"
});