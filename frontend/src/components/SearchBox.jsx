import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const SearchBox = () => {
  const { suggestedUsers } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const [allUser, setAllUser] = useState([]);

  const handleSearchBox = (e) => {
    setSearch(e.target.value);
    // console.log(e.target.value);
    let newData = [];
    newData = suggestedUsers.filter((item) => {
      return (
        !(
          item.username.toLowerCase().indexOf(e.target.value.toLowerCase()) ===
          -1
        ) ||
        !(item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) === -1)
      );
    });
    // console.log(newData);
    setAllUser(newData);
    if (e.target.value?.length === 0) {
      setSearch("");
      setAllUser(suggestedUsers);
    }
  };
  const searchCancelBtn = () => {
    setSearch("");
    setAllUser(suggestedUsers);
  };
  useEffect(() => {
    setAllUser(suggestedUsers);
  }, [suggestedUsers]);
  return (
    <>
      <div className="drawer-side z-0 md:z-50 ">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4 hidden md:inline-block">
          <div className="w-full sticky top-0 left-0 z-30 bg-gray-100 p-4s">
            <div className="w-full flex items-center gap-x-2">
              <label htmlFor="my-drawer" className="btn btn-circle btn-sm">
                ✕
              </label>
              <h2 className="text-lg font-semibold">Search</h2>
            </div>
            <div className="w-full flex justify-between bg-gray-200 px-3 py-1 rounded-md my-2">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={handleSearchBox}
                className="w-full outline-none border-none bg-transparent px-2 py-2"
              />
              {search?.length == 0 || (
                <button
                  onClick={searchCancelBtn}
                  className="px-3 py-2 hover:bg-gray-300 rounded-full"
                >
                  ✕
                </button>
              )}
            </div>{" "}
          </div>
          {/* Sidebar content here */}
          <ul className="w-full">
            {allUser?.map((item, index) => (
              <li key={item?._id} className="w-full">
                <label className="w-full flex" htmlFor="my-drawer">
                  <NavLink
                    to={`/profile/${item?._id}`}
                    className={"w-full flex items-center gap-2"}
                    htmlFor="my-drawer"
                  >
                    <Avatar>
                      <AvatarImage
                        src={item?.profilePicture}
                        alt="post_image"
                      />
                      <AvatarFallback>
                        {item?.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {/* </NavLink>
                <NavLink to={`/profile/${item?._id}`} className={"w-full"}> */}
                    <label className="" htmlFor="my-drawer">
                      <h1 className="font-semibold text-sm">
                        {item?.username}
                      </h1>
                      <span className="text-gray-600 text-sm">
                        {/* {item?.bio || "Bio here..."} */}
                        {item?.name}
                      </span>
                    </label>{" "}
                  </NavLink>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="drawer-side z-50 md:z-0 md:hidden ">
        <label
          htmlFor="my-drawer1"
          aria-label="close sidebar"
          className="drawer-overlay "
        ></label>
        <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4 pt-16 z-50 ">
          <div className="w-full  z-30 bg-gray-100 p-4s">
            <div className="w-full flex items-center gap-x-2">
              <label htmlFor="my-drawer1" className="btn btn-circle btn-sm">
                ✕
              </label>
              <h2 className="text-lg font-semibold">Search</h2>
            </div>
            <div className="w-full flex justify-between bg-gray-200 px-3 py-1 rounded-md my-2">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={handleSearchBox}
                className="w-full outline-none border-none bg-transparent px-2 py-2"
              />
              {search?.length == 0 || (
                <button
                  onClick={searchCancelBtn}
                  className="px-3 py-2 hover:bg-gray-300 rounded-full"
                >
                  ✕
                </button>
              )}
            </div>{" "}
          </div>
          {/* Sidebar content here */}
          <ul className="w-full">
            {allUser?.map((item, index) => (
              <li key={item?._id} className="w-full">
                <label className="w-full flex" htmlFor="my-drawer1">
                  <NavLink
                    to={`/profile/${item?._id}`}
                    className={"w-full flex items-center gap-2"}
                    htmlFor="my-drawer1"
                  >
                    <Avatar>
                      <AvatarImage
                        src={item?.profilePicture}
                        alt="post_image"
                      />
                      <AvatarFallback>
                        {item?.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {/* </NavLink>
                <NavLink to={`/profile/${item?._id}`} className={"w-full"}> */}
                    <label className="" htmlFor="my-drawer1">
                      <h1 className="font-semibold text-sm">
                        {item?.username}
                      </h1>
                      <span className="text-gray-600 text-sm">
                        {/* {item?.bio || "Bio here..."} */}
                        {item?.name}
                      </span>
                    </label>{" "}
                  </NavLink>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SearchBox;
