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
        ref: "User",
        required: true,
        index: true,
    },
    rating: {
        totalRatings: {
            type: Number,
            default: 0,
        },
        average: {
            type: Number,
            default: 0,
        },
        sumOfStars: {
            type: Number,
            default: 0,
        },
    },
    ratings: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                required: true,
            },
            stars: {
                type: Number,
                required: true,
                min: 1,
                max: 5,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
            updatedAt: {
                type: Date,
            },
        },
    ],
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

const Product = mongoose.model("Product", productschema);

export default Product;
