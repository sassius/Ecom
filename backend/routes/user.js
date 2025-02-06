const express = require("express");
const { User } = require("../models/user");
const { passwordHashing, checkPassword } = require("../utils/password");
const { signupValidator, signinValidator } = require("../utils/validation");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();

// 📌 Signup Route
router.post("/signup", async (req, res, next) => {
  const { fullname, email, password } = req.body;
  const parsedData = signupValidator.safeParse({ fullname, email, password });

  if (!parsedData.success) {
    return res.status(400).json({
      success: false,
      message: parsedData.error.format(),
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "An account already exists with this email address.",
      });
    }

    const hashedPassword = await passwordHashing(password);
    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    // Generate JWT
    const token = jwt.sign(
      { userId: newUser._id, fullname: newUser.fullname, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      success: true,
      message: "You have successfully registered.",
      userId: newUser._id,
      token,
    });
  } catch (error) {
    next(error);
  }
});

// 📌 Signin Route
router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  const parsedData = signinValidator.safeParse({ email, password });

  if (!parsedData.success) {
    return res.status(400).json({
      success: false,
      message: parsedData.error.format(),
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "No account found with this email address.",
      });
    }

    const passwordCheck = await checkPassword(password, user.password);
    if (!passwordCheck) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password.",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, fullname: user.fullname, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "You have signed in successfully.",
      userId: user._id,
      token,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
