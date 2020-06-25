





"use strict";


const {jwt} = require("../configs");
const {jsonwebtoken} = require("../modules");

function generateJWTToken(payload,type="AUTH"){
    
    return new Promise((resolve,reject)=>{

        switch(type){

            case "AUTH":
                jsonwebtoken.sign(payload,jwt.auth_secret,{expiresIn:"4h"},(err,token)=>{
                    if(err){
                        return reject('cannot generate token');
                    }else{
                        return resolve("Bearer "+ token);
                    }
                });
                break;

            case "LINK":
                jsonwebtoken.sign(payload,jwt.link_secret,{expiresIn:"20m"},(err,token)=>{
                    if(err){
                        return reject('cannot generate token');
                    }else{
                        return resolve(token);
                    }
                });
                break;
        }
    });
}

function verifyJWTToken(jwtToken,type="AUTH"){

    return new Promise((resolve,reject)=>{

        switch(type){
            
            case "AUTH":
                const token = jwtToken.split(' ');
                if(token.length!==2 && token[0]!== "Bearer"){
                    return reject('CORRUPTED_TOKEN');
                    // const error = new Error('CORRUPTED_TOKEN');
                    // error.info = 'provided authorisation token is corrupted';
                    // error.statusCode = 422;
                    // throw error;
                }
                jsonwebtoken.verify(token[1],jwt.auth_secret,(err,decode)=>{
                    if(err){
                        return reject('CORRUPTED_TOKEN');
                        // const error = new Error('SESSION_TIMED_OUT');
                        // error.info = 'your session has ended. please log in again to continue';
                        // error.statusCode = 400;
                        // throw error;
                    }else{
                        return resolve(decode);
                    }
                });
                break;
                
            case "LINK":
                jsonwebtoken.verify(jwtToken,jwt.link_secret,(err,decode)=>{
                    if(err){
                        return reject('CORRUPTED_TOKEN');
                        // const error = new Error('SESSION_TIMED_OUT');
                        // error.info = 'your session has ended. please log in again to continue';
                        // error.statusCode = 400;
                        // throw error;
                    }else{
                        return resolve(decode);
                    }
                });
                break;
        }

    });
}


module.exports = Object.freeze({generateJWTToken,verifyJWTToken});