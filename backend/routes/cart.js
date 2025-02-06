const express = require("express");
const { Product } = require("../models/product");
const { User } = require("../models/user");
const { userAuth } = require("../middlewares/authMiddleware");

const router = express.Router();
// 📌 Route: Add product to cart
router.post("/add", userAuth, async (req, res, next) => {
  try {
    const userId = req.user.id; // Retrieved from middleware
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const cart = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { cart: productId } },
      { new: true }
    ).select("cart");

    res.status(200).json({
      success: true,
      message: "Successfully added to cart.",
      cart: cart.cart,
    });
  } catch (error) {
    next(error);
  }
});

// 📌 Route: Get user cart
router.get("/", userAuth, async (req, res, next) => {
  try {
    const userId = req.user.id; // Retrieved from middleware
    const user = await User.findById(userId).populate("cart").select("cart");

    res.status(200).json({
      success: true,
      message: "User cart fetched successfully",
      cart: user.cart,
    });
  } catch (error) {
    next(error);
  }
});

// 📌 Route: Remove product from cart
router.delete("/remove/:productId", userAuth, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const updatedCart = await User.findByIdAndUpdate(
      userId,
      { $pull: { cart: productId } },
      { new: true }
    ).select("cart");

    res.status(200).json({
      success: true,
      message: "Successfully removed from cart",
      cart: updatedCart.cart,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
