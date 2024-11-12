import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Comment = ({ comment }) => {
  return (
    <div className="my-2">
      <div className="flex gap-3 items-center">
        <Avatar>
          <AvatarImage src={comment?.author?.profilePicture} />
          <AvatarFallback>{comment?.author?.username}</AvatarFallback>
        </Avatar>
        <h1 className="font-bold text-sm">{comment?.author?.username}</h1>
        <span className="font-normal pl-1">{comment?.text}</span>
      </div>
    </div>
  );
};

export default Comment;
