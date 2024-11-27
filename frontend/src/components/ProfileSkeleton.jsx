import React from "react";

const ProfileSkeleton = () => {
  return (
    <div className="w-full flex flex-col items-center h-full md:h-screen justify-evenly p-6 md:p-0 mb-8 md:mb-0 ">
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-40"></div>
          </div>
        </div>

        <div className="skeleton h-32 w-full "></div>
      </div>
      <div className="flex w-full flex-col md:flex-row gap-4 gap-y-8 md:gap-y-0  my-10 ">
        <div className="flex w-full flex-col gap-4">
          <div className="skeleton h-40 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
        <div className="flex w-full flex-col gap-4">
          <div className="skeleton h-40 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
        <div className="flex w-full flex-col gap-4">
          <div className="skeleton h-40 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
