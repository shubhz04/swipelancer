/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import { connectToDatabase } from '@/backend/connect';
import User from '@/backend/db/models/user.model';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        await connectToDatabase();

        // Parse the request body
        const body = await req.json();
        const { name, email, password } = body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({
                message: "User already exists.",
                success: false,
            }, { status: 400 });
        }

        // Create a new user
        const user = await new User({
            name,
            email,
            password,
        }).save();

        // Generate a JWT token
        const token = user.getJWTToken();

        // Set the token as a cookie
        const cookieStore = cookies();
        (await cookieStore).set("user_token", token, {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
            httpOnly: true,
            secure: true,
        });

        return NextResponse.json({
            message: "Successfully registered new user.",
            user,
            success: true,
        });
    } catch (error) {
        return NextResponse.json({
            message: 'Error Connecting Database',
            error,
        }, { status: 500 });
    }
}