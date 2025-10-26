import mongoose from "mongoose";

const productschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true,
    },
    description: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        default: 0,
        min: 0,
    },
    category: {
        type: String,
        trim: true,
        index: true,
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        index: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
    },

    createdat: {
        type: Date,
        default: Date.now,
    },
});

productschema.pre("save", function (next) {
    if (this.isModified("name")) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim();
    }
    next();
});

const Product = mongoose.model("product", productschema);

export default Product;
