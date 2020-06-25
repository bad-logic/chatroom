




"use strict";


const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require("body-parser");

const http = require('http');

const io = require('socket.io');

const path = require('path');

const dotenv = require("dotenv");

const morgan = require('morgan');

const jsonwebtoken = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const Joi = require('@hapi/joi');

const compression = require("compression");

module.exports = Object.freeze({
    express,mongoose,http,path,io,bodyParser,dotenv,jsonwebtoken,bcrypt,morgan,Joi,compression
});