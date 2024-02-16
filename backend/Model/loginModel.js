const mongoose = require("mongoose");

const addLoginSchema = new mongoose.Schema({
  email: {
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
});

const Product = mongoose.model("product", addProductSchema);

module.exports = Product;
