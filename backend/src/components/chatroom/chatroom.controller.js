


"use strict";


function chatroomController({chatroomQuery,Joi}){


    return Object.freeze({
        createChatRoom,getAvailableRooms
    });

    async function getAvailableRooms(req){
        try{
            const result = await chatroomQuery.getRoomList();
            return {
                fetched:true,
                data:result
            };
        }catch(err){
            throw err;
        }
    }

    async function createChatRoom(req){
        try{
            const validationSchema = Joi.object({
                name:Joi.string().min(3).max(20).required()
            });
            const {error,value} = validationSchema.validate(req.body);
            if(error){
                const err = new Error("VALIDATION_ERROR");
                err.info = error.message;
                err.statusCode = 422;
                throw err;
            }
            const result = await chatroomQuery.createRoom(value.name);
            return {
                created:true,
                data:result
            };

        }catch(err){
            throw err;
        }
    }
}

module.exports = chatroomController;