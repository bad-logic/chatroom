




"use strict";



function createHttpResponse({data=null,err=null,success=false}){

    return {
        header:{
            "Content-Type":'application/json'
        },
        payload:{
            meta:{
                version:"1.0.0",
                author:"roshan"
            },
            success,
            data,
            err
        }
    }

};



module.exports = createHttpResponse;




