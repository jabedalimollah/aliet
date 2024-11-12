import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { setMessages, setSelectedUser } from "@/redux/chatSlice";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MessageCircle, MessageCircleCode } from "lucide-react";
import Messages from "./Messages";
import { toast } from "sonner";
import axios from "axios";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const { user, suggestedUsers } = useSelector((state) => state.auth);
  const { selectedUser, onlineUsers, messages } = useSelector(
    (state) => state.chat
  );
  // console.log(selectedUser);
  const dispatch = useDispatch();
  //   console.log(messages);
  const sendMessageHandler = async (receiverId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API_KEY}/message/send/${receiverId}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res?.data.data);
      if (res?.data?.statusInfo == "success") {
        dispatch(setMessages([...messages, res.data.data]));
        setMessage("");
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data.message);
    }
  };
  // console.log(selectedUser);
  useEffect(() => {
    return () => {
      // dispatch(setSelectedUser(null));
    };
  }, []);
  return (
    <div className="flex ml-[16%] h-screen">
      <section className="w-full md:w-1/4 my-8">
        <h1 className="font-bold mb-4 px-3 text-xl">{user?.username}</h1>
        <hr className="mb-4 border border-gray-400" />
        <div className="overflow-y-auto h-[80vh]">
          {suggestedUsers.map((user) => {
            const isOnline = onlineUsers.includes(user?._id);
            return (
              <div
                key={user?._id}
                onClick={() => dispatch(setSelectedUser(user))}
                className="flex gap-3 items-center p-3 hover:bg-gray-100 cursor-pointer"
              >
                <Avatar className="w-14 h-14">
                  <AvatarImage
                    src={user?.profilePicture}
                    alt="profile_picture"
                  />
                  <AvatarFallback>{user?.username}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{user?.username}</span>
                  <span
                    className={`text-xs font-bold ${
                      isOnline ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isOnline ? "Online" : "Offline"}
                    {/* Online */}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {selectedUser ? (
        <section className="flex-1 border-l border-l-gray-300 flex flex-col h-full">
          <div className="flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-white z-10">
            <Avatar>
              <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
              <AvatarFallback>{selectedUser?.username}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span>{selectedUser?.username}</span>
            </div>
          </div>
          {/* message... */}
          <Messages selectedUser={selectedUser} />
          <div className="flex items-center p-4 border-t border-t-gray-300">
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 mr-2 focus-visible:ring-transparent"
              placeholder="Messages..."
            />
            <Button onClick={() => sendMessageHandler(selectedUser?._id)}>
              Send
            </Button>
          </div>
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center mx-auto">
          <MessageCircleCode className="w-32 h-32 my-4" />
          <h1 className="font-medium text-xl">Your messages</h1>
          <span>Send a message to start a chat</span>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
