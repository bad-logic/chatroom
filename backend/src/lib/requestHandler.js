





"use strict";

const createHttpResponse = require("./createHttpResponse");

function requestHandler({controllerFn}){

    return async (req,res,next)=>{
        try{

            const {data,...info} = await controllerFn(req);
            let status = 200;
            if(info.modified || info.created){
                status=201;
            }
            const {payload,header} = createHttpResponse({data,success:true});
            return res.set(header).status(status).json(payload);
        }catch(err){
            return next(err);
        }
    }

};

module.exports = requestHandler;