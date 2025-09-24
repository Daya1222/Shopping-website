const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  buyer: {
    type: String,
    required: true,
  },
  products: [
    {
      product: {
        type: String, // ObjectID of the ordered product.
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "shipped", "cancelled"],
    default: "pending",
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
