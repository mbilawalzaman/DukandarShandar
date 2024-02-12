const mongoose = require("mongoose");

const addAllProductSchema = new mongoose.Schema({
  alltitle: {
    type: String,
    requied: true,
  },
  alldescription: {
    type: String,
    requied: true,
  },
  allprice: {
    type: Number,
    requied: true,
  },
  selectedAllImage: {
    type: String,
    requied: true,
  },
});

const allProduct = mongoose.model("allproduct", addAllProductSchema);

module.exports = allProduct;
