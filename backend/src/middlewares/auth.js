


"use strict";


const {user} = require("../components");


const {jwt} = require("../utils");


async function authenticateTheLoggedInUser(req,res,next){

    try{

        const token = req.headers.authorization;
        if (!token) {
            const error = new Error('FORBIDDEN');
            error.info = `Unauthorised access`;
            error.statusCode = 403;
            throw error;
        }
        const decode = await jwt.verifyJWTToken(token,"AUTH");
        const existingUser = await user.userQuery.findUserWithId(decode.userId);
        if(existingUser.length<1){
            // in case user has been deleted but the token is still in use by some means
            // so such token must not be granted access
            const error = new Error('FORBIDDEN');
            error.info = `Unauthorised access`;
            error.statusCode = 403;
            throw error;
        }
        req.sessionUser = existingUser[0];
        next();

    }catch(err){
        if(err === "CORRUPTED_TOKEN"){
            const error = new Error('CORRUPTED_AUTHORISATION_KEY');
            error.info = `Session Timed Out. Please Log in Again`;
            error.statusCode = 400;
            return next(error);
        }
        return next(err);
    }

}

module.exports = Object.freeze({authenticateTheLoggedInUser});