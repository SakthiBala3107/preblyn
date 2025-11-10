import { JWT_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken";
import User from "../models/user.Model.js";

//
const authorize = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // if the not the right token
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // if the actuals token
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(401).json({
        message: "Unauthorized",
      });
    }

    // once we got ther user  we store it inside req.user
    req.user = user;
    next();

    //
  } catch (error) {
    res.status(401).json({ message: "unAuthorized", error: error.message });
    next(error);
  }
};
export default authorize;
