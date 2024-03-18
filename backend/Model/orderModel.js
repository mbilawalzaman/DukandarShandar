const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
      },
  customerName: {
    type: String,
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blogproduct', // Reference to the Blog Product model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'allproduct', // Reference to the All Product model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product', // Reference to the Generic Product model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  orderDate: {
    type: Date,
    default: Date.now,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
