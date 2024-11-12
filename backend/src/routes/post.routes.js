import express from "express";
import { jwtAuthMiddleware } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import {
  addComment,
  bookemarkPost,
  deletePost,
  dislikePost,
  getAllPost,
  getPostComments,
  getUserPost,
  likePost,
  post,
} from "../controllers/post.controller.js";
const router = express.Router();

router.route("/addpost").post(jwtAuthMiddleware, upload.single("image"), post);
router.route("/all").get(jwtAuthMiddleware, getAllPost);
router.route("/userpost/all").get(jwtAuthMiddleware, getUserPost);
router.route("/:id/like").get(jwtAuthMiddleware, likePost);
router.route("/:id/dislike").get(jwtAuthMiddleware, dislikePost);
router.route("/:id/comment").post(jwtAuthMiddleware, addComment);
router.route("/:id/comment/all").get(jwtAuthMiddleware, getPostComments);
router.route("/delete/:id").delete(jwtAuthMiddleware, deletePost);
router.route("/:id/bookmark").get(jwtAuthMiddleware, bookemarkPost);

export default router;
