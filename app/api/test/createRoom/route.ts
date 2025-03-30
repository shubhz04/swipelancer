/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import { connectToDatabase } from '@/backend/connect';
import { createChatRoom } from '@/backend/db/actions/chat.actions';
import { createContract } from '@/backend/db/actions/contract.actions';
import ChatRoom from '@/backend/db/models/chat.model';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        await connectToDatabase();

        // Parse the request body
        const body = await req.json();
        const { primaryUID,secondaryUID } = body;

       const response = await createChatRoom(primaryUID,secondaryUID);

        if (response.success == false) {
            return NextResponse.json({
                message: 'Error Creating Contract At Last'
            });
        }

        return NextResponse.json({
            message: "Successfully registered new room.",
            success: true,
        });
    } catch (error) {
        return NextResponse.json({
            message: 'Error Connecting Database',
            error,
        }, { status: 500 });
    }
}