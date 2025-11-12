import {
    createProduct,
    findAllProducts,
    findProductById,
    updateProduct,
    deleteProduct,
    starProduct,
} from "../services/productService.js";

async function addProduct(req, res) {
    try {
        const sellerId = req.user._id;

        const product_data = req.body;

        // DEBUG
        console.log("Received: ", req.body);

        const product = await createProduct(product_data, sellerId);

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllProducts(_, res) {
    try {
        const products = await findAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getProduct(req, res) {
    try {
        const { id } = req.params;
        const product = await findProductById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function editProduct(req, res) {
    try {
        const { id } = req.params;
        const updates = req.body;
        const product = await updateProduct({ _id: id, ...updates });

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function removeProduct(req, res) {
    try {
        const { id } = req.params;
        const deleted = await deleteProduct(id);
        res.status(200).json({ msg: "Deletion success", product: deleted });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function rateProduct(req, res) {
    const { id } = req.params;
    const { stars } = req.body;
    const userId = req.user._id; // Get userId from auth middleware

    try {
        const msg = await starProduct(id, stars, userId);
        res.status(200).json(msg);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export {
    addProduct,
    getAllProducts,
    getProduct,
    editProduct,
    removeProduct,
    rateProduct,
};
