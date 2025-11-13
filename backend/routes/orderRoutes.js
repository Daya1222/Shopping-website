import { Router } from "express";
import authorize from "../middleware/authorize.js";
import {
    placeOrder,
    getOrders,
    cancelOrder,
    confirmOrder,
    confirmReceived,
} from "../controllers/orderController.js";
import isProfileComplete from "../middleware/isProfileComplete.js";

const router = Router();

router.post("/", authorize, placeOrder);
router.get("/", authorize, getOrders);
router.patch("/:orderId/cancel", authorize, cancelOrder);
router.patch("/:orderId/confirm", authorize, confirmOrder);
router.patch("/:orderId/received", authorize, confirmReceived);

export default router;
