import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import {
  Bookmark,
  Loader2,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react";
import { Button } from "./ui/button";
import { FaBookmark, FaHeart, FaRegBookmark } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { FiSend } from "react-icons/fi";
import CommentDialog from "./CommentDialog";
import { useDispatch, useSelector } from "react-redux";
// import { toast } from "sonner";
import axios from "axios";
import { setPosts, setSelectedPost } from "@/redux/postSlice";
import { Badge } from "./ui/badge";
import { setAuthUser } from "@/redux/authSlice";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
const Post = ({ post }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);
  const [liked, setLiked] = useState(post?.likes.includes(user?._id) || false);
  const [postLike, setPostLike] = useState(post?.likes.length);
  const [comment, setComment] = useState(post?.comments);
  const [bookmarkChecked, setBookmarkChecked] = useState(null);

  const dispatch = useDispatch();
  const changeTextInput = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? "dislike" : "like";
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_KEY}/post/${post?._id}/${action}`,
        {
          withCredentials: true,
        }
      );
      // console.log(res);
      if (res.data.statusInfo == "success") {
        const updatedLikes = liked ? postLike - 1 : postLike + 1;
        setPostLike(updatedLikes);
        setLiked(!liked);
        const updatedPostData = posts.map((singlePost) =>
          singlePost._id === post?._id
            ? {
                ...singlePost,
                likes: liked
                  ? singlePost.likes.filter((id) => id != user._id)
                  : [...singlePost.likes, user.id],
              }
            : singlePost
        );
        dispatch(setPosts(updatedPostData));
        // toast.success(res.data.message, {
        //   position: "top-center",
        // });
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    }
  };

  const commentHandler = async () => {
    // console.log(text);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API_KEY}/post/${post?._id}/comment`,
        { text },
        {
          // headers: {
          //   "Content-Type": "application/json",
          // },
          withCredentials: true,
        }
      );
      // console.log(res);
      if (res.data.statusInfo == "success") {
        const updatedCommentData = [...comment, res.data.data];
        setComment(updatedCommentData);
        const updatedPostData = posts.map((singlePost) =>
          singlePost._id == post._id
            ? {
                ...singlePost,
                comments: updatedCommentData,
              }
            : singlePost
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message, {
          position: "top-center",
        });
        setText("");
      }
    } catch (error) {
      // console.log(error.response.data.message);
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    }
  };

  const deletePostHandler = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(
        `${import.meta.env.VITE_APP_API_KEY}/post/delete/${post?._id}`,
        {
          withCredentials: true,
        }
      );
      // console.log(res);
      if (res.data.statusInfo == "success") {
        const updatedPostData = posts?.filter(
          (postItem) => postItem?._id != post?._id
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message, {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };
  const bookmarkHandler = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_KEY}/post/${post?._id}/bookmark`,

        {
          withCredentials: true,
        }
      );
      // console.log(res.data.data);
      if (res?.data.statusInfo == "success") {
        dispatch(setAuthUser(res.data.data));
        // console.log(res.data.data, res.data.message);
        setBookmarkChecked(res.data.data?.bookmarks?.includes(post?._id));

        toast.success(res.data.message, {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    setBookmarkChecked(user?.bookmarks?.includes(post?._id));
  }, []);
  // const bookmarkChecked = user?.bookmarks.includes(post?._id);
  // console.log(user);
  return (
    <div className="my-8 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <NavLink to={`profile/${post?.author?._id}`}>
            <Avatar>
              <AvatarImage
                src={post?.author?.profilePicture}
                alt="post_image"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </NavLink>

          <div className="flex items-center gap-3">
            <NavLink to={`profile/${post?.author?._id}`}>
              <h1>{post?.author?.username}</h1>
            </NavLink>

            {user?._id == post?.author?._id && (
              <Badge variant={"secondary"}>Author</Badge>
            )}
          </div>

          {/* <h1>username</h1> */}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
            <DialogTitle className="hidden" />
            {post?.author?._id != user?._id && (
              <Button
                variant="ghost"
                className="cursor-pointer w-fit text-[#ED4956] font-bold"
              >
                Unfollow
              </Button>
            )}
            <Button variant="ghost" className="cursor-pointer w-fit ">
              Add to favorites
            </Button>
            {user &&
              user?._id == post?.author._id &&
              (loading ? (
                <Button>
                  <Loader2 className="mr-2 h-4 m-4 animate-spin" /> Please
                  wait...
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  onClick={deletePostHandler}
                  // className="cursor-pointer w-fit text-[#ED4956] font-bold"
                  className="cursor-pointer w-fit "
                >
                  Delete
                </Button>
              ))}
          </DialogContent>
        </Dialog>
      </div>
      <img
        src={post?.image}
        alt="post_image"
        className="rounded-sm my-2 w-full aspect-square object-cover"
      />

      <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-3">
          {liked ? (
            <FaHeart
              onClick={likeOrDislikeHandler}
              size={"22px"}
              className="cursor-pointer  text-red-600"
            />
          ) : (
            <FaRegHeart
              onClick={likeOrDislikeHandler}
              size={"22px"}
              className="cursor-pointer hover:text-gray-600"
            />
          )}
          {/* <FaHeart /> */}
          {/* <FaRegHeart
            onClick={likeOrDislikeHandler}
            size={"22px"}
            className="cursor-pointer hover:text-gray-600"
          /> */}

          <MessageCircle
            onClick={() => {
              dispatch(setSelectedPost(post));
              setOpen(true);
            }}
            className="cursor-pointer hover:text-gray-600"
          />
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>{" "}
        {bookmarkChecked ? (
          <IoBookmark
            onClick={bookmarkHandler}
            size={"22px"}
            className="cursor-pointer hover:text-gray-600"
          />
        ) : (
          // <FaBookmark
          //   onClick={bookmarkHandler}
          //   className="cursor-pointer hover:text-gray-600"
          // />
          <IoBookmarkOutline
            onClick={bookmarkHandler}
            size={"22px"}
            className="cursor-pointer hover:text-gray-600"
          />
          // <Bookmark
          //   onClick={bookmarkHandler}
          //   className="cursor-pointer hover:text-gray-600"
          // />
        )}
        {/* <FaBookmark /> */}
        {/* <Bookmark
          onClick={bookmarkHandler}
          className="cursor-pointer hover:text-gray-600"
        /> */}
      </div>
      <span className="font-medium block mb-2">{postLike} likes</span>
      <p>
        <span className="font-medium mr-2">{post?.author?.username}</span>
        {/* caption */}
        {post?.caption}
      </p>
      {comment.length > 0 && (
        <span
          onClick={() => {
            dispatch(setSelectedPost(post));
            setOpen(true);
          }}
          className="cursor-pointer text-sm text-gray-400"
        >
          {/* View all 10 comments */}
          View all {comment.length} comments
        </span>
      )}

      <CommentDialog open={open} setOpen={setOpen} />
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={changeTextInput}
          className="outline-none text-sm w-full"
        />
        {text && (
          <span
            onClick={commentHandler}
            className="text-[#3BADF8] cursor-pointer"
          >
            Post
          </span>
        )}
      </div>
    </div>
  );
};

export default Post;
