const mongoose = require("mongoose");

const addProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  selectedImage: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default:0
  },
  stock: {
    type: Number,
    default:0
  },
  numOfRate: {
    type: Number,
    default:0
  },

});

const Product = mongoose.model("product", addProductSchema);

module.exports = Product;
