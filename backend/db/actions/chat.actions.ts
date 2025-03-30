import { connectToDatabase } from "@/backend/connect";
import ChatRoom from "../models/chat.model";

export async function createChatRoom(primaryUID: string, secondaryUID: string) {
    try {
        await connectToDatabase();
        if (!primaryUID || !secondaryUID) {
            return {
                message: "Please fill in all fields",
                success: false,
            };
        }

        const chatRoom = await new ChatRoom({users:[primaryUID, secondaryUID], data:[]}).save();

        if (!chatRoom) {
            return {
                success: false
            }
        }

        return {
            success: true,
            chatRoomID: chatRoom._id,
        }


    }
    catch (error: any) {
        console.log(error);
        return {
            message: "An error occurred during Room Creation.",
            success: false,
        };

    }
}