/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import { connectToDatabase } from '@/backend/connect';
import { createContract } from '@/backend/db/actions/contract.actions';
import Contract from '@/backend/db/models/contract.model';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        await connectToDatabase();

        // Parse the request body
        const body = await req.json();
        const { name, owner, description, pricing, currency, pricingType, images, videos } = body;
        // Check if the contract already exists
        const exisitingContract = await Contract.findOne({ owner });
        if (exisitingContract) {
            return NextResponse.json({
                message: "Contract already exists.",
                success: false,
            }, { status: 400 });
        }


        const response = await createContract({
            name,
            owner,
            description,
            pricing,
            currency,
            pricingType,
            images,
            videos
        });

        if (response.success == false) {
            return NextResponse.json({
                message: 'Error Creating Contract At Last'
            });
        }

        return NextResponse.json({
            message: "Successfully registered new contract.",
            contract: response.contract,
            success: true,
        });
    } catch (error) {
        return NextResponse.json({
            message: 'Error Connecting Database',
            error,
        }, { status: 500 });
    }
}