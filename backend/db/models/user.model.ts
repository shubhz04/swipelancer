import mongoose from "mongoose";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    listings: {
        type: [String],
        default: [],
    },
    password: {
        type: String,
        required: true,
    },
    chats: {
        type: [String]
    },
    isFreelancer: {
        type: Boolean,
        required: true
    },
});

// sign in vendor with JWT
userSchema.methods.getJWTToken = function () {

    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "5d",
    });
};


// Listing functions area 
export async function removeFromListings(userId: string) {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId }, // Find the user by ID
            { $pop: { listings: 1 } }, // Remove the last item from the array
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            throw new Error("User not found");
        }

        return updatedUser;
    } catch (error) {
        console.error("Error updating listings:", error);
        throw error;
    }
}
export async function addToListings(userId: string, newListing: string) {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId }, // Find the user by ID
            { $push: { listings: newListing } }, // Push the new listing to the array
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            throw new Error("User not found");
        }

        return updatedUser;
    } catch (error) {
        console.error("Error updating listings: add", error);
        throw error;
    }
}
export async function removeSpecificListing(userId: string, listingToRemove: string) {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId }, // Find the user by ID
            { $pull: { listings: listingToRemove } }, // Remove the specific item
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            throw new Error("User not found");
        }

        return updatedUser;
    } catch (error) {
        console.error("Error updating listings:", error);
        throw error;
    }
}

export async function addOwnerSwipes(userId: string, targetUserID: string, listing: string) {

}
const User = mongoose.models.user || mongoose.model("user", userSchema);
export default User;
