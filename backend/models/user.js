import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        phoneNumber: { type: String },

        // Auth
        passwordHash: { type: String },
        googleId: { type: String, unique: true, sparse: true },
        isVerified: { type: Boolean, default: false },

        // Profile
        profilePicUrl: { type: String },

        // Addresses
        address: {
            type: String,
        },

        // Role / status
        role: {
            type: String,
            enum: ["buyer", "seller", "admin"],
            default: "buyer",
        },

        isComplete: { type: Boolean, default: false },
    },
    { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
