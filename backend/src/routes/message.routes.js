import express from "express";
import { jwtAuthMiddleware } from "../middlewares/auth.middleware.js";
import { getMessage, sendMessge } from "../controllers/message.controller.js";
const router = express.Router();

router.route("/send/:id").post(jwtAuthMiddleware, sendMessge);
router.route("/all/:id").get(jwtAuthMiddleware, getMessage);

export default router;
