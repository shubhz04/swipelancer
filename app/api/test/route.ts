/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/backend/connect';


export async function POST(req: Request) {
    try {
        await connectToDatabase();

        return NextResponse.json({ message: 'Connection successful' });
    } catch (error) {
        return NextResponse.json({ message: 'Error Connecting Database', error }, { status: 500 });
    }
}
