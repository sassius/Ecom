const express = require("express");
const { upload } = require("../config/multer");
const { Product } = require("../models/product");
const { adminAuth } = require("../middlewares/authMiddleware");

const router = express.Router();
// 📌 Route: Add a new product - Admin
router.post("/", adminAuth, upload.single("image"), async (req, res, next) => {
  try {
    const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    const image = req.file ? req.file.buffer : null;

    const product = await Product.create({
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      productId: product._id,
    });
  } catch (error) {
    next(error);
  }
});

// 📌 Route: Get all products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      message: "All products listed successfully.",
      products,
    });
  } catch (error) {
    next(error);
  }
});

// 📌 Route: Get a single product by ID
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product details fetched successfully.",
      product,
    });
  } catch (error) {
    next(error);
  }
});

// 📌 Route: Update a product by ID - Admin
router.put(
  "/:id",
  adminAuth,
  upload.single("image"),
  async (req, res, next) => {
    try {
      const productId = req.params.id;
      const { name, price, discount, bgcolor, panelcolor, textcolor } =
        req.body;
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { name, price, discount, bgcolor, panelcolor, textcolor },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Product updated successfully.",
        product: updatedProduct,
      });
    } catch (error) {
      next(error);
    }
  }
);

// 📌 Route: Delete a product by ID - Admin
router.delete("/:id", adminAuth, async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
      product,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
