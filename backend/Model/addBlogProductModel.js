const mongoose = require("mongoose");

const addBlogProductSchema = new mongoose.Schema({
  blogTitle: {
    type: String,
    required: true,
  },
  blogDescription: {
    type: String,
    required: true,
  },
  blogPrice: {
    type: Number,
    required: true,
  },
  blogSelectedImage: {
    type: String,
    required: true,
  },
  blogCategory: {
    type: String,
    required: true,
  },
});

const blogProduct = mongoose.model("blogproduct", addBlogProductSchema);

module.exports = blogProduct;
