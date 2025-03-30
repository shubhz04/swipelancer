import { NextResponse } from "next/server";
import { connectToDatabase } from "@/backend/connect";
import { addToListings, removeFromListings, removeSpecificListing } from "@/backend/db/models/user.model";

export async function POST(req: Request) {
    try {
        await connectToDatabase();

        const body = await req.json();
        const { userId, action, listing } = body;

        let updatedUser;

        if (action === "add") {
            updatedUser = await addToListings(userId, listing);
        } else if (action === "removeLast") {
            updatedUser = await removeFromListings(userId);
        } else if (action === "removeSpecific") {
            updatedUser = await removeSpecificListing(userId, listing);
        } else {
            return NextResponse.json({ message: "Invalid action" }, { status: 400 });
        }

        return NextResponse.json({
            message: "Listings updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        return NextResponse.json({ message: "Error updating listings", error }, { status: 500 });
    }
}