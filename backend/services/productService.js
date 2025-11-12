import Product from "../models/product.js";
async function createProduct(
    { name, description, price, stock, category, image },
    sellerId,
) {
    try {
        const product = await Product.create({
            name,
            description,
            price,
            stock,
            category,
            image,
            sellerId,
        });

        return product;
    } catch (error) {
        throw new Error(`Database error: ${error.message}`);
    }
}

async function findAllProducts() {
    try {
        const products = Product.find({});
        return products;
    } catch (error) {
        throw new Error(`Database error: ${error.message}`);
    }
}

async function findProductById(_id) {
    try {
        const product = Product.findOne({ _id });
        return product;
    } catch (error) {
        throw new Error(`Database error: ${error.message}`);
    }
}

async function updateProduct(data) {
    const { _id, ...updates } = data;

    try {
        const product = await Product.findOneAndUpdate(
            { _id },
            { $set: updates },
            { new: true, runValidators: true },
        );
        return product;
    } catch (error) {
        throw new Error(`Database error: ${error.message}`);
    }
}

async function deleteProduct(_id) {
    try {
        const deleted = Product.findByIdAndDelete({ _id });
        return deleted;
    } catch (error) {
        throw new Error(`Database error: ${error.message}`);
    }
}

async function starProduct(productId, stars, userId) {
    try {
        const product = await Product.findById(productId);
        if (!product) throw new Error("Product not found");

        // Initialize rating object if it doesn't exist or has undefined values
        if (!product.rating || product.rating.sumOfStars === undefined) {
            product.rating = {
                sumOfStars: 0,
                totalRatings: 0,
                average: 0,
            };
        }

        // Initialize ratings array if it doesn't exist
        if (!product.ratings) {
            product.ratings = [];
        }

        // Check if user already rated
        const existingRatingIndex = product.ratings.findIndex(
            (rating) => rating.userId.toString() === userId.toString(),
        );

        if (existingRatingIndex !== -1) {
            // Update existing rating
            const oldStars = product.ratings[existingRatingIndex].stars;
            product.ratings[existingRatingIndex].stars = stars;
            product.ratings[existingRatingIndex].updatedAt = new Date();
            product.rating.sumOfStars =
                product.rating.sumOfStars - oldStars + stars;
        } else {
            // Add new rating
            product.ratings.push({ userId, stars, createdAt: new Date() });
            product.rating.sumOfStars += stars;
            product.rating.totalRatings += 1;
        }

        // Recalculate average
        product.rating.average =
            product.rating.sumOfStars / product.rating.totalRatings;

        await product.save();
        return { rating: product.rating };
    } catch (error) {
        throw new Error(`Database error: ${error.message}`);
    }
}

export {
    createProduct,
    findAllProducts,
    findProductById,
    updateProduct,
    deleteProduct,
    starProduct,
};
