import Feed from "@/components/Feed";
import FeedSkeleton from "@/components/FeedSkeleton";
import Header from "@/components/Header";
import RighSidebar from "@/components/RighSidebar";
import SuggestedUserSkeleton from "@/components/SuggestedUserSkeleton";
import useGetAllPost from "@/hooks/useGetAllPost";
import useGetAuthUserProfile from "@/hooks/useGetAuthUserProfile";
import useGetSuggestedUsers from "@/hooks/useGetSuggestedUsers";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Home = () => {
  // const { user } = useSelector((state) => state.auth);
  const { allPostLoading, suggestedUsersLoading } = useSelector(
    (state) => state.loading
  );
  let loading = true;
  useGetAllPost();

  useGetSuggestedUsers();

  useGetAuthUserProfile();
  return (
    <div className="flex ">
      <div className="flex-grow">
        <Header />
        <div className="pt-6 md:pt-0">
          {allPostLoading ? (
            <div className="w-full md:h-screen py-10  gap-y-10 flex-1 flex flex-col items-center px-6 md:px-0 bg-purple-50 h-full lg:h-screen  lg:overflow-y-auto">
              <FeedSkeleton />
              <FeedSkeleton />
              <FeedSkeleton />
            </div>
          ) : (
            <Feed />
          )}
          <Outlet />
        </div>
      </div>
      {suggestedUsersLoading ? (
        <div className=" w-[30%] overflow-hidden hidden lg:flex flex-col items-start my-10 px-6 gap-y-8">
          <SuggestedUserSkeleton />
          <SuggestedUserSkeleton />
          <SuggestedUserSkeleton />
        </div>
      ) : (
        <RighSidebar />
      )}
    </div>
  );
};

export default Home;
