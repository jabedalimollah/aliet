import Feed from "@/components/Feed";
import Header from "@/components/Header";
import RighSidebar from "@/components/RighSidebar";
import useGetAllPost from "@/hooks/useGetAllPost";
import useGetAuthUserProfile from "@/hooks/useGetAuthUserProfile";
import useGetSuggestedUsers from "@/hooks/useGetSuggestedUsers";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Home = () => {
  // const { user } = useSelector((state) => state.auth);
  useGetAllPost();
  useGetSuggestedUsers();
  let a = localStorage.getItem("persist:root");
  // console.log(a);
  useGetAuthUserProfile();
  return (
    <div className="flex ">
      <div className="flex-grow">
        <Header />
        <div className="pt-6 md:pt-0">
          <Feed />
          <Outlet />
        </div>
      </div>
      <RighSidebar />
    </div>
  );
};

export default Home;
