


"use strict";


const {express,path} = require("../modules");


const {auth} = require("../middlewares");

const router = express.Router();

const {createHttpResponse} = require("../lib");


function reqBodyDoExist(body){
    if(Object.keys(body).length<1){
        const error = new Error('REQUEST_BODY_NOT_FOUND');
        error.info = `Request body must be a valid JSON Object`;
        error.statusCode = 400;
        throw error;
    }
}

// CHECKING THE DATA TYPES FOR POST AND PUT REQUEST BODY
router.use((req,res,next)=>{
    const method = req.method;
    if(method=="POST" || method=="PUT"){
        reqBodyDoExist(req.body);
    }
    next();
});



router.use("/api/auth",require("./auth.routes"));

router.use("/api/chatroom",auth.authenticateTheLoggedInUser,require("./chatroom.routes"));

console.log("node_env",process.env.NODE_ENV);
if(process.env.NODE_ENV==="production"){
    router.use(express.static(path.join(__dirname,"..","..","..","frontend","build")));
    router.use("/*",(req,res,next)=>{
        res.sendFile(path.join(__dirname,"..","..","..","frontend","build","index.html"));
    });
}

// 404 error handler
router.use((req, res, next) => {
    const error = new Error('UNDEFINED_ENDPOINTS');
    error.info = 'Requested Resource not found';
    error.statusCode = 404;
    throw error;
});

// error handler
router.use((err, req, res, next) => {

    console.log("error>>", err);
    const status = err.statusCode || 500;

    const name = err.message || "INTERNAL_SERVER_ERROR";

    const message = err.info || "something went wrong. Please try again";

    const {payload,header} = createHttpResponse({err:{name,message},success:false});
    return res.set(header).status(status).json(payload);
});



module.exports = router;