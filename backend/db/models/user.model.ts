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
});

// sign in vendor with JWT
userSchema.methods.getJWTToken = function () {

    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "5d",
    });
};

const User = mongoose.models.Vendor || mongoose.model("user", userSchema);
export default User;
