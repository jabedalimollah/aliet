import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { NavLink } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import axios from "axios";
import { setPosts } from "@/redux/postSlice";
// import { toast } from "sonner";
import { MdArrowBackIos } from "react-icons/md";
import { toast } from "react-toastify";
const token = localStorage.getItem("aliet");
const CommentDialog = ({ open, setOpen }) => {
  const [comment, setComment] = useState("");
  const { posts, selectedPost } = useSelector((state) => state.post);
  const [comments, setComments] = useState([]);

  const dispatch = useDispatch();
  const handleComment = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setComment(inputText);
    } else {
      setComment("");
    }
  };

  const handleSendComment = async () => {
    // console.log(text);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API_KEY}/post/${selectedPost?._id}/comment`,
        { text: comment },
        {
          // headers: {
          //   "Content-Type": "application/json",
          // },
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      // console.log(res);
      if (res.data.statusInfo == "success") {
        const updatedCommentData = [...comments, res.data.data];
        setComments(updatedCommentData);
        const updatedPostData = posts.map((singlePost) =>
          singlePost._id == selectedPost._id
            ? {
                ...singlePost,
                comments: updatedCommentData,
              }
            : singlePost
        );
        dispatch(setPosts(updatedPostData));
        // toast.success(res.data.message, {
        //   position: "top-center",
        // });
        // setText("");
        setComment("");
      }
    } catch (error) {
      // console.log(error.response.data.message);
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    if (selectedPost) {
      setComments(selectedPost?.comments);
    }
  }, [selectedPost]);
  return (
    <>
      <Dialog open={open}>
        <DialogContent
          onInteractOutside={() => setOpen(false)}
          className="max-m-5xl max-w-3xl p-0 flex flex-col"
        >
          <DialogTitle className="hidden"></DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
          <div className="flex flex-1">
            <div className="w-1/2 hidden md:inline-block">
              <img
                src={selectedPost?.image}
                alt="post_image"
                className="w-full h-full object-cover rounded-l-lg"
              />
            </div>

            <div className="w-full md:w-1/2 h-screen md:h-auto flex flex-col justify-start md:justify-between ">
              <div className="w-full  md:hidden fixed top-0 left-0  z-20">
                <div className="w-full h-[12vh] md:h-auto p-4  flex justify-between items-center border-b border-gray-200 bg-white">
                  <button
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-x-1"
                  >
                    <MdArrowBackIos /> Back
                  </button>
                  <h2 className="font-semibold">Comments</h2>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-100 mt-20 md:mt-0">
                <div className="flex gap-3 items-center">
                  <NavLink>
                    <Avatar>
                      <AvatarImage
                        src={selectedPost?.author?.profilePicture}
                        alt="post_image"
                      />
                      <AvatarFallback>
                        {selectedPost?.author?.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </NavLink>
                  <div>
                    <NavLink className={"font-semibold text-xs"}>
                      {/* username */}
                      {selectedPost?.author?.username}
                    </NavLink>
                    {/* <span className="text-gray-600 text-sm">Bio here...</span> */}
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <MoreHorizontal className="cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent className="flex flex-col items-center text-sm text-center">
                    <DialogTitle className="hidden"></DialogTitle>
                    <div className="cursor-pointer w-full text-[#ED4956] font-bold">
                      Unfollow
                    </div>
                    <div className="cursor-pointer w-full">
                      Add to favorites
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              {/* <hr /> */}
              <div className="flex-1 overflow-y-auto max-h-96 p-4">
                {/* comments ... */}
                {comments.map((comment) => (
                  <Comment key={comment._id} comment={comment} />
                ))}
              </div>

              <div className="w-full  flex  p-4 fixed md:relative bottom-0 left-0 z-10 bg-white ">
                <div className="w-full h-[10vh] md:h-auto bg-white  flex items-center gap-2">
                  <input
                    type="text"
                    value={comment}
                    onChange={handleComment}
                    placeholder="Add a comment..."
                    className="w-full outline-none text-sm border border-gray-300 p-2 rounded"
                  />
                  <Button
                    onClick={handleSendComment}
                    variant="outline"
                    disabled={!comment?.trim()}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CommentDialog;
