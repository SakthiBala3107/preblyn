import { JWT_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken";
import User from "../models/user.Model.js";

const authorize = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    // Verify JWT
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized", error: error.message });
  }
};

export default authorize;
