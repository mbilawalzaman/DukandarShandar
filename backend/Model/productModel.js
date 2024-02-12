const mongoose = require("mongoose");

const addProductSchema = new mongoose.Schema({
  title: {
    type: String,
    requied: true,
  },
  description: {
    type: String,
    requied: true,
  },
  price: {
    type: Number,
    requied: true,
  },
  selectedImage: {
    type: String,
    requied: true,
  },
});

const Product = mongoose.model("product", addProductSchema);


module.exports = Product;
