import { setOnlineUsers } from "@/redux/chatSlice";
import { setLikeNotification } from "@/redux/notificationSlice";
import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

const socketContext = createContext();

const useSocketContext = () => {
  return useContext(socketContext);
};

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const socket = io(`${import.meta.env.VITE_APP_URI}`, {
        query: {
          userId: user?._id,
        },
        transports: ["websocket"],
      });
      setSocket(socket);
      socket.on("getOnlineUsers", (onlineUser) => {
        dispatch(setOnlineUsers(onlineUser));
      });
      socket.on("notification", (notification) => {
        dispatch(setLikeNotification(notification));
      });
      return () => {
        socket.close();
        // dispatch(setSocket(null));
        setSocket(null);
      };
    } else if (socket) {
      socket.close();
      // dispatch(setSocket(null));
      setSocket(null);
    }
  }, [user, dispatch]);

  return (
    <socketContext.Provider value={{ socket }}>
      {children}
    </socketContext.Provider>
  );
};

export { SocketProvider, useSocketContext };
