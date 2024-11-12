import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const SuggestedUsers = () => {
  const { user, suggestedUsers } = useSelector((state) => state.auth);
  return (
    <div className="my-10">
      <div className="flex items-center justify-between text-sm">
        <h1 className="font-semibold text-gray-600">Suggested for you</h1>
        <span className="font-medium cursor-pointer">See All</span>
      </div>
      {suggestedUsers?.map((people) => {
        return (
          <div
            key={people._id}
            className="flex items-center justify-between my-5"
          >
            <div className="flex items-center gap-2">
              <NavLink to={`/profile/${people?._id}`}>
                <Avatar>
                  <AvatarImage src={people?.profilePicture} alt="post_image" />
                  <AvatarFallback>{people?.username}</AvatarFallback>
                </Avatar>
              </NavLink>

              <div className="">
                <h1 className="font-semibold text-sm">
                  <NavLink to={`/profile/${people?._id}`}>
                    {people?.username}
                  </NavLink>
                </h1>
                <span className="text-gray-600 text-sm">
                  {people?.bio || "Bio here..."}
                </span>
              </div>
            </div>
            {user?.following?.includes(people?._id) ? (
              <span className="text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#4e96c6] ">
                Unfollow
              </span>
            ) : (
              <span className="text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#4e96c6] ">
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
        );
      })}
    </div>
  );
};

export default SuggestedUsers;
