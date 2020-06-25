



"use strict";

const {bcrypt} = require("../../modules");

function userQuery({userModel}){

    return Object.freeze({addUser,compareEmailAndPassword,findUserWithId});

    async function addUser(userData){
        const newUser = {};
        await mapObjectToDoc(userData,newUser,true);
        const result = await new userModel(newUser).save().catch(err=>{
            if(err.name=="MongoError" && err.code == 11000){
                const error = new Error('DUPLICATE_EMAIL.');
                error.statusCode = 422;
                error.info = `Account with ${userData.email} already exists`;
                throw error;
            }
            throw err;
        });
        return mapDocToObject(result._doc);
    }

    async function findUserWithId(userId){
        const result = await userModel.findById(userId).lean().catch(err=>{
            if(err.name=="castError"){
                const error = new Error("UNKNOWN_ID");
                error.info = `${userId} is not a valid userId`;
                error.statusCode = 422;
                throw error;
            }else{
                throw err;
            }
        });
        return [result].map(mapDocToObject);
    }

    async function hashPassword(password){
       
            const salt = await bcrypt.genSalt(12);
            const hash = await bcrypt.hash(password,salt);
            return hash;
       
    }

    async function compareEmailAndPassword(email,password){
        
        const result = await userModel.findOne({email:email}).lean();
        if(!result){
            const error = new Error("INVALID_CREDENTIALS");
            error.info = "Either your email or password is wrong";
            error.statusCode = 400;
            throw error;
        }
        const compare = await bcrypt.compare(password,result.password);
        if(!compare){
            const error = new Error("INVALID_CREDENTIALS");
            error.info = "Either your email or password is wrong";
            error.statusCode = 400;
            throw error;
        }
        if(compare){
            return mapDocToObject(result);
        }
    }

    async function mapObjectToDoc(obj,doc,hash=false){

        if(obj.username){
            doc.username = obj.username;
        }
        if(hash && obj.password){
            doc.password = await hashPassword(obj.password);
        }
        if(obj.email){
            doc.email = obj.email;
        }
    }

    function mapDocToObject({_id:userId,password,...info}){
        return {userId,...info};
    }

}


module.exports = userQuery;