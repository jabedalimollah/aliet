import {
  Heart,
  Home,
  Info,
  Loader2,
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
import { setAuthUser } from "@/redux/authSlice";
import CreatePost from "./CreatePost";
import { setPosts, setSelectedPost } from "@/redux/postSlice";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { setLikeNotification } from "@/redux/notificationSlice";
import { toast } from "react-toastify";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { likeNotification } = useSelector((state) => state.notification);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const sidebarHandler = (textType) => {
    if (textType === "Logout") {
      // logoutHandler();
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
  const headerItems = [
    {
      icon: <Heart />,
      text: "Notifications",
    },
    {
      icon: <Info />,
      text: "About",
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
          {/* <h1 className=" pl-3 font-bold text-xl">Logo</h1> */}
          <NavLink to={"/"} className="w-full flex items-center justify-start">
            <img
              src="images/aliet1.png"
              alt="Aliet"
              className="h-10 ml-2 mt-3s p-2 inline-block md:hidden "
            />
          </NavLink>
          <div className="flex gap-x-0">
            {headerItems.map((item, index) => {
              return (
                <div
                  onClick={() => sidebarHandler(item.text)}
                  key={index}
                  className="p-3 flex items-center justify-center lg:justify-start gap-4 relative hover:bg-gray-100 cursor-pointer rounded-lg"
                >
                  {/* {item.icon} */}
                  {item.text != "Logout" && item.icon}

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
                  {item.text === "Logout" && (
                    <Dialog className="">
                      <DialogTrigger asChild>
                        <div className="w-full m-0 flex gap-4">
                          {item.icon}
                          {/* <span className="inline-block md:hidden lg:inline-block">
                            {item.text}
                          </span> */}
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]s w-[90%] rounded-lg ">
                        <DialogHeader>
                          <DialogTitle>Log out</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to log out ?
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4"></div>
                          <div className="grid grid-cols-4 items-center gap-4"></div>
                        </div>
                        <DialogFooter
                          className={"w-full flex flex-row justify-between"}
                        >
                          {loading ? (
                            <Button className="flex">
                              {" "}
                              <Loader2 className=" h-4 animate-spin" /> Please
                              wait...
                            </Button>
                          ) : (
                            <Button
                              type="submit"
                              onClick={() => logoutHandler()}
                              className="bg-red-700 px-6"
                            >
                              Yes
                            </Button>
                          )}
                          <DialogClose asChild>
                            <Button
                              type="button"
                              variant="secondary"
                              className="px-6"
                            >
                              No
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
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

export default Header;
