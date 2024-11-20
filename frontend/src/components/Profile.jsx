import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { AtSign, Heart, MessageCircle } from "lucide-react";
import axios from "axios";
// import { toast } from "sonner";
import { setAuthUser, setUserProfile } from "@/redux/authSlice";
import { setSelectedUser } from "@/redux/chatSlice";
import Followers from "./Followers";
import Following from "./Following";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, userProfile } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("posts");
  const dispatch = useDispatch();
  const params = useParams();
  useGetUserProfile(params.id);
  const navigate = useNavigate();
  // console.log(userProfile);
  const isLoggedInUserProfile = user?._id == userProfile?._id;
  const isFollowing = false;
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const displayedPost =
    activeTab === "posts" ? userProfile?.posts : userProfile?.bookmarks;
  // console.log(displayedPost);

  const handleFollowAndUnfollow = async () => {
    try {
      if (!isLoggedInUserProfile) {
        // console.log(userProfile?._id);
        const res = await axios.get(
          `${import.meta.env.VITE_APP_API_KEY}/user/followorunfollow/${
            userProfile?._id
          }`,
          {
            // headers: {
            //   "Content-Type": "application/json",
            // },
            withCredentials: true,
          }
        );
        // console.log(res?.data.data);
        dispatch(setAuthUser(res?.data.data.user));
        dispatch(setUserProfile(res?.data.data.selectedUser));
        if (res.data.statusInfo == "success") {
          toast.success(res.data.message, {
            position: "top-center",
          });
        }
      }
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    }
  };
  const messageHandler = () => {
    // console.log(userProfile);
    dispatch(setSelectedUser(userProfile));
    navigate("/chat");
  };
  // console.log(user.following?.includes(userProfile?._id));
  // console.log(user);
  // console.log(user?.followers?.includes(userProfile?._id));
  return (
    <div className="flex w-full md:max-w-4xl justify-center mx-auto pl-0 md:pl-10 px-0 md:px-6">
      {/* <div className="flex max-w-4xl justify-center mx-auto pl-10"> */}
      <div className="w-full flex flex-col gap-6 md:gap-10 md:gap-20s py-8">
        <div className="w-full grid grid-cols-3 md:grid-cols-2">
          {/* <div className="grid grid-cols-3 md:grid-cols-2"> */}
          <section className="flex items-center justify-center">
            <Avatar className="h-20 w-20 md:h-32 md:w-32">
              <AvatarImage
                src={userProfile?.profilePicture}
                alt="profile_photo"
              />
              <AvatarFallback>{userProfile?.username}</AvatarFallback>
            </Avatar>
          </section>
          <section>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col md:flex-row items-start  md:items-center  gap-2">
                <span>{userProfile?.username}</span>
                {isLoggedInUserProfile ? (
                  <>
                    <NavLink to={"/account/edit"}>
                      <Button
                        variant="secondary"
                        className="hover:bg-gray-200 h-8"
                      >
                        Edit profile
                      </Button>
                    </NavLink>

                    {/* <Button
                      variant="secondary"
                      className="hover:bg-gray-200 h-8"
                    >
                      View archive
                    </Button>
                    <Button
                      variant="secondary"
                      className="hover:bg-gray-200 h-8"
                    >
                      Add tools
                    </Button> */}
                  </>
                ) : (
                  <>
                    {user?.following?.includes(userProfile?._id) ? (
                      <>
                        <Button
                          onClick={handleFollowAndUnfollow}
                          variant={"secondary"}
                          className=" h-8"
                        >
                          Unfollow
                        </Button>
                        {/* <NavLink to={"/chat"}> */}
                        <Button
                          variant={"secondary"}
                          className=" h-8"
                          onClick={messageHandler}
                        >
                          Message
                        </Button>
                        {/* </NavLink> */}
                      </>
                    ) : (
                      <Button
                        onClick={handleFollowAndUnfollow}
                        className="bg-[#0095F6] hover:bg-[#3685ba] h-8"
                      >
                        {user?.followers?.includes(userProfile?._id)
                          ? "Follow Back"
                          : "Follow"}
                        {/* Follow */}
                      </Button>
                    )}
                  </>
                )}
              </div>
              <div className="flex items-center gap-3 md:gap-4 text-base">
                <p className="flex md:inline-block flex-col  justify-center items-center text-slate-600 font-semibold">
                  <span className="font-semibold text-black">
                    {userProfile?.posts?.length}
                  </span>{" "}
                  posts
                </p>
                {/* <p>
                  <span className="font-semibold">
                    {userProfile?.followers?.length}
                  </span>
                  followers
                </p> */}
                <Followers userProfile={userProfile} />

                <Following userProfile={userProfile} />
              </div>
              <div className="hidden md:flex flex-col gap-1">
                <span className="font-semibold">{userProfile?.name}</span>
                <Badge variant={"secondary"} className={"w-fit"}>
                  <AtSign />
                  <span className="pl-1">{userProfile?.username}</span>
                </Badge>
                <span className="">{userProfile?.bio || "bio here..."}</span>
                {/* <span>🌟MERN Stack Developer</span>
                <span>🌟MERN Stack Developer</span> */}
              </div>
            </div>
          </section>
          <div className="flex md:hidden flex-col gap-1 w-full col-span-3 px-4">
            <span className="font-semibold">{userProfile?.username}</span>
            <Badge variant={"secondary"} className={"w-fit"}>
              <AtSign />
              <span className="pl-1">{userProfile?.username}</span>
            </Badge>
            <span className="">{userProfile?.bio || "bio here..."}</span>
            {/* <span>🌟MERN Stack Developer</span>
                <span>🌟MERN Stack Developer</span> */}
          </div>
        </div>
        <div className="border-t border-t-gray-200 px-4">
          <div className="flex justify-center items-center gap-10 text-sm">
            <span
              onClick={() => handleTabChange("posts")}
              className={`py-3 cursor-pointer ${
                activeTab == "posts" ? "font-bold" : "font-normal"
              }`}
            >
              POSTS
            </span>
            <span
              onClick={() => handleTabChange("saved")}
              className={`py-3 cursor-pointer ${
                activeTab == "saved" ? "font-bold" : "font-normal"
              }`}
            >
              SAVED
            </span>
            {/* <span
              onClick={() => handleTabChange("reels")}
              className={`py-3 cursor-pointer ${
                activeTab == "reels" ? "font-bold" : "font-normal"
              }`}
            >
              REELS
            </span>
            <span
              onClick={() => handleTabChange("tags")}
              className={`py-3 cursor-pointer ${
                activeTab == "tags" ? "font-bold" : "font-normal"
              }`}
            >
              TAGS
            </span> */}
          </div>
          <div className="grid grid-cols-3 gap-1">
            {displayedPost?.map((post, index) => (
              <div key={index} className="relative group cursor-pointer">
                <img
                  src={post.image}
                  alt="post_image"
                  className="rounded-sm my-2s w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center text-white space-x-4 text-xs">
                    <button className="flex items-center gap-2 hover:text-gray-300">
                      <Heart className="w-[50%]" />
                      <span>{post?.likes?.length}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-gray-300">
                      <MessageCircle className="w-[50%]" />
                      <span>{post?.comments?.length}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
