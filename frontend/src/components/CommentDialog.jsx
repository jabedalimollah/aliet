import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { NavLink } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import axios from "axios";
import { setPosts } from "@/redux/postSlice";
import { toast } from "sonner";

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
        toast.success(res.data.message);
        // setText("");
        setComment("");
      }
    } catch (error) {
      // console.log(error.response.data.message);
      toast.error(error.response.data.message);
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
          <div className="flex flex-1">
            <div className="w-1/2">
              <img
                src={selectedPost?.image}
                alt="post_image"
                className="w-full h-full object-cover rounded-l-lg"
              />
            </div>

            <div className="w-1/2 flex flex-col justify-between">
              <div className="flex items-center justify-between p-4">
                <div className="flex gap-3 items-center">
                  <NavLink>
                    <Avatar>
                      <AvatarImage
                        src={selectedPost?.author?.profilePicture}
                        alt="post_image"
                      />
                      <AvatarFallback>CN</AvatarFallback>
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
              <hr />
              <div className="flex-1 overflow-y-auto max-h-96 p-4">
                {/* comments ... */}
                {comments.map((comment) => (
                  <Comment key={comment._id} comment={comment} />
                ))}
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2">
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
