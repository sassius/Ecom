const express = require("express");
const userRouter = require("./user");
const adminRouter = require("./admin");
const productRouter = require("./product");
const cartRouter = require("./cart");
const orderRouter = require("./order");
const router = express.Router();

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/admin", adminRouter);
router.use("/cart", cartRouter);
router.use("/order",orderRouter)
module.exports = router;
