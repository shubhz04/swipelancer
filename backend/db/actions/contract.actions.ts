import Contract from "@/backend/db/models/contract.model";
import { connectToDatabase } from "@/backend/connect";

interface ContractData {
    name: string;
    owner: string;
    description?: string;
    pricing: number;
    currency: string;
    pricingType: string; // "Hourly" or "Per Project"
    images?: string[];
    videos?: string[];
}

export async function createContract(data: ContractData) {
    try {
        // Connect to the database
        await connectToDatabase();

        // Create a new proposal
        const contract = new Contract({
            name: data.name,
            owner: data.owner,
            description: data.description || "",
            pricing: data.pricing,
            currency: data.currency,
            pricingType: data.pricingType,
            images: data.images || [],
            videos: data.videos || [],
            ownerSwipes: [],
            pendingMatches: [],
            confirmMatches: [],
        });

        // Save the proposal to the database
        const savedContract = await contract.save();

        return {
            success: true,
            message: "Contract created successfully",
            contract: savedContract,
        };
    } catch (error) {
        console.error("Error creating contract:", error);
        return {
            success: false,
            message: "Error creating contract",
            error,
        };
    }
}