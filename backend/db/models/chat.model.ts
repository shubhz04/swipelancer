import mongoose from "mongoose";
const chatRoomSchema = new mongoose.Schema({
    users: {
        type: [String],
        require : true
    },
    data :{
        type: [String]
    }
});


const ChatRoom = mongoose.models.chatRooms || mongoose.model("chatRooms", chatRoomSchema);
export default ChatRoom;
