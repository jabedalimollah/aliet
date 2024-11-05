import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";

// ---------------- Verify Token -------------
const jwtAuthMiddleware = asyncErrorHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new ApiError(404, "fail", "Token not found");
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decode) {
      throw new ApiError(404, "fail", "Invalid token");
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    throw new ApiError(401, "fail", "Invalid Access Token");
  }
});

export { jwtAuthMiddleware };
