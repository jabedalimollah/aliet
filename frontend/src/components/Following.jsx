import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { IoMdClose } from "react-icons/io";

import { AiOutlineClose } from "react-icons/ai";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import axios from "axios";
// import { toast } from "sonner";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setUserProfile } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
const Following = ({ userProfile }) => {
  const [close, setClose] = useState(false);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const params = useParams();

  const handleOpen = () => {
    setClose(true);
    getFollowers();
  };
  const handleFollowAndUnfollow = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_KEY}/user/followorunfollow/${id}`,
        {
          // headers: {
          //   "Content-Type": "application/json",
          // },
          withCredentials: true,
        }
      );
      // console.log(res?.data.data);

      dispatch(setAuthUser(res?.data.data.user));
      dispatch(setUserProfile(res?.data.data.user));
      // dispatch(setPosts(res?.data.data.user.posts))
      // dispatch(setUserProfile(res?.data.data.selectedUser));
      setClose(false);
      if (res.data.statusInfo == "success") {
        toast.success(res.data.message, {
          position: "top-center",
        });
        getFollowers();
      }
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };
  const getFollowers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_KEY}/user/following/${
          params.id === user?._id ? user?._id : params.id
        }`,
        {
          // headers: {
          //   "Content-Type": "application/json",
          // },
          withCredentials: true,
        }
      );
      //   console.log(res.data.data);
      if (res.data.statusInfo == "success") {
        // toast.success(res.data.message);
        setFollowing(res.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    }
  };
  useEffect(() => {
    getFollowers();
  }, []);
  return (
    <>
      {/* <p>
        <span className="font-semibold">{userProfile?.followers?.length}</span>{" "}
        followers
      </p> */}

      <Dialog open={close}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            onClick={handleOpen}
            className={
              "border-none outline-none flex md:inline-block flex-col  justify-center items-center text-base m-0 p-0 hover:bg-transparent"
            }
          >
            <p className="flex md:inline-block flex-col  justify-center items-center  text-slate-600">
              <span className="font-semibold text-black">
                {userProfile?.following?.length}
              </span>{" "}
              following
            </p>
          </Button>
        </DialogTrigger>
        <DialogContent
          onInteractOutside={() => setClose(false)}
          //   className="sm:max-w-[425px]"
          className="w-full md:w-2/3 lg:w-1/3 h-screen md:h-2/3"
        >
          <DialogHeader
            className={
              "border-b border-gray-500 hidden flex-row items-center justify-between w-full "
            }
          >
            <DialogTitle className="">Following</DialogTitle>
            <DialogDescription></DialogDescription>
            <Button
              variant="outline"
              className={
                "flex bg-transparents bg-red-600 border-none outline-none "
              }
              onClick={() => setClose(false)}
            >
              <AiOutlineClose className="text-2xl" />
            </Button>
          </DialogHeader>
          <div className=" flex flex-col gap-y-2 overflow-y-auto">
            <div
              className={
                "border-b border-gray-500 flex flex-row items-center justify-between w-full h-11 sticky top-0 bg-white z-10 "
              }
            >
              <h1 className="font-semibold">Following</h1>
              <Button
                variant="outline"
                className={"flex bg-transparent border-none outline-none  "}
                onClick={() => setClose(false)}
              >
                <AiOutlineClose className="text-2xl" />
              </Button>
            </div>
            {following.map((item, index) => (
              <div
                key={item?._id}
                className="w-full flex gap-x-4 hover:bg-slate-50"
              >
                <NavLink
                  to={`/profile/${item?._id}`}
                  className="w-full flex gap-x-4"
                  onClick={() => setClose(false)}
                >
                  <section className="flex items-center justify-center">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={item?.profilePicture}
                        alt="profile_photo"
                      />
                      <AvatarFallback>{item?.username}</AvatarFallback>
                    </Avatar>
                  </section>
                  <div className="flex-1">
                    <h1 className="font-semibold">{item?.username}</h1>
                    <span className="font-normal text-gray-600">
                      {item?.username}
                    </span>
                  </div>
                </NavLink>
                {params.id == user?._id &&
                  (loading ? (
                    <Button
                      variant="outline"
                      className={
                        "bg-blue-600 hover:bg-blue-600 text-white hover:text-white"
                      }
                    >
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                      wait...
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleFollowAndUnfollow(item?._id)}
                      variant="outline"
                      className={"bg-blue-600 text-white"}
                    >
                      {userProfile?.following.includes(item?._id)
                        ? "Unfollow"
                        : "Follow Back"}
                      {/* Follow Back */}
                    </Button>
                  ))}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Following;
