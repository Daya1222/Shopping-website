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

export {
    createProduct,
    findAllProducts,
    findProductById,
    updateProduct,
    deleteProduct,
};
