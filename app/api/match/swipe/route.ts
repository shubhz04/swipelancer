/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/backend/connect';
import User from '@/backend/db/models/user.model';
import { cookies } from 'next/headers';
const jwt = require("jsonwebtoken");

export async function POST(req: Request) {
    try {
        await connectToDatabase();

        // first we get the body of the request
        const body = await req.json();
        // then we get the data from the body
        const { id, name, email, pass } = body;

        const user = await new User({
            name,
            email,
            pass,
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
    } catch (error) {
        return NextResponse.json({ message: 'Error Connecting Database', error }, { status: 500 });
    }
}
