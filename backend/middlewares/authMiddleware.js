const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const fullToken = req.headers.authorization;
  if (!fullToken || !fullToken.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized Access. No token provided.",
    });
  }

  const token = fullToken.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized Access. Invalid token.",
    });
  }
}
// 📌 Admin Autentication Middleware
const adminAuth = (req, res, next) => {
  authMiddleware(req, res, () => {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }
    next();
  });
};

//📌 User Autentication Middleware
const userAuth = (req, res, next) => {
  authMiddleware(req, res, () => {
    if (req.user.role !== "user") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Users only.",
      });
    }
    next();
  });
};

module.exports = {
  userAuth,
  adminAuth,
};
