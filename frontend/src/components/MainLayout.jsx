import React from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";
import BottomMenu from "./BottomMenu";

const MainLayout = () => {
  return (
    <div className="flex">
      <LeftSidebar />
      <BottomMenu />
      <div className="h-screen overflow-y-auto flex-1 px-0 lg:px-10s pb-12 md:pb-0">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
