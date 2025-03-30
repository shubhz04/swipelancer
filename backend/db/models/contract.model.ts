

import mongoose from "mongoose";
const contractSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: [],
    },
    pricing: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true
    },
    // Hourly / Per Project
    pricingType: {
        type: String,
        required: true,
    },

    images: {
        type: [String]
    },
    videos: {
        type: [String]
    },


    // private stuff

    ownerSwipes: {
        type: [String]

    },
    pendingMatches: {
        type: [String]
    },

    confirmMatches: {
        type: [String]
    }
});

const Contract = mongoose.models.contracts || mongoose.model("contracts", contractSchema);
export default Contract;
