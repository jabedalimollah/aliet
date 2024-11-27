import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import axios from "axios";
// import { toast } from "sonner";
import { NavLink, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import { toast } from "react-toastify";
import Footer from "./Footer";

const Login = () => {
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(inputFields);
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API_KEY}/user/login`,
        inputFields,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res?.data.statusInfo == "success") {
        dispatch(setAuthUser(res.data.data));
        console.log(res?.data.token);
        localStorage.setItem("aliet", res?.data.token);
        toast.success(res.data.message, {
          position: "top-center",
        });
        setInputFields({
          email: "",
          password: "",
        });

        navigate("/");
      }
    } catch (error) {
      // console.log(error.response);
      toast.error(error?.response?.data.message, {
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
      <div className="flex flex-col md:flex-row items-center w-[100%] h-[80vh] md:h-screen justify-start pt-10 md:pt-0 md:justify-center bg-purple-50s bg_gradient">
        <div className="w-[90%] md:w-[80%] lg:w-[60%] flex flex-col md:flex-row justify-center items-center shadow-xl rounded-lg overflow-hidden  md:bg-purple-500 lg:bg-white">
          <form
            action=""
            className=" flex flex-col gap-5 p-8 w-[100%] md:w-[60%] lg:w-[50%] bg-white"
            onSubmit={handleLogin}
          >
            <div className="my-2">
              {/* <h1 className="text-center font-bold text-xl">Logo</h1> */}
              <div className="w-full flex justify-center cursor-pointer">
                <img src="images/aliet1.png" alt="Aliet" className="h-10  " />
              </div>
              <p className="text-sm text-center mt-2">
                Stay connected with your friends.
              </p>
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
              <Button type="submit" className={"button_gradient_purple"}>
                Login
              </Button>
              // <Button type="submit">Login</Button>
            )}

            <span className="text-center">
              Dosen't have an account?
              <NavLink to={"/signup"} className={"text-purple-600"}>
                {" "}
                Signup
              </NavLink>{" "}
            </span>
          </form>
          <div className="w-[90%] hidden md:inline-block md:w-[50%] bg-purple-500">
            <img src="images/Pic-min.png" alt="login" className="w-full p-10" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
