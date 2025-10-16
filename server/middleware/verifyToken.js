import jwt from "jsonwebtoken";
import User from "../models/user.model.js"; // adjust path if needed

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token." });
    }

    // Fetch user from DB using decoded id
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    req.user = user; // attach full user document to req.user
    req.userId = user._id;

    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(400).json({ message: "Invalid token." });
  }
};
