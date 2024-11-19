import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetAllMessages from "@/hooks/useGetAllMessages";
import useGetMessage from "@/hooks/useGetMessage";

const Messages = ({ selectedUser }) => {
  useGetMessage();
  useGetAllMessages();
  const { user } = useSelector((state) => state.auth);
  const { messages } = useSelector((state) => state.chat);
  return (
    <div className="overflow-y-auto flex-1 p-4">
      <div className="flex justify-center">
        <div className="flex flex-col items-center justify-center">
          <Avatar className="h-20 w-20">
            <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
            <AvatarFallback>{selectedUser?.username}</AvatarFallback>
          </Avatar>
          <span>{selectedUser?.username}</span>
          <NavLink to={`/profile/${selectedUser?._id}`}>
            <Button variant="secondary" className="h-8 my-2">
              View profile
            </Button>
          </NavLink>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {messages &&
          messages.map((message) => (
            <div
              className={`flex ${
                message?.senderId === user?._id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`p-2 rounded-lg max-w-xs break-words ${
                  message?.senderId === user?._id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {message?.message}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Messages;