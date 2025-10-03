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
    addresses: [
      {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
        isDefault: { type: Boolean, default: false },
      },
    ],

    // E-commerce
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],

    // Role / status
    role: {
      type: String,
      enum: ["buyer", "seller", "admin"],
      default: "buyer",
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
); // auto adds createdAt + updatedAt

const User = mongoose.model("User", userSchema);
export default User;
