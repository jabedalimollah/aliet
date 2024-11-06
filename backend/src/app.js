import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import ApiError from "./utils/ApiError.js";
import errorHandler from "./utils/errorHandler.js";
const app = express();

// ----------- Middlewares ----------
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};
app.use(cors(corsOptions));

// --------- Import Routes -------------
import userRoute from "./routes/user.routes.js";
import postRoute from "./routes/post.routes.js";
import messageRoute from "./routes/message.routes.js";

// ----------- Routes declaration ---------
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);

// ----------- It is used for incorrect endpoint and wrong api requests ----------
app.use("*", (req, res, next) => {
  // =============== x ==================
  const err = new ApiError(
    404,
    "fail",
    `Can't find ${req.originalUrl} on the server`
  );
  next(err);
});

// ----------------- Error handler ---------
app.use(errorHandler);

export { app };
