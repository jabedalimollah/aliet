import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect, useState } from "react";
// import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import CreatePost from "./CreatePost";
import { setPosts, setSelectedPost } from "@/redux/postSlice";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { setLikeNotification } from "@/redux/notificationSlice";
import { toast } from "react-toastify";

const Header = () => {
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
    }
  };

  const handleNotificationClose = () => {
    setNotificationOpen(false);
    dispatch(setLikeNotification([]));
  };
  const headerItems = [
    {
      icon: <Heart />,
      text: "Notifications",
    },

    {
      icon: <LogOut />,
      text: "Logout",
    },
  ];

  // useEffect(() => {}, [likeNotification, dispatch]);
  return (
    <>
      <div className="px-4  w-full md:w-fit lg:w-[16%] flex md:hidden fixed top-0 left-0 z-10 bg-white border-b ">
        {/* <div className="fixed top-0 left-0 z-10 px-4 border-r border-gray-300 w-[16%] h-screen"> */}
        <div className="flex w-full justify-between items-center">
          <h1 className=" pl-3 font-bold text-xl">Logo</h1>
          <div className="flex gap-x-0">
            {headerItems.map((item, index) => {
              return (
                <div
                  onClick={() => sidebarHandler(item.text)}
                  key={index}
                  className="p-3 flex items-center justify-center lg:justify-start gap-4 relative hover:bg-gray-100 cursor-pointer rounded-lg"
                >
                  {item.icon}

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

export default Header;
