import express from "express";
import {
  followAndUnfollow,
  getProfile,
  getSuggestedUsers,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import { jwtAuthMiddleware } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/:id/profile").get(jwtAuthMiddleware, getProfile);
router
  .route("/profile/edit")
  .post(jwtAuthMiddleware, upload.single("profilePicture"), updateProfile);
router.route("/suggested").get(jwtAuthMiddleware, getSuggestedUsers);
router
  .route("/followorunfollow/:id")
  .post(jwtAuthMiddleware, followAndUnfollow);

export default router;
