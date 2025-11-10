import { Router } from "express";
import authorize from "../middleware/authorize.js";
import isSeller from "../middleware/roles/isSeller.js";
import {
    addProduct,
    getAllProducts,
    getProduct,
    editProduct,
    removeProduct,
    rateProduct,
} from "../controllers/productController.js";

const router = Router();

router.post("/", authorize, isSeller, addProduct);
router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.put("/:id", authorize, isSeller, editProduct);
router.delete("/:id", authorize, isSeller, removeProduct);
router.post("/rate/:id", authorize, rateProduct);

export default router;
