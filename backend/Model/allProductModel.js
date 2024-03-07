const mongoose = require("mongoose");

const addAllProductSchema = new mongoose.Schema({
  alltitle: {
    type: String,
    required: true,
  },
  alldescription: {
    type: String,
    required: true,
  },
  allprice: {
    type: Number,
    required: true,
  },
  selectedAllImage: {
    type: String,
    required: true,
  },
});

const allProduct = mongoose.model("allproduct", addAllProductSchema);

module.exports = allProduct;
