









"use strict";

const {jwt} = require("../../utils");

function authController({userQuery,Joi}){
    
    return Object.freeze({registerUser,signIn});

    async function registerUser(req){
        try{

            const validationSchema = Joi.object({
                username: Joi.string().min(3).max(20).required(),
                email: Joi.string().email().required(),
                password: Joi.string().alphanum().min(6).max(30).required()
            });
            const {value,error} = validationSchema.validate(req.body);
            if(error){
                const err = new Error("VALIDATION_ERROR");
                err.info = error.message;   
                err.statusCode = 422;
                throw err;
            }

            const result = await userQuery.addUser(value);
            return {
                created:true,
                data:result
            }
        }catch(err){
            throw err;
        }
    }

    async function signIn(req){
        try{

            const validationSchema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().required()
            });
            const {value,error} = validationSchema.validate(req.body);
            if(error){
                const error = new Error("BAD_REQUEST. PARAMETERS_ERROR");
                error.statusCode = 404;
                error.info = `You need to send both email and password to sign in`;
                throw error;
            }
            
            const result = await userQuery.compareEmailAndPassword(value.email,value.password);
            const token = await jwt.generateJWTToken({userId:result.userId.toHexString()},"AUTH");
            return {
                loggedIn:true,
                data:{token,...result}
            }
            
        }catch(err){
            throw err;
        }
    }

}


module.exports = authController;