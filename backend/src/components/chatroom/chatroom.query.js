



"use strict";



function chatroomQuery({chatroomModel}){

    return Object.freeze({
        createRoom,getRoomList
    });

    async function getRoomList(){
        const result = await  chatroomModel.find().lean();
        return result.map(mapDocToObject);
    }

    async function createRoom(name){
        const result = await new chatroomModel({name}).save().catch(err=>{
            if(err.name=="MongoError" && err.code == 11000){
                const error = new Error('DUPLICATE_ROOM.');
                error.statusCode = 422;
                error.info = `${name} already exists. Join instead`;
                throw error;
            }
            throw err;
        });
        return [result._doc].map(mapDocToObject);
    }

    function mapDocToObject({_id:roomId,name,...info}){
        return {roomId,name};
    }
}


module.exports = chatroomQuery;