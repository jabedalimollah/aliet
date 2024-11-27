import React from "react";

const SuggestedUserSkeleton = () => {
  return (
    <>
      <div className="flex w-52 flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-40"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuggestedUserSkeleton;
