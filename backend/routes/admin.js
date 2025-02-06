const { signinValidator, signupValidator } = require("../utils/validation");
const express = require("express");
const { Admin } = require("../models/admin");
const { passwordHashing, checkPassword } = require("../utils/password");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const router = express.Router();

router.get("/", (req, res) => {
  return res.send("Hi There from admin router");
});

// 📌 Admin Signup Route
router.post("/signup", async (req, res, next) => {
  const { fullname, email, password } = req.body;
  const parsedData = signupValidator.safeParse({ fullname, email, password });

  if (!parsedData.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: parsedData.error.format(), // Properly formatted errors
    });
  }

  try {
    const existingAdmins = await Admin.countDocuments();
    if (existingAdmins > 0) {
      return res.status(403).json({
        success: false,
        message: "There can only be one Admin",
      });
    }

    const hashedPassword = await passwordHashing(password);
    const admin = await Admin.create({
      fullname,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { adminId: admin._id, fullname: admin.fullname, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d", algorithm: "HS256" } // Secure token
    );

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      adminId: admin._id,
      token,
    });
  } catch (error) {
    next(error);
  }
});

// 📌 Admin Signin Route
router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  const parsedData = signinValidator.safeParse({ email, password });

  if (!parsedData.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: parsedData.error.format(),
    });
  }

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin not found",
      });
    }

    const isPasswordValid = await checkPassword(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = jwt.sign(
      { adminId: admin._id, fullname: admin.fullname, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d", algorithm: "HS256" }
    );

    return res.status(200).json({
      success: true,
      message: "Admin signed in successfully",
      adminId: admin._id,
      token,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
