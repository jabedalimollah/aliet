import ApiError from "../utils/ApiError.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import sharp from "sharp";
import { cloudinary, deleteOnCloudinary } from "../utils/cloudinary.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

// ======================== Post =========================
const post = asyncErrorHandler(async (req, res) => {
  const { caption } = req.body;
  const image = req.file;
  const authorId = req.id;
  if (!image) {
    throw new ApiError(400, "error", "Image required");
  }
  const optimizedImageBuffer = await sharp(image.buffer)
    .resize({ width: 800, height: 800, fit: "inside" })
    .toFormat("jpeg", { quality: 80 })
    .toBuffer();
  const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
    `base64`
  )}`;
  const cloudinaryResponse = await cloudinary.uploader.upload(fileUri);
  const post = await Post.create({
    caption,
    image: cloudinaryResponse.secure_url,
    author: authorId,
  });
  const user = await User.findById(authorId);
  if (user) {
    user.posts.push(post._id);
    await user.save();
  }
  // console.log(post);
  await post.populate({ path: "author", select: "-password" });

  res.status(201).json(new ApiResponse(201, post, "New post added"));
});

// ====================== Get All Post ===================
const getAllPost = asyncErrorHandler(async (req, res) => {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate({ path: "author", select: "username profilePicture" })
    .populate({
      path: "comments",
      sort: { createdAt: -1 },
      populate: {
        path: "author",
        select: "username profilePicture",
      },
    });
  res.status(200).json(new ApiResponse(201, posts, "success"));
});

// ======================== User Post ==========
const getUserPost = asyncErrorHandler(async (req, res) => {
  const authorId = req.id;
  const posts = await Post.find({ author: authorId })
    .sort({ createdAt: -1 })
    .populate({
      path: "author",
      select: "username, profilePicture",
    })
    .populate({
      path: "comments",
      sort: { createdAt: -1 },
      populate: {
        path: "author",
        select: "username,profilePicture",
      },
    });
  res.status(200).json(new ApiResponse(200, posts, "success"));
});

// ==================== Like Post ======================

const likePost = asyncErrorHandler(async (req, res) => {
  const authUser = req.id;
  const postId = req.params.id;
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "error", "Post not found");
  }
  await post.updateOne({ $addToSet: { likes: authUser } });
  await post.save();
  const user = await User.findById(authUser).select("username profilePicture");
  const postOwnerId = post.author.toString();
  if (postOwnerId != authUser) {
    const notification = {
      type: "like",
      userId: authUser,
      userDetails: user,
      postId,
      message: "Your post was liked",
    };
    const postOwnerSocketId = getReceiverSocketId(postOwnerId);
    io.to(postOwnerSocketId).emit("notification", notification);
  }

  res.status(201).json(new ApiResponse(201, null, "Post liked"));
});

// ==================== Dislike Post ======================

const dislikePost = asyncErrorHandler(async (req, res) => {
  const authUser = req.id;
  const postId = req.params.id;
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "error", "Post not found");
  }
  await post.updateOne({ $pull: { likes: authUser } });
  await post.save();

  const user = await User.findById(authUser).select("username profilePicture");
  const postOwnerId = post.author.toString();
  if (postOwnerId != authUser) {
    const notification = {
      type: "dislike",
      userId: authUser,
      userDetails: user,
      postId,
      message: "Your post was liked",
    };
    const postOwnerSocketId = getReceiverSocketId(postOwnerId);
    io.to(postOwnerSocketId).emit("notification", notification);
  }
  res.status(201).json(new ApiResponse(201, null, "Post disliked"));
});

// ==================== Add Comment =====================
const addComment = asyncErrorHandler(async (req, res) => {
  const postId = req.params.id;
  const authUser = req.id;
  const { text } = req.body;
  const post = await Post.findById(postId);
  // console.log(req.body);
  if (!text) {
    throw new ApiError(400, "error", "Comment is required");
  }
  const comment = await Comment.create({
    text,
    author: authUser,
    post: postId,
  });
  await comment.populate({
    path: "author",
    select: "username profilePicture",
  });
  post.comments.push(comment._id);
  await post.save();
  res.status(201).json(new ApiResponse(201, comment, "Comment Added"));
});

// ========================= Get Post Comments ==================

const getPostComments = asyncErrorHandler(async (req, res) => {
  const postId = req.params.id;
  const comments = await Comment.find({ post: postId }).populate(
    "author",
    "username profilePicture"
  );
  if (!comments) {
    throw new ApiError(404, "error", "No comments found for this post");
  }
  res.status(200).json(new ApiResponse(200, comments, "success"));
});

// ================== Delete Post ==================
const deletePost = asyncErrorHandler(async (req, res) => {
  const postId = req.params.id;
  const authorId = req.id;
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "error", "Post not found");
  }
  if (post.author.toString() != authorId) {
    throw new ApiError(403, "error", "Unauthorized");
  }
  await Post.findByIdAndDelete(postId);

  const publicId = post.image.split("/").pop().split(".")[0]; //get public id from profile image url
  // ---------------------- Delete profile image from cloudinary --------------
  const response = await deleteOnCloudinary(publicId);

  let user = await User.findById(authorId);
  user.posts = user.posts.filter((id) => id.toString() != postId);
  await user.save();
  await Comment.deleteMany({ post: postId });
  res.status(200).json(new ApiResponse(200, null, "Post Deleted Successfully"));
});

// ======================= Bookmark Post =========================
const bookemarkPost = asyncErrorHandler(async (req, res) => {
  const postId = req.params.id;
  const authorId = req.id;
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "error", "Post not found");
  }
  const user = await User.findById(authorId).select("-password");
  if (user.bookmarks.includes(post._id)) {
    await user.updateOne({ $pull: { bookmarks: post._id } });
    await user.save();
    let updateUser = await User.findById(authorId).select("-password");
    // console.log(updateUser);
    res
      .status(200)
      .json(new ApiResponse(200, updateUser, "Post removed from bookmark"));
  } else {
    await user.updateOne({ $addToSet: { bookmarks: post._id } });
    await user.save();
    let updateUser = await User.findById(authorId).select("-password");
    res.status(200).json(new ApiResponse(200, updateUser, "Post bookmarked"));
  }
});

export {
  post,
  getAllPost,
  getUserPost,
  likePost,
  dislikePost,
  addComment,
  getPostComments,
  deletePost,
  bookemarkPost,
};
