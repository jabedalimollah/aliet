import React, { useState } from "react";
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
import { FaRegHeart } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { FiSend } from "react-icons/fi";
import CommentDialog from "./CommentDialog";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setPosts } from "@/redux/postSlice";
const Post = ({ post }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const changeTextInput = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
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
      console.log(res);
      if (res.data.statusInfo == "success") {
        const updatedPostData = posts?.filter(
          (postItem) => postItem?._id != post?._id
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="my-8 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={post?.author?.profilePicture} alt="post_image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1>{post?.author?.username}</h1>
          {/* <h1>username</h1> */}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
            <DialogTitle className="hidden" />
            <Button
              variant="ghost"
              className="cursor-pointer w-fit text-[#ED4956] font-bold"
            >
              Unfollow
            </Button>
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
          {/* <FaHeart /> */}
          <FaRegHeart
            size={"22px"}
            className="cursor-pointer hover:text-gray-600"
          />

          <MessageCircle
            onClick={() => setOpen(true)}
            className="cursor-pointer hover:text-gray-600"
          />
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>{" "}
        {/* <FaBookmark /> */}
        <Bookmark className="cursor-pointer hover:text-gray-600" />
      </div>
      <span className="font-medium block mb-2">{post?.likes.length} likes</span>
      <p>
        <span className="font-medium mr-2">{post?.author?.username}</span>
        {/* caption */}
        {post?.caption}
      </p>
      <span
        onClick={() => setOpen(true)}
        className="cursor-pointer text-sm text-gray-400"
      >
        {/* View all 10 comments */}
        View all {post?.comments.length} comments
      </span>
      <CommentDialog open={open} setOpen={setOpen} />
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={changeTextInput}
          className="outline-none text-sm w-full"
        />
        {text && <span className="text-[#3BADF8]">Post</span>}
      </div>
    </div>
  );
};

export default Post;
