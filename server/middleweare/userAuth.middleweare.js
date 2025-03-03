import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

export const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized, Please login"
    });
  }

  const authToken = authHeader.split(" ")[1];
  console.log("authToken", authToken);

  try {
    // Decode the token
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);

    // Attach user to request object
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid Token, Please login again"
    });
  }
};
