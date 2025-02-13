const express = require("express");
const { Order } = require("../models/order");
const { checkoutValidator } = require("../utils/validation");
const router = express.Router();

//Checkout & Place Order
router.post("/checkout", async (req, res, next) => {
  const parsedData = checkoutValidator.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: parsedData.error.format(),
    });
  }

  try {
    const { items, totalAmount } = parsedData.data;
    const newOrder = new Order({
      userId: req.user.id,
      items,
      totalAmount,
      status: "pending",
    });

    await newOrder.save();
    return res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order: newOrder,
    });
  } catch (error) {
    next(error);
  }
});

//Get Order History
router.get("/orders", async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    next(error);
  }
});

//Get Order Details by ID
router.get("/order/:id", async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    return res.status(200).json({ success: true, order });
  } catch (error) {
    next(error);
  }
});

//Cancel Order
router.put("/order/cancel/:id", async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.status !== "pending") {
      return res.status(400).json({ success: false, message: "Order cannot be canceled" });
    }

    order.status = "canceled";
    await order.save();
    return res.status(200).json({ success: true, message: "Order canceled successfully", order });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
