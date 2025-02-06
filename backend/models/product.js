const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  image: {
    type: Buffer,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
    default: 0,
  },
  bgcolor: {
    type: String,
    required: true,
    trim: true,
  },
  panelcolor: {
    type: String,
    required: true,
    trim: true,
  },
  textcolor: {
    type: String,
    required: true,
    trim: true,
  },
});
const Product = mongoose.model("Product", productSchema);
module.exports = { Product };
