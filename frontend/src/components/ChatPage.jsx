import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { setMessages, setSelectedUser } from "@/redux/chatSlice";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, MessageCircle, MessageCircleCode } from "lucide-react";
import Messages from "./Messages";
// import { toast } from "sonner";
import axios from "axios";
import { MdArrowBack } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import useGetAuthUserProfile from "@/hooks/useGetAuthUserProfile";
import { IoChatboxEllipses } from "react-icons/io5";
const token = localStorage.getItem("aliet");
const ChatPage = () => {
  const [message, setMessage] = useState("");
  const { user, suggestedUsers } = useSelector((state) => state.auth);
  const { selectedUser, onlineUsers, messages } = useSelector(
    (state) => state.chat
  );
  const [loading, setLoading] = useState(false);
  // console.log(selectedUser);
  useGetAuthUserProfile();
  const dispatch = useDispatch();
  //   console.log(messages);
  const sendMessageHandler = async (receiverId) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API_KEY}/message/send/${receiverId}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      // console.log(res?.data.data);
      if (res?.data?.statusInfo == "success") {
        dispatch(setMessages([...messages, res.data.data]));
        setMessage("");
        // toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data.message, {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };
  // console.log(selectedUser);
  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, []);
  return (
    <div className="flex sml-[16%] h-screen fixed md:relative top-0 left-0 w-full md:w-auto z-20 ">
      <section
        className={`w-full md:w-1/4 pt-1 pb-8 ${
          selectedUser ? "hidden" : "inline-block"
        } md:inline-block fixed md:relative top-0 left-0 h-screen md:h-auto z-20 bg-purple-50`}
      >
        <h1 className="font-bold mb-4 px-3 text-xl flex items-center gap-1 fixed md:relative top-0 left-0 z-10 bg-whites border-b py-3 w-full">
          <NavLink to={`/`} className={"inline-block md:hidden"}>
            <MdArrowBack />
          </NavLink>
          {/* {user?.username} */}
          <span className="text-purple-700 flex items-end gap-x-2">
            Chat
            <IoChatboxEllipses />
          </span>
        </h1>
        {/* <hr className="mb-4 border-b " /> */}
        <div className={`w-full overflow-y-auto h-[80vh] mt-10 `}>
          {suggestedUsers.map((user) => {
            const isOnline = onlineUsers.includes(user?._id);
            return (
              <div
                key={user?._id}
                onClick={() => dispatch(setSelectedUser(user))}
                className="flex gap-3 items-center p-3 hover:bg-purple-100 cursor-pointer"
              >
                <Avatar className="w-14 h-14 ">
                  <AvatarImage
                    src={user?.profilePicture}
                    alt="profile_picture"
                  />
                  <AvatarFallback className="bg-purple-200 text-purple-600">
                    {user?.username[0].toUpperCase()}
                  </AvatarFallback>
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
        <section
          className={`flex-1 border-l border-l-gray-300 flex flex-col h-full 
        
          `}
        >
          <div className="flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-white z-10">
            <button
              onClick={() => dispatch(setSelectedUser(null))}
              className="inline-block md:hidden"
            >
              <MdArrowBack />
            </button>
            <NavLink to={`/profile/${selectedUser?._id}`}>
              <Avatar>
                <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
                <AvatarFallback>
                  {selectedUser?.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </NavLink>

            <div className="flex flex-col">
              <NavLink to={`/profile/${selectedUser?._id}`}>
                <span>{selectedUser?.username}</span>
              </NavLink>
              <span
                className={`text-xs font-bold ${
                  onlineUsers.includes(selectedUser?._id)
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {onlineUsers.includes(selectedUser?._id) ? "Online" : "Offline"}
                {/* Online */}
              </span>
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
            {loading ? (
              <Button>
                <Loader2 className="h-4  animate-spin" />
              </Button>
            ) : (
              <Button onClick={() => sendMessageHandler(selectedUser?._id)}>
                Send
              </Button>
            )}
          </div>
        </section>
      ) : (
        <div
          className={` hidden md:flex flex-col items-center justify-center mx-auto`}
        >
          <MessageCircleCode className="w-32 h-32 my-4" />
          <h1 className="font-medium text-xl">Your messages</h1>
          <span>Send a message to start a chat</span>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
