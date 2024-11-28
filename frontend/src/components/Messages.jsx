import React, { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetAllMessages from "@/hooks/useGetAllMessages";
import useGetMessage from "@/hooks/useGetMessage";
import { Loader2 } from "lucide-react";

const Messages = ({ selectedUser }) => {
  useGetMessage();
  useGetAllMessages();
  const { user } = useSelector((state) => state.auth);
  const { messages } = useSelector((state) => state.chat);
  const { messageLoading } = useSelector((state) => state.loading);
  const scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <div className="overflow-y-auto flex-1 p-4 pb-28 md:pb-0 ">
      <div className="flex justify-center">
        <div className="flex flex-col items-center justify-center">
          <Avatar className="h-20 w-20">
            <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
            <AvatarFallback>
              {selectedUser?.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span>{selectedUser?.username}</span>
          <NavLink to={`/profile/${selectedUser?._id}`}>
            <Button
              variant="secondary"
              className="h-8 my-2 border border-purple-500 bg-transparent text-purple-700"
            >
              View profile
            </Button>
          </NavLink>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {messageLoading ? (
          <div className="w-full flex justify-center mt-10">
            <span className="flex items-center">
              <Loader2 className="mr-2 h-4 m-4 animate-spin" /> Please wait...
            </span>
          </div>
        ) : (
          messages &&
          messages.map((message) => (
            <div
              ref={scroll}
              key={message?._id}
              className={`chat ${
                message?.senderId === user?._id ? "chat-end" : "chat-start"
              }`}
            >
              <div
                className={`  chat-bubble chat-bubble-primary ${
                  message?.senderId === user?._id
                    ? "bg-purple-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {message?.message}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Messages;
