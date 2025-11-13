import {
    createOrder,
    fetchOrders,
    cancelOrderService,
    confirmOrderService,
    confirmReceivedService,
} from "../services/orderService.js";

async function placeOrder(req, res) {
    const userId = req.user._id;
    const { products } = req.body;
    try {
        const result = await createOrder(userId, products);
        res.status(200).json({ result, msg: "Order placed successfully" });
    } catch (error) {
        console.error("Place order error:", error);
        res.status(500).json({ error: error.message || "Server Error" });
    }
}

async function getOrders(req, res) {
    const userId = req.user._id;
    const { type } = req.query; // 'buying' or 'selling'
    try {
        const orders = await fetchOrders(userId, type);
        res.status(200).json(orders);
    } catch (error) {
        console.error("Get orders error:", error);
        res.status(500).json({ error: error.message || "Server Error" });
    }
}

async function cancelOrder(req, res) {
    const userId = req.user._id;
    const { orderId } = req.params;
    try {
        const result = await cancelOrderService(userId, orderId);
        res.status(200).json({ result, msg: "Order cancelled successfully" });
    } catch (error) {
        console.error("Cancel order error:", error);
        res.status(500).json({ error: error.message || "Server Error" });
    }
}

async function confirmOrder(req, res) {
    const userId = req.user._id;
    const { orderId } = req.params;
    try {
        const result = await confirmOrderService(userId, orderId);
        res.status(200).json({
            result,
            msg: "Order marked as shipped successfully",
        });
    } catch (error) {
        console.error("Confirm order error:", error);
        res.status(500).json({ error: error.message || "Server Error" });
    }
}

async function confirmReceived(req, res) {
    const userId = req.user._id;
    const { orderId } = req.params;
    try {
        const result = await confirmReceivedService(userId, orderId);
        res.status(200).json({
            result,
            msg: "Order completed successfully",
        });
    } catch (error) {
        console.error("Confirm received error:", error);
        res.status(500).json({ error: error.message || "Server Error" });
    }
}

export { placeOrder, getOrders, cancelOrder, confirmOrder, confirmReceived };
