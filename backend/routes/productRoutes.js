import { Router } from "express";
import authorize from "../middleware/authorize.js";
import isSeller from "../middleware/roles/isSeller.js";
import {
    addProduct,
    getAllProducts,
    getProduct,
    editProduct,
    removeProduct,
} from "../controllers/productController.js";

const router = Router();

router.post("/", authorize, isSeller, addProduct);
router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.put("/:id", authorize, isSeller, editProduct);
router.delete("/:id", authorize, isSeller, removeProduct);

export default router;
