const mongoose = require("mongoose");

const addBlogProductSchema = new mongoose.Schema({
  blogTitle: {
    type: String,
    requied: true,
  },
  blogDescription: {
    type: String,
    requied: true,
  },
  blogPrice: {
    type: Number,
    requied: true,
  },
  blogSelectedImage: {
    type: String,
    requied: true,
  },
});

const blogProduct = mongoose.model("blogproduct", addBlogProductSchema);

module.exports = blogProduct;
