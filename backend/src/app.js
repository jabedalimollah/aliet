import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

// ----------- Middlewares ----------
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};
app.use(cors(corsOptions));

export { app };
