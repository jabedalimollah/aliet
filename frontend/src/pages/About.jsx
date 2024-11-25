import Footer from "@/components/Footer";
import React from "react";
import { NavLink } from "react-router-dom";

const About = () => {
  return (
    <div className="">
      <div className="h-fit p-4 md:p-0 text-xs md:text-sm lg:text-base">
        <div className="sm:flex items-center max-w-screen-xl p-0">
          {/* <div className="sm:w-1/2 "> */}
          <div className="sm:w-[40%] ">
            <div className="image object-center text-center">
              <img src={"/images/about.png"} alt="about" />
            </div>
          </div>
          {/* <div className="sm:w-1/2 "> */}
          <div className="sm:w-[50%]">
            <div className="text">
              <span className="text-gray-500 border-b-2 border-purple-600 uppercase">
                About us
              </span>
              <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">
                About
                <NavLink to={"/"}>
                  <span className="text-purple-600"> Aliet</span>
                </NavLink>
                {/* <span className="text-indigo-600">Our Company</span> */}
              </h2>
              <p className="text-gray-700 md:text-sm lg:text-base">
                Welcome to Aliet, your go-to social media platform for
                connecting, sharing, and building meaningful relationships in
                the digital world. At Aliet, we believe in empowering users to
                express themselves, discover new connections, and stay engaged
                with the people who matter most.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col px-0 md:px-14 pb-5 py-2 md:py-2 md:text-sm lg:text-base">
          <h1 className="text-center font-bold text-lg  md:text-2xl text-purple-500 underline">
            What Makes Aliet Unique?
          </h1>
          <p className="w-full font-semibold text-base md:text-lg my-2">
            Aliet is designed to provide a seamless and user-friendly social
            media experience with powerful features:
          </p>
          <ul className="list-disc list-inside flex flex-col gap-y-2">
            <li className="text-gray-600">
              <span className="font-semibold ">Share Your Moments: </span>
              Post pictures with captions to showcase your special memories and
              stories.
            </li>
            <li className="text-gray-600">
              <span className="font-semibold ">Engage with Others: </span>
              Like and comment on posts to join conversations and connect with
              others.
            </li>
            <li className="text-gray-600">
              <span className="font-semibold ">Save Favorites: </span>
              Bookmark posts that inspire or resonate with you for quick access
              later.
            </li>
            <li className="text-gray-600">
              <span className="font-semibold ">Real-Time Messaging: </span>
              Chat instantly with friends and followers to stay connected
              effortlessly.
            </li>
            <li className="text-gray-600">
              <span className="font-semibold ">Search and Discover: </span>
              Find specific users and connect with people who share your
              interests.
            </li>
            <li className="text-gray-600">
              <span className="font-semibold ">Comprehensive Profiles: </span>
              View, update, and customize your profile, including profile
              picture and details.
            </li>
            <li className="text-gray-600">
              <span className="font-semibold ">Privacy and Control: </span>
              Change your password, manage your account, and delete it if
              needed.
            </li>
          </ul>
        </div>
        <div className="w-full flex flex-col md:flex-row items-center py-4 px-0 md:px-10 gap-x-8 md:text-sm lg:text-base">
          <div
            style={{ borderRadius: "70% 30% 51% 49% / 55% 64% 36% 45% " }}
            className="w-[100%] md:w-[20%] bg-orange-300 overflow-hidden"
          >
            {" "}
            <a
              href="http://jabedalimollah.netlify.app"
              target="_blank"
              className="w-full"
            >
              <img
                src="/images/Jabed_Ali-removebg-preview.png"
                alt="jabed"
                className="w-full"
              />
            </a>
          </div>
          <div className="w-[100%] md:w-[70%] my-2 md:my-0">
            <span className=" font-semibold text-xl text-purple-500">
              Meet the Developer
            </span>
            <div className=" w-full border-b-2 border-purple-500"></div>
            <h1 className="font-bold text-2xl md:text-4xl text-gray-500 my-2 hover:text-gray-600">
              <a href="http://jabedalimollah.netlify.app" target="_blank">
                {" "}
                Jabed Ali Mollah
              </a>
            </h1>

            <p className="w-[100%] md:w-[95%]">
              <a
                href="http://jabedalimollah.netlify.app"
                target="_blank"
                className="text-purple-500 hover:text-gray-600 font-semibold"
              >
                {" "}
                Jabed Ali Mollah
              </a>
              , the developer of Aliet, is a skilled MERN Stack developer with a
              strong passion for creating user-centric and innovative web
              applications. With expertise in modern web technologies like React
              JS, Node.js, and MongoDB, Jabed focuses on building responsive and
              feature-rich platforms. His vision for Aliet reflects his
              dedication to delivering seamless user experiences and fostering
              meaningful digital connections.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
