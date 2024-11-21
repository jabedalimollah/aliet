import { useSocketContext } from "@/context/SocketContext";
import { setMessages } from "@/redux/chatSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetMessage = () => {
  const { socket } = useSocketContext();

  const { messages } = useSelector((state) => state.chat);
  // const { socket } = useSelector((state) => state.socket);
  // const [socket, setSocket] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      dispatch(setMessages([...messages, newMessage]));
    });
    return () => {
      socket?.off("newMessage");
    };
  }, [messages, setMessages]);
};

export default useGetMessage;
