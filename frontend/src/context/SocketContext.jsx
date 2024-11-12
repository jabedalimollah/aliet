import { setOnlineUsers } from "@/redux/chatSlice";
import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
const socketContext = createContext();
const useSocketContext = () => {
  return useContext(socketContext);
};
const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  // const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      // const socket = io('http://localhost:8000', {
      const socket = io(`${import.meta.env.VITE_APP_URI}`, {
        query: {
          userId: user?._id,
        },
        transports: ["websocket"],
      });
      setSocket(socket);
      socket.on("getOnlineUsers", (users) => {
        // setOnlineUsers(users);
        dispatch(setOnlineUsers(users));
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);
  return (
    <socketContext.Provider value={{ socket }}>
      {children}
    </socketContext.Provider>
  );
};

export { SocketProvider, useSocketContext };
