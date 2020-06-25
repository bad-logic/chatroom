"use strict";

// SOCKET SETUP
const {user} = require("./components");

const {jwt} = require("./utils");

const socketAuthenticate = async (socket,next)=>{
    try{
        const token = socket.handshake.query.authorization;
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
        socket.sessionUser = existingUser[0];
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

let io;
module.exports = Object.freeze({
    init:(socketIo,httpServer)=>{
        io = socketIo(httpServer);
        io.use(socketAuthenticate);
        return io;
    },
    getIO:()=>{
        if(!io){
            throw new Error('socket not initialised');
        }
        return io;
    }
});


   
    
