import Feed from "@/components/Feed";
import RighSidebar from "@/components/RighSidebar";
import useGetAllPost from "@/hooks/useGetAllPost";
import useGetAuthUserProfile from "@/hooks/useGetAuthUserProfile";
import useGetSuggestedUsers from "@/hooks/useGetSuggestedUsers";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  useGetAllPost();
  useGetSuggestedUsers();
  useGetAuthUserProfile(user?._id);
  return (
    <div className="flex ">
      <div className="flex-grow">
        <Feed />
        <Outlet />
      </div>
      <RighSidebar />
    </div>
  );
};

export default Home;
