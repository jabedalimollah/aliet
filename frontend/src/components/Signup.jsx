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
    <div className="flex items-center w-screen h-screen justify-center">
      <form
        action=""
        className="shadow-lg flex flex-col gap-5 p-8"
        onSubmit={handleSignup}
      >
        <div className="my-4">
          <h1 className="text-center font-bold text-xl">Logo</h1>
          <p className="text-sm text-center">
            Signup to see photos & videos from your friends
          </p>
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
          <Button type="submit">Signup</Button>
        )}
        {/* <Button type="submit">Signup</Button> */}
        <span className="text-center">
          Already have an account?
          <NavLink to={"/login"} className={"text-blue-600"}>
            Login
          </NavLink>{" "}
        </span>
      </form>
    </div>
  );
};

export default Signup;
