import User from "../models/user.model";
import mongoose from "mongoose";
import { connectToDatabase } from "@/backend/connect";
import { cookies } from "next/headers";

export const registerUser = async (
    name: string,
    email: string,
    password: string,
) => {
    try {
        await connectToDatabase();
        if (!name || !email) {
            return {
                message: "Please fill in all fields",
                success: false,
            };
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return {
                message: "User already exists.",
                success: false,
            };
        }


        const user = await new User({
            name,
            email,
            password
        }).save();

        // Call the `getJWTToken` method on the saved `vendor`
        const token = user.getJWTToken();

        const cookieStore = await cookies();
        cookieStore.set("user_token", token, {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
        });


        return {
            message: "Successfully registered new vendor.",
            user,
            success: true,
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error);
        return {
            message: "An error occurred during registration.",
            success: false,
        };
    }
};

async function getUserFromID(id: string) {

    try {
        await connectToDatabase();
        // first we get the body of the request
        const user = await User.findById(id);

        if (!user) {
            console.log("User not found");
            return null;
        }


        return {
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                listings: user.listings,
            },
        };
    }
    catch (error) {
        console.log(error);
        return null;
    }


}