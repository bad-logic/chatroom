



"use strict";


const {express} = require("../modules");


const router = express.Router();

const {requestHandler} = require("../lib");
const {chatroom} = require("../components");


router.get("/",requestHandler({controllerFn:chatroom.chatroomController.getAvailableRooms}));
// /chatroom/create
router.post("/create",requestHandler({controllerFn:chatroom.chatroomController.createChatRoom}));


module.exports = router;