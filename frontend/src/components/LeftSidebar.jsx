import {
  Heart,
  Home,
  Info,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect, useState } from "react";
// import { toast } from "sonner";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthUser,
  setSuggestedUsers,
  setUserProfile,
} from "@/redux/authSlice";
import CreatePost from "./CreatePost";
import { setPosts, setSelectedPost } from "@/redux/postSlice";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { setLikeNotification } from "@/redux/notificationSlice";
import SearchBox from "./SearchBox";
import { toast } from "react-toastify";
import {
  setMessages,
  setOnlineUsers,
  setSelectedUser,
} from "@/redux/chatSlice";
// import { persistor } from "@/redux/store";

const LeftSidebar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { likeNotification } = useSelector((state) => state.notification);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_KEY}/user/logout`,
        {
          withCredentials: true,
        }
      );
      //   console.log(res);
      if (res.data.statusInfo == "success") {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        dispatch(setSuggestedUsers([]));
        dispatch(setUserProfile(null));
        dispatch(setSelectedUser(null));
        dispatch(setOnlineUsers([]));
        dispatch(setMessages([]));
        dispatch(setLikeNotification([]));
        localStorage.removeItem("persist:root");
        // persistor.purge().then(() => {
        //   console.log("User logged out and state cleared.");
        //   // localStorage.removeItem("persist:root");
        // });

        navigate("/login");
        toast.success(res.data.message, {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
      });
      //   console.log(error);
    }
  };

  const sidebarHandler = (textType) => {
    if (textType === "Logout") {
      logoutHandler();
    } else if (textType === "Create") {
      setOpen(true);
    } else if (textType === "Profile") {
      navigate(`profile/${user?._id}`);
    } else if (textType === "Home") {
      navigate("/");
    } else if (textType === "Messages") {
      navigate("/chat");
    } else if (textType === "Notifications") {
      setNotificationOpen(!notificationOpen);
      // dispatch(setLikeNotification([]));
      // console.log(likeNotification);
    } else if (textType === "About") {
      navigate("/about");
    }
  };

  const handleNotificationClose = () => {
    setNotificationOpen(false);
    dispatch(setLikeNotification([]));
  };
  const sidebarItems = [
    {
      icon: <Home />,
      text: "Home",
    },
    {
      icon: <Search />,
      text: "Search",
    },
    {
      icon: <Info />,
      text: "About",
    },
    {
      icon: <MessageCircle />,
      text: "Messages",
    },
    {
      icon: <Heart />,
      text: "Notifications",
    },
    {
      icon: <PlusSquare />,
      text: "Create",
    },
    {
      icon: (
        <Avatar className={"w-6 h-6"}>
          <AvatarImage
            src={
              user?.profilePicture?.length != 0
                ? user?.profilePicture
                : "images/default_profile.png"
            }
            alt="profile_Picture"
          />
          <AvatarFallback className={"bg-gray-200"}>
            {user?.username[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    {
      icon: <LogOut />,
      text: "Logout",
    },
  ];

  // useEffect(() => {}, [likeNotification, dispatch]);

  return (
    <>
      <div className="px-4 border-r border-gray-300 w-[16%] md:w-fit lg:w-[16%] h-screen hidden md:inline-block">
        {/* <div className="fixed top-0 left-0 z-10 px-4 border-r border-gray-300 w-[16%] h-screen"> */}
        <div className="flex flex-col">
          {/* <h1 className="my-3 p-3 font-bold text-xl">Aliet</h1> */}
          <NavLink
            to={"/"}
            className="w-full flex items-center justify-center lg:justify-start"
          >
            <img
              src="images/aliet1.png"
              alt="Aliet"
              className="h-10 ml-6 mt-3 hidden lg:inline-block"
            />
            <img
              src="images/aliet2.png"
              alt="Aliet"
              className="h-7  my-5 inline-block lg:hidden"
            />
          </NavLink>
          <div>
            {sidebarItems.map((item, index) => {
              return (
                <div
                  onClick={() => sidebarHandler(item.text)}
                  key={index}
                  className="flex items-center justify-center lg:justify-start gap-4 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3"
                >
                  {item.text != "Search" && item.icon}
                  {item.text != "Search" && (
                    <span className="inline-block md:hidden lg:inline-block">
                      {" "}
                      {item.text}
                    </span>
                  )}
                  <>
                    {item.text === "Notifications" &&
                      likeNotification.length > 0 && (
                        <Popover open={notificationOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              size="icon"
                              className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-6 left-6"
                            >
                              {likeNotification.length}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            onInteractOutside={handleNotificationClose}
                          >
                            <div>
                              {likeNotification.length == 0 ? (
                                <p>No new notification</p>
                              ) : (
                                likeNotification.map((notification, index) => {
                                  return (
                                    <div
                                      key={index}
                                      className="flex items-center gap-2 my-2"
                                    >
                                      <Avatar>
                                        <AvatarImage
                                          src={
                                            notification.userDetails
                                              ?.profilePicture
                                          }
                                        />
                                        <AvatarFallback>
                                          {notification.userDetails?.username}
                                        </AvatarFallback>
                                      </Avatar>
                                      <p className="text-sm">
                                        <span className="font-bold">
                                          {notification.userDetails?.username}
                                        </span>{" "}
                                        liked your post
                                      </p>
                                    </div>
                                  );
                                })
                              )}
                            </div>
                          </PopoverContent>
                        </Popover>
                      )}
                  </>
                  {/* {item.text === "Notifications" &&
                  likeNotification.length > 0 && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          size="icon"
                          className={
                            "rounded-full h-5 w-5 absolute bottom-6 left-6"
                          }
                        >
                          {likeNotification.length}
                        </Button>
                        <PopoverContent>
                          <div>
                            {likeNotification.length === 0 ? (
                              <p>No notification</p>
                            ) : (
                              likeNotification.map((notification) => (
                                <div key={notification.userId}>
                                  <Avatar>
                                    <AvatarImage
                                      src={
                                        notification.userDetails?.profilePicture
                                      }
                                      alt="profile"
                                    />
                                  </Avatar>
                                  <p className="text-sm">
                                    <span className="font-bold">
                                      {notification.userDetails?.username}
                                    </span>
                                    liked your post
                                  </p>
                                </div>
                              ))
                            )}
                          </div>
                        </PopoverContent>
                      </PopoverTrigger>
                    </Popover>
                  )} */}

                  {item.text === "Search" && (
                    <div className="drawer">
                      <input
                        id="my-drawer"
                        type="checkbox"
                        className="drawer-toggle"
                      />
                      <div className="drawer-content">
                        {/* Page content here */}
                        <label
                          htmlFor="my-drawer"
                          className="w-full flex gap-4 md:justify-center lg:justify-start  drawer-button"
                        >
                          {item.icon}
                          <span className="inline-block md:hidden lg:inline-block">
                            {" "}
                            {item.text}
                          </span>
                        </label>
                      </div>
                      <SearchBox />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <CreatePost open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default LeftSidebar;
