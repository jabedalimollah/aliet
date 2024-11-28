import React from "react";
import Posts from "./Posts";

const Feed = () => {
  return (
    <div className="flex-1 flex flex-col items-center px-6 md:px-0 bg-purple-50 h-full min-h-screen lg:h-screen  lg:overflow-y-auto ">
      {/* <div className="flex-1 my-8 flex flex-col items-center pl-[20%]"> */}
      <Posts />
    </div>
  );
};

export default Feed;
