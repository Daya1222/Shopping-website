import Order from "../models/order.js";
import Product from "../models/product.js";
import User from "../models/user.js";

async function createOrder(userId, products) {
    try {
        const buyer = await User.findById(userId);
        if (!buyer) {
            throw new Error("Buyer not found");
        }
        console.log("Creating order for user:", userId);
        console.log("Products:", products);

        let totalPrice = 0;
        const orderProducts = [];
        const sellers = new Set();

        for (const item of products) {
            const productDoc = await Product.findById(item.product);
            if (!productDoc) {
                throw new Error(`Product not found: ${item.product}`);
            }

            totalPrice += productDoc.price * item.quantity;
            sellers.add(productDoc.sellerId.toString());

            orderProducts.push({
                product: productDoc._id,
                quantity: item.quantity,
            });
        }

        const deliveryAddress = buyer.address || "No address provided";

        const order = await Order.create({
            buyer: buyer._id,
            sellers: Array.from(sellers),
            products: orderProducts,
            totalPrice,
            deliveryAddress,
        });

        return order;
    } catch (error) {
        console.error("Create order error:", error);
        throw new Error(`Database Error: ${error.message}`);
    }
}

async function fetchOrders(userId, type) {
    try {
        let orders;

        if (type === "selling") {
            orders = await Order.find({ sellers: userId })
                .populate("buyer", "name email")
                .populate("sellers", "name email")
                .populate({
                    path: "products.product",
                    select: "name price images",
                })
                .sort({ createdAt: -1 });
        } else {
            orders = await Order.find({ buyer: userId })
                .populate("sellers", "name email")
                .populate({
                    path: "products.product",
                    select: "name price images sellerId",
                    populate: {
                        path: "sellerId",
                        select: "name",
                    },
                })
                .sort({ createdAt: -1 });
        }

        return orders;
    } catch (error) {
        console.log(error);
        throw new Error(`Database Error: ${error.message}`);
    }
}

async function cancelOrderService(userId, orderId) {
    try {
        const order = await Order.findById(orderId);

        if (!order) {
            throw new Error("Order not found");
        }

        if (order.buyer.toString() !== userId.toString()) {
            throw new Error("Unauthorized to cancel this order");
        }

        if (order.status !== "pending") {
            throw new Error("Only pending orders can be cancelled");
        }

        await Order.findByIdAndDelete(orderId);

        return { _id: orderId, deleted: true };
    } catch (error) {
        throw new Error(`Database Error: ${error.message}`);
    }
}

async function confirmOrderService(userId, orderId) {
    try {
        console.log("confirmOrderService called with:", { userId, orderId });
        console.log("orderId type:", typeof orderId);

        const order = await Order.findById(orderId);
        console.log("Found order:", order);

        if (!order) {
            throw new Error("Order not found");
        }

        if (
            !order.sellers.map((s) => s.toString()).includes(userId.toString())
        ) {
            throw new Error("Unauthorized to confirm this order");
        }

        if (order.status !== "pending") {
            throw new Error("Only pending orders can be shipped");
        }

        order.status = "shipped";
        await order.save();

        return order;
    } catch (error) {
        console.error("Error in confirmOrderService:", error);
        throw new Error(`Database Error: ${error.message}`);
    }
}

async function confirmReceivedService(userId, orderId) {
    try {
        const order = await Order.findById(orderId);

        if (!order) {
            throw new Error("Order not found");
        }

        if (order.buyer.toString() !== userId.toString()) {
            throw new Error("Unauthorized to confirm receipt of this order");
        }

        if (order.status !== "shipped") {
            throw new Error("Only shipped orders can be marked as received");
        }

        order.status = "completed";
        await order.save();

        return order;
    } catch (error) {
        throw new Error(`Database Error: ${error.message}`);
    }
}

export {
    createOrder,
    fetchOrders,
    cancelOrderService,
    confirmOrderService,
    confirmReceivedService,
};
