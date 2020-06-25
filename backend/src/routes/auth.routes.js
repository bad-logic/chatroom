


"use strict";



const {express} = require("../modules");

const {user} = require("../components");
const {requestHandler} = require("../lib");

const router = express.Router();

// /auth/register
router.post('/register',requestHandler({controllerFn:user.authController.registerUser}));

// /auth/login
router.post("/login",requestHandler({controllerFn:user.authController.signIn}));

module.exports = router;