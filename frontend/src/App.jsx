import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import ChatPage from "./components/ChatPage";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/chatSlice";
import { setLikeNotification } from "./redux/notificationSlice";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound";
// import { useSocketContext } from "./context/SocketContext";
const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/profile/:id",
        element: (
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/account/edit",
        element: (
          <ProtectedRoutes>
            <EditProfile />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/chat",
        element: (
          <ProtectedRoutes>
            <ChatPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/about",
        element: (
          <ProtectedRoutes>
            <About />
          </ProtectedRoutes>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  // const { user } = useSelector((state) => state.auth);
  // const { socket } = useSelector((state) => state.socket);
  // const { socket } = useSocketContext();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (user) {
  //     const socket = io(`${import.meta.env.VITE_APP_URI}`, {
  //       query: {
  //         userId: user?._id,
  //       },
  //       transports: ["websocket"],
  //     });
  //     // dispatch(setSocket(socket));
  //     // console.log(typeof socket);
  //     socket.on("getOnlineUsers", (onlineUser) => {
  //       dispatch(setOnlineUsers(onlineUser));
  //     });
  //     socket.on("notification", (notification) => {
  //       // console.log(notification);
  //       dispatch(setLikeNotification(notification));
  //     });
  //     return () => {
  //       socket.close();
  //       // dispatch(setSocket(null));
  //     };
  //   } else if (socket) {
  //     socket.close();
  //     // dispatch(setSocket(null));
  //   }
  // }, [user, dispatch]);
  return (
    <>
      <RouterProvider router={browserRouter} />
      <ToastContainer />
    </>
  );
}

export default App;
