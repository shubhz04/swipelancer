import { NextResponse } from "next/server";
import { connectToDatabase } from "@/backend/connect";
import User, { addToListings, removeFromListings, removeSpecificListing } from "@/backend/db/models/user.model";
import Contract from "@/backend/db/models/contract.model";
import { createChatRoom } from "@/backend/db/actions/chat.actions";

export async function POST(req: Request) {
    try {
        await connectToDatabase();

        const body = await req.json();
        const { userId, targetUserID, contractID } = body;

        // Check if the contract  exists
        let exisitingContract = await Contract.findOne({ _id: contractID });
        if (!exisitingContract) {
            return NextResponse.json({
                message: "NO Such Contract exists.",
                success: false,
            }, { status: 400 });
        }

        // Check if the userId exists in the ownerSwipes array
        if (exisitingContract.pendingMatches.includes(targetUserID.toString())) {

            // Yes we found a match
            exisitingContract = await Contract.findOneAndUpdate({ _id: contractID },
                { $pull: { pendingMatches: targetUserID.toString() } }, // Push the new listing to the array
                { new: true })// Return the updated documentconfirmMatches.push(userId);


            exisitingContract = await Contract.findOneAndUpdate({ _id: contractID },
                { $push: { confirmMatches: targetUserID.toString() } }, // Push the new listing to the array
                { new: true })// Return the updated documentconfirmMatches.push(userId);

            const room = await createChatRoom(userId, exisitingContract.owner);
            
            // Update the chatRooms array for both users
            await User.findOneAndUpdate(
                { _id: userId },
                { $push: { chats: room.chatRoomID } }
            );
            await User.findOneAndUpdate(
                { _id: targetUserID },
                { $push: { chats: room.chatRoomID } }
            );

            return NextResponse.json({
                message: "Voila! Match Found.",
                match: true,
                success: true,
            }, { status: 200 });
        }
        else {
            // waiting list 
            exisitingContract = await Contract.findOneAndUpdate({ _id: contractID },
                { $push: { ownerSwipes: targetUserID.toString() } }, // Push the new listing to the array
                { new: true })// Return the updated documentconfirmMatches.push(userId);


            return NextResponse.json({
                message: "Your Response was saved.",
                match: false,
                success: true,
            }, { status: 200 });
        }


    } catch (error) {
        return NextResponse.json({ message: "Error updating swipe data", error }, { status: 500 });
    }
}