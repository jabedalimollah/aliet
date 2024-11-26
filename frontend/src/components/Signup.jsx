import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import axios from "axios";
// import { toast } from "sonner";
import { NavLink, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Footer from "./Footer";

const Signup = () => {
  const [inputFields, setInputFields] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    // console.log(inputFields);
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API_KEY}/user/register`,
        inputFields,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      //   console.log(res.data.statusInfo);
      if (res.data.statusInfo == "success") {
        toast.success(res.data.message, {
          position: "top-center",
        });
        setInputFields({
          username: "",
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      //   console.log(error);
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div className="flex items-center w-[100%] h-auto md:h-screen flex-col md:flex-row justify-start md:justify-center pt-10 md:pt-0 bg-purple-50s bg_gradient_signup pb-8 md:pb-0">
        <div className="w-[90%] md:w-[80%] lg:w-[60%] flex justify-center items-center shadow-xl rounded-lg overflow-hidden bg-white md:bg-purple-500">
          <div className="w-[50%] hidden md:inline-block bg-purple-500 h-full">
            <img src="images/pic3-min.png" alt="login" className="w-full" />
          </div>

          <form
            action=""
            className="flex flex-col gap-5 p-8 w-[100%] md:w-[60%] lg:w-[50%]  bg-white "
            onSubmit={handleSignup}
          >
            <div className="my-2">
              <div className="w-full flex justify-center cursor-pointer">
                <img src="images/aliet1.png" alt="Aliet" className="h-10  " />
              </div>
              <p className="text-sm text-center mt-2">
                Stay connected with your friends.
              </p>
              {/* <h1 className="text-center font-bold text-xl">Logo</h1>
            <p className="text-sm text-center">
              Signup to see photos & videos from your friends
            </p> */}
            </div>
            <div>
              <Label>Username</Label>

              <Input
                type="text"
                name="username"
                value={inputFields.username}
                onChange={changeEventHandler}
                className="focus-visible:ring-transparent my-2"
              />
            </div>
            <div>
              <Label>Email</Label>

              <Input
                type="email"
                name="email"
                value={inputFields.email}
                onChange={changeEventHandler}
                className="focus-visible:ring-transparent my-2"
              />
            </div>
            <div>
              <Label>Password</Label>

              <Input
                type="password"
                name="password"
                value={inputFields.password}
                onChange={changeEventHandler}
                className="focus-visible:ring-transparent my-2"
              />
            </div>
            {loading ? (
              <Button>
                <Loader2 className="mr-2 h-4 m-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button type="submit" className="button_gradient_purple">
                Signup
              </Button>
            )}
            {/* <Button type="submit">Signup</Button> */}
            <span className="text-center">
              Already have an account?{" "}
              <NavLink to={"/login"} className={"text-purple-600"}>
                Login
              </NavLink>{" "}
            </span>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
