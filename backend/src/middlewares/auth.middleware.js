import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import { User } from "../models/user.model.js";

// ---------------- Verify Token -------------
const jwtAuthMiddleware = asyncErrorHandler(async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new ApiError(404, "fail", "Token not found");
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new ApiError(401, "fail", "Unauthorized request");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new ApiError(401, "fail", "Invalid Access Token");
    }
    // ========================================
    // const token = req.cookies.token;
    // if (!token) {
    //   throw new ApiError(404, "fail", "Token not found");
    // }
    // const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    // if (!decode) {
    //   throw new ApiError(404, "fail", "Invalid token");
    // }
    // req.user = decoded;
    req.id = decoded.userId;
    next();
  } catch (error) {
    throw new ApiError(401, "fail", "Invalid Access Token");
  }
});

export { jwtAuthMiddleware };
