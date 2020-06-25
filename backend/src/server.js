


"use strict";


// NODE SERVER SETUP

const {http,mongoose,io} = require("./modules");
const {db,server} = require("./configs");
const {message} = require("./components");
const {init} = require("./socket");

const app = require('./app');

(async ()=>{


    try{

        const httpServer = http.createServer(app);

        await mongoose.connect(`${db.mongo_uri}/${db.name}`,db.options);

        console.log(`✔️  Database connection established.`);

        httpServer.listen(server.port,_=>{

            console.log(`✔️  Http Server Running at ${server.host}:${server.port}/`);

        });
        const socketIo = init(io,httpServer);
        socketIo.on("connection",(socket)=>{
            console.log("Connected to socket. User:",socket.sessionUser.userId);

            socket.on("disconnect",()=>{
                console.log("disconnected from socket. User",socket.sessionUser.userId);
            });

            socket.on("joinChat",async ({roomId})=>{
                try{
                    socket.join(roomId);
                    console.log("user joined room: ",roomId);
                    const result = await message.messageQuery.getRoomMessages(roomId);
                    socketIo.to(roomId).emit("roomMessages",result);
                }catch(err){

                }
            });

            socket.on("leaveChat",({roomId})=>{
                socket.leave(roomId);
                console.log("user left room: ",roomId);
            });

            socket.on("chatRoomMessage",async ({roomId,newMsg})=>{
                try{
                    if(newMsg.trim().length>0){
                        const result = await message.messageQuery.createMessage({chatroom:roomId,user:socket.sessionUser.userId,message:newMsg});
                        const {userId:_id,username} = socket.sessionUser;
                        result.user = {_id,username};
                        socketIo.to(roomId).emit("newMessage",result);
                    }
                }catch(err){

                }
            });

        });

    }catch(err){

        console.log('❌ Failed to establish connection:\n');
        console.error(err);
        // Exit process on failure
        process.exit(1);
    }


})();
