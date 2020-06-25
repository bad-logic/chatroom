



"use strict";

function messageQuery({messageModel}){

    return Object.freeze({getRoomMessages,createMessage})

    async function getRoomMessages(roomId){
        const result = await messageModel.find({chatroom:roomId}).populate("user",'username _id').lean();
        return result.map(mapDocToObject);
    }

    async function createMessage(msg){
        const obj = {};
        mapObjectToDoc(msg,obj);
        const result = await new messageModel(obj).save();
        return mapDocToObject(result._doc);
    }

    function mapObjectToDoc(obj,doc){
        if(obj.chatroom){
            doc.chatroom = obj.chatroom;
        }
        if(obj.user){
            doc.user = obj.user;
        }
        if(obj.message){
            doc.message = obj.message;
        }
    }

    function mapDocToObject({_id:msgId,...info}){
        return {msgId,...info};
    }
};


module.exports = messageQuery;