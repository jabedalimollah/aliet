import express from "express";
import {
  changePassword,
  deleteProfile,
  followAndUnfollow,
  getFollowers,
  getFollowing,
  getProfile,
  getSuggestedUsers,
  getUserProfile,
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
router.route("/getprofile").get(jwtAuthMiddleware, getProfile);
router.route("/profile/:id").get(jwtAuthMiddleware, getUserProfile);
router
  .route("/profile/edit")
  .post(jwtAuthMiddleware, upload.single("profilePicture"), updateProfile);
router.route("/suggested").get(jwtAuthMiddleware, getSuggestedUsers);
router.route("/followorunfollow/:id").get(jwtAuthMiddleware, followAndUnfollow);
router.route("/followers/:id").get(jwtAuthMiddleware, getFollowers);
router.route("/following/:id").get(jwtAuthMiddleware, getFollowing);
router.route("/changepassword").post(jwtAuthMiddleware, changePassword);
router.route("/deleteprofile").delete(jwtAuthMiddleware, deleteProfile);

export default router;
