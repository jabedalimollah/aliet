import Footer from "@/components/Footer";
import React from "react";
import { BiSolidError } from "react-icons/bi";
import { NavLink } from "react-router-dom";
const PageNotFound = () => {
  return (
    <>
      <div className="w-full h-screen bg_gradient_signup">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <span>
            <BiSolidError className="text-9xl text-purple-500" />
          </span>
          <h2 className="text-4xl font-semibold">404</h2>
          <span className="text-xl">Page Not Found</span>
          <NavLink
            to={"/"}
            className={
              " border-b-2 border-purple-500 text-purple-500 bg-transparent hover:bg-purple-500 transition-all px-8 py-2 my-2 hover:rounded-sm hover:text-white font-semibold"
            }
          >
            Back
          </NavLink>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PageNotFound;
