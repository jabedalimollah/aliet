// import { setOnlineUsers } from "@/redux/chatSlice";
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
      const uri = import.meta.env.VITE_APP_URI;
      if (!uri) {
        console.error("VITE_APP_URI is not defined");
        return;
      }

      const socketInstance = io(uri, {
        query: {
          userId: user?._id,
        },
        transports: ["websocket"],
      });

      setSocket(socketInstance);

      socketInstance.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users));
      });

      socketInstance.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
      });

      return () => {
        socketInstance.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user, socket]);

  return (
    <socketContext.Provider value={{ socket }}>
      {children}
    </socketContext.Provider>
  );
};

export { SocketProvider, useSocketContext };

useEffect(() => {
  if (user) {
    const socket = io(`${import.meta.env.VITE_APP_URI}`, {
      query: {
        userId: user?._id,
      },
      transports: ["websocket"],
    });

    // dispatch(setSocket(socket));
    // console.log(typeof socket);

    socket.on("getOnlineUsers", (onlineUser) => {
      dispatch(setOnlineUsers(onlineUser));
    });
    socket.on("notification", (notification) => {
      // console.log(notification);
      dispatch(setLikeNotification(notification));
    });
    return () => {
      socket.close();
      dispatch(setSocket(null));
    };
  } else if (socket) {
    socket.close();
    dispatch(setSocket(null));
  }
}, [user, dispatch]);
