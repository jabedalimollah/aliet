import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { setAuthUser, setSuggestedUsers } from "@/redux/authSlice";
import axios from "axios";
import { toast } from "react-toastify";
// import { toast } from "sonner";

const SuggestedUsers = () => {
  const { user, suggestedUsers } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  // const isLoggedInUserProfile = user?._id == userProfile?._id;
  const handleFollowAndUnfollow = async (Id) => {
    try {
      if (user?._id != Id) {
        // console.log(userProfile?._id);
        const res = await axios.get(
          `${import.meta.env.VITE_APP_API_KEY}/user/followorunfollow/${Id}`,
          {
            // headers: {
            //   "Content-Type": "application/json",
            // },
            withCredentials: true,
          }
        );
        // let updateUsers = [];
        // updateUsers = suggestedUsers?.map((item) =>
        //   item?._id === Id ? res?.data.data.selectedUser : item
        // );

        // dispatch(setSuggestedUsers(updateUsers));
        // console.log(res?.data.data);
        dispatch(setAuthUser(res?.data.data.user));

        // dispatch(setSuggestedUsers(updateUsers));
        // suggestedUsers?.includes(res?.data.data.selectedUser)?
        // dispatch(setSuggestedUsers(suggestedUsers));
        if (res.data.statusInfo == "success") {
          // toast.success(res.data.message, {
          //   position: "top-center",
          // });
        }
      }
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    }
  };

  return (
    <div className="my-10">
      <div className="flex items-center justify-between text-sm gap-x-2">
        <h1 className="font-semibold text-gray-600">Suggested for you</h1>
        <span className="font-medium cursor-pointer">See All</span>
      </div>
      {suggestedUsers?.map((people) => {
        return (
          user?.following.includes(people?._id) || (
            <div
              key={people?._id}
              className="flex items-center justify-between my-5"
            >
              <div className="flex items-center gap-2">
                <NavLink to={`/profile/${people?._id}`}>
                  <Avatar>
                    <AvatarImage
                      src={people?.profilePicture}
                      alt="post_image"
                    />
                    <AvatarFallback>
                      {people?.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </NavLink>

                <div className="">
                  <h1 className="font-semibold text-sm">
                    <NavLink to={`/profile/${people?._id}`}>
                      {people?.username}
                    </NavLink>
                  </h1>
                  <span className="text-gray-600 text-sm w-20 truncate block">
                    {/* {people?.bio || "Bio here..."} */}
                    {people?.name}
                  </span>
                </div>
              </div>
              {user?.following?.includes(people?._id) ? (
                <span
                  onClick={() => handleFollowAndUnfollow(people?._id)}
                  className="text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#4e96c6] "
                >
                  Unfollow
                </span>
              ) : (
                <span
                  onClick={() => handleFollowAndUnfollow(people?._id)}
                  className="text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#4e96c6] "
                >
                  {/* Follow */}
                  {user?.followers?.includes(people?._id)
                    ? "Follow Back"
                    : "Follow"}
                </span>
              )}

              {/* <span className="text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#4e96c6] ">
            Follow 
            </span> */}
            </div>
          )
        );
      })}
    </div>
  );
};

export default SuggestedUsers;
