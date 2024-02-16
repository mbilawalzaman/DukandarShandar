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
});

const Product = mongoose.model("product", addProductSchema);

module.exports = Product;
