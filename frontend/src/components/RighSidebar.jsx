import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import SuggestedUsers from "./SuggestedUsers";

const RighSidebar = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className=" w-[30%] overflow-hidden hidden lg:flex flex-col items-start my-10 px-6">
      {/* <div className=" lg:w-[30%] overflow-hidden px-3 my-10  pr-32"> */}
      <div className="flex items-center gap-2">
        <NavLink to={`/profile/${user?._id}`}>
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt="post_image" />
            <AvatarFallback>{user?.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </NavLink>

        <div className="">
          <h1 className="font-semibold text-sm">
            <NavLink to={`/profile/${user?._id}`}>{user?.username}</NavLink>
          </h1>
          <span className="text-gray-600 text-sm overflow-hidden ">
            {user?.name}
          </span>
        </div>
      </div>
      <SuggestedUsers />
    </div>
  );
};

export default RighSidebar;
